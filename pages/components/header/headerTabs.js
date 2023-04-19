import React from "react";
import {
    Grid,
    Tab,
    Paper,
    AppBar,
    Tabs,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Typography,
    Popover,
    Divider,
    List,
    ListItemButton,
    ListItemText,
    ListItemIcon,
    Stack,
    Avatar,
    Tooltip
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
//COMPONENTS
import ResetPassword from "../resetPassword";
//LIBRALIES
import Link from "next/link";
import dayjs from "dayjs";
import buddhistEra from "dayjs/plugin/buddhistEra";
//ICONS
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { getMenu } from "@/service/mas/menu";
import { filterRecordStatus } from "@/lib/datacontrol";
import { thdate } from "dayjs/locale/th"
dayjs.extend(buddhistEra);
dayjs.locale(thdate)

export default function HeaderTabs(props) {
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showDay, setShowDay] = React.useState(null);
    const [showTime, setShowTime] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false)
    React.useEffect(() => {
        setShowTime(dayjs().format("HH:mm:ss"));
        setShowDay(dayjs().locale('th').format("DD MMMM BBBB"));
        // getMenuData();
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const getMenuData = async () =>{
    //     let data = await getMenu();
    //     let filterData = filterRecordStatus(data)
    //     console.log(filterData,"getMenuData");
    // }
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
            <React.Fragment>
                <ResetPassword
                    open={openDialog}
                    onClose={handleCloseDialog}
                />
            </React.Fragment>
            <AppBar style={{ background: 'linear-gradient(109.6deg, #FFFFE8 11.2%, #bcf3b0 91.1%)' }} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab LinkComponent={Link} href={"/accountControl"} label="บัญชีคุม เบิก-จ่าย สารบบ" />
                            <Tab LinkComponent={Link} href={"/asignJobs"} label="รับงานสแกนสารบบ" />
                            <Tab LinkComponent={Link} href={"/scanner"} label="สแกนสารบบ" />
                        </Tabs>
                    </Box>
                    <Tooltip title="ข้อมูลผู้ใช้">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="default"
                        >
                            <Avatar sizes="small" sx={{ width: 30, height: 30, background: 'radial-gradient(circle, #56ab2f 30%, #a8e063 100%)' }} />
                        </IconButton>
                    </Tooltip>
                    <Popover
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorEl={anchorEl}
                        sx={{
                            marginTop: "35px",
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                    >
                        <Grid container alignItems="center" sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 0%, rgba(188,243,176,1) 100%)' }}>
                            <Stack py={1}>
                                <Grid item px={1}>
                                    <Typography fontSize={14}>ชื่อผู้ใช้งาน: Admin</Typography>
                                </Grid>
                                <Grid item px={1}>
                                    <Typography fontSize={14}>วันที่: {showDay}</Typography>
                                    <Typography fontSize={14}>เวลาเข้าสู่ระบบ: {showTime}</Typography>
                                </Grid>
                                <Grid item px={1}>
                                    <Divider />
                                </Grid>
                                <Grid item xs={12}>
                                    <List>
                                        <ListItemButton onClick={handleOpenDialog}>
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 35, height: 35, background: 'radial-gradient(circle, #56ab2f 30%, #a8e063 100%)' }}>
                                                    <ManageAccountsIcon />
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText><Typography fontSize={14}>เปลี่ยนรหัสผ่าน</Typography></ListItemText>
                                        </ListItemButton>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Avatar sx={{ width: 35, height: 35, background: 'radial-gradient(circle, #56ab2f 30%, #a8e063 100%)' }}>
                                                    <LogoutIcon />
                                                </Avatar>
                                            </ListItemIcon>
                                            <ListItemText> <Typography fontSize={14}>ออกจากระบบ</Typography></ListItemText>
                                        </ListItemButton>
                                    </List>
                                </Grid>
                            </Stack>
                        </Grid>
                    </Popover>
                </Toolbar>
            </AppBar>
        </Box>
    )
}