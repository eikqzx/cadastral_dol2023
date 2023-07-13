import React from "react";
import {
    Grid,
    Typography
} from "@mui/material";
import CheckImageListIndex from "./checkLandList";

export default function CheckLandImageIndex(props) {
    console.log(props, "props_CheckLandImageIndex");
    const [imageData, setImageData] = React.useState([])

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5">
                    ภาพเอกสารสิทธิ์
                </Typography>
            </Grid>
            <Grid item xs={12}>

            </Grid>
        </Grid>
    )
}