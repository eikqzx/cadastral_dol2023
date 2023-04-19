import { Alert, Snackbar } from '@mui/material';
import * as React from 'react';

var ComponentSnackBar

export default class SnackBarDiaLog extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            duration: 3000,
            message: "",
            type: "success"
        }
    }
    componentDidMount() {
        ComponentSnackBar = this
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }
    render() {
        return (
            <Snackbar
                open={this.state.open}
                autoHideDuration={this.state.duration}
                onClose={this.handleClose}
                message={this.state.message}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}

            >
                <Alert onClose={this.handleClose} severity={this.state.type} sx={{ width: '100%' }}>
                    {this.state.message}
                </Alert>
            </Snackbar>
        )
    }
}

export function SnackbarSet(msg = "", type = "success", duration = 3000) {
    ComponentSnackBar.setState({
        open: true,
        duration: duration,
        message: msg,
        type: type
    })
}