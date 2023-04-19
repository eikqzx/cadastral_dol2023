import React from "react";
import {
    Grid,
    Button,
    IconButton,
    TextField,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography
} from "@mui/material";

import { Add, Remove } from "@mui/icons-material";

export default function NumberPicker(props) {
    const [number, setNumber] = React.useState(1);
    React.useEffect(() => {
        console.log(props.defaultNumber, "props.defaultNumber");
        if(props.defaultNumber){
            setNumber(props.defaultNumber)
        }
    }, [props.open, props.defaultNumber])



    const handleIncrease = () => {
        setNumber(number + 1);
    };
    const handleDecrease = () => {
        setNumber(number - 1);
    };
    const onSubmit = async () => {
        console.log(number, "number");
        let obj = {
            number: number,
            index : props.index
        }
        console.log(obj, "obj");
        if (props.onSubmit) {
            props.onSubmit(obj);
            props.onClose()
        }
    }
    return (
        <Grid container>
            <Dialog
                // open={true}
                open={props.open}
                maxWidth="sm"
                onClose={props.onClose}
            // fullWidth
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Typography sx={{ fontSize: 20 }}>
                        {props.title}
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-number"
                        label={props.label}
                        type="number"
                        value={number}
                        sx={{ width: "40%" }}
                        onChange={(e) => setNumber(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        size="small"
                        inputProps={{ readOnly: true }}
                    />
                    <Tooltip title={"เพิ่ม"}>
                        <IconButton variant="contained" color="success" onClick={handleIncrease}>
                            <Add />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"ลด"}>
                        <IconButton variant="contained" color="error" onClick={handleDecrease}>
                            <Remove />
                        </IconButton>
                    </Tooltip>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'flex-end'}>
                        <Button onClick={props.onClose}>
                            ปิด
                        </Button>
                        <Button
                            color={"success"}
                            variant={"contained"}
                            onClick={onSubmit}
                        >
                            เพิ่มรายการ
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}