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
    MenuItem
} from "@mui/material";
//SERVICES
import { getCadastralOwnerBycadastralSeq } from "@/service/sva";
import { getTitleByPK } from '@/service/mas/title';
import { useSession } from 'next-auth/react';
//LIBRALIE
import { filterRecordStatus, getCookie, isNotEmpty } from "@/lib/datacontrol";
import { numberWithCommas } from "@/lib/outputControl"
//COMPONENTS
import { confirmDialog } from "@/pages/components/confirmDialog";
import DialogTab03 from "@/pages/configCadastral/dialog/dialogTab03"
import DialogTab03_Ins from "@/pages/configCadastral/dialog_ins/dialogTab03_ins"

export default function Tab03(props) {
    console.log(props, "props_Tab03");
    const [cadastralOwnerData, setCadastralOwnerData] = React.useState([]);
    const [cadastralSeq, setCadastralSeq] = React.useState([]);
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

    console.log(cadastralOwnerData, "cadastralOwnerData");
    console.log(cadastralSeq,"cadastralSeq");
    React.useEffect(() => {
        if (props.searchData.length != 0) {
            console.log(props.searchData, "searchData_getMasterData03");
            _createNewData(props.searchData)
        }
        else if (props.searchDataInsert.length != 0) {
            console.log(props.searchDataInsert, "searchDataInsert_getMasterData03");
            _createNewData(props.searchDataInsert)
        }
    }, [props.searchData, props.searchDataInsert]);

    const _createNewData = async (data) => {
        console.log(data, "data_createNewDataTab03");
        setCadastralSeq(data[0].CADASTRAL_SEQ ? data[0].CADASTRAL_SEQ : null)
        if (data.length > 0) {
            let cadastralOwnerData = await getCadastralOwnerBycadastralSeq(data[0].CADASTRAL_SEQ)
            console.log(cadastralOwnerData, "getMasterDatacadastralOwnerData");
            cadastralOwnerData = filterRecordStatus(cadastralOwnerData.rows, "N")
            let cadastralOwnerNewData = []
            for (let i in cadastralOwnerData) {
                let dataItems = cadastralOwnerData[i]
                console.log(dataItems,"dataItems");
                let TitleName = await getTitleByPK(dataItems.OWNER_TITLE_SEQ)
                TitleName = filterRecordStatus(TitleName.rows, "N")
                console.log(TitleName,"TitleName");
                dataItems.OWNER_FULL_NAME = TitleName[0].TITLE_NAME_TH + " " + dataItems.OWNER_FNAME + " " + dataItems.OWNER_LNAME
                cadastralOwnerNewData.push(dataItems)
            }
            setCadastralOwnerData(cadastralOwnerNewData)
        }
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
                {openDialog && <DialogTab03 open={openDialog} close={() => (setOpenDialog(false))} onSubmit={handleChange} cadastralOwnerData={cadastralOwnerData} masterData={props?.masterData} processSeq={props?.processSeq} />}
                {openDialogIns && <DialogTab03_Ins open={openDialogIns} close={() => (setOpenDialogIns(false))} onSubmit={handleChangeIns} cadastralSeq={cadastralSeq} masterData={props?.masterData} cadastralOwnerData={cadastralOwnerData} processSeq={props?.processSeq} />}
                <React.Fragment>
                    <TableContainer>
                        <Table sx={{ minWidth: 650, width: "100%", border: '1px solid ' }} size="small" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ประเภทผู้ถือกรรมสิทธิ์</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อ-นามสกุล ผู้ขอรังวัด</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cadastralOwnerData.length > 0 ?
                                    cadastralOwnerData?.map((el, index) => {
                                        if (rowsPerPage === -1) {
                                            return (
                                                <React.Fragment key={index}>
                                                    <TableRow
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: '#ECF2FF !important',
                                                            },
                                                        }}
                                                        onClick={() => {
                                                            confirmDialog.createDialog(
                                                                `ต้องการแก้ไขผู้ขอรังวัดต้นร่าง หรือไม่ ?`,
                                                                () => { handleChange(el) }
                                                            );
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >{el.OWNER_TYPE}</TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.OWNER_FULL_NAME}
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            );
                                        } else if (
                                            rowsPerPage > 0 &&
                                            index >= (curPage - 1) * rowsPerPage &&
                                            index < curPage * rowsPerPage
                                        ) {
                                            return (
                                                <React.Fragment key={index}>
                                                    <TableRow
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: '#ECF2FF !important',
                                                            },
                                                        }}
                                                        onClick={() => {
                                                            confirmDialog.createDialog(
                                                                `ต้องการแก้ไขผู้ขอรังวัดต้นร่าง หรือไม่ ?`,
                                                                () => { handleChange(el) }
                                                            );
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >{el.OWNER_TYPE}</TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.OWNER_FULL_NAME}
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })
                                    :
                                    (
                                        <TableRow
                                            sx={{
                                                '&:hover': {
                                                    backgroundColor: '#ECF2FF !important',
                                                },
                                            }}
                                            onClick={() => {
                                                if (cadastralSeq === null) {
                                                    confirmDialog.createDialog(
                                                        `ต้องทำการเพิ่มข้อมูลต้นร่างก่อน`,
                                                        () => { }
                                                    );
                                                } else {
                                                    confirmDialog.createDialog(
                                                        `ต้องการเพิ่มผู้ขอรังวัดต้นร่าง หรือไม่ ?`,
                                                        () => { handleChangeIns() }
                                                    );
                                                }
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <TableCell colSpan={19} align="center" sx={{ borderRight: '1px solid ', borderBottom: '1px solid' }}>
                                                <Typography fontStyle={'italic'} color={'red'}>
                                                    ไม่พบข้อมูล
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container>
                        <Grid item xs={12} py={1}>
                            <Grid
                                container
                                justifyContent={"flex-end"}
                                alignItems={"left"}
                                px={2}
                            >
                                <Grid item>
                                    <FormControl sx={{ width: 120 }}>
                                        <InputLabel sx={{ width: '100%' }}>จำนวนแถวต่อหน้า</InputLabel>
                                        <Select
                                            size="small"
                                            value={rowsPerPage}
                                            onChange={handleChangeRowsPerPage}
                                            label="Rows per page"
                                            sx={{ width: '100%' }}
                                        >
                                            <MenuItem value={10}>10</MenuItem>
                                            <MenuItem value={50}>50</MenuItem>
                                            <MenuItem value={100}>100</MenuItem>
                                            <MenuItem value={-1}>All</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <Pagination
                                        page={curPage}
                                        onChange={_handleChangePage}
                                        color="error"
                                        count={isNaN(Math.ceil(cadastralOwnerData?.length / rowsPerPage)) ? 0 : Math.ceil(cadastralOwnerData?.length / rowsPerPage)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography fontSize={14}>
                                        {cadastralOwnerData?.length > 0 &&
                                            "จำนวนรายการทั้งหมด " + numberWithCommas(cadastralOwnerData.length) + " รายการ"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </React.Fragment>
            </Grid>
        </Grid>
    )
}