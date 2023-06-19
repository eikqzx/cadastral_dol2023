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
import { filterRecordStatus, getCookie, isNotEmpty, formatPIDString } from "@/lib/datacontrol";
import { numberWithCommas } from "@/lib/outputControl"
//COMPONENTS
import { confirmDialog } from "@/pages/components/confirmDialog";
import DialogTab02 from "@/pages/configCadastral/dialog/dialogTab02"
import dayjs from "dayjs";
import budhaEra from "dayjs/plugin/buddhistEra"
import thDate from 'dayjs/locale/th'
dayjs.extend(budhaEra)
dayjs.locale(thDate)
export default function Tab02(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [cadastralLandData, setCadastralLandData] = React.useState([]);
    const { data } = useSession();
    const [openDialog, setOpenDialog] = React.useState(false);

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
        console.log(data, "data_createNewDataTab02");
        let cadastralLandData = await getCadastralLandByCadastralSeq(data[0].CADASTRAL_SEQ)
        // let cadastralLandData = await getCadastralLandByCadastralSeq(890000002563837)
        console.log(cadastralLandData, "getMasterDatacadastralLandData");
        cadastralLandData = filterRecordStatus(cadastralLandData.rows, "N")
        setCadastralLandData(cadastralLandData)
    }
    const handleChange = async () => {
        setOpenDialog(true)
    }
    return (
        <Grid>
            <Grid item xs={12}>
                {openDialog && <DialogTab02 open={openDialog} close={() => (setOpenDialog(false))} onSubmit={handleChange} cadastralLandData={cadastralLandData} masterData={props?.masterData} />}
                <React.Fragment>
                    <TableContainer>
                        <Table sx={{ minWidth: 650, width: '100%', border: '1px solid ' }} size="small" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับแปลง</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">โซน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางศูนย์กำเนิด 1</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางศูนย์กำเนิด 2</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางตามมาตราส่วน (ศูนย์กำเนิด)</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">เลขที่ดิน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อระวางภาพถ่ายทางอากาศ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางแผนที่ 1:50000 </Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางแผนที่ 1:50000</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางตามมาตราส่วน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับที่มาตราส่วน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">สถานะแปลงคง</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเหตุ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">สถานะข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อผู้สร้างข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">วันที่สร้างข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อผู้ปรับปรุงข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">วันที่ปรับปรุงข้อมูล</Typography></TableCell>
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
                                                        onClick={() => {
                                                            confirmDialog.createDialog(
                                                                `ไม่พบข้อมูลทะเบียนของเอกสารสิทธิ์เลขที่ ${el.PARCEL_NO} ต้องการเพิ่มข้อมูลทะเบียน หรือไม่ ?`,
                                                                () => { handleChange(el) }
                                                            );
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.LAND_ORDER}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.ZONE_LAND}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_ORIGINMAP1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_ORIGINMAP2}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_ORIGINMAP3}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.AIRPHOTOMAP_NAME}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.AIRPHOTOMAP1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.AIRPHOTOMAP2}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.AIRPHOTOMAP3}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.SCALE_SEQ}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.STATIC_FLAG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NOTE}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.RECORD_STATUS == "N" ? "ปกติ" : el.RECORD_STATUS == "C" ? "ยกเลิก" : "ลบ"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {formatPIDString(el.CREATE_USER)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CREATE_DTM ? dayjs(el.CREATE_DTM).format("DD MMMM BBBB") : "-"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {formatPIDString(el.LAST_UPD_USER)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.LAST_UPD_DTM ? dayjs(el.LAST_UPD_DTM).format("DD MMMM BBBB") : "-"}
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
                                                                `ไม่พบข้อมูลทะเบียนของเอกสารสิทธิ์เลขที่ ${el.PARCEL_NO} ต้องการเพิ่มข้อมูลทะเบียน หรือไม่ ?`,
                                                                () => { handleChange(el) }
                                                            );
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.LAND_ORDER}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.ZONE_LAND}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_ORIGINMAP1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_ORIGINMAP2}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_ORIGINMAP3}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.AIRPHOTOMAP_NAME}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.AIRPHOTOMAP1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.AIRPHOTOMAP2}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.AIRPHOTOMAP3}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.SCALE_SEQ}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.STATIC_FLAG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NOTE}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.RECORD_STATUS == "N" ? "ปกติ" : el.RECORD_STATUS == "C" ? "ยกเลิก" : "ลบ"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {formatPIDString(el.CREATE_USER)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CREATE_DTM ? dayjs(el.CREATE_DTM).format("DD MMMM BBBB") : "-"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {formatPIDString(el.LAST_UPD_USER)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.LAST_UPD_DTM ? dayjs(el.LAST_UPD_DTM).format("DD MMMM BBBB") : "-"}
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