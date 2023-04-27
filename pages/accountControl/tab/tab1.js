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
import { useSession } from "next-auth/react";
import { getCookie, isNotEmpty } from "@/lib/datacontrol";
import { useRouter } from "next/router";
import { decode } from "next-base64";
import { getLandOffice } from '@/service/mas/landOffice';
import { Save } from '@mui/icons-material';
import ExportExcel from "@/pages/exportExcel";
import { cadastralImageFolderSeqNextVal, mrgCadastralImage } from '@/service/evd/cadastral';

export default function Tab1(props) {
    console.log(props, "propsTab1");
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const [number, setNumber] = React.useState([]);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [numberExcelData, setNumberExcelData] = React.useState([]);
    const [excelData, setExcelData] = React.useState("");
    const [exportPDF, setisexportPDF] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [processSeq, setProcessSeq] = React.useState(101)
    const { data } = useSession();
    const dataUrl = useRouter().query

    const handleClose = (event, reason) => {
        setOpenAlert(false);
    };

    React.useEffect(() => {
        if (isNotEmpty(dataUrl)) {
            let seq = decode(dataUrl?.PROCESS_SEQ);
            console.log(seq, "seq");
            setProcessSeq(seq);
        }
    }, [])

    React.useEffect(() => {
        Array.isArray(props?.searchData) && numbers(props?.searchData);
        Array.isArray(props?.searchData) && setCadastralNo(props?.searchData.length != 0 ? props?.searchData[0].CADASTRAL_NO + " ถึง " + props?.searchData[props?.searchData.length - 1].CADASTRAL_NO : "-");
        Array.isArray(props?.searchData) && getMasterData(props?.pdfData);
        Array.isArray(props?.searchData) && setExcelData(props?.searchData[0])
        console.log(number, "number");
    }, [props?.searchData])

    const getMasterData = async (data) => {
        console.log(data, "getMasterData");
        if (data != undefined) {
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ);
            setSheetcode(data.SHEETCODE);
            setBoxNo(data.BOX_NO.toString().padStart(2, '0'));
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
        }
    }

    let numbers = async (arr) => {
        let newArr = []
        for (let index in arr) {
            const element = arr[index];
            if (element.CADASTRAL_IMAGE == 1 || element.CADASTRAL_IMAGE == null) {
                element.active = true
            }
            if (element.CADASTRAL_IMAGE == 0) {
                element.active = false
            }
            newArr.push(element)
        }
        console.log(newArr, "numbers newArr");
        await setNumber(newArr)
        await setNumberExcelData(newArr)
    }

    const onClickChange = async (index) => {
        console.log(index, "index");
        let temp = number
        temp[index].active = !temp[index].active
        // console.log(temp[index]);
        console.log(temp);
        await setNumber([])
        await setNumber(temp)
    }

    const onSubmit = async () => {
        console.log(number, "number");
        let dataObj = number;
        let cadastralNo = await cadastralImageFolderSeqNextVal();
        for (let i in dataObj) {
            let item = dataObj[i];
            if (item.active == true) {
                item.CADASTRAL_IMAGE = 1
            }
            if (item.active == false) {
                item.CADASTRAL_IMAGE = 0
            }
            item.STATUS_SEQ_ = 101
            item.CREATE_USER = data?.user?.USER_LIST_PID;
            item.RECORD_STATUS = "N";
            item.PROCESS_SEQ_ = processSeq;
            item.CADASTRAL_NO_ = cadastralNo.rows[0].CADASTRAL_IMAGE_NO_
            let res = await mrgCadastralImage(item);
            console.log(res,"resCADASTRAL_IMAGE");
            if (i == (dataObj.length - 1)) {
                if (typeof res == "object") {
                    setOpenAlert(true);
                    setMessage("บันทึกสำเร็จ");
                    setType("success");
                } else {
                    setOpenAlert(true);
                    setMessage("เกิดข้อผิดพลาด กรุณาติดต่อเจ้าหน้าที่");
                    setType("error");
                }
            }
        }
    }

    return (
        <Grid component={Paper} style={{ background: '#FFFFE8' }} sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }}>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
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
                {
                    number.length != 0 ?
                        <React.Fragment>
                            <Grid item xs={6} md={6}>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table sx={{ minWidth: 200 }} size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">เลขที่ต้นร่าง</TableCell>
                                                <TableCell align="center">มี</TableCell>
                                                <TableCell align="center">ไม่มี</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {number.length != 0 && number.map((row, index) => {
                                                if (index < number.length / 2) {
                                                    return <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell sx={{ width: 100 }} align="center"><Typography>{row.CADASTRAL_NO}</Typography></TableCell>
                                                        <TableCell sx={{ width: 100 }} align="center">
                                                            <Checkbox checked={row.active} onClick={() => { onClickChange(index) }} />
                                                        </TableCell>
                                                        <TableCell sx={{ width: 100 }} align="center">
                                                            <Checkbox checked={!row.active} onClick={() => { onClickChange(index) }} />
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TableContainer component={Paper} variant="outlined">
                                    <Table sx={{ minWidth: 200 }} size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">เลขที่ต้นร่าง</TableCell>
                                                <TableCell align="center">มี</TableCell>
                                                <TableCell align="center">ไม่มี</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {number.length != 0 && number.map((row, index) => {
                                                if (index >= number.length / 2) {
                                                    return <TableRow
                                                        key={index}
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 10 }}
                                                    >
                                                        <TableCell sx={{ width: 100 }} align="center"><Typography>{row.CADASTRAL_NO}</Typography></TableCell>
                                                        <TableCell sx={{ width: 100 }} align="center">
                                                            <Checkbox checked={row.active} onClick={() => { onClickChange(index) }} />
                                                        </TableCell>
                                                        <TableCell sx={{ width: 100 }} align="center">
                                                            <Checkbox checked={!row.active} onClick={() => { onClickChange(index) }} />
                                                        </TableCell>
                                                    </TableRow>
                                                }
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </React.Fragment>
                        : null
                }
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} justifyContent={"flex-start"}>
                        {/* <ExportExcel
                            documentNo={cadastralNo}
                            number={numberExcelData}
                            searchData={excelData}
                            disabled={numberExcelData.length == 0}
                        /> */}
                        {/* <Grid container>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Tooltip title={"ส่งออกบัญชีเบิกเอกสาร"}>
                                            <Button
                                                variant="contained"
                                                label="Export"
                                                color="success"
                                                startIcon={
                                                    <Avatar sx={{ width: 24, height: 24 }}>
                                                        <Image src={"/pdf.png"} width={20} height={20} />
                                                    </Avatar>
                                                }
                                                onClick={handleexportPDF}
                                                disabled={numberExcelData.length == 0}
                                            >
                                                Export
                                            </Button>
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> */}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack direction="row" spacing={2} justifyContent={"flex-end"}>
                        <Button
                            onClick={onSubmit}
                            color="success"
                            variant="contained"
                            startIcon={<Save />}
                            disabled={number.length == 0}
                        >
                            บันทึก
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    )
}
