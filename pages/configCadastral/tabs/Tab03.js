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
    Tooltip
} from "@mui/material";
//SERVICES
import { cadastralImageByCadastralSeq } from "@/service/sva";
import { getTitleByPK } from '@/service/mas/title';
import { useSession } from 'next-auth/react';
import { getStatus } from '@/service/mas/status';
import { getFile } from '@/service/upload';
//LIBRALIE
import { filterRecordStatus, getCookie, isNotEmpty } from "@/lib/datacontrol";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { numberWithCommas } from "@/lib/outputControl"
import Image from 'next/image';
//ICONS
import CloseIcon from '@mui/icons-material/Close';


import CheckCircleIcon from '@mui/icons-material/CheckCircle';
export default function Tab03(props) {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [cadastralImageData, setCadastralImageData] = React.useState([]);
    const [advancedExampleOpen, setAdvancedExampleOpen] = React.useState(false);
    const { data } = useSession();
    const [imageObj, setImageObj] = React.useState([]);

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

    console.log(cadastralImageData, "cadastralImageData");
    React.useEffect(() => {
        _createNewData()
    }, []);

    const _createNewData = async (data) => {
        let cadastralImageData = await cadastralImageByCadastralSeq(10000010)
        console.log(cadastralImageData, "getMasterDatacadastralImageData");
        cadastralImageData = filterRecordStatus(cadastralImageData.rows, "N")
        for (let i in cadastralImageData) {
            let dataItems = cadastralImageData[i]
            dataItems.CADASTRAL_IMAGE_FULL_NAME = dataItems.CADASTRAL_IMAGE_FNAME + " " + dataItems.CADASTRAL_IMAGE_LNAME
            let resGetFile = await getFile(dataItems.IMAGE_PATH);
            console.log(resGetFile,"resGetFile");
            dataItems['FILE_STATUS'] = resGetFile.status;
            if (resGetFile.status) {
                dataItems['FILE_DATA'] = `data:image/*;base64,${resGetFile.fileAsBase64}`;
            } else {
                dataItems['FILE_DATA'] = "/img_not_found.png"
            }
            cadastralImageData.push(dataItems)
        }
        setCadastralImageData(cadastralImageData)
    }

    const openImageUrl = async (file) => {
        console.log(file, "file");
        // console.log("tesrt");
        if (file.FILE_STATUS) {
            let arr = [];
            // { ...slides[0], title: "Puppy in sunglasses", description: "Mollie Sivaram" }
            let obj = { src: file.FILE_DATA, title: `${file.IMAGE_PNAME} (${file.IMAGE_PNO})` };
            console.log(obj, "file");
            arr.push(obj);
            console.log(arr, "imageObj");
            setImageObj(arr);
            setAdvancedExampleOpen(true);
        }
    };
    return (
        <Grid container>
            {imageObj.length != 0 && <Lightbox
                open={advancedExampleOpen}
                close={() => setAdvancedExampleOpen(false)}
                styles={{
                    root: {
                        "--yarl__color_backdrop": "rgba(192, 192, 192, 1)",
                        "--yarl__slide_title_color": "rgba(0, 0, 0, 0.7)",
                    },
                    thumbnail: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid #ccc",
                    },
                    captionsTitleContainer: {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        border: "1px solid #ccc",
                    },
                    captionsDescriptionContainer: {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        // border: "1px solid #ccc",
                    },
                    captionsDescription: {
                        backgroundColor: "rgba(255, 255, 255, 0.0)",
                        color: "rgba(0, 0, 0, 0.7)",
                    }
                }}
                slides={imageObj}
                plugins={[Captions, Fullscreen, Thumbnails, Zoom]}
                zoom={{
                    scrollToZoom: true,
                }}
                carousel={{
                    preload: 1,
                    finite: true
                }}
            />}
            <Grid item xs={12}>
                <React.Fragment>
                    <TableContainer>
                        <Table sx={{ minWidth: 650, width: "100%", border: '1px solid ' }} size="small" stickyHeader >
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ลำดับ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">ชื่อไฟล์ภาพ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">จำนวนไฟล์ภาพ</Typography></TableCell>
                                    <TableCell style={{ width: '200px', wordWrap: 'break-word' }} sx={{ borderRight: '1px solid ', borderBottom: '1px solid ', background: 'linear-gradient(95deg, rgba(255,255,232,1) 0%, rgba(191,239,205,1) 100%)' }}><Typography variant="subtitle1">รายละเอียดไฟล์ภาพ</Typography></TableCell>
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
                                                        <TableCell style={{ width: "25%" }} align="left">
                                                            <Tooltip title="ดูรูปภาพ">
                                                                <IconButton onClick={() => { openImageUrl(el) }}>
                                                                    <Image alt={el.IMAGE_PNAME} src={el.FILE_DATA} width={50} height={70.5} />
                                                                </IconButton>
                                                            </Tooltip>
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
                                                        <TableCell style={{ width: "25%" }} align="left">
                                                            <Tooltip title="ดูรูปภาพ">
                                                                <IconButton onClick={() => { openImageUrl(el) }}>
                                                                    <Image alt={el.IMAGE_PNAME} src={el.FILE_DATA} width={50} height={70.5} />
                                                                </IconButton>
                                                            </Tooltip>
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