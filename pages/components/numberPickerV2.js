import React from "react";
import {
    Grid,
    Button,
    TextField,
    Typography,
    Stack,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Avatar,
    IconButton,
    Tooltip

} from "@mui/material";
import { blue } from "@mui/material/colors";
export default function NumberPicker(props) {
    const [selNumber, setSelNumber] = React.useState([]);
    React.useEffect(() => {
        setSelNumber([])
    }, [props.onSubmit])
    // const maxDigits = 4;
    const maxDigits = props.maxDigits;
    const handleNumberSelection = (number) => {
        if (selNumber.length < maxDigits) {
            setSelNumber(`${selNumber}${number}`);
        }
    }
    const handleClear = () => {
        setSelNumber("");
    }
    const onSubmit = () => {
        let obj = {
            Number: selNumber ? selNumber : null,
        }
        if (props.onSubmit) {
            props.onSubmit(obj);
            props.onClose()
            console.log(obj, "obj");
        }
    }
    return (
        <Grid container>
            <Dialog
                open={props.open}
                maxWidth="xs"
                onClose={props.onClose}
                fullWidth
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <Paper elevation={1} >
                        <Grid item xs={12} p={2}>
                            <TextField
                                size="small"
                                value={selNumber}
                                // label="หน้าสำรวจเลขที่"
                                inputProps={
                                    {
                                        readOnly: true
                                    }
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid container py={2} columns={12} justifyContent={'center'} justifyItems={'center'} alignItems={'center'} gap={0.5}>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(1)} size="small" >
                                    1
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(1)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>1</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(2)} size="small" >
                                    2
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(2)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>2</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(3)} size="small" >
                                    3
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(3)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>3</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(2)} size="small" >
                                    4
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(4)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>4</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(5)} size="small" >
                                    5
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(5)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>5</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(6)} size="small" >
                                    6
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(6)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>6</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(7)} size="small" >
                                    7
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(7)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>7</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(8)} size="small" >
                                    8
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(8)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>8</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(9)} size="small" >
                                    9
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(9)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>9</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                <Tooltip title="ล้างค่า">
                                    <Button variant="contained" onClick={handleClear} color="warning" size="small">
                                        ล้างค่า
                                    </Button>
                                </Tooltip>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                {/* <Button variant="contained" onClick={() => handleNumberSelection(0)} size="small" >
                                    0
                                </Button> */}
                                <IconButton onClick={() => handleNumberSelection(0)} size="small">
                                    <Avatar sx={{ width: 35, height: 35, bgcolor: blue[500] }}>0</Avatar>
                                </IconButton>
                            </Grid>
                            <Grid xs={3} md={2} py={1}>
                                <Tooltip title="บันทึก">
                                    <Button variant="contained" onClick={onSubmit} color="success" size="small">
                                        บันทึก
                                    </Button>
                                </Tooltip>
                            </Grid>
                        </Grid>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={props.onClose} color="error" size="small">
                        ปิด
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid >
    )
}
