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
  Avatar
} from "@mui/material";
import { confirmDialog } from "@/pages/components/confirmDialog";
import AddCad from '../component/addCadastral';
import { useSession } from 'next-auth/react';
import { insertCadastral } from '@/service/sva';
import { getLandOffice } from '@/service/mas/landOffice';

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

  React.useEffect(() => {
    if (Array.isArray(props?.searchData)) {
      if (props?.searchData.length != 0) {
        let filterData = props?.searchData?.filter(item => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ);
        console.log(filterData, "filterData");
        if(filterData.length != 0){
          getMasterData(filterData[0]);
        }
      }
    }
  }, [props?.searchData]);

  const addCad = async (inputData) => {
    console.log(inputData, "inputData");
    let objInsert = {
      "SHEETCODE": tabData.SHEETCODE,
      "BOX_NO": tabData.BOX_NO,
      "CADASTRAL_NO": tabData.CADASTRAL_NO,
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

  const checkedNullSeq = () => {
    if (props?.tabData?.CADASTRAL_SEQ == null && props?.tabData.length !== 0) {
      confirmDialog.createDialog(
        `ไม่พบข้อมูลทะเบียนของต้นร่างเลขที่ ${props?.tabData?.CADASTRAL_NO} ต้องการเพิ่มข้อมูลทะเบียน หรือไม่ ?`,
        () => { setOpenAddData(true) }
      );
    }
  }

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

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Grid>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}>
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
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
    </Grid>
  )
}
