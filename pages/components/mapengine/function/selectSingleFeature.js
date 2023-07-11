import { Grid, IconButton, Paper, Typography } from "@mui/material"
import React from "react"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { SnackbarSet } from "../../snackbar";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Icon, Style } from "ol/style";
import { Point } from "ol/geom";
import { zoomtolocation } from "../map47";

export default function SelectSingleFeature(props) {
    const [isAdd, setIsAdd] = React.useState(false)
    const [curLatLong, setCurLatLong] = React.useState(null)
    const [feature, setFeature] = React.useState(null)
    React.useEffect(() => {
        if (props.map) {
            if (!isAdd) {
                renderDialog()
                addClickEvt()

                setIsAdd(true)
            }
        }
    }, [props.map])
    const renderDialog = (feature = null, curLatLong = null) => {
        props.setTopMiddleBar(<PopUpPicker feature={feature} curLatLong={curLatLong} />)
    }
    let positionFeature = new Feature();
    positionFeature.setStyle(
        new Style({
            image: new Icon({
                anchor: [0.5, 1],
                scale: 0.075,
                rotateWithView: true,
                src: "/marker.png",
            }),
        })
    );

    let vector = new VectorLayer({
        source: new VectorSource({
            features: [positionFeature],
        }),
        zIndex: 100,
        properties: {
            label: "iconLayerSS",
            LAYER_TYPE: "Icon"
        },

    });


    const addClickEvt = () => {
        if (props.map) {
            console.log("addClickEvt")
            props.map.on('click', getFeatureFromPixel)
            props.map.addLayer(vector)
            if (props.coordinate && props.feature) {
                positionFeature.setGeometry(new Point(props.coordinate));
                renderDialog(props.feature, props.coordinate)
                setTimeout(() => {
                    zoomtolocation(props.coordinate[0], props.coordinate[1])
                }, 500)
            }
        }
    }

    const getFeatureFromPixel = (evt) => {
        console.log(evt)
        let pixel = evt.pixel

        console.log(pixel)
        let layerList = props.map.getLayers()
        console.log(layerList);
        let vectorLayer
        layerList.forEach(el => {
            // console.log(el.get("LAYER_NAME"))
            try {
                if (el.get("LAYER_NAME") == props.layername) {
                    vectorLayer = el
                }
                if (
                    el.get("label") != undefined &&
                    el.get("label") === "iconLayer"
                ) {
                    props.map.removeLayer(el);
                }
            } catch (error) {
                console.log(error);
            }
        })
        if(vectorLayer == undefined){
            layerList.forEach(el => {
                // console.log(el.get("LAYER_NAME"))
                try {
                    if (el.get("LAYER_NAME") == props.layername) {
                        vectorLayer = el
                    }
                    if (
                        el.get("label") != undefined &&
                        el.get("label") === "iconLayer"
                    ) {
                        props.map.removeLayer(el);
                    }
                } catch (error) {
                    console.log(error);
                }
            })
            vectorLayer.getFeatures(pixel).then(async function (features) {
                if (features.length > 0) {
                    console.log(features[0])
                    console.log(props.map.getCoordinateFromPixel(pixel))
                    positionFeature.setGeometry(new Point(props.map.getCoordinateFromPixel(pixel)));
                    await setFeature(null)
                    await setFeature(features[0])
                    await setCurLatLong(props.map.getCoordinateFromPixel(pixel))
                    renderDialog(features[0], props.map.getCoordinateFromPixel(pixel))
                    if (props.onSelect) {
                        props.onSelect(features[0], props.map.getCoordinateFromPixel(pixel))
                    }
                } else {
                    SnackbarSet("กรุณาเลือกตำแหน่งในขอบเขตสายทาง", "error")
                }
            })
        }else{
            vectorLayer.getFeatures(pixel).then(async function (features) {
                if (features.length > 0) {
                    console.log(features[0])
                    console.log(props.map.getCoordinateFromPixel(pixel))
                    positionFeature.setGeometry(new Point(props.map.getCoordinateFromPixel(pixel)));
                    await setFeature(null)
                    await setFeature(features[0])
                    await setCurLatLong(props.map.getCoordinateFromPixel(pixel))
                    renderDialog(features[0], props.map.getCoordinateFromPixel(pixel))
                    if (props.onSelect) {
                        props.onSelect(features[0], props.map.getCoordinateFromPixel(pixel))
                    }
                } else {
                    SnackbarSet("กรุณาเลือกตำแหน่งในขอบเขตสายทาง", "error")
                }
            })
        }
    }

    return (
        <div></div>
    )

}



function PopUpPicker(props) {
    React.useEffect(() => {
        console.log(props)
    }, [props])
    return (
        <Paper>
            <Grid container py={1} px={1}>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            {
                                props.feature == null ?
                                    <Grid container>

                                        <React.Fragment>
                                            <Typography>กรุณา </Typography>
                                            <Typography fontWeight={600} color={"firebrick"} px={1}>คลิกบริเวณขอบเขตสายทาง</Typography>
                                            <Typography> เพื่อปักหมุดตำแหน่ง</Typography>
                                            <Grid item>
                                                <LocationOnIcon color="error" />
                                            </Grid>
                                        </React.Fragment>


                                    </Grid>
                                    :
                                    <React.Fragment>
                                        <Grid container>
                                            <Typography>สายทาง </Typography>
                                            <Typography fontWeight={600} fontSize={18} color={"firebrick"} px={1}>{props.feature.values_.EXPRESSWAY_TH ? props.feature.values_.EXPRESSWAY_TH : props.feature.values_.EXPRESSW_1}</Typography>
                                        </Grid>
                                        <Grid container justifyContent={"center"} alignItems={"center"}>
                                            <Grid item>
                                                <IconButton size="small" onClick={() => (zoomtolocation(props.curLatLong[0], props.curLatLong[1]))}>
                                                    <LocationOnIcon color="error" />
                                                </IconButton>
                                            </Grid>
                                            <Grid item>
                                                <Typography fontWeight={400} color={"firebrick"} px={1}>{props.curLatLong[1] + "," + props.curLatLong[0]}</Typography>
                                            </Grid>
                                        </Grid>
                                    </React.Fragment>

                            }
                        </Grid>


                    </Grid>

                </Grid>
            </Grid>

        </Paper >
    )
}
