import React from "react";
import { Button, Grid, IconButton, Paper, Tooltip } from "@mui/material";
import {
  Circle as CircleStyle,
  Fill,
  RegularShape,
  Stroke,
  Style,
  Text,
} from "ol/style";
import { Draw, Modify } from "ol/interaction";
import { LineString, Point } from "ol/geom";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
// import { getArea, getLength } from "ol/sphere";

import StraightenIcon from "@mui/icons-material/Straighten";

var draw;
var tipPoint;

export default function Measure(props) {

  const style = new Style({
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.5)",
      lineDash: [10, 10],
      width: 2,
    }),
    image: new CircleStyle({
      radius: 5,
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
    }),
  });

  const labelStyle = new Style({
    text: new Text({
      font: "14px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      padding: [3, 3, 3, 3],
      textBaseline: "bottom",
      offsetY: -15,
    }),
    image: new RegularShape({
      radius: 8,
      points: 3,
      angle: Math.PI,
      displacement: [0, 10],
      fill: new Fill({
        color: "rgba(0, 0, 0, 0.7)",
      }),
    }),
  });

  const tipStyle = new Style({
    text: new Text({
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
      padding: [2, 2, 2, 2],
      textAlign: "left",
      offsetX: 15,
    }),
  });

  const modifyStyle = new Style({
    image: new CircleStyle({
      radius: 5,
      stroke: new Stroke({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      fill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
    }),
    text: new Text({
      text: "ลากเพื่อแก้ไข",
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.7)",
      }),
      padding: [2, 2, 2, 2],
      textAlign: "left",
      offsetX: 15,
    }),
  });

  const segmentStyle = new Style({
    text: new Text({
      font: "12px Calibri,sans-serif",
      fill: new Fill({
        color: "rgba(255, 255, 255, 1)",
      }),
      backgroundFill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
      padding: [2, 2, 2, 2],
      textBaseline: "bottom",
      offsetY: -12,
    }),
    image: new RegularShape({
      radius: 6,
      points: 3,
      angle: Math.PI,
      displacement: [0, 8],
      fill: new Fill({
        color: "rgba(0, 0, 0, 0.4)",
      }),
    }),
  });

  const segmentStyles = [segmentStyle];

  let formatLength = (line) => {
    let length;

    length = Math.round(line.getLength() * 100) / 100;

    let output;
    if (length > 1000) {
      output = Math.round((length / 1000) * 100) / 100 + " " + "กม.";
    } else {
      output = Math.round(length * 100) / 100 + " " + "ม.";
    }
    return output;
  };

  const source = new VectorSource();

  const modify = new Modify({ source: source, style: modifyStyle });

  let styleFunction = (feature, drawType, tip) => {
    const styles = [style];
    const geometry = feature.getGeometry();
    const type = geometry.getType();
    let point, label, line;

    if (!drawType || drawType === type) {
        point = new Point(geometry.getLastCoordinate());
        label = formatLength(geometry);
        line = geometry;
    }

    if (line) {
      let count = 0;
      line.forEachSegment(function (a, b) {
        const segment = new LineString([a, b]);
        const label = formatLength(segment);
        if (segmentStyles.length - 1 < count) {
          segmentStyles.push(segmentStyle.clone());
        }
        const segmentPoint = new Point(segment.getCoordinateAt(0.5));
        segmentStyles[count].setGeometry(segmentPoint);
        segmentStyles[count].getText().setText(label);
        styles.push(segmentStyles[count]);
        count++;
      });
    }
    if (label) {
      labelStyle.setGeometry(point);
      labelStyle.getText().setText(label);
      styles.push(labelStyle);
    }
    if (
      tip &&
      type === "Point" &&
      !modify.getOverlay().getSource().getFeatures().length
    ) {
      tipPoint = geometry;
      tipStyle.getText().setText(tip);
      styles.push(tipStyle);
    }
    return styles;
  };

  const vector = new VectorLayer({
    source: source,
    style: function (feature) {
      return styleFunction(feature);
    },
    properties:{label:"measureLine"}
  });

  React.useEffect(() => {
    try {
      if (props.map != undefined) {
        let map = props.map;
        map.addInteraction(modify);
        // addInteraction();
      }
    } catch (error) {
      null;
    }
  }, [props]);

  const addInteraction = () => {
    if (props.map != undefined) {
      let map = props.map;
      const drawType = "LineString";
      const activeTip =
        "ลากเส้นต่อไปเพื่อวัดระยะ";
      const idleTip = "คลิกเพื่อเริ่มการวัดระยะ";
      let tip = idleTip;
      draw = new Draw({
        source: source,
        type: drawType,
        style: function (feature) {
          return styleFunction(feature,drawType, tip);
        },
      });
      draw.on("drawstart", function () {
        source.clear();
        modify.setActive(false);
        tip = activeTip;
      });
      draw.on("drawend", function () {
        map.getLayers().forEach(function (layer) {
          if (layer.get('label') != undefined && layer.get('label') === 'measureLine') {
              map.removeLayer(layer)
          }
        });
        map.addLayer(vector);
        modifyStyle.setGeometry(tipPoint);
        modify.setActive(true);
        map.once("pointermove", function () {
          modifyStyle.setGeometry();
        });
        tip = idleTip;
      });
      modify.setActive(true);
      map.addInteraction(draw);
    }
  };

  const handleClick = () => {
    if (props.map != undefined) {
      let map = props.map;
      map.removeInteraction(draw);
      addInteraction();
    }
  };

  return (
    <Tooltip title="วัดระยะทาง">
      <IconButton
        onClick={handleClick}
        color={"primary"}
        sx={{
          backgroundColor: "#fff",
          "&:hover": {
            background: "#f3f3f3",
          },
          boxShadow: 3,
        }}
      >
        <StraightenIcon />
      </IconButton>
    </Tooltip>
  );
}
