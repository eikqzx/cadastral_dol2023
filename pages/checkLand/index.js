import React from "react";
import {
    Grid,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider,
    Button
} from "@mui/material";
import SideTreeView from "../components/sideTreeView";
import Search from "../components/search/search";
import SnackBarDiaLog from "../components/snackbarV2";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSession } from "next-auth/react";
import { ciracoreImage10XByConditionCadastralNoTo, getAllCiracoreImage } from "@/service/sva_ciracore";
import { getLandOfficeByPK } from "@/service/mas/landOffice";
import { isNotEmpty } from "@/lib/datacontrol";
import { useRouter } from "next/router";
import { decode } from "next-base64";
// import Tab1 from "./tab/tab1";

export default function IndexScanner() {
    const [searchData, setSearchData] = React.useState([]);
    const [tabData, setTapData] = React.useState([]);
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
            <Grid item xs={2} md={2}>
                <SideTreeView data={searchData} setTapData={setTapData}
                    process={processSeq}
                />
            </Grid>
            <Grid item xs={10} md={5} >
                <Paper sx={{ height: "69vh", flexGrow: 1, overflowY: 'auto', marginBottom: '8px' }}>
                    Map
                </Paper>
                <Paper sx={{ height: "30vh", flexGrow: 1, overflowY: 'auto' }}>
                    List
                </Paper>
            </Grid>
            <Grid item xs={10} md={5}>
                <Paper sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }}>
                    Image
                </Paper>
            </Grid>
        </Grid>
    )
}
