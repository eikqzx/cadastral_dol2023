import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';


// const useConfirmDialogStore = create((set) => ({
//     message: '',
//     onSubmit: undefined,
//     close: () => set({ onSubmit: undefined }),
// }));
var confirmDialog


export default class ConfirmDialog2 extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
            onSubmit: undefined,
            sizeX: undefined,
            onCancel: undefined
        }
    }
    componentDidMount() {
        confirmDialog = this
    }
    close = () => {
        this.setState({ onSubmit: undefined })
    }
    createDialog(msg = "", onSubmit, sizeX, onCancel = undefined) {
        this.setState({ message: msg, onSubmit: onSubmit, sizeX: sizeX, onCancel: onCancel })
    }
    render() {
        return (
            <div>
                <Dialog
                    open={Boolean(this.state.onSubmit)}
                    // onClose={this.close}
                    maxWidth={this.state.sizeX ? this.state.sizeX : "sm"}
                    fullWidth
                >
                    <DialogTitle sx={{ background: 'linear-gradient(to right bottom, #56ab2f, #a8e063)' }} >
                        {"แจ้งเตือนระบบ"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            {this.state.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color='success' onClick={() => {
                            if (this.state.onSubmit) {
                                this.state.onSubmit();
                            }
                            this.close();
                        }} autoFocus>
                            ตกลง
                        </Button>
                        <Button variant="contained" color='error' onClick={this.close}>ปิด</Button>
                        {this.state.onCancel &&
                            (
                                <Button variant="contained" color='success' onClick={() => {
                                    if (this.state.onCancel) {
                                        this.state.onCancel();
                                    }
                                    this.close();
                                }} autoFocus>
                                    ยกเลิก
                                </Button>
                            )
                        }
                    </DialogActions>
                </Dialog>
            </div >
        )
    }
}

export { confirmDialog }