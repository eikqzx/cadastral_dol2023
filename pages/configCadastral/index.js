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
import { getLandOfficeByPK } from "@/service/mas/landOffice";
import { cadastralImage10XByConditionParcelNoTo } from "@/service/sva";
export default function IndexConfigCadastral(props) {
    const [searchData, setSearchData] = React.useState([]);
    const [createDataList, setCreateDataList] = React.useState([]);
    const [tabData, setTapData] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('');
    const [processSeq, setProcessSeq] = React.useState(102)
    const [userData, setUserData] = React.useState(null);
    const [landOffice, setLandOffice] = React.useState(null);
    const [pdfData, setPdfData] = React.useState();
    const [searchParameter, setSearchParameter] = React.useState(null);
    const { data } = useSession();

    const handleChangeTabs = (event, newValue) => {
        setTapData(newValue);
    };


    // console.log(landOffice, "landOffice");
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
            setProcessSeq(seq);
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
        setPdfData(obj)
        setSearchParameter(obj)
        let data = null;
        data = await cadastralImage10XByConditionParcelNoTo(obj);
        data = data.rows
        console.log(data, "onSearchNew124");
        setSearchData(data)
    }

    let seq = []
    {
        seq.CADASTRAL_SEQ = 890000002566779
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
                            <Search provinceSeq={landOffice?.PROVINCE_SEQ} landOfficeSeq={landOffice?.LANDOFFICE_SEQ} disabled={['licensePage', 'fileNo', 'parcelNO', 'landNo']} onSearch={onSearchNew} onReset={setSearchData} />
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            }
            <Grid item xs={2} md={1}>
                <SideTreeView data={searchData} setTapData={setTapData} process={processSeq} />
            </Grid>
            <Grid item xs={10} md={11}>
                <Paper sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tabData}>
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
                                    <Tab label="แปลงต้นร่าง" value="1" />
                                    <Tab label="ผู้ขอรังวัดต้นร่าง" value="2" />
                                    <Tab label="รูปภาพต้นร่าง" value="3" />
                                </TabList>
                            </Box>
                            <TabPanel value="1"><Tab01 searchData={searchData} /></TabPanel>
                            <TabPanel value="2"><Tab02 searchData={searchData} /></TabPanel>
                            <TabPanel value="3"><Tab03 searchData={searchData} /></TabPanel>
                        </TabContext>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}