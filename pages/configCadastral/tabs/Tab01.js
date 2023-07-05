import React from "react";
import {
    Grid,
    Paper,
    Typography,
    IconButton,
    Divider,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableFooter,
    TableCell,
    TableRow,
    Pagination,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Chip,
    Avatar
} from "@mui/material";
//SERVICES
import { getCadastralByPK } from "@/service/sva";
import { useSession } from 'next-auth/react';
//LIBRALIE
import { filterRecordStatus, getCookie, isNotEmpty, formatMiddlePIDString } from "@/lib/datacontrol";
import { numberWithCommas } from "@/lib/outputControl"
//COMPONENTS
import { confirmDialog } from "@/pages/components/confirmDialog";
import DialogTab01 from "@/pages/configCadastral/dialog/dialogTab01"
import DialogTab01_Ins from "@/pages/configCadastral/dialog_ins/dialogTab01_ins"
import dayjs from "dayjs";
import budhaEra from "dayjs/plugin/buddhistEra"
import thDate from 'dayjs/locale/th'
dayjs.extend(budhaEra)
dayjs.locale(thDate)
//ICONS
import { green, red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
export default function Tab01(props) {
    console.log(props, "props_Tab01");
    console.log(props.tabData, "propstabData_Tab01");
    const [cadastralData, setCadastralData] = React.useState([]);
    const { data } = useSession();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDialogIns, setOpenDialogIns] = React.useState(false);

    const [curPage, setCurPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setCurPage(1); // Reset current page to 1
    };

    const _handleChangePage = (event, value) => {
        //console.log(value);
        setCurPage(value);
    };

    console.log(cadastralData, "cadastralData");
    React.useEffect(() => {
        if (props.tabData) {
            console.log(props.tabData, "searchData_getMasterData01");
            _createNewData(props.tabData)
        }
        else if (props.searchDataInsert.length != 0) {
            console.log(props.searchDataInsert, "searchDataInsert_getMasterData01");
            _createNewData(props.searchDataInsert)
        }
    }, [props.tabData, props.searchDataInsert]);

    const _createNewData = async (data) => {
        console.log(data, "data_createNewDataTab01");
        let cadastralData = await getCadastralByPK(data?.CADASTRAL_SEQ)
        // let cadastralData = await getCadastralByPK(1222222222)
        console.log(cadastralData, "getMasterDatacadastralData");
        cadastralData = filterRecordStatus(cadastralData.rows, "N")
        let newData = []
        for (let i in cadastralData) {
            let dataItems = cadastralData[i]
            if (dataItems.PRIVATESURVEY_FLAG == null) {
                dataItems.PRIVATESURVEY_FLAG = "-"
            } else if (dataItems.PRIVATESURVEY_FLAG == 0) {
                dataItems.PRIVATESURVEY_FLAG =
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: green[500] }}><CheckIcon /></Avatar>}
                        variant="outlined"
                    />

            }

            if (dataItems.CANCEL_FLAG == null) {
                dataItems.CANCEL_FLAG = "-"
            } else if (dataItems.CANCEL_FLAG == 0) {
                dataItems.CANCEL_FLAG =
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: green[500] }}><CheckIcon /></Avatar>}
                        label="ปกติ"
                        variant="outlined"
                    />

            } else if (dataItems.CANCEL_FLAG == 1) {
                dataItems.CANCEL_FLAG =
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: red[500] }}><ClearIcon /></Avatar>}
                        label="สูญหาย"
                        variant="outlined"
                    />
            }

            if (dataItems.CANCELJOB_FLAG == null) {
                dataItems.CANCELJOB_FLAG = "-"
            } else if (dataItems.CANCELJOB_FLAG == 0) {
                dataItems.CANCELJOB_FLAG =
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: green[500] }}><CheckIcon /></Avatar>}
                        label="ปกติ"
                        variant="outlined"
                    />

            } else if (dataItems.CANCELJOB_FLAG == 1) {
                dataItems.CANCELJOB_FLAG =
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: red[500] }}><ClearIcon /></Avatar>}
                        label="สูญหาย"
                        variant="outlined"
                    />
            }

            if (dataItems.LOST_FLAG == null) {
                dataItems.LOST_FLAG = "-"
            } else if (dataItems.LOST_FLAG == 0) {
                dataItems.LOST_FLAG =
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: green[500] }}><CheckIcon /></Avatar>}
                        label="ปกติ"
                        variant="outlined"
                    />

            } else if (dataItems.LOST_FLAG == 1) {
                dataItems.LOST_FLAG =
                    <Chip
                        avatar={<Avatar sx={{ bgcolor: red[500] }}><ClearIcon /></Avatar>}
                        label="สูญหาย"
                        variant="outlined"
                    />
            }

            newData.push(dataItems)
        }
        setCadastralData(newData)
    }

    const handleChange = async () => {
        setOpenDialog(true)
    }
    const handleChangeIns = async () => {
        setOpenDialogIns(true)
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                {/* {openDialog && <DialogTab01 open={openDialog} close={() => (setOpenDialog(false))} onSubmit={handleChange} cadastralData={cadastralData} processSeq={props?.processSeq} />} */}
                {/* {openDialogIns && <DialogTab01_Ins open={openDialogIns} close={() => (setOpenDialogIns(false))} onSubmit={handleChangeIns} cadastralData={props?.searchDataInsert} processSeq={props?.processSeq} />}            */}

                {
                    props.tabData && <DialogTab01 open={openDialog} close={() => (setOpenDialog(false))} onSubmit={handleChange} cadastralData={cadastralData} processSeq={props?.processSeq} />
                }
                {
                    props.searchDataInsert && <DialogTab01_Ins open={openDialogIns} close={() => (setOpenDialogIns(false))} onSubmit={handleChangeIns} cadastralData={props?.searchDataInsert} processSeq={props?.processSeq} />
                }
            </Grid>
        </Grid>
    )
}