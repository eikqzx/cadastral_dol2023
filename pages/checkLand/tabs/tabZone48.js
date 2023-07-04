import React from "react"
import {
    Grid,
    Paper
} from "@mui/material"
//COMPONENTS
import CheckLandMap from "@/pages/checkLand/components/checkLandMap";
import CheckLandList from "@/pages/checkLand/components/checkLandList";
import CheckLandImage from "@/pages/checkLand/components/checkLandImage";
export default function TabZone48Index(props) {
    return (
        <Grid container columns={24}>
            <Grid item xs={12}>
                <Grid sx={{ height: "50vh" }} component={Paper} elevation={2}>
                    <CheckLandMap />
                </Grid>
                <Grid sx={{ height: "30vh" }} component={Paper} elevation={2}>
                    <CheckLandList />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid component={Paper} elevation={2}>
                    <CheckLandImage />
                </Grid>
            </Grid>
        </Grid>
    )
}
