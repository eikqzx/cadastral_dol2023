import React from "react";
import { Grid, Button, TextField, Typography, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function NumberPicker(props) {
    const [selStartNum, setSelStartNum] = React.useState("");
    const [selEndNum, setSelEndNum] = React.useState("");
    const maxDigits = props.maxDigits;
    const handleNumberSelection = (number) => {
        if (selStartNum.length < maxDigits) {
            setSelStartNum(`${selStartNum}${number}`);
        }
    }
    const handleNumberSelection1 = (number) => {
        if (selEndNum.length < maxDigits) {
            setSelEndNum(`${selEndNum}${number}`);
        }
    }
    const handleClear = () => {
        setSelStartNum("");
        setSelEndNum("")
    }
    const handleSave = (number) => {
        let obj = {
            startNumber: selStartNum ? selStartNum : null,
            endNumber: selEndNum ? selEndNum : null,
        }
        console.log(obj, "obj");
        props?.setStartPage(selStartNum);
        props?.setEndPage(selEndNum);
        props?.onclose();
    }
    return (
        <Grid container>
            <Dialog
                open={props.open}
                onClose={props.onclose}
                maxWidth="lg"
            >
                <DialogTitle>
                    {props.title}
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        {props.nameContent}
                    </Typography>
                    <Stack direction={'row'}>
                        <Grid container>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    value={selStartNum}
                                    // label="ต้นร่างเลขที่"
                                    inputProps={
                                        {
                                            readOnly: true
                                        }
                                    }
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Typography>
                                    ถึง
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    size="small"
                                    value={selEndNum}
                                    // label="ต้นร่างเลขที่"
                                    inputProps={
                                        {
                                            readOnly: true
                                        }
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                    <Grid container py={2}>
                        <Grid item xs={12} py={1}>
                            <Typography>
                                ช่วงที่ 1
                            </Typography>
                        </Grid>
                        <Stack direction={'row'} spacing={1}>
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                                <Button variant="contained" key={number} onClick={() => handleNumberSelection(number)} size="small">
                                    {number}
                                </Button>
                            ))}
                        </Stack>
                        <Grid item xs={12} py={1}>
                            <Typography>
                                ช่วงที่ 2
                            </Typography>
                        </Grid>
                        <Stack direction={'row'} spacing={1} >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(number => (
                                <Button variant="contained" key={number} onClick={() => handleNumberSelection1(number)} size="small">
                                    {number}
                                </Button>
                            ))}
                        </Stack>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'flex-end'} spacing={2} py={2}>
                        <Button variant="contained" onClick={handleClear} color="warning">
                            ล้างค่า
                        </Button>
                        <Button variant="contained" onClick={handleSave} color="success">
                            บันทึก
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid >
    )
}
