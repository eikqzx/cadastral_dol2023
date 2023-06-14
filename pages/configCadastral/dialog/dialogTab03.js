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
    Radio
} from "@mui/material";
//SERVICE
import { getLandOfficeByPK, getLandOffice } from "@/service/mas/landOffice";
//COMPONENTS
import AutoTitle from "@/pages/components/Autocompleate/title";
export default function DilogTab03Index(props) {
    console.log(props, "propsDilogTab03Index");
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");

    const [ownerType, setOwnerType] = React.useState();
    const [ownerOrder, setOwnerOrder] = React.useState();
    const [ownerTitle, setOwnerTitle] = React.useState();
    const [ownerFName, setOwnerFName] = React.useState();
    const [ownerLName, setOwnerLName] = React.useState();
    const [ownerNote, setOwnerNote] = React.useState();
    const [valueRadio, setValueRadio] = React.useState('1');

    const handleChangeRadio = (event) => {
        setValueRadio(event.target.value);
    };
    React.useEffect(() => {
        getMasterData(props.masterData)
    }, [])

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
                setNumofsurveyQty(data[i]?.NUMOFSURVEY_QTY ?? "-");
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
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            "PRIVATESURVEY_FLAG": PRIVATESURVEY_FLAG,
            
        }
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
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Typography variant="subtitle">แก้ไขข้อมูลผู้ขอรังวัดต้นร่าง</Typography>
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
                                defaultValue={valueRadio}
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
                        <Grid item xs={12} md={1} py={2} px={1}>
                            <Typography fontSize={16}>หมายเหตุ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={10} py={2}>
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
                        <Button onClick={props.close} color={"error"} variant={"contained"}>
                            ปิด
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}