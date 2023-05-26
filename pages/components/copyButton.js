import { ContentCopy } from '@mui/icons-material';
import { Alert, IconButton, Snackbar, Tooltip } from '@mui/material';
import { useState } from 'react';

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);
    const CopyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(text);
            console.log(text);
            setCopied(true);
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };

    const handleClose = (event, reason) => {
        setCopied(false);
    };


    return (
        <div>
            <Snackbar open={copied} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    คัดลอก Path File แล้ว
                </Alert>
            </Snackbar>
            <Tooltip title="คัดลอก Path File"><IconButton onClick={CopyToClipboard}><ContentCopy /></IconButton></Tooltip>
        </div>
    );
};

export default CopyButton;