import React from "react";
import {
    Grid,
    Tab,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider
} from "@mui/material";

import { TabContext, TabList, TabPanel } from '@mui/lab';
//COMPONENTS
import Search from "../components/search/search";
import SearchJob2 from "../components/search/search_2";
import { confirmDialog } from "../components/confirmDialog";
// import CreateList from "./components/createList";
import SnackBarDiaLog from "../components/snackbarV2";
import SideTreeView from "../components/sideTreeView";
//ICONS
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//SERVICES
import { getParcelImageByCondition } from "@/service/evd/parcelImage";
import { getParcelLandImageByCondition } from "@/service/evd/parcelLandImage";
import { getCondoRoomImageByCondition } from "@/service/evd/condoRoomImage";
import { useRouter } from "next/router";
import { getPrintPlateType } from "@/service/mas/printPlateType";
import { filterRecordStatus, getCookie, isNotEmpty } from "@/lib/datacontrol";
import { decode } from "next-base64";
import { getParcelHSFSByCondition, getParcelHSFSByPK, insParcelHSFS } from "@/service/evd/parcelHSFS";
import { getParcelLandHSFSByConditionParcelLandNo, getParcelLandHSFSByConditionParcelLandSurveyNo, getParcelLandHSFSByPK, insParcelLandHSFS, parcelLandHSFSFolderSeqParcelLandNoNextVal, parcelLandHSFSFolderSeqParcelLandSurveyNoNextVal, getParcelLandHSFSByCondition, parcelLandHSFSByConditionParcelLandSurveyNo, parcelLandHSFSByConditionParcelLandNo } from "@/service/evd/parcelLandHsfs";
import { getCondoRoomHSFSByPK, getcondoRoomHSFSByCondition, insCondoRoomHSFS } from "@/service/evd/condoRoomHSFS";
import { useSession } from "next-auth/react";
import { getLandOfficeByPK } from "@/service/mas/landOffice";
import { useDispatch, useSelector } from 'react-redux';
import * as jobRedux from "./../../store/feature/job"
import { getCondoHSFSByCondition } from "@/service/evd/condoHSFS";
import Tab1 from "./tab/tab1";

var disPacth
var state

export default function IndexAccountControl(props) {
    const [valueTab, setValueTab] = React.useState('1');
    const [docType, setDocType] = React.useState(1);
    const [searchData, setSearchData] = React.useState([]);
    const [createDataList, setCreateDataList] = React.useState([]);
    const [tabData, setTapData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('');
    const [printplateTypeData, setPrintplateTypeData] = React.useState([]);
    const [processSeq, setProcessSeq] = React.useState(101)
    const [userData, setUserData] = React.useState(null);
    const [landOffice, setLandOffice] = React.useState(null);
    const [pdfData, setPdfData] = React.useState();
    const [condoObj, setCondoObj] = React.useState(null);
    const { data } = useSession();

    disPacth = useDispatch();
    state = useSelector(state => state.job.value);

    console.log(state, "state Tab");

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
            console.log(seq, "seq");
            setProcessSeq(seq);
        }
    }, [])

    React.useEffect(() => {
        setTapData([]);
        setSearchData([])
    }, [state])

    React.useEffect(() => {
        setUserData(data?.user);
    }, [data])

    React.useEffect(() => {
        _reqLandOffice(userData?.LANDOFFICE_SEQ);
    }, [userData])
    // console.log(userData,"userData");
    // console.log(processSeq, "processSeq");

    const reqPrintplateType = async () => {
        let res = await getPrintPlateType();
        console.log(res, "reqPrintplateType");
        setPrintplateTypeData(filterRecordStatus(res.rows));
    }

    const handleChange = (event, newValue) => {
        setValueTab(newValue);
        setDocType(newValue);
        setTapData([]);
        setSearchData([]);
    };

    const onSearchNew = async (obj) => {
        console.log(obj, "obj_onSearch");
        setPdfData(obj)
        let data = null;
        if (state == 1) {

        } else {

        }
    }

    React.useEffect(() => {
        reqPrintplateType();
    }, [])

    return (
        <Grid container spacing={0.5} py={7.5}>
            <SnackBarDiaLog open={open} message={message} type={type} handleClose={() => setOpen(false)} />
            <TabContext value={valueTab}>
                <Grid item xs={12}>
                    <Paper>
                        <TabList
                            onChange={handleChange}
                            scrollButtons="auto"
                            allowScrollButtonsMobile
                            sx={{
                                '& .MuiTabs-indicator': { backgroundColor: "#5BB318 !important" },
                                '& .Mui-selected': { color: "#5BB318 !important" },
                                background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%) !important',
                            }}
                        >
                            {
                                printplateTypeData.length !== 0 && printplateTypeData.map((item, index) => {
                                    return <Tab key={index} label={item.PRINTPLATE_TYPE_ABBR} value={String(item.PRINTPLATE_TYPE_SEQ)} />
                                })
                            }
                        </TabList>
                    </Paper>
                </Grid>
                {/* ==================================Search===================== */}
                {
                    state == 1 &&
                    <Grid item xs={12}>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%) !important',
                                }}
                            >
                                <Typography >ค้นหารายการบัญชีคุม เบิก-จ่าย</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Search provinceSeq={landOffice?.PROVINCE_SEQ} landOfficeSeq={landOffice?.LANDOFFICE_SEQ} disabled={['licensePage', 'fileNo', 'parcelNO', 'landNo']} printplateTypeSeq={docType} onSearch={onSearchNew} onReset={setSearchData} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                }
                {
                    state == 2 &&
                    <Grid item xs={12}>
                        <Accordion defaultExpanded={true}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                sx={{
                                    background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%) !important',
                                }}
                            >
                                <Typography >ค้นหารายการบัญชีคุม เบิก-จ่าย เอกสารสิทธิ์</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <SearchJob2 provinceSeq={landOffice?.PROVINCE_SEQ} landOfficeSeq={landOffice?.LANDOFFICE_SEQ} disabled={['licensePage', 'fileNo', 'parcelNO', 'landNo']} printplateTypeSeq={docType} onSearch={onSearchNew} onReset={setSearchData} />
                            </AccordionDetails>
                        </Accordion>
                    </Grid>
                }
                <Grid item xs={2} md={2}>
                    <SideTreeView data={searchData} setTapData={setTapData} process={processSeq} state={state} />
                </Grid>
                {
                    state == 1 && <Grid item xs={10} md={10}>
                        <Paper>
                        <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="1"><Tab1/></TabPanel>
                            {/* <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="1"><Tab01 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="2"><Tab02 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="3"><Tab03 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="4"><Tab04 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="5"><Tab05 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="10"><Tab06 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="20"><Tab07 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel> */}
                        </Paper>
                    </Grid>
                }
                {
                    state == 2 &&
                    <Grid item xs={10} md={10}>
                        <Paper>
                            {/* <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="1"><Tab01_2 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="2"><Tab02_2 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="3"><Tab03_2 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="4"><Tab04_2 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="5"><Tab05_2 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="10"><Tab06_2 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel>
                            <TabPanel sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }} value="20"><Tab07_2 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} /></TabPanel> */}
                        </Paper>
                    </Grid>
                }
            </TabContext>

            {/* ====================================================================== */}
        </Grid>
    )
}