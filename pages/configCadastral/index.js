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
//COMPONENTS
import Search from "../components/search/search";
import SnackBarDiaLog from "../components/snackbarV2";
import SideTreeView from "../components/sideTreeView";
import Tab01 from "./tabs/Tab01";
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
    const [tabData, setTapData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('');
    const [processSeq, setProcessSeq] = React.useState(102)
    const [userData, setUserData] = React.useState(null);
    const [landOffice, setLandOffice] = React.useState(null);
    const [pdfData, setPdfData] = React.useState();
    const [searchParameter, setSearchParameter] = React.useState(null);
    const { data } = useSession();


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
    // console.log(userData,"userData");
    // console.log(processSeq, "processSeq");

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
            <Grid item xs={2} md={2}>
                <SideTreeView data={searchData} setTapData={setTapData} process={processSeq} />
            </Grid>
            <Grid item xs={10} md={10}>
                <Paper sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }}>
                    <Tab01 tabData={tabData} searchData={searchData} onSearch={onSearchNew} pdfData={pdfData} searchParameter={searchParameter} processSeq={processSeq} />
                </Paper>
            </Grid>
        </Grid>
    )
}