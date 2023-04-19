import { Alert, Snackbar } from '@mui/material';
import React from 'react'

export default function SnackBarDiaLog({ open, message,type="success", handleClose, duration=3000 }) {
    return (
        <Snackbar
            open={open}
            autoHideDuration={duration}
            onClose={handleClose}
            message={message}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}

        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
