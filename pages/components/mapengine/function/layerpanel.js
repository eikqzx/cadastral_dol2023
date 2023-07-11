import { Button, IconButton, Tooltip, Grid, Typography, List, ListItemText, ListItem, Drawer, Checkbox, Divider, Avatar, ListItemAvatar } from "@mui/material";
import React from "react";
import SatelliteIcon from "@mui/icons-material/Satellite";
import { WFS, GeoJSON } from "ol/format";
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";
import Popover from "@mui/material/Popover";
import CloseIcon from '@mui/icons-material/Close';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import Fill from "ol/style/Fill";
// import { SnackbarSet } from "../../snackbar";
import VectorSource from "ol/source/Vector";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import VectorLayer from "ol/layer/Vector";
import { filterRecordStatus } from "../../../../lib/datacontrol";
import axios from "axios";
import { AddLoading, RemoveLoading } from "../../loadingscreen";
import { Circle } from "ol/style";
import { getMap } from "@/service/mapengine";
import { getLayerByPK } from "@/service/mas/layer";

const basemaplist = []

const LayerPanel = React.forwardRef(function LayerPanelComponent(props, ref) {
    console.log(props, "props LayerPanel");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isadd, setIsAdd] = React.useState(false);
    const [isOpenPano, setIsOpenPano] = React.useState(false);
    const [layerSeq, setLayerSeq] = React.useState();
    const [layerListName, setLayerListName] = React.useState([]);
    console.log(layerSeq, "layerSeq");
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        props.setRightBar(<LayerPanelContent {...props} layerListName={layerListName} />)
        props.setRightBarHeader(<LayerPanelHeader {...props} />)
    };

    React.useEffect(() => {
        setLayerSeq(props.layerSeq)
    }, [props.layerSeq])
    const _req_layer = async () => {
        let res = await getLayerByPK(layerSeq)
        console.log(res.rows, "_req_layer")
        res = res.rows
        if (Array.isArray(res)) {
            let data = filterRecordStatus(res)
            setLayerListName(data)
            for (var i in data) {
                let layer = _createLayer(data[i])
                // props.map.addLayer(layer)
                console.log(layer, "layer_createLayer");
                props.map.addLayer(layer)
                // }
            }
        } else {
            console.log("error");
        }
    }
    const _createLayer = (el) => {
        console.log(el, "el_createLayer")

        let vectorSource = new VectorSource({
            loader: function (extent) {
                getMap(process.env.hostMapServer + 'wfs' +
                    "?service=WFS&" +
                    "version=1.1.0&request=GetFeature&typename=" +
                    el.LAYER_NAME_EN + "&" +
                    "outputFormat=application/json&srsname=EPSG:4326" +
                    "&bbox=" +
                    extent.join(",") +
                    ",EPSG:4326"
                ).then((res) => {
                    console.log(res.data, "_createLayer res data");
                    // AddLoading()
                    var tmp_feature = new GeoJSON().readFeatures(res.data);
                    var length = tmp_feature.length;
                    var curFeatures = layer.getSource().getFeatures()
                    var curFeaturesArray = []
                    var toAdd = []
                    for (var i in curFeatures) {
                        // console.log(curFeatures[i].values_.OBJECTID, "curFeatures")
                        curFeaturesArray.push(curFeatures[i].values_.OBJECTID)
                    }
                    // console.log(curFeaturesArray)
                    for (var count = 0; count < length; count++) {
                        // console.log(tmp_feature[count].values_.OBJECTID, "temp")
                        var n = curFeaturesArray.includes(tmp_feature[count].values_.OBJECTID)
                        // console.log(n)
                        if (n == false) {
                            // console.log(tmp_feature[count])
                            // console.log(filter_);
                            toAdd.push(tmp_feature[count])
                        }
                    }
                    layer.getSource().addFeatures(toAdd);
                    // RemoveLoading()
                }).catch((err) => {
                    console.log(err)
                })
            },
            strategy: bboxStrategy,
        });
        console.log(vectorSource, "vectorSource");
        let style = new Style({
            fill: new Fill({
                color: "rgba(227,147,65,0.25)"
            }),
            stroke: new Stroke({
                color: el.LAYER_STROKE
            })
        })
        let layer = new VectorLayer({
            source: vectorSource,
            minZoom: props.minZoom !== undefined ? props.minZoom : 15,
            maxZoom: 25,
            zIndex: 1,
            visible: props.visibleList ? props.visibleList.includes(el.LAYER_NAME_EN) : true,
            properties: { label: el.LAYER_NAME_TH, LAYER_TYPE: "BASE_LAYER", LAYER_NAME: el.LAYER_NAME_EN },
        });
        layer.setStyle(style)
        return layer;
    }
    React.useEffect(() => {
        console.log(props.map, "props Basemap");
        if (props.map) {
            if (!isadd) {
                _req_layer()
                setIsAdd(true)
            }
        }
    }, [props.map])

    return (
        <React.Fragment>
            <Grid sx={{ color: '#fff', textShadow: "1px 1px 0 #333, -1px -1px 0 #333,  1px -1px 0 #333,-1px 1px 0 #333,1px 1px 0 #333;" }} >
                <Tooltip title="ชั้นข้อมูลต้นร่าง">
                    <Button onClick={handleClick} sx={{ color: "inherit", textShadow: "inherit" }}>
                        <Grid container>
                            <SatelliteIcon sx={{ color: "inherit", textShadow: "inherit" }} />
                            <Typography fontSize={14} color={"white"}>ชั้นข้อมูล</Typography>
                        </Grid>
                    </Button>
                </Tooltip>
            </Grid >
        </React.Fragment>
    );
});

function LayerPanelHeader(props) {
    const onClose = () => {
        props.setRightBar(null)
        props.setRightBarHeader(null)
    }
    return (
        <Grid container px={1} py={1} alignItems={"center"} sx={{ color: '#fff', textShadow: "1px 1px 0 #333, -1px -1px 0 #333,  1px -1px 0 #333,-1px 1px 0 #333,1px 1px 0 #333;" }}>
            <Grid item>
                <Typography>ชั้นข้อมูลต้นร่าง</Typography>
            </Grid>
            <Grid item xs>
                <Grid container justifyContent={"flex-end"}>
                    <Grid item>
                        <IconButton onClick={onClose} size="small" sx={{ color: "inherit", textShadow: "inherit" }} >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Grid>
                </Grid>

            </Grid>
        </Grid>
    )
}
function LayerPanelContent(props) {
    const [layerList, setLayerList] = React.useState([]);
    const getLayerName = (el) => {
        // console.log("getLayerName", el)
        return null
    }
    const _getLayerData = async () => {
        let layerList = props.map.getLayers()
        // console.log(layerList, "layerList")
        let layerListEl = []
        layerList.forEach((el) => {
            // console.log(el.get("LAYER_TYPE"))

            if (el.get("LAYER_TYPE") == "BASE_LAYER") {
                layerListEl.push(el)
            }

        })
        await setLayerList([])
        await setLayerList(layerListEl)
    }
    const handleClick = async (el) => {
        // console.log(el.get("LAYER_NAME"),"handleClick")
        console.log(el, "handleClick");
        AddLoading()
        await el.setVisible(!el.getVisible())
        let newLayerList = layerList
        await setLayerList([])
        await setLayerList(newLayerList)
        RemoveLoading()
    }
    const getColor = (el) => {
        try {
            return el.getStyle().getFill().getColor()
        } catch {
            return "#fff"
        }
    }

    React.useEffect(() => {
        _getLayerData()
    }, [props.data])
    React.useEffect(() => {
        console.log(layerList);
    }, [layerList])

    return (
        <Grid container >
            <Grid item xs={12} sx={{ color: '#fff', textShadow: "1px 1px 0 #333, -1px -1px 0 #333,  1px -1px 0 #333,-1px 1px 0 #333,1px 1px 0 #333;" }} >

                <Divider sx={{ background: "white", height: 2 }} />
                <Grid container>
                    <Grid item xs={12}>
                        <Grid container>
                            <Grid item xs={12}>
                                <List>
                                    {
                                        layerList.length > 0 &&
                                        (layerList.map((el, index) => (
                                            <ListItem button key={index} onClick={() => (handleClick(el))}>
                                                <ListItemAvatar >
                                                    <Avatar sx={{ width: 24, height: 24, backgroundColor: getColor(el) }}>
                                                        {
                                                            el.getVisible() ? <CheckCircleIcon sx={{ color: 'rgba(0,0,0,0.25)' }} /> : <CircleIcon sx={{ color: getColor(el) }} />
                                                        }

                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={el.get("label")} />
                                            </ListItem>
                                        )))
                                    }

                                </List>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >
    )
}

export default LayerPanel;