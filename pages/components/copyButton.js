import { ContentCopy } from '@mui/icons-material';
import { Alert, IconButton, Snackbar, Tooltip } from '@mui/material';
import { useState } from 'react';

const CopyButton = ({ text }) => {
    console.log(text);
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
                    คัดลอกที่อยู่ไฟล์แล้ว
                </Alert>
            </Snackbar>
            <Tooltip title="คัดลอกที่อยู่ไฟล์"><IconButton onClick={CopyToClipboard}><ContentCopy /></IconButton></Tooltip>
        </div>
    );
};

export default CopyButton;