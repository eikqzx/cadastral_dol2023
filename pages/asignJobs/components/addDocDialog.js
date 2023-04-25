import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Avatar,
    Divider,
    Alert,
    AlertTitle,
    TextField,
    Snackbar
} from "@mui/material";

export default function AddDocDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [isErrorInput, setIsErrorInput] = React.useState([]);

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Grid container>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

            <Dialog
                open={props.open}
                // open={true}
                maxWidth={"sm"}
                fullWidth
                onClose={props.onclose}
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Grid item xs={12}  >
                        <Typography sx={{ fontSize: 20 }}>เพิ่มรายการ{props?.title}</Typography>
                    </Grid>
                    {/* <Divider /> */}
                </DialogTitle>
                <DialogContent>
                    <Grid container py={2}>
                        <Grid item xs={12} py={1}>
                        
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Grid>
    )
}
