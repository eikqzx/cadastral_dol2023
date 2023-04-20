import React, { useReducer } from "react";
import {
    Grid,
    TextField,
    Button,
    Paper,
    Typography,
    Stack,
    Divider,
    Snackbar,
    Alert,
    Tooltip,
    Autocomplete
} from "@mui/material";
import AutoAmphur from "../Autocompleate/amphur";
import AutoTambol from "../Autocompleate/tambol";
import DropdownAmphur from "../dropdown/amphur";
import DropdownTambol from "../dropdown/tambol";
import AutoPrintPlateType from "../Autocompleate/printPlateType";
import { SnackbarSet } from "../snackbar";
import { useRouter } from "next/router";
import { isNotEmpty } from "@/lib/datacontrol";
import { decode } from "next-base64";
import DropdownCondoProject from "../dropdown/condoProject";
import DropdownCondoBuild from "../dropdown/condoBuild";
import DropdownCondoRoom from "../dropdown/condoRoom";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
import { thdate } from "dayjs/locale/th"
import { useSession } from "next-auth/react";
import AutoCondoProject from "../Autocompleate/condoProject";

dayjs.extend(buddhistEra);
dayjs.locale(thdate);

export default function Search(props) {
    const [disabled, setDisabled] = React.useState([])
    const [printPlateType, setPrintPlateType] = React.useState(null);
    //##############printPlateType=1-5########################//
    const [amphur, setAmphur] = React.useState(null)
    const [tambol, setTambol] = React.useState(null)
    const [moo, setMoo] = React.useState("")
    const [parcelNO, setParcelNO] = React.useState("")
    const [landNo, setLandNo] = React.useState("")
    //################printPlateType=10-20#######################//
    const [condoYears, setCondoYears] = React.useState("")
    const [condoID, setCondoID] = React.useState("")
    const [condoRoomNO, setCondoRoomNO] = React.useState("")
    const [startPage, setStartPage] = React.useState("")
    const [endPage, setEndPage] = React.useState("")
    const [startLicenseDoc, setStartLicenseDoc] = React.useState("")
    const [endLicenseDoc, setEndLicenseDoc] = React.useState("")
    const [fileNo, setFileNo] = React.useState("")
    const [register, setRegister] = React.useState("")
    const [condoProjectYear, setCondoProjectYear] = React.useState(null)
    const [openAlert, setOpenAlert] = React.useState(false);
    const [condoProject, setCondoProject] = React.useState(null);
    const [condoRoomStart, setCondoRoomStart] = React.useState("");
    const [condoRoomFirst, setCondoRoomFirst] = React.useState("");
    const [condoRoomLast, setCondoRoomLast] = React.useState("");
    const [isErrorField, setIsErrorField] = React.useState([]);
    const [processSeq, setProcessSeq] = React.useState(null);
    const dataUrl = useRouter().query
    const { data } = useSession();

    const [cadastralNo, setCadastralNo] = React.useState("");
    const [sheetcode, setSheetcode] = React.useState("");
    const [boxNo, setBoxNo] = React.useState("");

    React.useEffect(() => {
        if (isNotEmpty(dataUrl)) {
            let seq = decode(dataUrl?.PROCESS_SEQ);
            console.log(seq, "seq");
            setProcessSeq(seq);
        }
    }, [])

    console.log(props, "condoProjectYear");

    // console.log(isErrorField,"isErrorField");

    React.useEffect(() => {
        if (props.static) {
            loadStaticData()
        }
    }, [props.static])

    React.useEffect(() => {
        if (props.disabled) {
            setDisabled(props.disabled)
        }
    }, [props.disabled])

    React.useEffect(() => {
        handleReset()
    }, [props?.printplateTypeSeq])

    const loadStaticData = () => {
        if (props.static.amphur) {
            setAmphur(props.static.amphur)
        }
        if (props.static.tambol) {
            setTambol(props.static.tambol)
        }
        if (props.static.moo) {
            setMoo(props.static.moo)
        }
        if (props.static.parcelNO) {
            setParcelNO(props.static.parcelNO)
        }
        if (props.static.landNo) {
            setLandNo(props.static.landNo)
        }
        if (props.static.startPage) {
            setStartPage(props.static.startPage)
                &&
                setEndPage(props.static.endPage)
        }
        if (props.static.condoYears) {
            setCondoYears(props.static.condoYears)
        }
        if (props.static.condoID) {
            setCondoID(props.static.condoID)
        }
        if (props.static.condoRoomNO) {
            setCondoRoomNO(props.static.condoRoomNO)
        }
        if (props.static.startLicenseDoc) {
            setStartLicenseDoc(props.static.startLicenseDoc)
                &&
                setEndLicenseDoc(props.static.endLicenseDoc)
        }
        // if (props.static.endLicenseDoc) {
        //     setEndLicenseDoc(props.static.endLicenseDoc)
        // }
    }

    const _checkIsValid = () => {
        let errorArray = []
        // console.log(errorArray,props?.printplateTypeSeq);
        if(cadastralNo == ""){
            errorArray.push("cadastralNo")
        }
        if(sheetcode == ""){
            errorArray.push("sheetcode")
        }
        if(boxNo == ""){
            errorArray.push("boxNo")
        }
        setIsErrorField(errorArray);
        if (errorArray.length > 0) {
            return false;
        } else {
            return true;
        }
    };

    const handleSearch = () => {
        console.log(startPage, endPage, "handleSearch");
        let isValid = _checkIsValid();
        let newStartPage = startPage ? Number(startPage) : Number(endPage)
        let newEndPage = endPage ? Number(endPage) : Number(startPage)
        if (!isValid) {
            setOpenAlert(true);
            // SnackbarSet("ไม่สามารถค้นหาได้ กรุณากรอกข้อมูลให้ครบถ้วน", "error")
            return;
        }
        

    }
    const handleReset = () => {
        props?.onReset([])
        setAmphur(null)
        setTambol(null)
        setStartPage('')
        setEndPage('')
        setMoo('')
        setLandNo('')
        setStartLicenseDoc('')
        setEndLicenseDoc('')
        setFileNo('')
        setCondoYears("")
        setCondoID("")
        setCondoRoomNO("")
        if (props.static) {
            loadStaticData()
        }
    }

    const _changeAmphur = (event, value) => {
        setTambol(null);
        setAmphur(value);
    };

    const _changeTambol = (event, value) => {
        setTambol(value);
    };

    const _changePrintPlateType = (event, value) => {
        setPrintPlateType(value);
    };
    const _changeCondoProject = (event, value) => {
        setCondoProject(value);
    };

    const handleClose = (event, reason) => {
        setOpenAlert(false);
    };

    return (
        <Grid container p={1}>
            <Snackbar open={openAlert} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    ไม่สามารถค้นหาได้ กรุณากรอกข้อมูลให้ครบถ้วน
                </Alert>
            </Snackbar>
            <Grid item xs={12}>
                <Paper elevation={0}>
                    <Grid item xs={12} px={1} py={1}>
                        <Typography>ค้นหารายการ</Typography>
                    </Grid>
                    <Divider sx={{ my: 0.5 }} />
                    <Grid item xs={12} px={1} py={1}>
                        {
                            props.printplateTypeSeq != 10 && props.printplateTypeSeq != 20 ?
                                (
                                    <Grid container>
                                        {disabled.includes("cadastralNo") ? null : (
                                            <Grid item xs={12} md={2} px={1} py={1}>
                                                <Typography >เลขที่ต้นร่าง</Typography>
                                                <TextField error={isErrorField.includes("cadastralNo")}  fullWidth size={'small'} value={cadastralNo} onChange={(e) => setCadastralNo(e.target.value)} type="number" />
                                            </Grid>
                                        )}
                                        {disabled.includes("sheetcode") ? null : (
                                            <Grid item xs={12} md={3} px={1} py={1}>
                                                <Typography >หมายเลขรหัสแทนระวาง(เลขแฟ้ม)</Typography>
                                                <TextField error={isErrorField.includes("sheetcode")} fullWidth size={'small'} value={sheetcode} onChange={(e) => setSheetcode(e.target.value)} type="number" />
                                            </Grid>
                                        )}
                                        {disabled.includes("cadastralNo") ? null : (
                                            <Grid item xs={12} md={2} px={1} py={1}>
                                                <Typography >เลขที่กล่อง</Typography>
                                                <TextField error={isErrorField.includes("boxNo")} fullWidth size={'small'} value={boxNo} onChange={(e) => setBoxNo(e.target.value)} type="number" />
                                            </Grid>
                                        )}
                                    </Grid>
                                ) : null
                        }
                    </Grid>
                    <Grid item xs={12} px={1} py={1}>
                        <Grid container justifyContent={"flex-end"} spacing={1}>
                            <Grid item>
                                <Tooltip title={"ค้นหา"}>
                                    <Button variant="contained" color="info" onClick={handleSearch}>
                                        ค้นหา
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid item>
                                <Tooltip title={"ล้างค่า"}>
                                    <Button variant="contained" color="warning" onClick={handleReset}>
                                        ล้างค่า
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid >
        </Grid >
    )
}