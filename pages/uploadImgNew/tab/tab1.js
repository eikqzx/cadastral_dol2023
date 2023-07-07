import React from 'react'
import {
    Grid,
    Tab,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider,
    Button,
    IconButton,
    Box,
    MenuList,
    MenuItem,
    Card,
    CardActionArea,
    CardMedia,
    Backdrop,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Snackbar,
    Alert,
    Stack
} from "@mui/material";
import { getLandOffice } from "@/service/mas/landOffice";
import { cadastralImage_CiraCore_, ciracoreImageByCadastralSeq, updCiracoreImage } from "@/service/sva_ciracore";
import { getFile, getFileByPath, uploadFileMultiByPath } from '@/service/upload';
import Image from 'next/image'
import { getSurveyDocType } from '@/service/mas/surveyDocTypeGroup';
import Lightbox from 'yet-another-react-lightbox';
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import CopyButton from '@/pages/components/copyButton';
import AlertUploadDialog from "../components/alertUploadDialog"
import { Edit, Save } from '@mui/icons-material';
import AutoSurveyDocType from '@/pages/components/Autocompleate/surveyDocType';
import { useSession } from 'next-auth/react';
import { cadastralImageByCadastralSeq, cadastralImagePNoByCadastralSeq, saveScanCadastralImage, updateCadastralImage } from '@/service/sva';
import ImageMui from "@mui/icons-material/Image"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DialogEditUpolad from "../components/dialogEditUpolad";

export default function Tab1(props) {
    console.log(props, "uploadNewTab");
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const [imageArrData, setImageArrData] = React.useState([]);
    const [openLightBox, setOpenLightBox] = React.useState(false);
    const [imageObj, setImageObj] = React.useState([]);
    const [uploadAlert, setUploadAlert] = React.useState(false);
    const [uploadResData, setUploadResData] = React.useState([]);
    const [uploadData, setUploadData] = React.useState([]);
    const [showAutocomplete, setShowAutocomplete] = React.useState(false);
    const [surveyDocType, setSurveyDocType] = React.useState(null);
    const [cadastralImageData, setCadastralImageData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [openEdit, setOpenEdit] = React.useState(null);
    const { data } = useSession();

    const _changeSurveyDocType = (event, value) => {
        setSurveyDocType(value);
    };

    const handleClose = () => {
        setOpen(false)
    }

    console.log(openEdit, "cadastralImageData openEdit");

    const _changeSaveEditSurveyDoc = async (dataObj) => {
        let newData = { ...dataObj };
        let surveyDocTypeData = { ...surveyDocType };
        delete newData.FILE_DATA;
        delete newData.FILE_DES;
        // newData.RECORD_STATUS = "A";
        newData.SURVEYDOCTYPE_SEQ = surveyDocTypeData.SURVEYDOCTYPE_SEQ;
        newData.SURVEYDOCTYPE_NAME_TH = surveyDocTypeData.SURVEYDOCTYPE_NAME_TH;
        newData.SURVEYDOCTYPE_GROUP = surveyDocTypeData.SURVEYDOCTYPE_GROUP;
        newData.SURVEYDOCTYPE_ABBR = surveyDocTypeData.SURVEYDOCTYPE_ABBR;
        newData.SURVEYDOC_TYPE_NAME = surveyDocTypeData.SURVEYDOCTYPE_NAME_TH;
        newData.LAST_UPD_USER = data?.user?.USER_LIST_PID;
        console.log(newData, "_changeSaveEditSurveyDoc");
        // console.log(surveyDocTypeData, "_changeSaveEditSurveyDoc");
        // await updCiracoreImage(newData.CIRACORE_IMAGE_SEQ,newData);
        let mergeObj = {
            "CADASTRAL_SEQ": newData.CADASTRAL_SEQ,
            "PROCESS_SEQ_": 102,
            "STATUS_SEQ_": 101,
            "CADASTRAL_IMAGE_NOTE": null,
            "RECORD_STATUS": "A",
            "CREATE_USER": data?.user?.USER_LIST_PID
        }
        try {
            let resUpdateCiraImg = await updCiracoreImage(newData.CIRACORE_IMAGE_SEQ, newData);
            // let mergeRes = await cadastralImage_CiraCore_(mergeObj);
            // console.log(mergeRes, "mergeRes _saveGenImage");
            console.log(resUpdateCiraImg, "_changeSaveEditSurveyDoc");
            await createPageData(props?.tabData);
            await _req_getCadastralImage(props?.tabData?.CADASTRAL_SEQ);
            await setShowAutocomplete(!showAutocomplete);
            await setMessage("บันทึกสำเร็จ");
            await setOpen(true);
            await setType("success");
        } catch (error) {
            console.log(error, "_changeSaveEditSurveyDoc");
            await setMessage("เกิดข้อผิดพลาดไม่สามารถบันทึกแก้ไขได้");
            await setOpen(true);
            await setType("error");
        }
    };

    React.useEffect(() => {
        if (
            typeof props?.tabData == "object" &&
            props?.tabData.length !== 0 &&
            props?.tabData != undefined
        ) {
            getMasterData(props?.tabData);
            createPageData(props?.tabData);
            _req_getCadastralImage(props?.tabData?.CADASTRAL_SEQ);
        }
    }, [props?.tabData]);

    const getMasterData = async (data) => {
        console.log(data, "getMasterData");
        if (data != undefined) {
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(
                (item) => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ
            );
            setSheetcode(data.SHEETCODE);
            setBoxNo(data.BOX_NO.toString().padStart(2, "0"));
            setNumofsurveyQty(data?.NUMOFSURVEY_QTY ?? "-");
            setCadastralNo(data.CADASTRAL_NO);
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
        }
    };

    const createPageData = async (data) => {
        try {
            let ciracoreData = await ciracoreImageByCadastralSeq(data.CADASTRAL_SEQ);
            let ciracoreDataArr = ciracoreData.rows;
            console.log(ciracoreDataArr, "createPageData ciracoreDataArr");
            let surveydoctypeData = await getSurveyDocType();
            let surveydoctypeDataArr = surveydoctypeData.rows;
            console.log(surveydoctypeDataArr, "createPageData");
            for (let i in ciracoreDataArr) {
                let item = ciracoreDataArr[i];
                let link = <CopyButton text={item?.IMAGE_PATH} />
                // const filePath = item.IMAGE_PATH;
                // const fileName = filePath?.substring(filePath.lastIndexOf('/') + 1);
                // const directoryPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
                item['FILE_DES'] = <React.Fragment>
                    <Grid container spacing={1}>
                        <Grid item><Typography>
                            {<Grid item> JPG File{<br />}
                                Bit depth 24{<br />}
                                Resolution 300 dpi{<br />}</Grid>}
                            <Grid item>{item?.IMAGE_PATH}</Grid>
                            <Grid>{link}</Grid>
                        </Typography></Grid>
                    </Grid>
                </React.Fragment>
                item['SURVEYDOC_TYPE_NAME'] = surveydoctypeDataArr?.filter(itemDoc => itemDoc?.SURVEYDOCTYPE_SEQ == item.SURVEYDOCTYPE_SEQ)[0]?.SURVEYDOCTYPE_NAME_TH ?? "ไม่พบข้อมูล";
                // item['FILE_NAME'] = fileName;
                // item['DIRECTORY_PATH'] = directoryPath;
                let folderNumber = String(item.LANDOFFICE_SEQ).padStart(5, '0');
                let pathFileString = `U:\\${folderNumber}\\${item.IMAGE_FILENAME}.${item.IMAGE_EXTENSION}`;
                let file = await getFileByPath(pathFileString);
                console.log(file, "createPageData file");
                if (file.status) {
                    item["FILE_OLD_PATH"] = file.path
                    item["FILE_DATA"] = `data:image/*;base64,${file.fileAsBase64}`
                } else {
                    item["FILE_OLD_PATH"] = null
                    item["FILE_DATA"] = "/img_not_found.png"
                }
            }
            setImageArrData([]);
            setImageArrData(ciracoreDataArr);
        } catch (error) {
            console.log(error, "error createPageData");
        }
    }

    const _req_getCadastralImage = async (seq) => {
        let res = await cadastralImageByCadastralSeq(seq);
        let resFilter = res?.rows?.filter(item => item.RECORD_STATUS == "N");
        let resDocData = await getSurveyDocType();
        let arrDocData = resDocData.rows
        console.log(resFilter, "_req_getCadastralImage");
        for (let i in resFilter) {
            let item = resFilter[i];
            let newPath = `S:${item.IMAGE_PATH}`
            let pathReplace = newPath.replace(/\//g, '\\')
            console.log(pathReplace,"pathReplace _req_getCadastralImage");
            let resGetFile = await getFileByPath(pathReplace);
            let docArr = arrDocData.filter((doc) => doc.SURVEYDOCTYPE_SEQ == item.SURVEYDOCTYPE_SEQ);
            item["DOC_DATA"] = docArr[0];
            console.log(resGetFile, "resGetFile");
            item['FILE_STATUS'] = resGetFile.status;
            if (resGetFile.status) {
                let link = <CopyButton text={item?.IMAGE_PATH} />
                item['FILE_DATA'] = `data:image/*;base64,${resGetFile.fileAsBase64}`;
                item['FILE_DES'] = <React.Fragment>
                    <Grid container spacing={1}>
                        <Grid item><Typography>
                            {<Grid item> JPG File{<br />}
                                Bit depth 24{<br />}
                                Resolution 300 dpi{<br />}</Grid>}
                            <Grid item>{item?.IMAGE_PATH}</Grid>
                            <Grid>{link}</Grid>
                        </Typography></Grid>
                    </Grid>
                </React.Fragment>
            } else {
                item['FILE_DATA'] = "/img_not_found.png"
                item['FILE_DES'] = ``
            }
        }
        await setCadastralImageData([]);
        await setCadastralImageData(resFilter);
    }

    const onClickImage = (objImage) => {
        console.log(objImage, "click");
        let arr = [];
        // { ...slides[0], title: "Puppy in sunglasses", description: "Mollie Sivaram" }
        let obj = { src: objImage.FILE_DATA, title: `${objImage.SURVEYDOC_TYPE_NAME} (${objImage.IMAGE_PNO})`, description: objImage.FILE_DES };
        console.log(obj, "file");
        arr.push(obj);
        console.log(arr, "imageObj");
        setImageObj(arr);
        setOpenLightBox(true);
    }

    const uploadFile = async () => {
        let newData = imageArrData;
        console.log(newData, "uploadFile");
        setUploadData(newData);
        let resUploadArr = [];
        // return
        for (let i in newData) {
            let formData = new FormData();
            let item = newData[i]
            formData.append("scanFile", item.FILE_OLD_PATH);
            formData.append("scanFile", `S:${item.IMAGE_PATH}`);
            formData.append("scanFile", 0);
            try {
                let resUpolad = await uploadFileMultiByPath(formData);
                resUploadArr.push(resUpolad);
            } catch (error) {
                console.log(error, "uploadFile trycatch");
                await setMessage("เกิดข้อผิดพลาดไม่สามารถอัปโหลดได้");
                await setOpen(true);
                await setType("error");
            }
            // console.log(resUpolad,"uploadFile");
        }
        console.log(resUploadArr, "uploadFile resUploadArr");
        const checStatusFile = resUploadArr.every(item => item.status == true);
        if (checStatusFile) {
            console.log(checStatusFile, "uploadFile checStatusFile");
            let mergeObj = {
                "CADASTRAL_SEQ": props?.tabData?.CADASTRAL_SEQ,
                "PROCESS_SEQ_": 102,
                "STATUS_SEQ_": 101,
                "CADASTRAL_IMAGE_NOTE": null,
                "RECORD_STATUS": "A",
                "CREATE_USER": data?.user?.USER_LIST_PID
            }
            let mergeRes = await cadastralImage_CiraCore_(mergeObj);
            console.log(mergeRes, "mergeRes uploadFile");
            let resCadastralImageData = await cadastralImageByCadastralSeq(props?.tabData?.CADASTRAL_SEQ);
            let resCadastralImageDataFilter = resCadastralImageData.rows.filter(item => item.RECORD_STATUS == "N")
            for (let i in resCadastralImageDataFilter) {
                let item = resCadastralImageDataFilter[i];
                try {
                    item.PROCESS_SEQ_ = 103;
                    item.STATUS_SEQ_ = 101;
                    item.LAST_UPD_USER = data?.user?.USER_LIST_PID;
                    let resUpd = await updateCadastralImage(item.CADASTRAL_IMAGE_SEQ, item);
                    console.log(resUpd,"resUpd uploadFile");
                    if (i == (resCadastralImageDataFilter.length - 1)) {
                        createPageData(props?.tabData);
                        _req_getCadastralImage(props?.tabData?.CADASTRAL_SEQ);
                        await setMessage("บันทึกสำเร็จ");
                        await setOpen(true);
                        await setType("success");
                    }
                } catch (error) {
                    console.log(error, "uploadFile trycatch");
                    await setMessage("เกิดข้อผิดพลาดไม่สามารถอัปโหลดได้");
                    await setOpen(true);
                    await setType("error");
                }
            }
            //await updateCadastralImage()
        } else {
            console.log(checStatusFile, "uploadFile checStatusFile");
            setUploadAlert(true);
            setUploadResData(resUploadArr);
        }
    }

    const handleButtonClick = () => {
        setShowAutocomplete(!showAutocomplete);
    };

    console.log(showAutocomplete, "showAutocomplete");

    const openImageUrl = async (file) => {
        console.log(file, "file");
        // console.log("tesrt");
        if (file.FILE_STATUS) {
            let arr = [];
            // { ...slides[0], title: "Puppy in sunglasses", description: "Mollie Sivaram" }
            let obj = { src: file.FILE_DATA, title: `${file.IMAGE_PNAME} (${file.IMAGE_PNO})`, description: file.FILE_DES };
            console.log(obj, "file");
            arr.push(obj);
            console.log(arr, "imageObj");
            setImageObj(arr);
            setOpenLightBox(true);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AlertUploadDialog
            createPageData={()=>{createPageData(props?.tabData)}}
            _req_getCadastralImage={()=>{_req_getCadastralImage(props?.tabData?.CADASTRAL_SEQ)}}
            open={uploadAlert} close={() => { setUploadAlert(false) }} data={uploadResData} uploadData={uploadData} />
            <Lightbox
                open={openLightBox}
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
                }}
                close={() => setOpenLightBox(false)}
                slides={imageObj}
                plugins={[Captions, Fullscreen, Thumbnails, Zoom]}
                zoom={{
                    scrollToZoom: true,
                }}
                carousel={{
                    preload: 1,
                    finite: true
                }}
            />
            {open && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>}
            {openEdit != null && <DialogEditUpolad _req_getCadastralImage={()=>{_req_getCadastralImage(props?.tabData?.CADASTRAL_SEQ)}} open={openEdit != null} close={() => (setOpenEdit(null))} data={openEdit} />}
            <Grid container>
                <Grid p={1} spacing={1} container sx={{ height: "15vh" }}>
                    <Grid item xs={3} md={5}>
                        <Grid container>
                            <Grid item>
                                <Typography>สำนักงาน: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{office}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item>
                                <Typography>หมายเลขรหัสแทนระวาง(เลขแฟ้ม):</Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{sheetcode}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item>
                                <Typography>เลขที่กล่อง:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{boxNo}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item>
                                <Grid container>
                                    <Grid item >
                                        <Typography>ครั้งที่รังวัด:</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{numofsurveyQty}&nbsp;</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={4}>
                        <Grid container>
                            <Grid item>
                                <Typography>เลขที่ต้นร่าง:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography
                                    color={"darkblue"}
                                    fontWeight={"bold"}
                                    sx={{ textDecoration: "underline" }}
                                    display="inline"
                                >
                                    &nbsp;{cadastralNo}&nbsp;
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
                <Grid container p={0.5} spacing={1}>
                    <Grid item xs={9}>
                        <Paper
                            style={{ textAlign: "center" }}
                            sx={{
                                height: "85vh",
                                border: 1,
                                borderColor: "grey.500",
                                flexGrow: 1,
                                overflowY: "auto",
                            }}
                        >
                            <Grid container style={{ textAlign: "end" }} spacing={2} p={2}>
                                <Grid item xs={12}>
                                    <Button color="success" variant='contained' onClick={uploadFile} disabled={imageArrData.length == 0}><span>
                                        <Typography>อัปโหลดไฟล์ทั้งหมด</Typography>
                                    </span></Button>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} p={1} style={{ textAlign: "center" }}>
                                {
                                    imageArrData.length !== 0 && imageArrData.map((item, index) =>
                                        <Grid item key={index} xs={12}>
                                            <Grid p={1} border={1} spacing={1} container style={{ textAlign: "center" }}>
                                                <Grid item xs={12}>
                                                    <Tooltip title="คลิกเพื่อแสดงรูปขยาย" followCursor>
                                                        <IconButton
                                                            onClick={() => { onClickImage(item) }}
                                                        >
                                                            <Image
                                                                src={item.FILE_DATA}
                                                                style={{ height: '100%' }}
                                                                width={600}
                                                                height={300}
                                                                alt={item.IMAGE_FILENAME}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>ประเภทเอกสาร:
                                                        {showAutocomplete ?
                                                            <Grid container justify="center" alignItems="center" justifyContent={"center"}>
                                                                <Grid item xs={4} >
                                                                    <AutoSurveyDocType valueSeq={item.SURVEYDOCTYPE_SEQ} value={surveyDocType} onChange={_changeSurveyDocType} />
                                                                </Grid>
                                                                <Grid item xs={1} >
                                                                    <Tooltip title="บันทึก"><IconButton onClick={() => { _changeSaveEditSurveyDoc(item) }}><Save /></IconButton></Tooltip>
                                                                </Grid>
                                                            </Grid>
                                                            : " " + item.SURVEYDOC_TYPE_NAME
                                                        }
                                                        <Tooltip title="แก้ไขประเภทเอกสาร"><IconButton onClick={handleButtonClick}><Edit /></IconButton></Tooltip>
                                                    </Typography>
                                                    {/* <Typography>ที่อยู๋ไฟล์ใหม่: {item.DIRECTORY_PATH}</Typography>
                                                    <Typography>ชื่อไฟล์ใหม่: {item.FILE_NAME}</Typography> */}
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            sx={{
                                height: "85vh",
                                border: 1,
                                borderColor: "grey.500",
                                flexGrow: 1,
                                overflowY: "auto",
                                overflowX: "auto"
                            }}
                        >
                            <Grid container justifyContent={"space-between"} p={1} spacing={1}>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table size="small" >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell style={{ width: "25%" }} align="left">ชื่อเอกสาร</TableCell>
                                                    <TableCell style={{ width: "25%" }} align="left">สถานะ</TableCell>
                                                    <TableCell style={{ width: "25%" }} align="left">จัดการ</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    cadastralImageData.map((item, index) => (
                                                        <TableRow key={index} sx={{
                                                            '&:last-child td, &:last-child th': { border: 0 },
                                                            '&:hover': {
                                                                backgroundColor: '#ECF2FF !important',
                                                            },
                                                        }}>
                                                            <TableCell style={{ width: "25%" }} align="left">{`${item?.DOC_DATA?.SURVEYDOCTYPE_GROUP} - ${item.IMAGE_PNAME} (${item.IMAGE_PNO})`}</TableCell>
                                                            <TableCell style={{ width: "25%" }} align="left">{
                                                                (item.FILE_STATUS && item.PROCESS_SEQ_ == 103 && item.STATUS_SEQ_ == 101) ? <Chip icon={<CheckCircleIcon />} label="อัปโหลดแล้ว" color="success" /> : <Chip icon={<CloseIcon />} label="ไม่ได้อัปโหลด" color="error" />
                                                            }</TableCell>
                                                            <TableCell style={{ width: "40%" }} align="left">
                                                                <Tooltip title="ดูรูปภาพ">
                                                                    <IconButton onClick={() => { openImageUrl(item) }}>
                                                                        <ImageMui />
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="แก้ไขรูปภาพ">
                                                                    <IconButton onClick={() => { setOpenEdit(item) }}>
                                                                        <Edit />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
