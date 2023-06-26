import React from "react";
import {
    Grid,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button,
    Paper,
    Divider,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Alert,
    Snackbar
} from "@mui/material";
import { useSession } from 'next-auth/react';
//SERVICE
import { getLandOfficeByPK, getLandOffice } from "@/service/mas/landOffice";
import { insCadastralOwner } from "@/service/sva";
import { getTitleByPK } from "@/service/mas/title";
//COMPONENTS
import AutoTitle from "@/pages/components/Autocompleate/title";
export default function DilogTab03InsIndex(props) {
    console.log(props, "propsDilogTab03InsIndex");
    const { data } = useSession();
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [cadastralSeq, setCadastralSeq] = React.useState([]);

    const [ownerOrder, setOwnerOrder] = React.useState("");
    const [ownerTitle, setOwnerTitle] = React.useState(null);
    const [ownerFName, setOwnerFName] = React.useState("");
    const [ownerLName, setOwnerLName] = React.useState("");
    const [ownerNote, setOwnerNote] = React.useState("");
    const [valueRadio, setValueRadio] = React.useState(1);

    const handleChangeRadio = (event) => {
        setValueRadio(event.target.value);
    };

    React.useEffect(() => {
        if (props?.masterData) {
            getMasterData(props.masterData)
        }
    }, [props?.masterData])

    React.useEffect(() => {
        if (props?.cadastralSeq) {
            setCadastralSeq(props.cadastralSeq)
        }
    }, [props?.cadastralSeq])

    const getMasterData = async (data) => {
        // data = data.rows
        console.log(data, "getMasterData");
        // _createNewData(data.CADASTRAL_SEQ)
        for (let i in data) {
            if (data[i] != undefined) {
                let getLandOfficeData = await getLandOffice();
                let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ == data[i]?.LANDOFFICE_SEQ);
                setSheetcode(data[i].SHEETCODE);
                setBoxNo(data[i].BOX_NO.toString().padStart(2, "0"));
                setNumofsurveyQty(data[i]?.NUMOFSURVEY_QTY > 0 ? data[i]?.NUMOFSURVEY_QTY : data[i]?.NUMOFSURVEY_QTY === 0 ? "-" : "-");
                setCadastralNo(data[i].CADASTRAL_NO);
                console.log(landOfficeFiltered, "getLandOfficeData");
                setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
            }
        }
    }

    const _changeOwnerTitle = (event, value) => {
        setOwnerTitle(value);
    };

    const _onSubmit = async () => {
        let obj = {
            "CADASTRAL_SEQ": cadastralSeq ? cadastralSeq : 0,
            "OWNER_TYPE": valueRadio,
            "OWNER_ORDER": ownerOrder ? ownerOrder : null,
            "OWNER_TITLE_SEQ": ownerTitle?.TITLE_SEQ ? ownerTitle?.TITLE_SEQ : null,
            "OWNER_TITLE": ownerTitle?.TITLE_NAME_TH ? ownerTitle?.TITLE_NAME_TH : null,
            "OWNER_FNAME": ownerFName ? ownerFName : null,
            "OWNER_LNAME": ownerLName ? ownerLName : null,
            "CADASTRAL_OWNER_NOTE": ownerNote ? ownerNote : null,
            "RECORD_STATUS": "N",
            "CREATE_USER": data?.user?.USER_LIST_PID,
            "PROCESS_SEQ_": props?.processSeq ?? 101,
            "STATUS_SEQ_": 101,
        }
        console.log(obj, "obj_onSubmit_DialogTab03");
        try {
            // return
            let resInsert = await insCadastralOwner(obj);
            console.log(resInsert, "onSave");
            if (typeof resInsert == "object") {
                await setMessage("บันทึกสำเร็จ");
                await setOpen(true);
                await setType("success");
                // props.close();
            }
        } catch (error) {
            await setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
            await setOpen(true);
            await setType("error");
            console.log(error, "onSave");
            // props.close();
        }
    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Grid>
            <Dialog
                open={props.open}
                // open={'true'}
                maxWidth={"lg"}
                fullWidth
                fullScreen
            >
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                    <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Typography variant="subtitle">เพิ่มข้อมูลผู้ขอรังวัดต้นร่าง</Typography>
                </DialogTitle>
                <DialogContent>
                    {/* master_Data */}
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
                        <Grid item xs={3} md={4}>
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
                                    {/* <IconButton size='small' disabled={numofsurveyQty == "-" || checkCanEdit} onClick={() => { setOpenEdit(props?.tabData) }}><Edit /></IconButton> */}
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
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={1.5} py={2}>
                            <Typography fontSize={16}>สถานะแปลงคง :</Typography>
                        </Grid>
                        <Grid item xs={12} md={10} py={2}>
                            <RadioGroup
                                // defaultValue={valueRadio}
                                value={valueRadio}
                                onChange={handleChangeRadio}
                                row
                            >
                                <FormControlLabel value="1" control={<Radio />} label="บุคคลธรรมดา" />
                                <FormControlLabel value="2" control={<Radio />} label="นิติบุคคล" />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={1} py={2}>
                            <Typography fontSize={16}>ลำดับผู้ถือกรรมสิทธิ์ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={3} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ลำดับผู้ถือกรรมสิทธิ์"
                                value={ownerOrder}
                                onChange={(e) => {
                                    setOwnerOrder(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={1} py={2}>
                            <Typography fontSize={16}>คำนำหน้าชื่อ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={3} py={2}>
                            <AutoTitle
                                onChange={_changeOwnerTitle}
                                value={ownerTitle}
                            />
                        </Grid>
                        <Grid item xs={12} md={1} py={2} px={1}>
                            <Typography fontSize={16}>ชื่อผู้ขอรังวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={3} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ชื่อผู้ขอรังวัด"
                                value={ownerFName}
                                onChange={(e) => {
                                    setOwnerFName(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={1} py={2} px={1}>
                            <Typography fontSize={16}>นามสกุลผู้ขอรังวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={3} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="นามสกุลผู้ขอรังวัด"
                                value={ownerLName}
                                onChange={(e) => {
                                    setOwnerLName(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={1} py={2}>
                            <Typography fontSize={16}>หมายเหตุ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={11} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเหตุ"
                                value={ownerNote}
                                onChange={(e) => {
                                    setOwnerNote(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'flex-end'}>
                        <Grid item px={2}>
                            <Button variant="contained" onClick={_onSubmit} color="success">
                                บันทึก
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={props.close} color={"error"} variant={"contained"}>
                                ปิด
                            </Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}