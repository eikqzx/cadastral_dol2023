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
    Checkbox
} from "@mui/material";
//SERVICE
import { getLandOfficeByPK, getLandOffice } from "@/service/mas/landOffice";
export default function DilogTab01Index(props) {
    console.log(props, "propsDilogTab01Index");
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");

    const [checked, setChecked] = React.useState(false);
    const [typeofSurveyData, setTypeofSurveyData] = React.useState()
    const [typeofSurveyAdd1Data, setTypeofSurveyAdd1Data] = React.useState()
    const [typeofSurveyAdd2Data, setTypeofSurveyAdd2Data] = React.useState()
    const [typeofSurveyAdd3Data, setTypeofSurveyAdd3Data] = React.useState()
    const [tanbolData, setTambolData] = React.useState()
    const [amphurData, setAmphurData] = React.useState()
    const [provinceData, setProvinceData] = React.useState()
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
    const [scalemapData, setScalemapData] = React.useState()
    const [scaleRawangData, setScaleRawangData] = React.useState()
    const [benchmarkData, setBenchmarkData] = React.useState()
    const [benchmark2Data, setBenchmark2Data] = React.useState()
    const [surveyDate, setSurveyDate] = React.useState()
    const [titleData, setTitleData] = React.useState()
    const [fname, setFname] = React.useState()
    const [lname, setLname] = React.useState()
    const [surveyorPosition, setSurveyorPosition] = React.useState()
    const [surveyorLevelData, setSurveyorLevelData] = React.useState()
    const [oldRaiData, setOldRaiData] = React.useState()
    const [oldNganData, setOldNganData] = React.useState()
    const [oldWaData, setOldWaData] = React.useState()
    const [oldSubWaData, setOldSubWaData] = React.useState()
    const [ownerData, setOwnerData] = React.useState()
    const [noteData, setNoteData] = React.useState()

    console.log(checked, "checked");
    React.useEffect(() => {
        getMasterData(props.cadastralData)
    }, [])

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };
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
                maxWidth={"lg"}
                fullWidth
                fullScreen
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Typography variant="subtitle">แก้ไขข้อมูลต้นร่าง</Typography>
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
                    {/* CheckBox */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={handleCheckboxChange}
                                    value={checked ? 1 : 0}
                                />
                            }
                            label="เป็นงานรังวัดเอกชน" />
                    </Grid>
                    {/* ประเภทการรังวัด */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>ประเภทการรังวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ประเภทการรังวัด"
                                value={typeofSurveyData}
                                onChange={(e) => {
                                    setTypeofSurveyData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>ประเภทการรังวัดเพิ่มเติม 1 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ประเภทการรังวัดเพิ่มเติม 1"
                                value={typeofSurveyAdd1Data}
                                onChange={(e) => {
                                    setTypeofSurveyAdd1Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>ประเภทการรังวัดเพิ่มเติม 2 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ประเภทการรังวัดเพิ่มเติม 2"
                                value={typeofSurveyAdd2Data}
                                onChange={(e) => {
                                    setTypeofSurveyAdd2Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>ประเภทการรังวัดเพิ่มเติม 3 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ประเภทการรังวัดเพิ่มเติม 3"
                                value={typeofSurveyAdd3Data}
                                onChange={(e) => {
                                    setTypeofSurveyAdd3Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    {/* จังหวัด */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>จังหวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="จังหวัด"
                                value={provinceData}
                                onChange={(e) => {
                                    setProvinceData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>อำเภอ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="อำเภอ"
                                value={amphurData}
                                onChange={(e) => {
                                    setAmphurData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>ตำบล :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ตำบล"
                                value={tanbolData}
                                onChange={(e) => {
                                    setTambolData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    {/* โซน */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
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
                        <Grid item xs={12} md={2} py={2} px={1}>
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
                    </Grid>
                    {/* หมายเลขแผ่น */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
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
                                size="small"
                            />
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
                        <Grid item xs={12} md={2} py={2} px={1}>
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
                    </Grid>
                    {/* หมายเลขระวาง */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
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
                                size="small"
                            />
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
                        <Grid item xs={12} md={2} py={2} px={1}>
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
                    </Grid>
                    {/* หมายเลขแผ่นของระวางตามมาตราส่วน */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
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
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>รหัสมาตราส่วน (รูปแผนที่) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="รหัสมาตราส่วน (รูปแผนที่)"
                                value={scalemapData}
                                onChange={(e) => {
                                    setScalemapData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>รหัสมาตราส่วน (ระวาง) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="รหัสมาตราส่วน (ระวาง)"
                                value={scaleRawangData}
                                onChange={(e) => {
                                    setScaleRawangData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    {/* รหัสประเภทหมุดหลัก */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        {/* <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>รหัสประเภทหมุดหลักเขตที่ 1 :</Typography>
                        </Grid> */}
                        {/* <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="รหัสประเภทหมุดหลักเขตที่ 1"
                                value={benchmarkData}
                                onChange={(e) => {
                                    setBenchmarkData(e.target.value);
                                }}
                                style={{ width: "100%" }}
size="small"
                            />
                        </Grid> */}
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>จำนวนหลักเขตแบบที่ 1 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="จำนวนหลักเขตแบบที่ 1"
                                value={benchmarkData}
                                onChange={(e) => {
                                    setBenchmarkData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        {/* <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>รหัสประเภทหมุดหลักเขตที่ 2 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="รหัสประเภทหมุดหลักเขตที่ 2"
                                value={zoneData}
                                onChange={(e) => {
                                    setZoneData(e.target.value);
                                }}
                                style={{ width: "100%" }}
size="small" />
                        </Grid> */}
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>จำนวนหลักเขตแบบที่ 2 :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="จำนวนหลักเขตแบบที่ 2"
                                value={benchmark2Data}
                                onChange={(e) => {
                                    setBenchmark2Data(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    {/* วันที่รังวัด */}
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>วันที่รังวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="วันที่รังวัด"
                                value={surveyDate}
                                onChange={(e) => {
                                    setSurveyDate(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>คำนำหน้าชื่อช่างรังวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="คำนำหน้าชื่อช่างรังวัด"
                                value={titleData}
                                onChange={(e) => {
                                    setTitleData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>ชื่อช่างรังวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ชื่อช่างรังวัด"
                                value={fname}
                                onChange={(e) => {
                                    setFname(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} >
                            <Typography fontSize={16}>นามสกุลช่างรังวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="นามสกุลช่างรังวัด"
                                value={lname}
                                onChange={(e) => {
                                    setLname(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>ตำแหน่งช่างรังวัด :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ตำแหน่งช่างรังวัด"
                                value={surveyorPosition}
                                onChange={(e) => {
                                    setSurveyorPosition(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>ระดับ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="ระดับ"
                                value={surveyorLevelData}
                                onChange={(e) => {
                                    setSurveyorLevelData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>เนื้อที่เดิม (ไร่) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เนื้อที่เดิม (ไร่)"
                                value={oldRaiData}
                                onChange={(e) => {
                                    setOldRaiData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>เนื้อที่เดิม (งาน) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เนื้อที่เดิม (งาน)"
                                value={oldNganData}
                                onChange={(e) => {
                                    setOldNganData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} >
                            <Typography fontSize={16}>เนื้อที่เดิม (วา) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เนื้อที่เดิม (วา)"
                                value={oldWaData}
                                onChange={(e) => {
                                    setOldWaData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                        <Grid item xs={12} md={2} py={2} px={1}>
                            <Typography fontSize={16}>เนื้อที่เดิม (เศษวา) :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="เนื้อที่เดิม (เศษวา)"
                                value={oldSubWaData}
                                onChange={(e) => {
                                    setOldSubWaData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small" />
                        </Grid>
                    </Grid>
                    <Grid container justifyItems={'center'} alignItems={'center'}>
                        <Grid item xs={12} md={2} py={2}>
                            <Typography fontSize={16}>จำนวนผู้ถือกรรมสิทธิ์ :</Typography>
                        </Grid>
                        <Grid item xs={12} md={2} py={2}>
                            <TextField
                                maxWidth={"sm"}
                                maxLength={500}
                                placeholder="จำนวนผู้ถือกรรมสิทธิ์"
                                value={ownerData}
                                onChange={(e) => {
                                    setOwnerData(e.target.value);
                                }}
                                style={{ width: "100%" }}
                                size="small"
                            />
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