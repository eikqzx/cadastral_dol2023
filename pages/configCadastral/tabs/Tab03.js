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
import { cadastralImageByCadastralSeq } from "@/service/sva";
import { getLandOffice } from '@/service/mas/landOffice';
import { getTitleByPK } from '@/service/mas/title';
import { useSession } from 'next-auth/react';
//LIBRALIE
import { filterRecordStatus, getCookie, isNotEmpty } from "@/lib/datacontrol";
import { numberWithCommas } from "@/lib/outputControl"
export default function Tab03(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [cadastralImageData, setCadastralImageData] = React.useState([]);
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const { data } = useSession();

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

    console.log(props?.searchData, "Tab03");
    console.log(cadastralImageData, "cadastralImageData");
    React.useEffect(() => {
        if (Array.isArray(props?.searchData)) {
            if (props?.searchData.length != 0) {
                let filterData = props?.searchData?.filter(item => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ);
                console.log(filterData, "filterData");
                if (filterData.length != 0) {
                    getMasterData(filterData[0]);
                }
            }
        }
        _createNewData()
    }, [props?.searchData]);

    const getMasterData = async (data) => {
        console.log(data, "getMasterData");
        // _createNewData(data.CADASTRAL_SEQ)
        if (data != undefined) {
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ);
            setSheetcode(data.SHEETCODE);
            setBoxNo(data.BOX_NO.toString().padStart(2, '0'));
            setNumofsurveyQty(data?.NUMOFSURVEY_QTY ?? "-");
            setCadastralNo(data.CADASTRAL_NO);
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");

        }
    }

    const _createNewData = async (data) => {
        let cadastralImageData = await cadastralImageByCadastralSeq(10000010)
        console.log(cadastralImageData, "getMasterDatacadastralImageData");
        cadastralImageData = filterRecordStatus(cadastralImageData.rows, "N")
        for (let i in cadastralImageData) {
            let dataItems = cadastralImageData[i]
            dataItems.CADASTRAL_IMAGE_FULL_NAME = dataItems.CADASTRAL_IMAGE_FNAME + " " + dataItems.CADASTRAL_IMAGE_LNAME
            cadastralImageData.push(dataItems)
        }
        setCadastralImageData(cadastralImageData)
    }
    return (
        <Grid>
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
                <Grid item xs={3} md={3}>
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
                <Grid item xs={3} md={3}>
                    <Grid container>
                        <Grid item >
                            <Typography>ครั้งที่รังวัด:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{numofsurveyQty}&nbsp;</Typography>
                            {/* <IconButton size='small' disabled={numofsurveyQty == "-" || checkCanEdit} onClick={() => { setOpenEdit(props?.tabData) }}><Edit /></IconButton> */}
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
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <React.Fragment>
                    <TableContainer>
                        <Table sx={{ minWidth: 650, width: "100%", border: '1px solid ' }} size="small" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อไฟล์ภาพ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">จำนวนไฟล์ภาพ</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cadastralImageData.length > 0 &&
                                    cadastralImageData?.map((el, index) => {
                                        if (rowsPerPage === -1) {
                                            return (
                                                <React.Fragment key={index}>
                                                    <TableRow
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: '#ECF2FF !important',
                                                            },
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >{el.IMAGE_PNAME}</TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.IMAGE_PNO}
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
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                         <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >{el.IMAGE_PNAME}</TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.IMAGE_PNO}
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })
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
                                        count={isNaN(Math.ceil(cadastralImageData?.length / rowsPerPage)) ? 0 : Math.ceil(cadastralImageData?.length / rowsPerPage)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography fontSize={14}>
                                        {cadastralImageData?.length > 0 &&
                                            "จำนวนรายการทั้งหมด " + numberWithCommas(cadastralImageData.length) + " รายการ"}
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