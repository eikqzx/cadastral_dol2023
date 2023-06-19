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
import { filterRecordStatus, getCookie, isNotEmpty, formatPIDString } from "@/lib/datacontrol";
import { numberWithCommas } from "@/lib/outputControl"
//COMPONENTS
import { confirmDialog } from "@/pages/components/confirmDialog";
import DialogTab01 from "@/pages/configCadastral/dialog/dialogTab01"
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
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [cadastralData, setCadastralData] = React.useState([]);
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

    console.log(cadastralData, "cadastralData");
    React.useEffect(() => {
        if (props.searchData) {
            _createNewData(props.searchData)
        }
    }, [props.searchData]);

    const _createNewData = async (data) => {
        console.log(data, "data_createNewDataTab01");
        let cadastralData = await getCadastralByPK(data[0].CADASTRAL_SEQ)
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


    return (
        <Grid>
            <Grid item xs={12}>
                {openDialog && <DialogTab01 open={openDialog} close={() => (setOpenDialog(false))} onSubmit={handleChange} cadastralData={cadastralData} />}
                <React.Fragment>
                    <TableContainer>
                        <Table sx={{ minWidth: 650, width: '100%', border: '1px solid ' }} size="small" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">เลขที่ดิน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">โซน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางศูนย์กำเนิด 1</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางศูนย์กำเนิด 2</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางตามมาตราส่วน (ศูนย์กำเนิด)</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อระวางภาพถ่ายทางอากาศ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขระวางแผนที่ 1:50000 </Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางแผนที่ 1:50000</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเลขแผ่นของระวางตามมาตราส่วน</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">รหัสมาตราส่วน (รูปแผนที่)</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">รหัสมาตราส่วน (ระวาง)</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">จำนวนแปลงที่ดินในต้นร่าง</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">จำนวนรูปภาพของต้นร่าง</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">หมายเหตุ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">สถานะข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อผู้สร้างข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">วันที่สร้างข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อผู้ปรับปรุงข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">วันที่ปรับปรุงข้อมูล</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">สถานะการยกเลิก</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ผู้ยกเลิก</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">สาเหตุการยกเลิก</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">สถานะเป็นของงานยกเลิก</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ต้นร่างมีการสูญหาย</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับที่รับเรื่องรังวัด</Typography></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cadastralData.length > 0 &&
                                    cadastralData?.map((el, index) => {
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
                                                        onClick={() => {
                                                            confirmDialog.createDialog(
                                                                `ต้องการแก้ไขข้อมูลต้นร่าง หรือไม่ ?`,
                                                                () => { handleChange(el) }
                                                            );
                                                        }}
                                                    >
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.ZONE_LAND}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_ORIGINMAP1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_ORIGINMAP2}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_ORIGINMAP3}
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
                                                            {el.SCALE_MAP_SEQ}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.SCALE_RAWANG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_QTY}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_IMAGE_QTY}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_NOTE}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.RECORD_STATUS == "N" ? "ปกติ" : el.RECORD_STATUS == "C" ? "ยกเลิก" : "ลบ"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {formatPIDString(el.CREATE_USER)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {/* {el.CREATE_DTM} */}
                                                            {el.CREATE_DTM ? dayjs(el.CREATE_DTM).format("DD MMMM BBBB") : "-"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {formatPIDString(el.LAST_UPD_USER)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {/* {el.LAST_UPD_DTM} */}
                                                            {el.LAST_UPD_DTM ? dayjs(el.LAST_UPD_DTM).format("DD MMMM BBBB") : "-"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CANCEL_FLAG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CANCEL_USER}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CANCEL_CAUSE}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CANCELJOB_FLAG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.LOST_FLAG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.SURVEYJOB_SEQ}
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
                                                                `ต้องการแก้ไขข้อมูลต้นร่าง หรือไม่ ?`,
                                                                () => { handleChange(el) }
                                                            );
                                                        }}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {index + 1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_NO}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.ZONE_LAND}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_ORIGINMAP1}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_ORIGINMAP2}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_ORIGINMAP3}
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
                                                            {el.SCALE_MAP_SEQ}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.SCALE_RAWANG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_LAND_QTY}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_IMAGE_QTY}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CADASTRAL_NOTE}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.RECORD_STATUS == "N" ? "ปกติ" : el.RECORD_STATUS == "C" ? "ยกเลิก" : "ลบ"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {formatPIDString(el.CREATE_USER)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {/* {el.CREATE_DTM} */}
                                                            {el.CREATE_DTM ? dayjs(el.CREATE_DTM).format("DD MMMM BBBB") : "-"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {formatPIDString(el.LAST_UPD_USER)}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {/* {el.LAST_UPD_DTM} */}
                                                            {el.LAST_UPD_DTM ? dayjs(el.LAST_UPD_DTM).format("DD MMMM BBBB") : "-"}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CANCEL_FLAG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CANCEL_USER}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CANCEL_CAUSE}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.CANCELJOB_FLAG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.LOST_FLAG}
                                                        </TableCell>
                                                        <TableCell style={{ width: '200px', wordWrap: 'break-word' }} align="left">
                                                            {el.SURVEYJOB_SEQ}
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
                                        count={isNaN(Math.ceil(cadastralData?.length / rowsPerPage)) ? 0 : Math.ceil(cadastralData?.length / rowsPerPage)}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography fontSize={14}>
                                        {cadastralData?.length > 0 &&
                                            "จำนวนรายการทั้งหมด " + numberWithCommas(cadastralData.length) + " รายการ"}
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