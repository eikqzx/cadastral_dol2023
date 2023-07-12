import React from "react"
import {
    Grid,
    Paper,
    Box,
    Typography,
    Divider
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

    React.useEffect(() => {
        if (Array.isArray(props?.searchData)) {
            if (props?.searchData?.length != 0) {
                getMasterData(props.searchData[0])
            }
        }
    }, [props.searchData]);

    const getMasterData = async (data) => {
        console.log(data, "getMasterData");
        if (data != undefined) {
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(
                (item) => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ
            );
            setSheetcode(data.SHEETCODE);
            setBoxNo(data.BOX_NO.toString().padStart(2, "0"));
            setNumofsurveyQty(data?.NUMOFSURVEY_QTY ?? "-");
            setCadastralNo(data.CADASTRAL_NO);
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
        }
    };
    return (
        <Grid container >
            <Grid item xs={12} p={1}>
                <Grid p={1} spacing={1} container sx={{ height: "15vh" }}>
                    <Grid item xs={3} md={5}>
                        <Grid container>
                            <Grid item>
                                <Typography>สำนักงาน: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{office}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item>
                                <Typography>หมายเลขรหัสแทนระวาง(เลขแฟ้ม):</Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{sheetcode}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item>
                                <Typography>เลขที่กล่อง:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{boxNo}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item>
                                <Typography>ครั้งที่รังวัด:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{numofsurveyQty}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={4}>
                        <Grid container>
                            <Grid item>
                                <Typography>เลขที่ต้นร่าง:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{cadastralNo}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container columns={24}>
                <Grid item xs={12}>
                    <Grid sx={{ height: "50vh" }} component={Paper} elevation={2}>
                        {/* <CheckLandMap layerSeq={layerSeq} /> */}
                        <Map47 mapName="แผนที่รูปแปลงที่ดิน โซน 47" height={67}>
                            <LayerPanel minZoom={10} layerSeq={layerSeq} />
                        </Map47>
                    </Grid>
                    <Grid sx={{ height: "37.5vh" }} component={Paper} elevation={2}>
                        <CheckLandList />
                    </Grid>
                </Grid>
                <Grid item xs={12} px={1}>
                    <Grid component={Paper} elevation={2}>
                        <CheckLandImage />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
