
import React from "react";

import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Button, Grid, IconButton, Paper, Stack, Tooltip, Typography } from "@mui/material";
import MyLocation from "./function/mylocation";
import PropTypes from 'prop-types'
import { Feature } from "ol";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import { Point, MultiPoint } from "ol/geom";
import { WKT } from "ol/format";
import { OSM } from "ol/source";
import olMapScreenshot from "./../../../lib/MapExporter";
import { register_24047 } from "../../../lib/registerproj4";
import { defaults } from "ol/interaction";
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import * as FullScreenMap from './../../../lib/fullsceenMap'
import LocationOffIcon from '@mui/icons-material/LocationOff';

export var doScreenshot
export var zoomtolocation
export var zoomtoFeature
export var zoomtoPoint
export var zoomtoPointForScreenshot
export var zoomtoPointBillboardArrayForScreenshot
export var zoomtoPointArray
export var zoomtoWkt
export var zoomtoWktHightlight
export var zoomtoWktArray
export var zoomtoWktArrayHightlight
export var zoomtoPointBillboard
export var zoomtoPointBillboardArray
export var mapExport
export var refreshMap
export default function Map47(props) {
    const [checkFullScreen, setCheckFullScreen] = React.useState(false)
    const [map, setMap] = React.useState(undefined)
    const [rightBar, setRightBar] = React.useState(null)
    const [topMiddleBar, setTopMiddleBar] = React.useState(null)
    const [topLeftBar, setTopLeftBar] = React.useState(null)
    const [rightBarHeader, setRightBarHeader] = React.useState(null)
    const [mousePoint, setMountPoint] = React.useState([0, 0])
    const [mylocation, setMylocation] = React.useState(props.mylocation == undefined ? true : props.mylocation)
    const [center, setCenter] = React.useState(props.center == undefined ? [100.523186, 13.736717] : props.center)
    const [mapWidth, setMapWidth] = React.useState(300)
    const mapElement = React.useRef()
    const mapRef = React.useRef()
    mapRef.current = map
    React.useEffect(() => {
        // console.log(props.PolygonList, "PolygonList")
        let map = mapRef.current
        // console.log(mapRef.current)
        if (map !== undefined) {
            map.updateSize()
            zoomtolocation = _zoomtolocation
            mapExport = map
        }
        // console.log(props.children)
        // console.log(props,'check_loop')
    }, [props])
    // console.log(props,"props");
    React.useEffect(() => {
        if (map !== undefined) {
            map.on("pointermove", (e) => {
                setMountPoint(e.coordinate)
            })
            map.on("click", (e) => {
                if (props.curPosition !== undefined) {
                    props.curPosition(e.coordinate)
                }
            })

            doScreenshot = _doScreenshot
            zoomtolocation = _zoomtolocation
            zoomtoFeature = _zoomtoFeature
            zoomtoPoint = _zoomtoPoint
            zoomtoPointForScreenshot = _zoomtoPointForScreenshot
            zoomtoPointBillboardArrayForScreenshot = _zoomtoPointBillboardArrayForScreenshot
            zoomtoPointArray = _zoomtoPointArray
            zoomtoWkt = _zoomtoWkt
            zoomtoWktHightlight = _zoomtoWktHightlight
            zoomtoWktArray = _zoomtoWktArray
            zoomtoWktArrayHightlight = _zoomtoWktArrayHightlight
            zoomtoPointBillboard = _zoomtoPointBillboard
            zoomtoPointBillboardArray = _zoomtoPointBillboardArray
            refreshMap = _refreshMap
        }
    }, [map])
    const raster = new TileLayer({
        source: new OSM(),
        properties: { "LAYER_TYPE": "BASEMAP" }
    });

    const childrenWithProps = React.Children.map(props.children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            if (child.props.position == undefined || child.props.position == "bottomRight") {
                return React.cloneElement(child, {
                    map: map,
                    setRightBar: setRightBar,
                    setRightBarHeader: setRightBarHeader,
                    setTopMiddleBar: setTopMiddleBar,
                    setTopLeftBar: setTopLeftBar,
                    onDrawClick: props.onDrawClick
                });
            }
        }
        return null;
    });
    const childrenWithPropsLeft = React.Children.map(props.children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.

        if (React.isValidElement(child)) {
            if (child.props.position == "left") {
                return React.cloneElement(child, {
                    map: map,
                    setRightBar: setRightBar,
                    setRightBarHeader: setRightBarHeader,
                    setTopMiddleBar: setTopMiddleBar,
                    setTopLeftBar: setTopLeftBar,
                    onDrawClick: props.onDrawClick
                });
            }
        }
        return null;
    });

    const childrenWithPropsRight = React.Children.map(props.children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            if (child.props.position == "right") {
                return React.cloneElement(child, {
                    map: map,
                    setRightBar: setRightBar,
                    setRightBarHeader: setRightBarHeader,
                    setTopMiddleBar: setTopMiddleBar,
                    setTopLeftBar: setTopLeftBar,
                    onDrawClick: props.onDrawClick
                });
            }
        }
        return null;
    });
    const childrenWithPropsBottom = React.Children.map(props.children, child => {
        // Checking isValidElement is the safe way and avoids a typescript
        // error too.
        if (React.isValidElement(child)) {
            if (child.props.position == "bottom") {
                return React.cloneElement(child, {
                    map: map,
                    setRightBar: setRightBar,
                    setRightBarHeader: setRightBarHeader,
                    setTopMiddleBar: setTopMiddleBar,
                    setTopLeftBar: setTopLeftBar,
                    onDrawClick: props.onDrawClick
                });
            }
        }
        return null;
    });
    React.useEffect(() => {
        async function fetch() {
            const initialMap = new Map({
                target: mapElement.current,
                // controls: [mousePositionControl],
                interactions: defaults({ doubleClickZoom: false }),
                layers: [
                    raster
                ],
                view: new View({
                    projection: 'EPSG:4326',
                    center: center,
                    zoom: 17.5,
                }),
                controls: []
            })
            window.addEventListener("resize", handleResize, false);
            setMapWidth(mapElement.current.offsetWidth)
            if (map == undefined) {
                await setMap(initialMap)
                register_24047()
                try {
                    initialMap.addLayer(vector);
                } catch {
                    null
                }
            }
        }
        fetch(0);
    }, [])

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
            label: "iconLayer",
            LAYER_TYPE: "Icon"
        },

    });

    const getBlockLayerHightlight = (parcelVectorSource) => {
        let styleZoomzBlock = new Style({
            fill: new Fill({
                color: 'rgba(255,255,255,0.00)'
            }), stroke: new Stroke({
                color: 'rgb(247,0,247)',
                width: 3.5
            })
        });
        console.log(parcelVectorSource);
        var layer = new VectorLayer({
            source: parcelVectorSource,
            zIndex: 999,
            properties: {
                LAYER_TYPE: "ZOOM"
            },
            declutter: true
        });
        layer.setStyle(styleZoomzBlock);
        return layer
    };
    const _zoomtoFeature = (feat) => {
        var ext = feat.getGeometry().getExtent();
        map.getView().fit(ext, map.getSize());
    }
    const _zoomtoWkt = (wkt) => {
        register_24047()
        let f = new WKT().readFeature(wkt, { dataProjection: "EPSG:24047", featureProjection: "EPSG:4326" })
        var ext = f.getGeometry().getExtent();
        map.getView().fit(ext, { duration: 500 });
    }
    const _zoomtoWktHightlight = (wkt) => {
        register_24047()
        let features = new WKT().readFeature(wkt, { dataProjection: "EPSG:24047", featureProjection: "EPSG:4326" })
        map.getLayers().forEach(function (layer) {
            if (layer) {
                try {
                    if (
                        layer.get("LAYER_TYPE") != undefined &&
                        layer.get("LAYER_TYPE") === "ZOOM"
                    ) {
                        map.removeLayer(layer);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
        let zoomSource = new VectorSource({
            features: [features],
        });
        let zoomtestLayer = getBlockLayerHightlight(zoomSource)
        console.log(zoomSource.getFeatures(), "_zoomtoWktHightlight");
        // ext[0] = ext[0] - 0.000025
        // ext[1] = ext[1] - 0.000025
        // ext[2] = ext[2] + 0.000025
        // ext[3] = ext[3] + 0.000025
        map.removeLayer(zoomtestLayer)
        map.addLayer(zoomtestLayer)
        var ext = features.getGeometry().getExtent();
        map.getView().fit(ext, { duration: 500 });
    }
    const _zoomtoWktArray = (wkt_array) => {
        register_24047();
        let newArray = [];
        for (let i in wkt_array) {
            let f = new WKT().readFeature(wkt_array[i], { dataProjection: "EPSG:24047", featureProjection: "EPSG:4326" });
            newArray.push(f);
        }
        map.getLayers().forEach(function (layer) {
            if (layer) {
                try {
                    if (
                        layer.get("label") != undefined &&
                        layer.get("label") === "_zoomtoWktArray"
                    ) {
                        map.removeLayer(layer);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
        var vector = new VectorLayer({
            source: new VectorSource({
                features: newArray
            }),
            properties: {
                label: "_zoomtoWktArray"
            },
            //,projection: 'EPSG:3857'
        });
        var ext = vector.getSource().getExtent();
        map.getView().fit(ext, { duration: 500 });
    }
    const _zoomtoWktArrayHightlight = (wkt_array) => {
        register_24047();
        let newArray = [];
        for (let i in wkt_array) {
            let f = new WKT().readFeature(wkt_array[i], { dataProjection: "EPSG:24047", featureProjection: "EPSG:4326" });
            newArray.push(f);
        }
        map.getLayers().forEach(function (layer) {
            if (layer) {
                try {
                    if (
                        layer.get("LAYER_TYPE") != undefined &&
                        layer.get("LAYER_TYPE") === "ZOOM"
                    ) {
                        map.removeLayer(layer);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
        let zoomSource = new VectorSource({
            features: newArray,
        });
        let zoomtestLayer = getBlockLayerHightlight(zoomSource)
        console.log(zoomSource.getFeatures(), "_zoomtoWktArrayHightlight");
        // ext[0] = ext[0] - 0.000025
        // ext[1] = ext[1] - 0.000025
        // ext[2] = ext[2] + 0.000025
        // ext[3] = ext[3] + 0.000025
        map.removeLayer(zoomtestLayer)
        map.addLayer(zoomtestLayer)
        var ext = zoomtestLayer.getSource().getExtent();
        map.getView().fit(ext, { duration: 500 });
    }
    const _zoomtoPointArray = (pointArray) => {
        console.log(pointArray, "_zoomtoPointArray");
        let lonlat = [];
        for (let i in pointArray) {
            let f = new WKT().readFeature(pointArray[i], { dataProjection: "EPSG:4326", featureProjection: "EPSG:4326" })
            let lonlat = f.values_.geometry.flatCoordinates;
            var lon = lonlat[1];
            var lat = lonlat[0];
            lonlat.push([lon, lat])
        }
        map.getLayers().forEach(function (layer) {
            if (layer) {
                try {
                    if (
                        layer.get("label") != undefined &&
                        layer.get("label") === "iconLayer"
                    ) {
                        map.removeLayer(layer);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
        positionFeature.setGeometry(new MultiPoint(lonlat));
        console.log(positionFeature, "_zoomtoPoint");
        try {
            map.addLayer(vector);
            console.log(vector.getSource().getFeatures(), "_zoomtoPoint");
        } catch (err) {
            console.log(err);
            null
        }
        // var ext = vector.getSource().getExtent();
        // map.getView().fit(ext, { duration: 500 });
        // view.animate({
        //     center: lonlat,
        //     duration: 1000,
        //     zoom: 20,
        // });
    };
    const _zoomtoPoint = (point, setZoom = 17.777) => {
        try {
            let f = new WKT().readFeature(point, { dataProjection: "EPSG:4326", featureProjection: "EPSG:4326" })
            let lonlat = f.values_.geometry.flatCoordinates;
            var lon = lonlat[1];
            var lat = lonlat[0];
            let view = map.getView();
            map.getLayers().forEach(function (layer) {
                if (layer) {
                    try {
                        if (
                            layer.get("label") != undefined &&
                            layer.get("label") === "iconLayer"
                        ) {
                            map.removeLayer(layer);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
            positionFeature.setGeometry(new Point([lon, lat]));
            console.log(positionFeature, "_zoomtoPoint");
            try {
                map.addLayer(vector);
                console.log(vector.getSource().getFeatures(), "_zoomtoPoint");
            } catch (err) {
                console.log(err);
                null
            }
            view.animate({
                center: [lon, lat],
                duration: 1000,
                zoom: setZoom,
            });
        } catch (e) {
            console.log(e)
        }
    }
    const _zoomtoPointForScreenshot = (point, showmarker = true) => {
        console.log(point, "_zoomtoPointForScreenshot");
        if (!point) { return }
        map.getLayers().forEach(function (layer) {
            try {
                if (
                    layer.get("label") != undefined &&
                    layer.get("label") === "iconLayer"
                ) {
                    map.removeLayer(layer);
                }
            } catch (error) {
                console.log(error);
            }

        });
        register_24047();
        let f = new WKT().readFeature(point, { dataProjection: "EPSG:24047", featureProjection: "EPSG:4326" })
        let lonlat = f.values_.geometry.flatCoordinates;
        var lon = lonlat[0];
        var lat = lonlat[1];
        let view = map.getView();
        positionFeature.setGeometry(new Point([lon, lat]));
        try {
            map.addLayer(vector);
        } catch (err) {
            console.log(err);
            null
        }
        view.animate({
            center: [lon, lat],
            duration: 0,
            zoom: 17.777,
        });
        return true;
    }
    const _zoomtoPointBillboard = (point, showmarker = true) => {
        map.getLayers().forEach(function (layer) {
            try {
                if (
                    layer.get("label") != undefined &&
                    layer.get("label") === "iconLayer"
                ) {
                    map.removeLayer(layer);
                }
            } catch (error) {
                console.log(error);
            }

        });
        register_24047();
        let f = new WKT().readFeature(point, { dataProjection: "EPSG:24047", featureProjection: "EPSG:4326" })
        let lonlat = f.values_.geometry.flatCoordinates;
        var lon = lonlat[0];
        var lat = lonlat[1];
        let view = map.getView();
        positionFeature.setGeometry(new Point([lon, lat]));
        try {
            map.addLayer(vector);
        } catch (err) {
            console.log(err);
            null
        }
        view.animate({
            center: [lon, lat],
            duration: 1000,
            zoom: 23,
        });
    }
    const _zoomtoPointBillboardArrayForScreenshot = (pointArray) => {
        // console.log(pointArray, "_zoomtoPointBillboardArray");
        map.getLayers().forEach(function (layer) {
            if (layer) {
                try {
                    if (
                        layer.get("label") != undefined &&
                        layer.get("label") === "iconLayerBlue"
                    ) {
                        map.removeLayer(layer);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
        let lonlatX = [];
        for (let i in pointArray) {
            let f = new WKT().readFeature(pointArray[i], { dataProjection: "EPSG:24047", featureProjection: "EPSG:4326" })
            // let lonlat = f.values_.geometry.flatCoordinates;
            // var lon = lonlat[1];
            // var lat = lonlat[0];
            // console.log(f.getGeometry(), "_zoomtoPointBillboardArray");
            lonlatX.push(f);
        }
        // console.log(lonlatX, "_zoomtoPointBillboardArray");
        let styleZoom = function (f) {
            let style = new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    scale: 0.075,
                    rotateWithView: true,
                    src: "/marker.png",
                }),
            })
            return style
        }
        let vectorZoom = new VectorLayer({
            source: new VectorSource({
                features: lonlatX,
            }),
            zIndex: 101,
            properties: {
                label: "iconLayerBlue",
                LAYER_TYPE: "Icon"
            },

        });
        vectorZoom.setStyle(styleZoom);
        try {
            map.removeLayer(vectorZoom)
            map.addLayer(vectorZoom)
            // console.log(vectorZoom.getSource().getExtent(), "_zoomtoPointBillboardArray");
            var ext = vectorZoom.getSource().getExtent();
            ext[0] = ext[0] - 0.000065
            ext[1] = ext[1] - 0.000065
            ext[2] = ext[2] + 0.000065
            ext[3] = ext[3] + 0.000065
            map.getView().fit(ext, { duration: 0 });
        } catch (err) {
            console.log(err);
            null
        }
        return true;
    };
    const _zoomtoPointBillboardArray = (pointArray) => {
        // console.log(pointArray, "_zoomtoPointBillboardArray");
        map.getLayers().forEach(function (layer) {
            if (layer) {
                try {
                    if (
                        layer.get("label") != undefined &&
                        layer.get("label") === "iconLayerBlue"
                    ) {
                        map.removeLayer(layer);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        });
        let lonlatX = [];
        for (let i in pointArray) {
            let f = new WKT().readFeature(pointArray[i], { dataProjection: "EPSG:24047", featureProjection: "EPSG:4326" })
            // let lonlat = f.values_.geometry.flatCoordinates;
            // var lon = lonlat[1];
            // var lat = lonlat[0];
            // console.log(f.getGeometry(), "_zoomtoPointBillboardArray");
            lonlatX.push(f);
        }
        // console.log(lonlatX, "_zoomtoPointBillboardArray");
        let styleZoom = function (f) {
            let style = new Style({
                image: new Icon({
                    anchor: [0.5, 1],
                    scale: 0.075,
                    rotateWithView: true,
                    src: "/marker.png",
                }),
            })
            return style
        }
        let vectorZoom = new VectorLayer({
            source: new VectorSource({
                features: lonlatX,
            }),
            zIndex: 101,
            properties: {
                label: "iconLayerBlue",
                LAYER_TYPE: "Icon"
            },

        });
        vectorZoom.setStyle(styleZoom);
        try {
            map.removeLayer(vectorZoom)
            map.addLayer(vectorZoom)
            // console.log(vectorZoom.getSource().getExtent(), "_zoomtoPointBillboardArray");
            var ext = vectorZoom.getSource().getExtent();
            ext[0] = ext[0] - 0.000065
            ext[1] = ext[1] - 0.000065
            ext[2] = ext[2] + 0.000065
            ext[3] = ext[3] + 0.000065
            map.getView().fit(ext, { duration: 1000 });
        } catch (err) {
            console.log(err);
            null
        }
    };
    const _zoomtolocation = (lon, lat, showmarker = true) => {
        let view = map.getView();
        if (showmarker) {
            map.getLayers().forEach(function (layer) {
                try {
                    if (
                        layer.get("label") != undefined &&
                        layer.get("label") === "iconLayer"
                    ) {
                        map.removeLayer(layer);
                    }
                } catch (error) {
                    console.log(error);
                }

            });
        }
        positionFeature.setGeometry(new Point([lon, lat]));
        try {
            map.addLayer(vector);
        } catch (err) {
            console.log(err);
            null
        }
        view.animate({
            center: [lon, lat],
            duration: 1000,
            zoom: 18,
        });

    }
    const _refreshMap = () => {
        let layerList = map.getLayers()
        layerList.forEach((el) => {
            el.getSource().refresh()
        })
    }
    const handleResize = () => {
        try {
            setMapWidth(mapElement.current.offsetWidth)
        } catch {
            null;
        }
    }

    // const mousePositionControl = new MousePosition({
    //     coordinateFormat: createStringXY(4),
    //     projection: 'EPSG:4326',
    //     // comment the following two lines to have the mouse position
    //     // be placed within the map.
    // });

    const _doScreenshot = async (size = null) => {
        let setSize = [190, 160];
        if (size) {
            setSize = size;
        }
        console.log(setSize, "setSize");
        const mapScreenshotParam = {
            dim: setSize, //Desired image size in mm [width, height].
            //showDisplayScale: true, // Map scale bar is displayed. Default is true
            //scaleBarLength: 140, // Map scale bar length. Default is 140 px
            format: "jpg", // Export format of the image. Default is 'jpeg'
            //resolution: 150 // Screen resolution. Default is 150 dpi
        };
        try {
            return await olMapScreenshot.getScreenshot(map, mapScreenshotParam);
        } catch (ex) {
            console.log(ex);
        }
    };

    const _onFullSceen = () => {
        setCheckFullScreen(prevCheck => !prevCheck);
        var elem = document.getElementById("bodyMap");
        console.log(elem, "_onFullSceen");
        if (checkFullScreen == false) {
            FullScreenMap.openFullscreen(elem)
        }
        if (checkFullScreen == true) {
            FullScreenMap.exitFullScreen()
        }
    }

    const _clearPoint = async () => {
        try {
            map.getLayers().forEach(function (layer) {
                if (layer) {
                    try {
                        if (
                            layer.get("label") != undefined &&
                            layer.get("label") === "iconLayer"
                        ) {
                            map.removeLayer(layer);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            });
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div id="bodyMap">
            <Paper>
                <div ref={mapElement} style={{ height: 'calc(' + String(checkFullScreen == false ? props.height : 118) + 'vh - 150px)', width: "100%", display: "flex", position: "relative" }} >
                    <div style={{ top: 0, left: 0, position: "absolute", zIndex: 10, width: "100%" }}>
                        <Grid container sx={{ background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)" }}>
                            <Grid item xs={12} px={1} sx={{ paddingTop: 1 }}>
                                <Grid container alignitem={"center"} spacing={1}>
                                    <Grid item>
                                        {/* <Image src={""} width={35} height={35} /> */}
                                    </Grid>
                                    <Grid item>
                                        <Grid container>
                                            <Grid item>
                                                <Typography color={"white"} sx={{ textShadow: '2px 3px 5px rgba(0,0,0,0.5)' }} fontSize={18}>
                                                    {
                                                        props.mapName ? props.mapName : "แผนที่ประกอบคำขอเช่า/ใช้พื้นที่"
                                                    }

                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>
                    </div>
                    {checkFullScreen == false && (
                        <div style={{ top: 5, right: 0, position: "absolute", zIndex: 10 }}>
                            <Tooltip title={"fullscreen"}>
                                <Button
                                    onClick={_onFullSceen}
                                >
                                    <FullscreenIcon fontSize="large" style={{ color: '#2d46fe' }} />
                                </Button>
                            </Tooltip>
                        </div>
                    )}
                    {checkFullScreen == true && (
                        <div style={{ top: 5, right: 0, position: "absolute", zIndex: 10 }}>
                            <Tooltip title={"fullscreen"}>
                                <Button
                                    onClick={_onFullSceen}
                                >
                                    <FullscreenExitIcon fontSize="large" style={{ color: '#2d46fe' }} />
                                </Button>
                            </Tooltip>
                        </div>
                    )}
                    <div style={{ top: 8, right: 190, position: "absolute", zIndex: 10 }}>
                        <Tooltip title={"ล้างค่าตำแหน่ง"}>
                            <Button
                                onClick={_clearPoint}
                                startIcon={<LocationOffIcon sx={{ color: "#fff", textShadow: '2px 3px 5px rgba(0,0,0,0.5)' }} />}
                            >
                                <Typography color={"white"} sx={{ textShadow: '2px 3px 5px rgba(0,0,0,0.5)' }}> ล้างค่าตำแหน่ง</Typography>
                            </Button>
                        </Tooltip>
                    </div>
                    {mylocation && <MyLocation map={map} />}
                    <div style={{ top: 110, right: '50%', transform: 'translateX(50%)', position: "absolute", zIndex: 3 }}>
                        {
                            topMiddleBar !== null && (
                                topMiddleBar
                            )
                        }
                    </div>
                    <div style={{ top: 110, left: '10px', position: "absolute", zIndex: 3 }}>
                        {childrenWithPropsLeft}
                        {/* {
                        props.editTool && <EdittorTool {...props} map={map} />
                    } */}
                        {
                            topLeftBar !== null && (
                                topLeftBar
                            )
                        }
                    </div>
                    <div style={{ top: 110, right: '10px', position: "absolute", zIndex: 3 }}>
                        {childrenWithPropsRight}
                    </div>
                    <div style={{ bottom: 10, left: '10px', right: '10px', position: "absolute", zIndex: 3 }}>
                        {childrenWithPropsBottom}
                    </div>
                    <div style={{ bottom: 0, right: 0, position: "absolute", zIndex: 3 }}>
                        {
                            rightBar !== null && (
                                <Grid container sx={{ height: 'calc(' + String(checkFullScreen == false ? props.height : 118) + 'vh - 260px)', width: '350px', background: "linear-gradient(-90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 100%)" }}>
                                    <Grid container>
                                        {rightBarHeader !== null && rightBarHeader}
                                    </Grid>
                                    <Grid container sx={{ overflow: "auto", height: 'calc(' + String(checkFullScreen == false ? props.height : 118) + 'vh - 310px)' }}>
                                        {rightBar}
                                    </Grid>
                                </Grid>
                            )
                        }
                    </div>
                    <div style={{ bottom: 15, right: 15, position: "absolute", zIndex: 2 }}>
                        <Stack spacing={1}>
                            {childrenWithProps}
                        </Stack>
                    </div>

                </div>
            </Paper >
        </div>

    )
}



Map47.propsType = {
    mylocation: PropTypes.bool,
    curPosition: PropTypes.func
}


