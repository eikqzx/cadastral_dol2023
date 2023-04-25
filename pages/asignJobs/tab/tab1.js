import React from 'react'
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  makeStyles,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  IconButton,
  TextField,
  Avatar
} from "@mui/material";
import { confirmDialog } from "@/pages/components/confirmDialog";
import AddCad from '../components/addCadastral';
import { useSession } from 'next-auth/react';
import { insertCadastral } from '@/service/sva';
import { getLandOffice } from '@/service/mas/landOffice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Add, Remove, Save } from "@mui/icons-material";
import AddDocDialog from '../components/addDocDialog';
import { surveyDocTypeBySurveyDocTypeGroup } from '@/service/mas/surveyDocTypeGroup';
import { filterRecordStatus } from '@/lib/datacontrol';

export default function Tab1(props) {
  console.log(props, "Tab1Tab1");
  const [openAddData, setOpenAddData] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("success");
  const [office, setOffice] = React.useState("-");
  const [sheetcode, setSheetcode] = React.useState("-");
  const [boxNo, setBoxNo] = React.useState("-");
  const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
  const [cadastralNo, setCadastralNo] = React.useState("-");
  const { data } = useSession();
  const [title, setTitle] = React.useState("");
  const [typeRegisterSts, setTypeRegisterSts] = React.useState(1);
  const [addRegType, setAddRegType] = React.useState(false);
  const [datagroupA, setDataGroupA] = React.useState([]);
  const [datagroupB, setDataGroupB] = React.useState([]);
  const [datagroupC, setDataGroupC] = React.useState([]);
  const [datagroupD, setDataGroupD] = React.useState([]);
  const [count, setCount] = React.useState(0);
  console.log(datagroupA, "datagroupA");
  console.log(datagroupB, "datagroupB");
  console.log(datagroupC, "datagroupC");
  console.log(datagroupD, "datagroupD");
  const handleOpen = (type, name) => {
    setAddRegType(!addRegType)
    setTypeRegisterSts(type);
    setTitle(name)
  }
  const onAddJob = (obj) => {
    console.log(obj, "onAddJob");
  }
  React.useEffect(() => {
    if (Array.isArray(props?.searchData)) {
      if (props?.searchData.length != 0) {
        let filterData = props?.searchData?.filter(item => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ);
        console.log(filterData, "filterData");
        if (filterData.length != 0) {
          getMasterData(filterData[0]);
        }
      }
    }
  }, [props?.searchData]);

  React.useEffect(() => {
    createSurveyData()
  }, []);

  React.useEffect(() => {
    if (typeof props?.tabData == "object" && props?.tabData.length !== 0 && props?.tabData != undefined) {
      changeTapValue();
      // createSurveyData(); /***** solution 1******/
      if (props?.tabData?.CADASTRAL_SEQ == null) {
        confirmDialog.createDialog(
          `ไม่พบข้อมูลทะเบียนของต้นร่างเลขที่ ${props?.tabData?.CADASTRAL_NO} ต้องการเพิ่มข้อมูลทะเบียน หรือไม่ ?`,
          () => { setOpenAddData(true) }
        );
      }
      getMasterData(props?.tabData);
    }
  }, [props?.tabData]);

  const addCad = async (inputData) => {
    console.log(inputData, "inputData");
    let objInsert = {
      "SHEETCODE": props?.tabData.SHEETCODE,
      "BOX_NO": props?.tabData.BOX_NO,
      "CADASTRAL_NO": props?.tabData.CADASTRAL_NO,
      "NUMOFSURVEY_QTY": inputData,
      "LANDOFFICE_SEQ": props?.tabData?.LANDOFFICE_SEQ,
      "PROCESS_SEQ_": props?.processSeq ?? 102,
      "STATUS_SEQ_": 104,
      "RECORD_STATUS": "N",
      "CREATE_USER": data?.user?.USER_LIST_PID
    }
    console.log(objInsert, "inputData");
    try {
      let res = await insertCadastral(objInsert);
      console.log(res);
      if (res) {
        await props?.onSearch(props?.searchParameter);
        await setMessage("เพิ่มทะเบียนสำเร็จ");
        await setOpen(true);
        await setType("success");
      }
    } catch (error) {
      await setMessage("เกิดข้อผิดพลาด");
      await setOpen(true);
      await setType("error");
    }
  }

  const changeTapValue = () =>{
    let newA = []
    let newB = []
    let newC = []
    let newD = []
    for(let i in datagroupA){
      let item = datagroupA[i];
      item.COUNT_DOC = 0
      newA.push(item);
    }
    for(let i in datagroupB){
      let item = datagroupB[i];
      item.COUNT_DOC = 0
      newB.push(item);
    }
    for(let i in datagroupC){
      let item = datagroupC[i];
      item.COUNT_DOC = 0
      newC.push(item);
    }
    for(let i in datagroupD){
      let item = datagroupD[i];
      item.COUNT_DOC = 0
      newD.push(item);
    }
    setDataGroupA(newA);
    setDataGroupB(newB);
    setDataGroupC(newC);
    setDataGroupD(newD);
  }

  const handleCountChange = (type, index, obj, value) => {
    console.log(obj, "handleCountChange");
    // console.log(obj["COUNT_DOC"], "handleCountChange");

    const parcelHsfsPno = obj["SURVEYDOCTYPE_PNO_SEQ"];

    if (parcelHsfsPno != null && parcelHsfsPno != undefined) {
      if (type === "increase") {
        obj["COUNT_DOC"] = obj["COUNT_DOC"] != null && obj["COUNT_DOC"] != undefined ? obj["COUNT_DOC"] + 1 : 1;
      } else if (type === "decrease") {
        obj["COUNT_DOC"] = obj["COUNT_DOC"] != null && obj["COUNT_DOC"] != undefined && obj["COUNT_DOC"] > 0 ? obj["COUNT_DOC"] - 1 : 0;
      } else if (type === "change") {
        obj["COUNT_DOC"] = Number(value);
      }
    } else {
      obj["COUNT_DOC"] = 1;
      obj["SURVEYDOCTYPE_PNO_SEQ"] = 0;
    }
    console.log(obj, "handleCountChange");
  };

  const getMasterData = async (data) => {
    console.log(data, "getMasterData");
    if (data != undefined) {
      let getLandOfficeData = await getLandOffice();
      let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ);
      setSheetcode(data.SHEETCODE);
      setBoxNo(data.BOX_NO);
      setNumofsurveyQty(data?.NUMOFSURVEY_QTY ?? "-");
      setCadastralNo(data.CADASTRAL_NO);
      console.log(landOfficeFiltered, "getLandOfficeData");
      setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
    }
  }

  const createSurveyData = async () => {
    let resGroupA = await surveyDocTypeBySurveyDocTypeGroup("A");
    let dataA = filterRecordStatus(resGroupA.rows, "N");
    let resGroupB = await surveyDocTypeBySurveyDocTypeGroup("B");
    let dataB = filterRecordStatus(resGroupB.rows, "N");
    let resGroupC = await surveyDocTypeBySurveyDocTypeGroup("C");
    let dataC = filterRecordStatus(resGroupC.rows, "N");
    let resGroupD = await surveyDocTypeBySurveyDocTypeGroup("D");
    let dataD = filterRecordStatus(resGroupD.rows, "N");
    setDataGroupA(dataA);
    setDataGroupB(dataB);
    setDataGroupC(dataC);
    setDataGroupD(dataD);
    console.log(dataA, "createSurveyData A");
    console.log(dataB, "createSurveyData B");
    console.log(dataC, "createSurveyData C");
    console.log(dataD, "createSurveyData D");
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = () => {
    console.log("submit");
  }

  return (
    <Grid>
      {open && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>}
      {addRegType &&
        <AddDocDialog
          open={addRegType}
          onclose={() => (setAddRegType(false))}
          type={typeRegisterSts}
          title={title}
          onSubmit={onAddJob}
        />
      }
      {openAddData && <AddCad open={openAddData} close={() => (setOpenAddData(false))} data={props?.tabData} onSubmit={addCad} />}
      <Grid p={2} spacing={1} component={Paper} container>
        <Grid item xs={3} md={5}>
          <Grid container>
            <Grid item>
              <Typography>สำนักงาน: </Typography>
            </Grid>
            <Grid item>
              <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{office}&nbsp;</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} md={3}>
          <Grid container>
            <Grid item>
              <Typography>หมายเลขรหัสแทนระวาง(เลขแฟ้ม):</Typography>
            </Grid>
            <Grid item>
              <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{sheetcode}&nbsp;</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} md={3}>
          <Grid container>
            <Grid item >
              <Typography>เลขที่กล่อง:</Typography>
            </Grid>
            <Grid item>
              <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{boxNo}&nbsp;</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} md={3}>
          <Grid container>
            <Grid item >
              <Typography>ครั้งที่รังวัด:</Typography>
            </Grid>
            <Grid item>
              <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{numofsurveyQty}&nbsp;</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} md={4}>
          <Grid container>
            <Grid item >
              <Typography>เลขที่ต้นร่าง:</Typography>
            </Grid>
            <Grid item>
              <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{cadastralNo}&nbsp;</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>
      {(props?.tabData == null || props?.tabData == undefined || props?.tabData?.length == 0) ?
        <Grid container justifyContent={'center'}>
          <Typography fontStyle={'italic'} color={'red'}>
            กรุณาเลือกหน้าสำรวจ
          </Typography>
        </Grid>
        : <React.Fragment>
          <Grid item xs={12}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  background: ' rgba(255,255,232,1) !important',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4} md={4}><Typography fontSize={18}>ต้นร่าง (A)</Typography></Grid>
                  {/* <Grid item xs={6} md={6}  ><Button size="small" variant="contained" onClick={() => { handleOpen(1, "ต้นร่าง") }}>เพิ่มเอกสารต้นร่าง</Button></Grid> */}
                </Grid>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                {datagroupA.length != 0 && <TableContainer>
                  <Table size="small" >
                    <TableBody container>
                      {
                        datagroupA.map((item, index) =>
                          <TableRow key={item.SURVEYDOCTYPE_SEQ}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              '&:hover': {
                                backgroundColor: '#ECF2FF !important',
                              },
                            }}
                          >
                            <TableCell style={{ width: "5%" }} align="left">{item.SURVEYDOCTYPE_SYS_}</TableCell>
                            <TableCell style={{ width: "50%" }} align="left">{item.SURVEYDOCTYPE_NAME_TH}</TableCell>
                            <TableCell style={{ width: "50%" }}>
                              <Stack direction={'row'}>
                                <Grid item xs={12} md={2}>
                                  <Tooltip title={"ลดเลข"}>
                                    <IconButton
                                      onClick={() => {
                                        handleCountChange("decrease", index, item);
                                        setCount((prevCount) => prevCount - 1);
                                      }}
                                      color="error">
                                      <Remove />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <TextField
                                    type="number"
                                    size="small"
                                    label={"จำนวนหน้า"}
                                    // sx={{ width: "60%" }}
                                    inputProps={{ maxLength: 4, readOnly: true }}
                                    defaultValue={"0"}
                                    value={item?.COUNT_DOC || 0}
                                    onChange={(e) => { handleCountChange("change", index, item, e.target.value) }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={2} >
                                  <Tooltip title={"เพิ่มเลข"}>
                                    <IconButton
                                      onClick={() => {
                                        handleCountChange("increase", index, item);
                                        setCount((prevCount) => prevCount + 1);
                                      }}
                                      color="success">
                                      <Add />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                }
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  background: ' rgba(255,255,232,1) !important',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4} md={4}><Typography fontSize={18}>รายการรังวัด (B)</Typography></Grid>
                  {/* <Grid item xs={6} md={6}  ><Button size="small" variant="contained" onClick={() => { handleOpen(1, "ต้นร่าง") }}>เพิ่มเอกสารต้นร่าง</Button></Grid> */}
                </Grid>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                {datagroupB.length != 0 && <TableContainer>
                  <Table size="small" >
                    <TableBody container>
                      {
                        datagroupB.map((item, index) =>
                          <TableRow key={item.SURVEYDOCTYPE_SEQ}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              '&:hover': {
                                backgroundColor: '#ECF2FF !important',
                              },
                            }}
                          >
                            <TableCell style={{ width: "5%" }} align="left">{item.SURVEYDOCTYPE_SYS_}</TableCell>
                            <TableCell style={{ width: "50%" }} align="left">{item.SURVEYDOCTYPE_NAME_TH}</TableCell>
                            <TableCell style={{ width: "25%" }}>
                              <Stack direction={'row'}>
                                <Grid item xs={12} md={2}>
                                  <Tooltip title={"ลดเลข"}>
                                    <IconButton
                                      onClick={() => {
                                        handleCountChange("decrease", index, item);
                                        setCount((prevCount) => prevCount - 1);
                                      }}
                                      color="error">
                                      <Remove />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <TextField
                                    type="number"
                                    size="small"
                                    label={"จำนวนหน้า"}
                                    // sx={{ width: "60%" }}
                                    inputProps={{ maxLength: 4, readOnly: true }}
                                    defaultValue={"0"}
                                    value={item?.COUNT_DOC || 0}
                                    onChange={(e) => { handleCountChange("change", index, item, e.target.value) }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={2} >
                                  <Tooltip title={"เพิ่มเลข"}>
                                    <IconButton
                                      onClick={() => {
                                        handleCountChange("increase", index, item);
                                        setCount((prevCount) => prevCount + 1);
                                      }}
                                      color="success">
                                      <Add />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                }
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  background: ' rgba(255,255,232,1) !important',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4} md={4}><Typography fontSize={18}>รายการคำนวณ (C)</Typography></Grid>
                  {/* <Grid item xs={6} md={6}  ><Button size="small" variant="contained" onClick={() => { handleOpen(1, "ต้นร่าง") }}>เพิ่มเอกสารต้นร่าง</Button></Grid> */}
                </Grid>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                {datagroupC.length != 0 && <TableContainer>
                  <Table size="small" >
                    <TableBody container>
                      {
                        datagroupC.map((item, index) =>
                          <TableRow key={item.SURVEYDOCTYPE_SEQ}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              '&:hover': {
                                backgroundColor: '#ECF2FF !important',
                              },
                            }}
                          >
                            <TableCell style={{ width: "5%" }} align="left">{item.SURVEYDOCTYPE_SYS_}</TableCell>
                            <TableCell style={{ width: "50%" }} align="left">{item.SURVEYDOCTYPE_NAME_TH}</TableCell>
                            <TableCell style={{ width: "50%" }}>
                              <Stack direction={'row'}>
                                <Grid item xs={12} md={2}>
                                  <Tooltip title={"ลดเลข"}>
                                    <IconButton
                                      onClick={() => {
                                        handleCountChange("decrease", index, item);
                                        setCount((prevCount) => prevCount - 1);
                                      }}
                                      color="error">
                                      <Remove />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <TextField
                                    type="number"
                                    size="small"
                                    label={"จำนวนหน้า"}
                                    // sx={{ width: "60%" }}
                                    inputProps={{ maxLength: 4, readOnly: true }}
                                    defaultValue={"0"}
                                    value={item?.COUNT_DOC || 0}
                                    onChange={(e) => { handleCountChange("change", index, item, e.target.value) }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={2} >
                                  <Tooltip title={"เพิ่มเลข"}>
                                    <IconButton
                                      onClick={() => {
                                        handleCountChange("increase", index, item);
                                        setCount((prevCount) => prevCount + 1);
                                      }}
                                      color="success">
                                      <Add />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                }
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12}>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  background: ' rgba(255,255,232,1) !important',
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={4} md={4}><Typography fontSize={18}>อื่นๆ(D)</Typography></Grid>
                  {/* <Grid item xs={6} md={6}  ><Button size="small" variant="contained" onClick={() => { handleOpen(1, "ต้นร่าง") }}>เพิ่มเอกสารต้นร่าง</Button></Grid> */}
                </Grid>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                {datagroupD.length != 0 && <TableContainer>
                  <Table size="small" >
                    <TableBody container>
                      {
                        datagroupD.map((item, index) =>
                          <TableRow key={item.SURVEYDOCTYPE_SEQ}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                              '&:hover': {
                                backgroundColor: '#ECF2FF !important',
                              },
                            }}
                          >
                            <TableCell style={{ width: "5%" }} align="left">{item.SURVEYDOCTYPE_SYS_}</TableCell>
                            <TableCell style={{ width: "50%" }} align="left">{item.SURVEYDOCTYPE_NAME_TH}</TableCell>
                            <TableCell style={{ width: "50%" }}>
                              <Stack direction={'row'}>
                                <Grid item xs={12} md={2}>
                                  <Tooltip title={"ลดเลข"}>
                                    <IconButton
                                      onClick={() => {
                                        handleCountChange("decrease", index, item);
                                        setCount((prevCount) => prevCount - 1);
                                      }}
                                      color="error">
                                      <Remove />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                  <TextField
                                    type="number"
                                    size="small"
                                    label={"จำนวนหน้า"}
                                    // sx={{ width: "60%" }}
                                    inputProps={{ maxLength: 4, readOnly: true }}
                                    defaultValue={"0"}
                                    value={item?.COUNT_DOC || 0}
                                    onChange={(e) => { handleCountChange("change", index, item, e.target.value) }}
                                  />
                                </Grid>
                                <Grid item xs={12} md={2} >
                                  <Tooltip title={"เพิ่มเลข"}>
                                    <IconButton
                                      onClick={() => {
                                        handleCountChange("increase", index, item);
                                        setCount((prevCount) => prevCount + 1);
                                      }}
                                      color="success">
                                      <Add />
                                    </IconButton>
                                  </Tooltip>
                                </Grid>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        )
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
                }
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item p={1} xs={12}>
            <Stack alignContent={"flex-end"} xs={12}>
              <Grid container justifyContent={"flex-end"} spacing={2} xs={12}>
                {/* <Grid item>
                            <Button color="info" onClick={onSave} variant="contained">บันทึก</Button>
                        </Grid> */}
                <Grid item>
                  <Button color="success" onClick={onSubmit} variant="contained">บันทึก</Button>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </React.Fragment>
      }
    </Grid>
  )
}
