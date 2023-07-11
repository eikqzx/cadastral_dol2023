import React from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { Button, Grid, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Feature } from "ol";
import { Style, Fill, Stroke, Icon } from "ol/style";
import { Point } from "ol/geom";

const MyLocation = React.forwardRef(function MyLocation(props, ref) {
  const [position, setPosition] = React.useState(null);
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
    zIndex: 1,
    properties: {
      label: "iconLayer",
      LAYER_TYPE: "Icon"
    },

  });

  const getLocation = () => {
    // console.log("navigator.geolocation",navigator.geolocation);
    if (navigator.geolocation) {
      console.log("if");
      navigator.geolocation.getCurrentPosition(updatePosition, errorHandler);
    } else {
      console.log("else");

      return false;
    }
  };

  const errorHandler = (err) => {
    if (err.code == 1) {
      alert("Error: Access is denied!");
    } else if (err.code == 2) {
      alert("Error: Position is unavailable!");
    }
  }

  const updatePosition = (position) => {
    console.log("position", position);
    if (position !== undefined) {
      setPosition(position.coords.longitude, position.coords.latitude);
      zoomtolocation(position.coords.longitude, position.coords.latitude);
    }
  };

  const zoomtolocation = (lon, lat) => {
    console.log(lon, lat, props.map);
    let map = props.map;
    let view = map.getView();
    map.getLayers().forEach(function (layer) {
      try {
        console.log("tesfkso", layer.get("label"));
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
    positionFeature.setGeometry(new Point([lon, lat]));
    map.addLayer(vector);
    view.animate({
      center: [lon, lat],
      duration: 1000,
      zoom: 18,
    });
  };
  return (
    <div style={{ top: 10, right: 50, position: "absolute", zIndex: 10 }}>
      <Tooltip title={"ตำแหน่งของฉัน"}>
        <Button onClick={getLocation} size={"small"} startIcon={<MyLocationIcon sx={{ color: "#fff", textShadow: '2px 3px 5px rgba(0,0,0,0.5)' }} />}>
          <Typography color={"white"} sx={{ textShadow: '2px 3px 5px rgba(0,0,0,0.5)' }}> ตำแหน่งของฉัน</Typography>
        </Button>
      </Tooltip>
    </div>
  );
});

export default MyLocation;
