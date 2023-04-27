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
import TabScanner from "./tab/tab1";

export default function IndexScanner() {
    const [searchData, setSearchData] = React.useState([]);
    const [createDataList, setCreateDataList] = React.useState([]);
    const [tabData, setTapData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [type, setType] = React.useState('');
    const [printplateTypeData, setPrintplateTypeData] = React.useState([]);
    const [processSeq, setProcessSeq] = React.useState(102)
    const [userData, setUserData] = React.useState(null);
    const [landOffice, setLandOffice] = React.useState(null);
    const [pdfData, setPdfData] = React.useState();
    const [searchParameter, setSearchParameter] = React.useState(null);
    const { data } = useSession();

    const onSearchNew = async (obj) => {
        console.log(obj, "obj_onSearch");
        setPdfData(obj)
        setSearchParameter(obj)
        let data = null;
        // data = await cadastralImage102ByConditionParcelNoTo(obj);
        // data = data.rows
        // console.log(data,"onSearchNew");
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
                            <Typography >ค้นหารายการแสกน</Typography>
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
                    <TabScanner />
                </Paper>
            </Grid>
        </Grid>
    )
}
