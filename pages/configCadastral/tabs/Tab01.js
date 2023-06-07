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
import { getCadastralLandByCadastralSeq } from "@/service/sva";
import { useSession } from 'next-auth/react';
//LIBRALIE
import { filterRecordStatus, getCookie, isNotEmpty } from "@/lib/datacontrol";
import { numberWithCommas } from "@/lib/outputControl"
export default function Tab01(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [cadastralLandData, setCadastralLandData] = React.useState([]);
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

    console.log(cadastralLandData, "cadastralLandData");
    React.useEffect(() => {
        if (props.searchData) {
            _createNewData(props.searchData)
        }
    }, [props.searchData]);
    const _createNewData = async (data) => {
        console.log(data,"data_createNewDataTab01");
        let cadastralLandData = await getCadastralLandByCadastralSeq(data[0].CADASTRAL_SEQ)
        console.log(cadastralLandData, "getMasterDatacadastralLandData");
        cadastralLandData = filterRecordStatus(cadastralLandData.rows, "N")
        setCadastralLandData(cadastralLandData)
    }
    return (
        <Grid>
            <Grid item xs={12}>
                <React.Fragment>
                    <TableContainer>
                        <Table sx={{ minWidth: 650, width: '100%', border: '1px solid ' }} size="small" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">เลขที่ดิน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางศูนย์กำเนิด 1</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางศูนย์กำเนิด 2</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางตามมาตราส่วน (ศูนย์กำเนิด)</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อระวางภาพถ่ายทางอากาศ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางแผนที่ 1:50000 </Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางแผนที่ 1:50000</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางตามมาตราส่วน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">สถานะแปลงคง</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cadastralLandData.length > 0 &&
                                    cadastralLandData?.map((el, index) => {
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
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >{el.CADASTRAL_LAND_NO}</TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
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
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} >{el.CADASTRAL_LAND_NO}</TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
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
                                        count={isNaN(Math.ceil(cadastralLandData?.length / rowsPerPage)) ? 0 : Math.ceil(cadastralLandData?.length / rowsPerPage)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography fontSize={14}>
                                        {cadastralLandData?.length > 0 &&
                                            "จำนวนรายการทั้งหมด " + numberWithCommas(cadastralLandData.length) + " รายการ"}
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