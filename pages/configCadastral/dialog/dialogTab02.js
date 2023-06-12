import React from "react";
import {
    Grid,
    Typography,
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Button
} from "@mui/material";

export default function DilogTab02Index(props) {
    return (
        <Grid>
            <Dialog
                open={props.open}
                maxWidth={"lg"}
                fullWidth
                fullScreen
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Typography variant="subtitle">แก้ไขข้อมูลแปลงต้นร่าง</Typography>
                </DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'flex-end'}>
                        <Button onClick={props.close} color={"error"} variant={"contained"}>
                            ปิด
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid>
    )
}