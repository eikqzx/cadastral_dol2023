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
    Tooltip,
    Button
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
import { filterRecordStatus, formatPIDString, isNotEmpty } from "@/lib/datacontrol";
import { thdate } from "dayjs/locale/th"
import { getProcess } from "@/service/mas/process";
import { decode, encode } from "next-base64";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useDispatch, useSelector } from 'react-redux';
import * as jobRedux from "./../../../store/feature/job"
// import { useContext } from "react";
dayjs.extend(buddhistEra);
dayjs.locale(thdate);

export default function HeaderTabs(props) {
    const { data } = useSession();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [tabData, setTabData] = React.useState([]);
    const dataRouter = useRouter().query

    React.useEffect(() => {
        let start = async () => {
            await req_MasProcess();
            if (isNotEmpty(dataRouter)) {
                console.log(dataRouter, "dataRouter route");
                let seq = decode(dataRouter?.PROCESS_SEQ);
                console.log(seq, "seq dataRouter");
                console.log(tabData, "tabData dataRouter");
                for (let i in tabData) {
                    if (tabData.length > 0) {
                        let itemObj = tabData[i];
                        if (seq == itemObj.MENU_SEQ) {
                            console.log(itemObj.MENU_SEQ, "MENU_SEQ dataRouter");
                            console.log(i, "index dataRouter");
                            await setValue(Number(i))
                        }
                    }
                }
            }
        }
        start()
        // getMenuData();
    }, []);

    React.useEffect(() => {
        let start = async () => {
            await req_MasProcess();
            if (isNotEmpty(dataRouter)) {
                console.log(dataRouter, "dataRouter route");
                let seq = decode(dataRouter?.PROCESS_SEQ);
                console.log(seq, "seq dataRouter");
                console.log(tabData, "tabData dataRouter");
                for (let i in tabData) {
                    if (tabData.length > 0) {
                        let itemObj = tabData[i];
                        if (seq == itemObj.MENU_SEQ) {
                            console.log(itemObj.MENU_SEQ, "MENU_SEQ dataRouter");
                            console.log(i, "index dataRouter");
                            await setValue(Number(i))
                        }
                    }
                }
            }
        }
        start()
    }, [data])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const req_MasProcess = async () => {
        let res = await getMenu();
        await setTabData(filterRecordStatus(res.rows, "N"));
    }

    const stringName = (fName = null, mName = null, lName = null) => {
        if (fName == null) {
            fName = ""
        }
        if (mName == null) {
            mName = ""
        }
        if (lName == null) {
            fName = ""
        }
        return fName + " " + mName + " " + lName
    }

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

    const onSingout = async () => {
        let res = await signOut({
            redirect: false,
            callbackUrl: `${window.location.origin}/login`,
        })
        console.log(res, "onSingout");
    }


    return (
        <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} >
            <React.Fragment>
                {openDialog && <ResetPassword
                    open={openDialog}
                    onClose={handleCloseDialog}
                />}
            </React.Fragment>
            {
                tabData.length != 0 && <AppBar style={{ background: 'linear-gradient(109.6deg, #FFFFE8 11.2%, #bcf3b0 91.1%)' }} position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Grid item py={2} textAlign={"center"}>
                        <Typography fontWeight={800} sx={{ textDecoration: 'underline' }} color={"black"} fontSize={16}>{data?.user?.LANDOFFICE_NAME_TH}</Typography>
                    </Grid>
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{
                                    '& .MuiTabScrollButton-root.Mui-disabled': {
                                        color: 'rgba(0, 0, 0, 0.26)', // disabled icon color
                                    },
                                    '& .MuiTabScrollButton-root:not(.Mui-disabled)': {
                                        color: 'rgba(0, 0, 0, 1)', // enabled icon color
                                    },
                                    '& .MuiTabs-indicator': { backgroundColor: "#5BB318 !important" },
                                    '& .Mui-selected': { color: "#5BB318 !important" },
                                }}
                                allowScrollButtonsMobile
                            >
                                {tabData.map((item, index) => {
                                    if (data?.user?.USER_LIST_TYPE == 8) {
                                        if (item.MENU_SEQ == 106 || item.MENU_SEQ == 107) {
                                            return (
                                                <Tab key={index} LinkComponent={Link} href={item.MENU_URL != null &&
                                                {
                                                    pathname: item.MENU_URL,
                                                    query: { "PROCESS_SEQ": encode(item.MENU_SEQ) },
                                                }
                                                } label={item.MENU_NAME_TH}
                                                    sx={{
                                                        '&:hover': {
                                                            background: 'radial-gradient(circle, rgba(255,255,232,1) 5%, rgba(188,243,176,1) 80%) !important',
                                                        },
                                                    }}
                                                />
                                            )
                                        }
                                    } else {
                                        return (
                                            <Tab key={index} LinkComponent={Link} href={item.MENU_URL != null &&
                                            {
                                                pathname: item.MENU_URL,
                                                query: { "PROCESS_SEQ": encode(item.MENU_SEQ) },
                                            }
                                            } label={item.MENU_NAME_TH}
                                                sx={{
                                                    '&:hover': {
                                                        background: 'radial-gradient(circle, rgba(255,255,232,1) 5%, rgba(188,243,176,1) 80%) !important',
                                                    },
                                                }}
                                            />
                                        )
                                    }
                                })
                                }
                            </Tabs>
                        </Box>
                        <Grid item p={1} textAlign={"end"}>
                            <Typography color={"black"} fontSize={14}>{data?.user?.USER_LIST_FNAME}</Typography>
                        </Grid>
                        <Tooltip title="ข้อมูลผู้ใช้">
                            <IconButton
                                size="large"
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
                                        <Typography fontSize={14}>รหัสผู้ใช้งาน: {formatPIDString(data?.user?.USER_LIST_PID)}</Typography>
                                    </Grid>
                                    <Grid item px={1}>
                                        <Typography fontSize={14}>ชื่อผู้ใช้งาน: {stringName(data?.user?.USER_LIST_FNAME, data?.user?.USER_LIST_MNAME, data?.user?.USER_LIST_LNAME)}</Typography>
                                    </Grid>
                                    <Grid item px={1}>
                                        <Typography fontSize={14}>วันที่เข้าสู่ระบบ: {data?.user?.LOGIN_DTM}</Typography>
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
                                            <ListItemButton onClick={onSingout}>
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
            }
        </Box >
    )
}