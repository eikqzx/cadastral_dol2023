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
import { getProvinceByPK } from "@/service/mas/province";
import { getAmphurByPK } from "@/service/mas/amphur";
import { getTambolByPK } from "@/service/mas/tambol";
//COMPONENTS
import AutoAmphur from "@/pages/components/Autocompleate/amphur";
import AutoTambol from "@/pages/components/Autocompleate/tambol";
export default function DilogTab02Index(props) {
    console.log(props, "propsDilogTab02Index");
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");

    const [orderNo, setOrderNo] = React.useState()
    const [parcelSurveyNo, setParcelSurveyNo] = React.useState()
    const [tambolData, setTambolData] = React.useState(null)
    const [amphurData, setAmphurData] = React.useState(null)
    const [provinceData, setProvinceData] = React.useState();
    const [zoneData, setZoneData] = React.useState()
    const [sheetTypeData, setSheetTypeData] = React.useState()
    const [UTMMAP1Data, setUTMMAP1Data] = React.useState()
    const [UTMMAP2Data, setUTMMAP2Data] = React.useState()
    const [UTMMAP3Data, setUTMMAP3Data] = React.useState()
    const [UTMMAP4Data, setUTMMAP4Data] = React.useState()
    const [originmap1Data, setOriginmap1Data] = React.useState()
    const [originmap2Data, setOriginmap2Data] = React.useState()
    const [originmap3Data, setOriginmap3Data] = React.useState()
    const [airphotomapName, setAirphotomapName] = React.useState()
    const [airphotomap1Data, setAirphotomap1Data] = React.useState()
    const [airphotomap2Data, setAirphotomap2Data] = React.useState()
    const [airphotomap3Data, setAirphotomap3Data] = React.useState()
    const [parcelNo, setParcelNo] = React.useState()
    const [UTMScaleNo, setUTMSCALENO] = React.useState();
    const [RaiData, setRaiData] = React.useState()
    const [NganData, setNganData] = React.useState()
    const [WaData, setWaData] = React.useState()
    const [SubWaData, setSubWaData] = React.useState()
    const [noteData, setNoteData] = React.useState()

    const [valueRadio, setValueRadio] = React.useState();

    const handleChangeRadio = (event) => {
        setValueRadio(event.target.value);
    };
    console.log(valueRadio, "valueRadio");


    React.useEffect(() => {
        getMasterData(props.masterData)

    }, [])


    React.useEffect(() => {
        setOrderNo()
        setZoneData(props?.cadastralLandData[0]?.ZONE_LAND)
        setSheetTypeData()
        setUTMMAP1Data(props?.cadastralLandData[0]?.CADASTRAL_LAND_UTMMAP1)
        setUTMMAP2Data(props?.cadastralLandData[0]?.CADASTRAL_LAND_UTMMAP2)
        setUTMMAP3Data(props?.cadastralLandData[0]?.CADASTRAL_LAND_UTMMAP3)
        setUTMMAP4Data(props?.cadastralLandData[0]?.CADASTRAL_LAND_UTMMAP4)
        setOriginmap1Data(props?.cadastralLandData[0]?.CADASTRAL_LAND_ORIGINMAP1)
        setOriginmap2Data(props?.cadastralLandData[0]?.CADASTRAL_LAND_ORIGINMAP2)
        setOriginmap3Data(props?.cadastralLandData[0]?.CADASTRAL_LAND_ORIGINMAP3)
        setAirphotomapName(props?.cadastralLandData[0]?.AIRPHOTOMAP_NAME)
        setAirphotomap1Data(props?.cadastralLandData[0]?.AIRPHOTOMAP1)
        setAirphotomap2Data(props?.cadastralLandData[0]?.AIRPHOTOMAP2)
        setAirphotomap3Data(props?.cadastralLandData[0]?.AIRPHOTOMAP3)
        setUTMSCALENO(props?.cadastralLandData[0]?.CADASTRAL_LAND_UTMSCALE)
        setRaiData(props?.cadastralLandData[0]?.CADASTRAL_LAND_RAI_NUM)
        setNganData(props?.cadastralLandData[0]?.CADASTRAL_LAND_NGAN_NUM)
        setWaData(props?.cadastralLandData[0]?.CADASTRAL_LAND_WA_NUM)
        setSubWaData(props?.cadastralLandData[0]?.CADASTRAL_LAND_SUBWA_NUM)
        setNoteData(props?.cadastralLandData[0]?.CADASTRAL_NOTE)
    }, [props?.cadastralLandData])

    const getMasterData = async (data) => {
        // data = data.rows
        console.log(data, "getMasterData");
        // _createNewData(data.CADASTRAL_SEQ)
        for (let i in data) {
            if (data[i] != undefined) {
                let getLandOfficeData = await getLandOffice();
                let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ == data[i]?.LANDOFFICE_SEQ);
                if (data[i].CADASTRAL_PROVINCE_SEQ == null) {
                    let getProvinceData = await getProvinceByPK(landOfficeFiltered[0]?.PROVINCE_SEQ);
                    console.log(getProvinceData, "getProvinceData");
                    setProvinceData(getProvinceData.rows[0])
                } else {
                    let getProvinceData = await getProvinceByPK(data[i].CADASTRAL_PROVINCE_SEQ);
                    console.log(getProvinceData, "getProvinceData");
                    setProvinceData(getProvinceData.rows[0])
                }
                if (data[i].CADASTRAL_AMPHUR_SEQ == null) {
                    let getAmphurData = await getAmphurByPK(landOfficeFiltered[0]?.AMPHUR_SEQ);
                    console.log(getAmphurData, "getAmphurData");
                    setAmphurData(getAmphurData.rows[0])
                } else {
                    let getAmphurData = await getAmphurByPK(data[i].CADASTRAL_AMPHUR_SEQ);
                    console.log(getAmphurData, "getAmphurData");
                    setAmphurData(getAmphurData.rows[0])
                }
                if (data[i].CADASTRAL_TAMBOL_SEQ == null) {
                    setTambolData(null)
                }
                else {
                    let getTambolData = await getTambolByPK(data[i].CADASTRAL_TAMBOL_SEQ);
                    console.log(getTambolData, "getTambolData");
                    setTambolData(getTambolData.rows[0])
                }
                setSheetcode(data[i].SHEETCODE);
                setBoxNo(data[i].BOX_NO.toString().padStart(2, "0"));
                setNumofsurveyQty(data[i]?.NUMOFSURVEY_QTY ?? "-");
                setCadastralNo(data[i].CADASTRAL_NO);
                console.log(landOfficeFiltered, "getLandOfficeData");
                setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
            }
        }
    }

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

    const _changeAmphur = (event, value) => {
        setTambolData(null);
        setAmphurData(value);
    };

    const _changeTambol = (event, value) => {
        setTambolData(value);
    };
    return (
        <Grid>
            <Dialog
                open={props.open}
                // open="true"
                maxWidth={"lg"}
                fullWidth
                fullScreen
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Typography variant="subtitle">แก้ไขข้อมูลแปลงต้นร่าง</Typography>
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
                    {/* ประเภทการรังวัด */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>ลำดับแปลง :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ลำดับแปลง"
                                value={orderNo}
                                onChange={(e) => {
                                    setOrderNo(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>โซน :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="โซน"
                                value={zoneData}
                                onChange={(e) => {
                                    setZoneData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>ประเภทระวาง :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ประเภทระวาง"
                                value={sheetTypeData}
                                onChange={(e) => {
                                    setSheetTypeData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>หมายเลขระวางแผนที่ 1:50000 (UTM) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขระวางแผนที่ 1:50000 (UTM)"
                                value={UTMMAP1Data}
                                onChange={(e) => {
                                    setUTMMAP1Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หมายเลขแผ่นของระวางแผนที่ 1:50000 (UTM) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขแผ่นของระวางแผนที่ 1:50000 (UTM)"
                                value={UTMMAP2Data}
                                onChange={(e) => {
                                    setUTMMAP2Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หมายเลขระวางแผนที่ 1:4000 (UTM) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขระวางแผนที่ 1:4000 (UTM)"
                                value={UTMMAP3Data}
                                onChange={(e) => {
                                    setUTMMAP3Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>หมายเลขแผ่นของระวางตามมาตราส่วน (UTM) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขแผ่นของระวางตามมาตราส่วน (UTM)"
                                value={UTMMAP4Data}
                                onChange={(e) => {
                                    setUTMMAP4Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หมายเลขระวางศูนย์กำเนิด 1 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขระวางศูนย์กำเนิด 1"
                                value={originmap1Data}
                                onChange={(e) => {
                                    setOriginmap1Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หมายเลขระวางศูนย์กำเนิด 2 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขระวางศูนย์กำเนิด 2"
                                value={originmap2Data}
                                onChange={(e) => {
                                    setOriginmap2Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>หมายเลขแผ่นของระวางตามมาตราส่วน (ศูนย์กำเนิด) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขแผ่นของระวางตามมาตราส่วน (ศูนย์กำเนิด)"
                                value={originmap3Data}
                                onChange={(e) => {
                                    setOriginmap3Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>เลขที่ดิน :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เลขที่ดิน"
                                value={parcelNo}
                                onChange={(e) => {
                                    setParcelNo(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    {/* ชื่อระวางภาพถ่ายทางอากาศ */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>ชื่อระวางภาพถ่ายทางอากาศ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ชื่อระวางภาพถ่ายทางอากาศ"
                                value={airphotomapName}
                                onChange={(e) => {
                                    setAirphotomapName(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หมายเลขระวางแผนที่ 1:50000 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขระวางแผนที่ 1:50000"
                                value={airphotomap1Data}
                                onChange={(e) => {
                                    setAirphotomap1Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หมายเลขแผ่นของระวางแผนที่ 1:50000 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขแผ่นของระวางแผนที่ 1:50000"
                                value={airphotomap2Data}
                                onChange={(e) => {
                                    setAirphotomap2Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หมายเลขแผ่นของระวางตามมาตราส่วน :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเลขแผ่นของระวางตามมาตราส่วน"
                                value={airphotomap3Data}
                                onChange={(e) => {
                                    setAirphotomap3Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    {/* เนื้อที่ */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>ลำดับที่มาตราส่วน :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ลำดับที่มาตราส่วน"
                                value={UTMScaleNo}
                                onChange={(e) => {
                                    setUTMSCALENO(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>เนื้อที่ (ไร่) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เนื้อที่ (ไร่)"
                                value={RaiData}
                                onChange={(e) => {
                                    setRaiData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>เนื้อที่ (งาน) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เนื้อที่ (งาน)"
                                value={NganData}
                                onChange={(e) => {
                                    setNganData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>เนื้อที่ (วา) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เนื้อที่ (วา)"
                                value={WaData}
                                onChange={(e) => {
                                    setWaData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                                type="number"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>เนื้อที่ (เศษวา) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เนื้อที่ (เศษวา)"
                                value={SubWaData}
                                onChange={(e) => {
                                    setSubWaData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                                type="number"
                            />
                        </Grid>
                    </Grid>
                    {/* จังหวัด */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>อำเภอ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <AutoAmphur
                                province={provinceData?.PROVINCE_SEQ}
                                onChange={_changeAmphur}
                                value={amphurData}
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>ตำบล :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <AutoTambol
                                amphur={amphurData?.AMPHUR_SEQ}
                                onChange={_changeTambol}
                                value={tambolData} />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หน้าสำรวจ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หน้าสำรวจ"
                                value={parcelSurveyNo}
                                onChange={(e) => {
                                    setParcelSurveyNo(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>สถานะแปลงคง :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <RadioGroup
                                // defaultValue="female"
                                value={valueRadio}
                                onChange={handleChangeRadio}
                            >
                                <FormControlLabel value="0" control={<Radio />} label="แปลงแยก" />
                                <FormControlLabel value="1" control={<Radio />} label="แปลงคง" />
                                <FormControlLabel value="2" control={<Radio />} label="แปลงรวม" />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>หมายเหตุ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="หมายเหตุ"
                                value={noteData}
                                onChange={(e) => {
                                    setNoteData(e.target.value);
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