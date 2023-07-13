import React from "react"
import {
    Grid,
    Paper,
    Box,
    Typography,
    Divider,
    Card
} from "@mui/material"
//COMPONENTS
import CheckLandMap from "@/pages/checkLand/components/checkLandMap";
import CheckLandList from "@/pages/checkLand/components/checkLandList";
import CheckLandImage from "@/pages/checkLand/components/checkLandImage";
import Map47 from "@/pages/components/mapengine/map47";
import LayerPanel from "@/pages/components/mapengine/function/layerpanel";
//SERVICES
import { getLandOffice } from '@/service/mas/landOffice';

export default function TabZone47Index(props) {
    console.log(props, "props_TabZone47Index");
    const [layerSeq, setLayerSeq] = React.useState(101)
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const [imageData, setImageData] = React.useState([])
    // React.useEffect(() => {
    //     if (Array.isArray(props?.searchData)) {
    //         if (props?.searchData?.length != 0) {
    //             getMasterData(props.searchData[0])
    //         }
    //     }
    // }, [props.searchData]);

    React.useEffect(() => {
        if (props?.tabData) {
            getMasterData(props?.tabData)
        }
    }, [props.tabData]);

    const getMasterData = async (data) => {
        console.log(data, "getMasterData");
        if (data != undefined && data != null) {
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(
                (item) => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ
            );
            setSheetcode(data?.SHEETCODE);
            setBoxNo(data?.BOX_NO?.toString().padStart(2, "0"));
            setNumofsurveyQty(data?.NUMOFSURVEY_QTY ?? "-");
            setCadastralNo(data?.CADASTRAL_NO);
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
        }
    };
    return (
        <Grid container >
            <Grid item xs={12} p={1}>
                <Grid p={2} spacing={1} component={Paper} container>
                    <Grid item xs={3} md={5}>
                        <Grid container>
                            <Grid item>
                                <Typography>สำนักงาน: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{office == 0 || office == null ? "-" : office}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={4}>
                        <Grid container>
                            <Grid item>
                                <Typography>หมายเลขรหัสแทนระวาง(เลขแฟ้ม):</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{sheetcode == 0 || sheetcode == null ? "-" : sheetcode}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item >
                                <Typography>เลขที่กล่อง:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{boxNo == 0 || boxNo == null ? "-" : boxNo}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={4}>
                        <Grid container>
                            <Grid item >
                                <Typography>เลขที่ต้นร่าง:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{cadastralNo == 0 || cadastralNo == null ? "-" : cadastralNo}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item >
                                <Typography>ครั้งที่รังวัด:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{numofsurveyQty == 0 || numofsurveyQty == null ? "-" : numofsurveyQty}&nbsp;</Typography>
                                {/* <IconButton size='small' disabled={numofsurveyQty == "-" || checkCanEdit} onClick={() => { setOpenEdit(props?.tabData) }}><Edit /></IconButton> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container columns={24} component={Paper}>
                <Grid item xs={12} >
                    <Grid item px={1} py={2}>
                        <Card>
                            {/* <CheckLandMap layerSeq={layerSeq} /> */}
                            <Map47 mapName="แผนที่รูปแปลงที่ดิน โซน 47" height={67}>
                                <LayerPanel minZoom={10} layerSeq={layerSeq} />
                            </Map47>
                        </Card>
                    </Grid>
                    <Grid item px={1} py={3}>
                        <CheckLandList tabData={props?.tabData} setImageData={setImageData} />
                    </Grid>
                </Grid>
                <Grid item xs={12} px={1} py={2}>
                    <Grid component={Paper} elevation={2}>
                        <CheckLandImage imageData={imageData} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
