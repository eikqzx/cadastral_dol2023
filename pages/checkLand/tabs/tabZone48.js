import React from "react"
import {
    Grid,
    Paper
} from "@mui/material"
//COMPONENTS
import CheckLandMap from "@/pages/checkLand/components/checkLandMap";
import CheckLandList from "@/pages/checkLand/components/checkLandList";
import CheckLandImage from "@/pages/checkLand/components/checkLandImage";
import Map48 from "@/pages/components/mapengine/map48";
import LayerPanel from "@/pages/components/mapengine/function/layerpanel";
export default function TabZone48Index(props) {
    const [layerSeq, setLayerSeq] = React.useState(102)
    return (
        <Grid container columns={24}>
            <Grid item xs={12}>
                <Grid sx={{ height: "50vh" }} component={Paper} elevation={2}>
                    {/* <CheckLandMap layerSeq={layerSeq} /> */}
                    <Map48 mapName="แผนที่รูปแปลงที่ดิน โซน 48" height={67}>
                        <LayerPanel minZoom={10} layerSeq={layerSeq} />
                    </Map48>
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
    )
}
