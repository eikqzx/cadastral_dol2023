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
    const [cadastralNo1, setCadastralNo1] = React.useState("");
    const [cadastralNo2, setCadastralNo2] = React.useState("");
    const [sheetcode, setSheetcode] = React.useState("");
    const [boxNo, setBoxNo] = React.useState("");
    //################printPlateType=10-20#######################//
    const [openAlert, setOpenAlert] = React.useState(false);
    const [isErrorField, setIsErrorField] = React.useState([]);
    const [processSeq, setProcessSeq] = React.useState(null);
    const dataUrl = useRouter().query
    const { data } = useSession();

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
        if (props.disabled) {
            setDisabled(props.disabled)
        }
    }, [props.disabled])

    React.useEffect(() => {
        handleReset()
    }, [props?.printplateTypeSeq])

    const _checkIsValid = () => {
        let errorArray = []
        // console.log(errorArray,props?.printplateTypeSeq);
        if (cadastralNo1 == "") {
            errorArray.push("cadastralNo")
        }
        if (sheetcode == "") {
            errorArray.push("sheetcode")
        }
        if (boxNo == "") {
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
        let isValid = _checkIsValid();
        let newStart = cadastralNo1 ? Number(cadastralNo1) : Number(cadastralNo2)
        let newEnd = cadastralNo2 ? Number(cadastralNo2) : Number(cadastralNo1)
        if (!isValid) {
            setOpenAlert(true);
            // SnackbarSet("ไม่สามารถค้นหาได้ กรุณากรอกข้อมูลให้ครบถ้วน", "error")
            return;
        }
        let obj = {
            "LANDOFFICE_SEQ": props?.landOfficeSeq,
            "SHEETCODE": Number(sheetcode),
            "BOX_NO": Number(boxNo),
            "CADASTRAL_NO": cadastralNo1 == "" && cadastralNo2 == "" ? null : newStart,
            "CADASTRAL_NO_": cadastralNo1 == "" && cadastralNo2 == "" ? null : newEnd,
        }
        props.onSearch(obj);
    }
    const handleReset = () => {
        props?.onReset([])
        setBoxNo("")
        setSheetcode("")
        setCadastralNo1("");
        setCadastralNo2("");
    }

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
                                        {disabled.includes("sheetcode") ? null : (
                                            <Grid item xs={12} md={3} px={1} py={1}>
                                                <Typography >หมายเลขรหัสแทนระวาง(เลขแฟ้ม)</Typography>
                                                <TextField error={isErrorField.includes("sheetcode")} fullWidth size={'small'} value={sheetcode} onChange={(e) => setSheetcode(e.target.value)} type="number" />
                                            </Grid>
                                        )}
                                        {disabled.includes("boxNo") ? null : (
                                            <Grid item xs={12} md={2} px={1} py={1}>
                                                <Typography >เลขที่กล่อง</Typography>
                                                <TextField error={isErrorField.includes("boxNo")} fullWidth size={'small'} value={boxNo} onChange={(e) => setBoxNo(e.target.value)} type="number" />
                                            </Grid>
                                        )}
                                        {disabled.includes("cadastralNo") ? null : (
                                            <Grid item xs={12} md={4}>
                                                <Stack direction={'row'}>
                                                    <Grid item xs={5} md={5} py={1}>
                                                        <Typography >เลขที่ต้นร่าง</Typography>
                                                        <TextField error={isErrorField.includes("cadastralNo")} label={""} type={"number"} fullWidth size={'small'} value={cadastralNo1} onChange={(e) => setCadastralNo1(e.target.value)} />
                                                    </Grid>
                                                    <Grid item px={1} py={1}>
                                                        <Typography > &nbsp;</Typography>
                                                        <Typography > ถึง</Typography>
                                                    </Grid>
                                                    <Grid item xs={5} md={5} px={1} py={1}>
                                                        <Typography> &nbsp;</Typography>
                                                        <TextField label={""} type={"number"} fullWidth size={'small'} value={cadastralNo2} onChange={(e) => setCadastralNo2(e.target.value)} />
                                                    </Grid>
                                                </Stack>
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