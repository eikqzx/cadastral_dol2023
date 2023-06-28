import React from "react";
import {
    Grid,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider,
    Button,
    Tab,
    Box
} from "@mui/material";
import { TabContext, TabList, TabPanel } from '@mui/lab';
//COMPONENTS
import SideTreeView from "../components/sideTreeView";
import Search from "../components/search/search";
import SnackBarDiaLog from "../components/snackbarV2";
import TabZone47Index from "./tabs/tabZone47";
import TabZone48Index from "./tabs/tabZone48";
//ICONS
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//SERVICES
import { ciracoreImage10XByConditionCadastralNoTo, getAllCiracoreImage } from "@/service/sva_ciracore";
import { getLandOfficeByPK } from "@/service/mas/landOffice";
//LIBRALIES
import { useSession } from "next-auth/react";
import { isNotEmpty } from "@/lib/datacontrol";
import { useRouter } from "next/router";
import { decode } from "next-base64";
// import Tab1 from "./tab/tab1";

export default function IndexScanner() {
    const [searchData, setSearchData] = React.useState([]);
    const [tabData, setTapData] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('');

    const [printplateTypeData, setPrintplateTypeData] = React.useState([]);
    const [userData, setUserData] = React.useState(null);
    const [landOffice, setLandOffice] = React.useState(null);
    const [pdfData, setPdfData] = React.useState();
    const [searchParameter, setSearchParameter] = React.useState(null);
    const [processSeq, setProcessSeq] = React.useState(133);
    const { data } = useSession();
    const dataUrl = useRouter().query

    const handleChangeTabs = (event, newValue) => {
        setTapData(newValue);
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

    const _reqLandOffice = async (seq) => {
        try {
            let res = await getLandOfficeByPK(seq);
            console.log(res.rows, "getLandOfficeByPK");
            await setLandOffice(res.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const onSearchNew = async (obj) => {
        console.log(obj, "obj_onSearch");
        obj.PROCESS_SEQ_ = 102;
        obj.RECORD_STATUS = "A"
        setPdfData(obj)
        setSearchParameter(obj);
        let data = null;
        data = await ciracoreImage10XByConditionCadastralNoTo(obj);
        // data = await getAllCiracoreImage();
        data = data.rows
        console.log(data, "onSearchNew");
        setSearchData(data)
    }

    console.log(landOffice, "landOffice");


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
            <Grid item xs={12} md={2}>
                <SideTreeView data={searchData} setTapData={setTapData}
                    process={processSeq}
                />
            </Grid>
            <Grid item xs={12} md={10}>
                <Paper sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }}>
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
                                <Tab label="โซน 47" value="1" />
                                <Tab label="โซน 48" value="2" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Grid item xs={12}>
                                <TabZone47Index />
                            </Grid>
                        </TabPanel>
                        <TabPanel value="2">
                            <Grid item xs={12}>
                                <TabZone48Index />
                            </Grid>
                        </TabPanel>
                    </TabContext>
                </Paper>
            </Grid>
        </Grid>
    )
}
