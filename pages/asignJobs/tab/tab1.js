import React from 'react'
import {
    Alert,
    Button,
    Card,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    makeStyles,
    Avatar
} from "@mui/material";

export default function Tab1(props) {
  console.log(props,"Tab1Tab1");
  return (
    <Grid>{props.tabData.CADASTRAL_NO}</Grid>
  )
}
