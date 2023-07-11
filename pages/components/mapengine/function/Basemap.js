import { Button, IconButton, Tooltip, Grid, Typography, List, ListItemText, ListItem, Drawer, Checkbox } from "@mui/material";
import React from "react";
import SatelliteIcon from "@mui/icons-material/Satellite";
import XYZ from "ol/source/XYZ";
import TileLayer from "ol/layer/Tile";
import Popover from "@mui/material/Popover";
import { OSM } from "ol/source";
const Basemap = React.forwardRef(function Basemap(props, ref) {
  // console.log(props,"props Basemap");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [baseName, setBaseName] = React.useState("Google Road");
  const [isActive, setIsActive] = React.useState(true);
  const [baseMapListData, setBaseMapListData] = React.useState([]);
  const [basemaplist, setBasemaplist] = React.useState([{
    name: "OSM",
    nameth: "OPEN STREET MAP",
    checked: true
  }]);
  const open = Boolean(anchorEl);
  React.useEffect(() => {
    _onClick({
      "name": "Google Road",
      "nameth": "ภาพถ่ายถนน",
      "href": "http://mt0.google.com/vt/m=s&hl=en&x={x}&y={y}&z={z}",
    })
  }, [props.none])

  React.useEffect(() => {
    if (props.map) {
      let layers = props.map.getLayers();
      let layersList = [];
      for (let i in layers) {
        try {
          if (layers[i].get("LAYER_TYPE") == "BASEMAP") {
            layersList.push(e);
          }
        } catch {
          //วนลุปแล้ว Error เลย Try Catch ไว้ก่อน
        }
      }
      setBaseMapListData([]);
      setBaseMapListData(layersList);
    }
  }, [props.map])
  React.useEffect(() => {

  }, [isActive])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const _createTileLayer = (el) => {
    let tileLayer = new TileLayer({
      source: new XYZ({
        title: el.name,
        url: el.href,
      }),
      properties: {
        LAYER_NAME: el.name,
        LAYER_TYPE: "BASEMAP",
      },
    });
    return tileLayer
  }
  const _onClick = async (el, index) => {
    // return

    // if (baseName == el.name) {
    //   return
    // }
    // let tile = _createTileLayer(el)
    // console.log(tile)
    if (index != undefined) {
      let valueCk = !isActive;
      setIsActive(valueCk);
      console.log('basemaplist', basemaplist);
      if (valueCk) {
        let tileLayer = new TileLayer({
          source: new OSM(),
          properties: {
            LAYER_NAME: el.name,
            LAYER_TYPE: "BASEMAP",
          },
        });
        tileLayer.setZIndex(0)
        props.map.addLayer(tileLayer);
      } else {
        let layers = props.map.getLayers();
        layers.forEach((e) => {
          // console.log(e.get("LAYER_NAME"));
          try {
            if (e.get("LAYER_TYPE") == "BASEMAP") {
              props.map.removeLayer(e);
            }
          } catch {
            //วนลุปแล้ว Error เลย Try Catch ไว้ก่อน
          }
        });
      }
    }
    // tile.setZIndex(0)
    // props.map.addLayer(tile);
    await setBaseName(el.name)

  }
  return (
    <Grid>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Grid container sx={{ minWidth: "300px" }}>
          <Grid item xs={12}>
            <List dense>
              {
                basemaplist?.map((el, index) => (
                  <ListItem button
                    key={index}
                    onClick={() => (_onClick(el, index))}
                    secondaryAction={
                      <Checkbox color={"error"} checked={isActive} />
                    }
                  >
                    <ListItemText
                      primary={<Typography fontWeight={600} sx={{ color: '#0f2087' }}>{el.name}</Typography>}
                      secondary={<Typography fontSize={13} fontStyle={"oblique"} sx={{ color: '#f70101' }}>{el.nameth}</Typography>}
                    />
                  </ListItem>
                ))
              }
            </List>
          </Grid>
        </Grid>
      </Popover>
      <Tooltip title="Base Map">
        <Button onClick={handleClick} endIcon={<SatelliteIcon sx={{ boxShadow: 1 }} />}>
          <Typography fontSize={14} color={"white"} sx={{ textShadow: "1px 1px 0 #333, -1px -1px 0 #333,  1px -1px 0 #333,-1px 1px 0 #333,1px 1px 0 #333;" }}  >Base Map</Typography>
        </Button>
      </Tooltip>
    </Grid >
  );
});

export default Basemap;
