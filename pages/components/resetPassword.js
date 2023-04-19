import * as React from 'react';
import {
    Grid,
    Box,
    IconButton,
    Button,
    Input,
    InputLabel,
    InputAdornment,
    FormControl,
    TextField,
    Dialog,
    DialogContent,
    DialogActions,
    DialogTitle,
    Alert,
    AlertTitle,
    Typography
} from '@mui/material'
import { green } from '@mui/material/colors';
import styles from '@/styles/Home.module.css'
import { SnackbarSet } from "@/pages/components/snackbar";
import { useSession } from "next-auth/react"
//SERVICES
import { updUserListPassByUsername } from '@/service/adm/userList';
//ICONS
import { Visibility, VisibilityOff } from '@mui/icons-material'

export default function ResetPassword(props) {
    const [isErrorField, setIsErrorField] = React.useState([]);
    const { data } = useSession();
    // console.log(data.user, "userPID");
    const [oldPassword, setOldPassword] = React.useState({
        password: '',
        showPassword: false,
    });
    const [newPassword, setNewPassword] = React.useState({
        password: '',
        showPassword: false,
    });
    const [confirmPass, setConfirmPass] = React.useState({
        password: '',
        showPassword: false,
    });
    //==========================================================================
    const handleChangeOld = (prop) => (event) => {
        setOldPassword({ ...oldPassword, [prop]: event.target.value });
    };
    const handleClickShowPasswordOld = () => {
        setOldPassword({
            ...oldPassword,
            showPassword: !oldPassword.showPassword,
        });
    };
    const handleMouseDownPasswordOld = (event) => {
        event.preventDefault();
    };
    //==========================================================================
    const handleChange = (prop) => (event) => {
        setNewPassword({ ...newPassword, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setNewPassword({
            ...newPassword,
            showPassword: !newPassword.showPassword,
        });
    };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    //==========================================================================
    const handleChangeCF = (prop) => (event) => {
        setConfirmPass({ ...confirmPass, [prop]: event.target.value });
    };
    const handleClickShowPasswordCF = () => {
        setConfirmPass({
            ...confirmPass,
            showPassword: !confirmPass.showPassword,
        });
    };
    const handleMouseDownPasswordCF = (event) => {
        event.preventDefault();
    };
    const _checkIsValid = () => {
        let errorArray = [];
        if (oldPassword.password == "" || oldPassword.password == null || oldPassword.password == undefined) {
            errorArray.push("oldPassword.password");
        }
        if (newPassword.password == "" || newPassword.password == null || newPassword.password == undefined) {
            errorArray.push("newPassword.password");
        }
        if (confirmPass.password == "" || confirmPass.password == null || confirmPass.password == undefined) {
            errorArray.push("confirmPass.password");
        }

        setIsErrorField(errorArray)
        if (errorArray.length > 0) {
            console.log("errorArray", errorArray);
            return false
        } else {
            return true
        }
    };

    const _onSubmit = async () => {
        let isValid = _checkIsValid();
        console.log(isValid);
        if (!isValid) {
            // SnackbarSet("กรุณากรอกข้อมูลให้ครบถ้วน", "error");
            console.log("กรุณากรอกข้อมูลให้ครบถ้วน");
            return;
        }
        if (newPassword.password != confirmPass.password) {
            // SnackbarSet("กรุณากรอกรหัสผ่านให้ตรงกัน", "error");
            console.log("กรุณากรอกรหัสผ่านให้ตรงกัน");
            return false;
        }
        let obj = {
            "USER_LIST_PID": data.user.USER_LIST_PID,
            "USER_LIST_PASS_OLD": oldPassword.password,
            "USER_LIST_PASS_NEW": confirmPass.password,
        }
        console.log(obj, "obj");
        // return
        let res = await updUserListPassByUsername(obj)
        if (res == true) {
            //SnackbarSet("แก้ไขข้อมูลสำเร็จ", "success");
            props.onClose();
        } else {
            console.log("updateError");
            //SnackbarSet("เกิดข้อผิดพลาด", "error");
            props.onClose();
        }
    }
    return (
        <Grid container>
            <Dialog
                open={props.open}
                maxWidth={"sm"}
                // onClose={props.onClose}
            // fullWidth
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Grid item xs={12}  >
                        <Typography sx={{ fontSize: 20 }}>เปลี่ยนรหัสผ่านใหม่</Typography>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid item xs={12} p={1}>
                        <FormControl variant="standard">
                            <InputLabel>รหัสผ่านเก่า</InputLabel>
                            <Input
                                size='small'
                                type={oldPassword.showPassword ? 'text' : 'password'}
                                value={oldPassword.password}
                                onChange={handleChangeOld('password')}
                                error={isErrorField.includes("oldPassword.password")}
                                InputProps={{ maxLength: 10 }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPasswordOld}
                                            onMouseDown={handleMouseDownPasswordOld}
                                        >
                                            {oldPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} p={1}>
                        <FormControl variant="standard">
                            <InputLabel>รหัสผ่านใหม่</InputLabel>
                            <Input
                                size='small'
                                type={newPassword.showPassword ? 'text' : 'password'}
                                value={newPassword.password}
                                onChange={handleChange('password')}
                                error={isErrorField.includes("newPassword.password")}
                                InputProps={{ maxLength: 10 }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {newPassword.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} p={1}>
                        <FormControl variant="standard">
                            <InputLabel>ยืนยันรหัสผ่าน</InputLabel>
                            <Input
                                size='small'
                                type={confirmPass.showPassword ? 'text' : 'password'}
                                value={confirmPass.password}
                                onChange={handleChangeCF('password')}
                                error={isErrorField.includes("confirmPass.password")}
                                InputProps={{ maxLength: 10 }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPasswordCF}
                                            onMouseDown={handleMouseDownPasswordCF}
                                        >
                                            {confirmPass.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }

                            />
                        </FormControl>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'flex-end'}>
                        <Button onClick={props.onClose}>
                            ปิด
                        </Button>
                        <Button
                            color={"success"}
                            variant={"contained"}
                            onClick={_onSubmit}
                        >
                            ยืนยัน
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid >
    );
}
