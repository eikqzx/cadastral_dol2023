import React from "react";
import {
    Grid,
    Tab,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider,
    Box
} from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';
//COMPONENTS
import Search from "../components/search/search";
import SnackBarDiaLog from "../components/snackbarV2";
import SideTreeView from "../components/sideTreeView";
import Tab01 from "./tabs/Tab01";
import Tab02 from "./tabs/Tab02";
import Tab03 from "./tabs/Tab03";
//LIBRALIE
import { filterRecordStatus, getCookie, isNotEmpty } from "@/lib/datacontrol";
//ICONS
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { decode } from "next-base64";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
//SERVICE
import { getLandOfficeByPK, getLandOffice } from "@/service/mas/landOffice";
import { cadastralImage10XByConditionCadastralNoTo } from "@/service/sva";
import { cadastralImageByCondition } from "@/service/evd/cadastral";
export default function IndexConfigCadastral(props) {
    console.log(props, "props_IndexConfigCadastral");

    const [searchData, setSearchData] = React.useState([]);
    const [tabData, setTapData] = React.useState([]);
    const [searchDataInsert, setSearchDataInsert] = React.useState([]);
    const [tabPageData, setTabPageData] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('');
    const [processSeq, setProcessSeq] = React.useState(100)
    const [userData, setUserData] = React.useState(null);
    const [landOffice, setLandOffice] = React.useState(null);
    const [searchParameter, setSearchParameter] = React.useState(null);
    const { data } = useSession();
    const [masterData, setMasterData] = React.useState([]);
    //MASTER_DATA
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");

    const handleChangeTabs = (event, newValue) => {
        setTabPageData(newValue);
    };
    console.log(tabData, "tabDataIndex");
    console.log(searchData, "propsIndexConfigCadastral");
    console.log(searchParameter, "searchParameter");
    console.log(sheetcode, "sheetcode");
    // console.log(userData, "userData");
    const dataUrl = useRouter().query

    const _reqLandOffice = async (seq) => {
        try {
            let res = await getLandOfficeByPK(seq);
            console.log(res.rows, "getLandOfficeByPK");
            await setLandOffice(res.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (isNotEmpty(dataUrl)) {
            let seq = decode(dataUrl?.PROCESS_SEQ);
            console.log(seq, "seqseqseq");
            if (seq == 124) {
                seq = 100
                setProcessSeq(seq);
            }
        }
    }, [])

    React.useEffect(() => {
        setUserData(data?.user);
    }, [data])

    React.useEffect(() => {
        _reqLandOffice(userData?.LANDOFFICE_SEQ);
    }, [userData])

    const onSearchNew = async (obj) => {
        console.log(obj, "obj_onSearch");
        obj.PROCESS_SEQ_ = Number(processSeq);
        setSearchParameter(obj)
        let data = null;
        data = await cadastralImage10XByConditionCadastralNoTo(obj);
        data = data.rows
        console.log(data, "onSearchNew124");
        if (data.length == 0) {
            console.log(obj, "dataobj_onSearch");
            let objArray = []
            objArray.push(obj);
            setSearchDataInsert(objArray)
        } else {
            console.log(data, "dataobj_onSearch_else");
            setSearchData(data)
        }
    }
    const onResetNew = async () => {
        await setTapData([])
        await setSearchData([])
        await setSearchDataInsert([])
        await setOffice()
        await setSheetcode()
        await setBoxNo()
        await setNumofsurveyQty()
        await setCadastralNo()
        await setMasterData([])
    }

    React.useEffect(() => {
        if (tabData !== undefined && tabData.length !== 0) {
            console.log(tabData, "searchData_getMasterData");
            getMasterData(tabData);
        } else if (searchDataInsert) {
            console.log(searchDataInsert, "searchDataInsert_getMasterDataIndex");
            getMasterData(searchDataInsert);
        }
    }, [tabData, searchDataInsert]);

    const getMasterData = async (data) => {
        // data = data.rows
        console.log(data, "FirstgetMasterData");
        // _createNewData(data.CADASTRAL_SEQ)

        if (Array.isArray(data) && data.length > 0) {
            // Case: data is an array of objects (searchDataInsert)
            const firstData = data[0];
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ === firstData?.LANDOFFICE_SEQ);
            setSheetcode(firstData?.SHEETCODE);
            setBoxNo(firstData?.BOX_NO?.toString().padStart(2, "0"));
            setNumofsurveyQty(firstData?.NUMOFSURVEY_QTY !== null ? firstData?.NUMOFSURVEY_QTY : 0);
            setCadastralNo(firstData?.CADASTRAL_NO);
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
        } else {
            // Case: data is an object (tabData)
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ === data?.LANDOFFICE_SEQ);
            setSheetcode(data?.SHEETCODE);
            setBoxNo(data?.BOX_NO?.toString().padStart(2, "0"));
            setNumofsurveyQty(data?.NUMOFSURVEY_QTY !== null ? data?.NUMOFSURVEY_QTY : 0);
            setCadastralNo(data?.CADASTRAL_NO);
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
        }
        console.log(data, "getMasterData");
        setMasterData(data)
    }


    return (
        <Grid container spacing={0.5} py={7.5}>
            <SnackBarDiaLog open={open} message={message} type={type} handleClose={() => setOpen(false)} />
            {/* ==================================Search===================== */}
            {
                <Grid item xs={12}>
                    <Accordion defaultExpanded={true}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            sx={{
                                background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%) !important',
                            }}
                        >
                            <Typography >ค้นหารายการต้นร่าง</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Search provinceSeq={landOffice?.PROVINCE_SEQ} landOfficeSeq={landOffice?.LANDOFFICE_SEQ} disabled={['licensePage', 'fileNo', 'parcelNO', 'landNo']} onSearch={onSearchNew} onReset={onResetNew} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            }
            <Grid item xs={2} md={2}>
                <SideTreeView data={searchData} setTapData={setTapData} process={processSeq} />
            </Grid>
            <Grid item xs={10} md={10}>
                <Paper sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }}>
                    <Grid p={2} spacing={1} component={Paper} container>
                        <Grid item xs={3} md={5}>
                            <Grid container>
                                <Grid item>
                                    <Typography>สำนักงาน: </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{office}&nbsp;</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <Grid container>
                                <Grid item>
                                    <Typography>หมายเลขรหัสแทนระวาง(เลขแฟ้ม):</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{sheetcode}&nbsp;</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Grid container>
                                <Grid item >
                                    <Typography>เลขที่กล่อง:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{boxNo}&nbsp;</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} md={4}>
                            <Grid container>
                                <Grid item >
                                    <Typography>เลขที่ต้นร่าง:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{cadastralNo}&nbsp;</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Grid container>
                                <Grid item >
                                    <Typography>ครั้งที่รังวัด:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{numofsurveyQty == 0 || numofsurveyQty == null ? "-" : numofsurveyQty}&nbsp;</Typography>
                                    {/* <IconButton size='small' disabled={numofsurveyQty == "-" || checkCanEdit} onClick={() => { setOpenEdit(props?.tabData) }}><Edit /></IconButton> */}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>
                    {
                        searchData?.length !== 0 && searchData[0]?.BOX_NO !== 0 ?
                            (
                                <Box sx={{ width: '100%', typography: 'body1' }}>
                                    <TabContext value={tabPageData}>
                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                            <TabList
                                                onChange={handleChangeTabs}
                                                sx={{
                                                    '& .MuiTabs-indicator': { backgroundColor: "#5BB318 !important" },
                                                    '& .Mui-selected': { color: "#5BB318 !important" },
                                                    background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%) !important',
                                                }}
                                                scrollButtons="auto"
                                                allowScrollButtonsMobile
                                            >
                                                <Tab label="ต้นร่าง" value="1" />
                                                <Tab label="แปลงต้นร่าง" value="2" />
                                                <Tab label="ผู้ขอรังวัดต้นร่าง" value="3" />
                                            </TabList>
                                        </Box>
                                        <TabPanel value="1"><Tab01 searchData={searchData} masterData={masterData} process={processSeq} tabData={tabData} /></TabPanel>
                                        <TabPanel value="2"><Tab02 searchData={searchData} masterData={masterData} process={processSeq} tabData={tabData} /></TabPanel>
                                        <TabPanel value="3"><Tab03 searchData={searchData} masterData={masterData} process={processSeq} tabData={tabData} /></TabPanel>
                                    </TabContext>
                                </Box>
                            )
                            :
                            searchDataInsert?.length !== 0 && searchDataInsert[0]?.BOX_NO !== 0 ?
                                (
                                    <Box sx={{ width: '100%', typography: 'body1' }}>
                                        <TabContext value={tabPageData}>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <TabList
                                                    onChange={handleChangeTabs}
                                                    sx={{
                                                        '& .MuiTabs-indicator': { backgroundColor: "#5BB318 !important" },
                                                        '& .Mui-selected': { color: "#5BB318 !important" },
                                                        background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%) !important',
                                                    }}
                                                    scrollButtons="auto"
                                                    allowScrollButtonsMobile
                                                >
                                                    <Tab label="ต้นร่าง" value="1" />
                                                    <Tab label="แปลงต้นร่าง" value="2" />
                                                    <Tab label="ผู้ขอรังวัดต้นร่าง" value="3" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1"><Tab01 cadastralSeq={tabData?.CADASTRAL_SEQ} searchData={searchData} searchDataInsert={searchDataInsert} masterData={masterData} processSeq={processSeq} /></TabPanel>
                                            <TabPanel value="2"><Tab02 cadastralSeq={tabData?.CADASTRAL_SEQ} searchData={searchData} searchDataInsert={searchDataInsert} masterData={masterData} processSeq={processSeq} /></TabPanel>
                                            <TabPanel value="3"><Tab03 cadastralSeq={tabData?.CADASTRAL_SEQ} searchData={searchData} searchDataInsert={searchDataInsert} masterData={masterData} processSeq={processSeq} /></TabPanel>
                                        </TabContext>
                                    </Box>
                                )
                                :
                                null
                    }
                </Paper>
            </Grid>
        </Grid >
    )
}