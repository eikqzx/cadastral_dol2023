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

export default function SearchJob2(props) {
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

    React.useEffect(() => {
        if (isNotEmpty(dataUrl)) {
            let seq = decode(dataUrl?.PROCESS_SEQ);
            console.log(seq, "seq");
            setProcessSeq(seq);
        }
    }, [])

    // console.log(condoYears, "condoProjectYear");

    console.log(props.printplateTypeSeq, "printplateTypeSeq");

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
        if (props?.printplateTypeSeq != 10 && props?.printplateTypeSeq != 20) {
            console.log(props?.printplateTypeSeq, "if");
            if (amphur == null) {
                errorArray.push("amphur")
            }
            // if (tambol == null) {
            //     errorArray.push("tambol")
            // }
        } else {
            console.log("else");
        }

        if (moo == null) {
            errorArray.push("moo")
        }
        if (parcelNO == null) {
            errorArray.push("parcelNO")
        }
        if (landNo == null) {
            errorArray.push("landNo")
        }
        if (condoYears == null) {
            errorArray.push("condoYears")
        }
        if (condoID == null) {
            errorArray.push("condoID")
        }
        if (condoRoomNO == null) {
            errorArray.push("condoRoomNO")
        }
        // if (startPage == null || startPage == "") {
        //     errorArray.push("startPage")
        // }
        // if (endPage == null || endPage == "") {
        //     errorArray.push("endPage")
        // }
        // if (fileNo == null || fileNo == "") {
        //     errorArray.push("fileNo")
        // }
        if (!disabled.includes("licensePage")) {
            if (startLicenseDoc == null || startLicenseDoc == "") {
                errorArray.push("startLicenseDoc")
            }
            if (endLicenseDoc == null || endLicenseDoc == "") {
                errorArray.push("endLicenseDoc")
            }
        }
        // console.log(errorArray,props?.printplateTypeSeq);
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
        if (props?.printplateTypeSeq == 1) {
            let obj = {
                PRINTPLATE_TYPE_SEQ: printPlateType != null ? Number(printPlateType) : Number(props?.printplateTypeSeq) ?? null,
                LANDOFFICE_SEQ: props?.landOfficeSeq,
                PROVINCE_SEQ: props?.provinceSeq ?? null,
                AMPHUR_SEQ: amphur ? amphur.AMPHUR_SEQ : null,
                PARCEL_FOLDER: fileNo ? Number(fileNo) : null,
                PARCEL_NO: startPage == "" && endPage == "" ? null : newStartPage,
                PARCEL_NO_: startPage == "" && endPage == "" ? null : newEndPage,
            }
            console.log("job2_handleSearch_if_1", obj)
            props.onSearch(obj);
        } else if (props?.printplateTypeSeq == 2 || props?.printplateTypeSeq == 3) {
            let obj = {
                PRINTPLATE_TYPE_SEQ: printPlateType != null ? Number(printPlateType) : Number(props?.printplateTypeSeq) ?? null,
                LANDOFFICE_SEQ: props?.landOfficeSeq,
                PROVINCE_SEQ: props?.provinceSeq ?? null,
                AMPHUR_SEQ: amphur ? amphur.AMPHUR_SEQ : null,
                PARCEL_LAND_FOLDER: fileNo ? Number(fileNo) : null,
                PARCEL_LAND_NO: startPage == "" && endPage == "" ? null : newStartPage,
                PARCEL_LAND_NO_: startPage == "" && endPage == "" ? null : newEndPage,
            }
            console.log("job2_handleSearch_else_if_2_3", obj)
            props.onSearch(obj);
        } else if (props?.printplateTypeSeq == 4) {
            // console.log(moo, "moohandleSearch_else_if_4_5");
            let obj = {
                PRINTPLATE_TYPE_SEQ: printPlateType != null ? Number(printPlateType) : Number(props?.printplateTypeSeq) ?? null,
                LANDOFFICE_SEQ: props?.landOfficeSeq,
                PROVINCE_SEQ: props?.provinceSeq ?? null,
                AMPHUR_SEQ: amphur ? amphur.AMPHUR_SEQ : null,
                TAMBOL_SEQ: tambol ? tambol.TAMBOL_SEQ : null,
                PARCEL_LAND_FOLDER: fileNo ? Number(fileNo) : null,
                PARCEL_LAND_NO: startPage == "" && endPage == "" ? null : newStartPage,
                PARCEL_LAND_NO_: startPage == "" && endPage == "" ? null : newEndPage,
            }
            console.log("job2_handleSearch_else_if_4", obj)
            props.onSearch(obj);
        } else if (props?.printplateTypeSeq == 5) {
            let obj = {
                PRINTPLATE_TYPE_SEQ: printPlateType != null ? Number(printPlateType) : Number(props?.printplateTypeSeq) ?? null,
                LANDOFFICE_SEQ: props?.landOfficeSeq,
                PROVINCE_SEQ: props?.provinceSeq ?? null,
                AMPHUR_SEQ: amphur ? amphur.AMPHUR_SEQ : null,
                TAMBOL_SEQ: tambol ? tambol.TAMBOL_SEQ : null,
                PARCEL_LAND_MOO: moo ? moo : null,
                PARCEL_LAND_FOLDER: fileNo ? Number(fileNo) : null,
                PARCEL_LAND_NO: startPage == "" && endPage == "" ? null : newStartPage,
                PARCEL_LAND_NO_: startPage == "" && endPage == "" ? null : newEndPage,
            }
            console.log("job2_handleSearch_else_if_5", obj)
            props.onSearch(obj);
        }
        else {
            let obj = {
                PRINTPLATE_TYPE_SEQ: printPlateType != null ? Number(printPlateType) : Number(props?.printplateTypeSeq) ?? null,
                LANDOFFICE_SEQ: props?.landOfficeSeq,
                PROVINCE_SEQ: props?.provinceSeq ?? null,
                CONDO_REG_YEAR: condoYears != "" ? Number(condoYears) : null,
                CONDO_SEQ: condoProject?.CONDO_SEQ ?? null,
                CONDO_ID: condoProject?.CONDO_DATA_OBJ?.CONDO_ID ?? null,
                CONDOROOM_RNO: condoRoomNO ? condoRoomNO : null,
                // BLD_SEQ: null,
                PARCEL_FOLDER: fileNo ? Number(fileNo) : null,
                CONDOROOM_RNO_: condoRoomStart ? Number(condoRoomStart) : null,
                CONDOROOM_SNO: condoRoomFirst == "" && condoRoomFirst == "" ? null : Number(condoRoomFirst),
                CONDOROOM_ENO: condoRoomLast == "" && condoRoomLast == "" ? null : Number(condoRoomLast),
            }
            console.log("job2_handleSearch_else", obj)
            props.onSearch(obj);
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
                    <Grid item xs={12} px={2}>
                        {
                            props.printplateTypeSeq != 10 && props.printplateTypeSeq != 20 ?
                                (
                                    <Grid container>
                                        {
                                            disabled.includes("amphur") ? null : (
                                                <Grid item xs={12} md={3} px={1} py={1}>
                                                    <Typography >อำเภอ</Typography>
                                                    <AutoAmphur
                                                        error={isErrorField.includes("amphur")}
                                                        disabled={props?.provinceSeq == undefined}
                                                        province={props?.provinceSeq}
                                                        onChange={_changeAmphur}
                                                        value={amphur}
                                                    />
                                                </Grid>
                                            )
                                        }
                                        {
                                            (props.printplateTypeSeq == 4 || props.printplateTypeSeq == 5) &&
                                            (
                                                disabled.includes("tambol") ? null : (
                                                    <Grid item xs={12} md={3} px={1} py={1}>
                                                        <Typography>ตำบล</Typography>
                                                        <AutoTambol error={isErrorField.includes("tambol")} amphur={amphur?.AMPHUR_SEQ} onChange={_changeTambol} value={tambol} />
                                                    </Grid>
                                                ))

                                        }
                                        {
                                            props.printplateTypeSeq == 5 &&
                                            (disabled.includes("moo") ? null : (
                                                <Grid item xs={12} md={1} px={1} py={1}>
                                                    <Typography >หมู่ที่</Typography>
                                                    <TextField fullWidth size={'small'} value={moo} onChange={(e) => setMoo(e.target.value)}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                        {disabled.includes("surveyPage") ? null : (
                                            <Grid item xs={12} md={4}>
                                                <Stack direction={'row'}>
                                                    <Grid item xs={5} md={5} py={1}>
                                                        <Typography >ช่วงหน้าเลขที่เอกสารสิทธิ์</Typography>
                                                        <TextField error={isErrorField.includes("startPage")} label={""} type={"number"} fullWidth size={'small'} value={startPage} onChange={(e) => setStartPage(e.target.value)} />
                                                    </Grid>
                                                    <Grid item px={1} py={1}>
                                                        <Typography > &nbsp;</Typography>
                                                        <Typography > ถึง</Typography>
                                                    </Grid>
                                                    <Grid item xs={5} md={5} px={1} py={1}>
                                                        <Typography> &nbsp;</Typography>
                                                        <TextField error={isErrorField.includes("endPage")} label={""} type={"number"} fullWidth size={'small'} value={endPage} onChange={(e) => setEndPage(e.target.value)} />
                                                    </Grid>
                                                </Stack>
                                            </Grid>
                                        )}
                                        {(disabled.includes("register") ? null : (
                                            <Grid item xs={12} md={2} py={1}>
                                                <Typography >รายการจดทะเบียน</Typography>
                                                <TextField fullWidth size={'small'} value={register} onChange={(e) => setRegister(e.target.value)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                )
                                :
                                (
                                    <Grid container>
                                        {(disabled.includes("condoYears") ? null : props.printplateTypeSeq == 20 &&
                                            (<Grid item xs={12} md={3} px={1} py={1}>
                                                <Typography >ปีโครงการ</Typography>
                                                <TextField fullWidth size={'small'} value={condoYears} onChange={(e) => setCondoYears(e.target.value)} />
                                            </Grid>)
                                        )}
                                        {(disabled.includes("condoProject") ? null : (
                                            <Grid item xs={12} md={3} px={1} py={1}>
                                                <Typography >โครงการ</Typography>
                                                {/* <TextField fullWidth size={'small'} value={condoYears} onChange={(e) => setCondoYears(e.target.value)} */}
                                                <AutoCondoProject landofficeSeq={data?.user?.LANDOFFICE_SEQ} error={isErrorField.includes("condoProject")} onChange={_changeCondoProject} value={condoProject} />
                                            </Grid>
                                        ))}

                                        {/* {(disabled.includes("condoID") ? null : (
                                            <Grid item xs={12} md={3} px={1} py={1}>
                                                <Typography >ตึก</Typography>
                                                <TextField fullWidth size={'small'} value={condoID} onChange={(e) => setCondoID(e.target.value)} />
                                                <DropdownCondoBuild condoSeq={condoYears} onChange={(e) => setCondoID(JSON.parse(e.target.value))} />
                                            </Grid>
                                        ))} */}
                                        {/* {(disabled.includes("moo") ? null : (
                                            <Grid item xs={12} md={3} px={1} py={1}>
                                                <Typography >ห้อง</Typography>
                                                <DropdownCondoRoom condoSeq={condoYears} condoBuildSeq={condoID} onChange={(e) => setCondoRoomNO(JSON.parse(e.target.value))} />
                                            </Grid>
                                        ))} */}
                                        {(disabled.includes("condoRoom") ? null : (
                                            <Grid item xs={12} md={3}>
                                                <Stack direction={'row'}>
                                                    <Grid item xs={5} px={1} py={1}>
                                                        <Typography >{"เลขที่ห้อง"}</Typography>
                                                        <TextField error={isErrorField.includes("condoRoomStart")} label={""} type={"number"} fullWidth size={'small'} value={condoRoomStart} onChange={(e) => setCondoRoomStart(e.target.value)} />
                                                    </Grid>
                                                    <Grid item px={1} py={1}>
                                                        <Typography > &nbsp;</Typography>
                                                        <Typography >/</Typography>
                                                    </Grid>
                                                    <Grid item xs={5} px={1} py={1}>
                                                        <Typography> &nbsp;</Typography>
                                                        <TextField error={isErrorField.includes("condoRoomLast")} label={""} type={"number"} fullWidth size={'small'} value={condoRoomFirst} onChange={(e) => setCondoRoomFirst(e.target.value)} />
                                                    </Grid>
                                                    <Grid item px={1} py={1}>
                                                        <Typography > &nbsp;</Typography>
                                                        <Typography >-</Typography>
                                                    </Grid>
                                                    <Grid item xs={5} px={1} py={1}>
                                                        <Typography> &nbsp;</Typography>
                                                        <TextField error={isErrorField.includes("condoRoomLast")} label={""} type={"number"} fullWidth size={'small'} value={condoRoomLast} onChange={(e) => setCondoRoomLast(e.target.value)} />
                                                    </Grid>
                                                </Stack>
                                            </Grid>
                                        ))}
                                        {(disabled.includes("register") ? null : (
                                            <Grid item xs={12} md={2} p={1}>
                                                <Typography >รายการจดทะเบียน</Typography>
                                                <TextField fullWidth size={'small'} value={register} onChange={(e) => setRegister(e.target.value)}
                                                />
                                            </Grid>
                                        ))}
                                    </Grid>
                                )
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