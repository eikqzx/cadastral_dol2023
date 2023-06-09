import React from "react";
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
import { useSession } from "next-auth/react";
import Image from "next/image";
import { getLandOffice } from "@/service/mas/landOffice";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { cadastralImageByCadastralSeq, cadastralImageByCadastralSeqSurveyDocTypeSeq, cadastralImagePNoByCadastralSeq, getCadastralImage, insertCadastral, saveScanCadastralImage, updateCadastral, updateCadastralImage } from "@/service/sva";
import { filterRecordStatus } from "@/lib/datacontrol";
import { surveyDocTypeBySurveyDocTypeGroup } from "@/service/mas/surveyDocTypeGroup";
import CheckIcon from "@mui/icons-material/Check";
import { useRouter } from "next/router";
import { getFile, uploadFileMulti, uploadFileSingle } from "@/service/upload";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { confirmDialog } from "@/pages/components/confirmDialog";
import AddCad from "@/pages/asignJobs/components/addCadastral";
import { Edit } from "@mui/icons-material";
import ImageMui from "@mui/icons-material/Image"
import DialogEditUpolad from "../components/dialogEditUpolad";
import EditCad from "@/pages/asignJobs/components/editCadastral";
export default function Tab1(props) {
    console.log(props, "propsTab1");
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const [advancedExampleOpen, setAdvancedExampleOpen] = React.useState(false);
    const [imageObj, setImageObj] = React.useState([]);
    const [cadDoc, setCadDoc] = React.useState([]);
    const [cadastralImageData, setCadastralImageData] = React.useState([]);
    const { data } = useSession();
    const [selectedImage, setSelectedImage] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [openAddData, setOpenAddData] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(null);
    const [openEditNumQty, setOpenEditQty] = React.useState(null);
    const [checkCanEdit, setCheckCanEdit] = React.useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    const _req_getCadastralImage = async (seq) => {
        let res = await cadastralImageByCadastralSeq(seq);
        res = filterRecordStatus(res.rows, "N");
        // res = res.filter(item => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ);
        console.log(res, "res _req_getCadastralImage");
        for (let i in res) {
            let item = res[i];
            let resGetFile = await getFile(item.IMAGE_PATH);
            console.log(resGetFile, "resGetFile");
            item['FILE_STATUS'] = resGetFile.status;
            if (resGetFile.status) {
                item['FILE_DATA'] = `data:image/*;base64,${resGetFile.fileAsBase64}`;
            } else {
                item['FILE_DATA'] = "/img_not_found.png"
            }
        }
        await setCadastralImageData([]);
        await setCadastralImageData(res);
    }

    const handleImageClick = async (image, obj) => {
        console.log(image, "handleImageClick");
        console.log(obj, "handleImageClick");
        let searchObj = {
            "CADASTRAL_SEQ": props?.tabData?.CADASTRAL_SEQ,
            "SURVEYDOCTYPE_SEQ": obj.SURVEYDOCTYPE_SEQ,
            "PROCESS_SEQ_": 103
        }
        let resCadIngPno = await cadastralImagePNoByCadastralSeq(searchObj);
        let objInsert = {
            "CADASTRAL_SEQ": props?.tabData?.CADASTRAL_SEQ,
            "SURVEYDOCTYPE_SEQ": obj.SURVEYDOCTYPE_SEQ,
            "CADASTRAL_IMAGE_PNO": resCadIngPno.rows[0].CADASTRAL_IMAGE_PNO, // http://127.0.0.1:8011/SVA_/cadastralImageDocumentPNoByCadastralSeq
            "PROCESS_SEQ_": 102,
            "STATUS_SEQ_": 101,
            "CADASTRAL_IMAGE_NOTE": null,
            "RECORD_STATUS": "N",
            "CREATE_USER": data?.user?.USER_LIST_PID
        }
        console.log(objInsert, "resSaveList");
        // return
        let resSaveList = await saveScanCadastralImage(objInsert);
        console.log(resSaveList, "resSaveList");
        let searchScanObj = {
            "CADASTRAL_SEQ": props?.tabData?.CADASTRAL_SEQ,
            "SURVEYDOCTYPE_SEQ": obj.SURVEYDOCTYPE_SEQ,
            "PROCESS_SEQ_": 102
        };
        let resSearchPath = await cadastralImageByCadastralSeqSurveyDocTypeSeq(searchScanObj);
        resSearchPath = filterRecordStatus(resSearchPath.rows, "N");
        console.log(resSearchPath, "resSaveList");
        // return
        const filePath = resSearchPath[resSearchPath.length - 1].IMAGE_PATH;
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        const directoryPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
        console.log(fileName, "handleImageClick");
        console.log(directoryPath, "handleImageClick");
        let objData = new Object();
        objData.PATH = directoryPath;
        objData.FILE_NAME = fileName;
        objData.FILE = image;
        console.log(objData, "handleImageClick");
        const formData = new FormData();
        for (const key in objData) {
            console.log(key, "handleImageClick");
            if (objData.hasOwnProperty(key)) {
                formData.append("scanFile", objData[key]);
            }
        }

        try {
            let resUpload = await uploadFileMulti(formData);
            console.log(resUpload, "handleImageClick");
            if (resUpload.status) {
                resSearchPath[resSearchPath.length - 1].PROCESS_SEQ_ = 103;
                resSearchPath[resSearchPath.length - 1].STATUS_SEQ_ = 101;
                resSearchPath[resSearchPath.length - 1].LAST_UPD_USER = data?.user?.USER_LIST_PID;
                try {
                    let resUpd = await updateCadastralImage(resSearchPath[resSearchPath.length - 1].CADASTRAL_IMAGE_SEQ, resSearchPath[resSearchPath.length - 1]);
                    console.log(resUpd, "udate 103 uploadFile");
                    _req_getCadastralImage(props?.tabData?.CADASTRAL_SEQ);
                    await setMessage("บันทึกสำเร็จ");
                    await setOpen(true);
                    await setType("success");
                } catch (error) {
                    console.log(error, "udate 103 uploadFile");
                    await setMessage("เกิดข้อผิดพลาดขณะอัปโหลด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
                    await setOpen(true);
                    await setType("error");
                }
            } else {
                await setMessage("เกิดข้อผิดพลาดขณะอัปโหลด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
                await setOpen(true);
                await setType("error");
            }
        } catch (error) {
            console.log(error, "handleImageClick");
        }
        // if (selectedImage.includes(image)) {
        //     setSelectedImage(
        //         selectedImage.filter((selectedImage) => selectedImage !== image)
        //     );
        // } else {
        //     setSelectedImage([...selectedImage, image]);
        // }
    };

    console.log(cadastralImageData, "cadastralImageData");
    console.log(selectedImage, "selectedImage");

    const createDoc = async () => {
        let allArr = [];
        let resGroupA = await surveyDocTypeBySurveyDocTypeGroup("A");
        let dataA = filterRecordStatus(resGroupA.rows, "N");
        let resGroupB = await surveyDocTypeBySurveyDocTypeGroup("B");
        let dataB = filterRecordStatus(resGroupB.rows, "N");
        let resGroupC = await surveyDocTypeBySurveyDocTypeGroup("C");
        let dataC = filterRecordStatus(resGroupC.rows, "N");
        let resGroupD = await surveyDocTypeBySurveyDocTypeGroup("D");
        let dataD = filterRecordStatus(resGroupD.rows, "N");
        for (let i in dataA) {
            let item = dataA[i];
            allArr.push(item);
        }
        for (let i in dataB) {
            let item = dataB[i];
            allArr.push(item);
        }
        for (let i in dataC) {
            let item = dataC[i];
            allArr.push(item);
        }
        for (let i in dataD) {
            let item = dataD[i];
            allArr.push(item);
        }
        setCadDoc(allArr);
    };
    console.log(cadDoc, "cadDoc");

    React.useEffect(() => {
        createDoc();
    }, []);

    React.useEffect(() => {
        if (Array.isArray(props?.searchData)) {
            if (props?.searchData.length != 0) {
                let filterData = props?.searchData?.filter(
                    (item) => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ
                );
                console.log(filterData, "filterData");
                if (filterData.length != 0) {
                    getMasterData(filterData[0]);
                }
            }
        }
    }, [props?.searchData]);

    React.useEffect(() => {
        if (
            typeof props?.tabData == "object" &&
            props?.tabData.length !== 0 &&
            props?.tabData != undefined
        ) {
            createSurveyData(); /***** solution 1******/
            setCheckCanEdit(false);
            getMasterData(props?.tabData);
            _req_getCadastralImage(props?.tabData?.CADASTRAL_SEQ);
            setSelectedFiles([]);
            if (props?.tabData?.CADASTRAL_SEQ == null) {
                confirmDialog.createDialog(
                    `ไม่พบข้อมูลทะเบียนของต้นร่างเลขที่ ${props?.tabData?.CADASTRAL_NO} ต้องการเพิ่มข้อมูลทะเบียน หรือไม่ ?`,
                    () => { setOpenAddData(true) }
                );
            }
        }
    }, [props?.tabData]);


    const createSurveyData = async () => {
        let res = await getCadastralImage();
        res = filterRecordStatus(res.rows, "N");
        res = res.filter(item => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ);
        //
        console.log(res, "res createSurveyData");
        if (typeof res.find(obj => obj.PROCESS_SEQ_ == 103 && obj.STATUS_SEQ_ == 101) == "object") {
            console.log(res.find(obj => obj.PROCESS_SEQ_ == 103 && obj.STATUS_SEQ_ == 101), "isTrue");
            setCheckCanEdit(true);
        }
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        const jpegFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].type === "image/jpeg") {
                jpegFiles.push(files[i]);
            }
        }
        setSelectedFiles(jpegFiles);
    };

    console.log(selectedFiles, "selectedFiles");

    const openImage = async (file) => {
        console.log(file, "file");
        // console.log("tesrt");
        let arr = [];
        // { ...slides[0], title: "Puppy in sunglasses", description: "Mollie Sivaram" }
        let obj = { src: URL.createObjectURL(file), title: file.name };
        arr.push(obj);
        console.log(arr, "imageObj");
        setImageObj(arr);
        setAdvancedExampleOpen(true);
    };

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

    const addCad = async (inputData) => {
        console.log(inputData, "inputData");
        let objInsert = {
            "SHEETCODE": props?.tabData.SHEETCODE,
            "BOX_NO": props?.tabData.BOX_NO,
            "CADASTRAL_NO": props?.tabData.CADASTRAL_NO,
            "NUMOFSURVEY_QTY": inputData,
            "LANDOFFICE_SEQ": props?.tabData?.LANDOFFICE_SEQ,
            "PROCESS_SEQ_": props?.processSeq ?? 102,
            "STATUS_SEQ_": 104,
            "RECORD_STATUS": "N",
            "CREATE_USER": data?.user?.USER_LIST_PID
        }
        console.log(objInsert, "inputData");
        try {
            let res = await insertCadastral(objInsert);
            console.log(res);
            if (res) {
                await props?.onSearch(props?.searchParameter);
                await setMessage("เพิ่มทะเบียนสำเร็จ");
                await setOpen(true);
                await setType("success");
            }
        } catch (error) {
            await setMessage("เกิดข้อผิดพลาด");
            await setOpen(true);
            await setType("error");
        }
    }

    const onSubmit = async () => {
        let dataImage = cadastralImageData;
        let currentIndex = 0;
        for (let i in dataImage) {
            let item = dataImage[i];
            item.PROCESS_SEQ_ = 103;
            item.STATUS_SEQ_ = 101;
            item.LAST_UPD_USER = data?.user?.USER_LIST_PID;
            try {
                let resUpd = await updateCadastralImage(item);
                console.log(resUpd, "onSubmit");
                if (currentIndex === Object.keys(dataImage).length - 1) {
                    await setMessage("บันทึกสำเร็จ");
                    await setOpen(true);
                    await setType("success");
                }
                currentIndex++;
            } catch (error) {
                await setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
                await setOpen(true);
                await setType("error");
                console.log(error, "onSubmit");
                currentIndex++;
            }
        }
        console.log(dataImage, "submit");
    }

    const editImage = async (image, obj) => {
        console.log(image, "editImage");
        console.log(obj, "editImage");
        const filePath = obj.IMAGE_PATH;
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        const directoryPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
        console.log(fileName, "handleImageClick");
        console.log(directoryPath, "handleImageClick");
        let objData = new Object();
        objData.PATH = directoryPath;
        objData.FILE_NAME = fileName;
        objData.FILE = image[0];
        console.log(objData, "handleImageClick");
        const formData = new FormData();
        for (const key in objData) {
            console.log(key, "handleImageClick");
            if (objData.hasOwnProperty(key)) {
                formData.append("scanFile", objData[key]);
            }
        }

        try {
            let resUpload = await uploadFileMulti(formData);
            console.log(resUpload, "handleImageClick");
            if (resUpload.status) {
                obj.PROCESS_SEQ_ = 103;
                obj.STATUS_SEQ_ = 101;
                obj.LAST_UPD_USER = data?.user?.USER_LIST_PID;
                try {
                    let resUpd = await updateCadastralImage(obj.CADASTRAL_IMAGE_SEQ, obj);
                    console.log(resUpd, "udate 103 uploadFile");
                    _req_getCadastralImage(props?.tabData?.CADASTRAL_SEQ);
                    await setMessage("บันทึกสำเร็จ");
                    await setOpen(true);
                    await setType("success");
                } catch (error) {
                    console.log(error, "udate 103 uploadFile");
                    await setMessage("เกิดข้อผิดพลาดขณะอัปโหลด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
                    await setOpen(true);
                    await setType("error");
                }
            } else {
                await setMessage("เกิดข้อผิดพลาดขณะอัปโหลด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
                await setOpen(true);
                await setType("error");
            }
        } catch (error) {
            console.log(error, "handleImageClick");
        }
    }

    const editCad = async (inputData) => {
        console.log(inputData, "inputData");
        // return
        try {
            let res = await updateCadastral(inputData.CADASTRAL_SEQ, inputData);
            console.log(res, "updateCadastral");
            if (res) {
                await props?.onSearch(props?.searchParameter);
                await setMessage("แก้ไขทะเบียนสำเร็จ");
                await setOpen(true);
                await setType("success");
            }
        } catch (error) {
            console.log(error,"editCad");
            await setMessage("เกิดข้อผิดพลาด");
            await setOpen(true);
            await setType("error");
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {open && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>}
            {openEditNumQty != null && <EditCad open={openEditNumQty} close={() => (setOpenEditQty(null))} data={props?.tabData} onSubmit={editCad} />}
            {openAddData && <AddCad open={openAddData} close={() => (setOpenAddData(false))} data={props?.tabData} onSubmit={addCad} />}
            {openEdit != null && <DialogEditUpolad open={openEdit != null} close={() => (setOpenEdit(null))} data={openEdit} onSubmit={editImage} />}
            {imageObj.length != 0 && (
                <Lightbox
                    open={advancedExampleOpen}
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
                    close={() => setAdvancedExampleOpen(false)}
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
            )}
            <Grid container>
                <Grid item xs={12}>
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
                                            <IconButton size='small' disabled={numofsurveyQty == "-" || checkCanEdit} onClick={() => { setOpenEditQty(props?.tabData) }}><Edit /></IconButton>
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
                </Grid>
                <Grid item xs={12}>
                    {
                        props?.searchData?.length != 0 ?
                            <Grid p={1} container spacing={1}>
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
                                        <Grid container justifyContent={"space-between"} p={1} spacing={1}>
                                            <Grid item xs={12}>
                                                <Grid container direction={"column"} spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Button variant="contained" component="label">
                                                            เลือกไฟล์
                                                            <input
                                                                hidden
                                                                accept="image/jpeg"
                                                                multiple
                                                                type="file"
                                                                onChange={handleFileChange}
                                                            />
                                                        </Button>
                                                    </Grid>
                                                    {selectedFiles?.length != 0 &&
                                                        selectedFiles?.map((image) => (
                                                            <Grid item xs={12} key={image.name}>
                                                                <Grid container>
                                                                    <Grid xs={12} p={1}>
                                                                        <Card
                                                                            sx={{
                                                                                position: "relative",
                                                                                "&:hover": {
                                                                                    "&::before": {
                                                                                        content: '""',
                                                                                        position: "absolute",
                                                                                        top: 0,
                                                                                        left: 0,
                                                                                        width: "100%",
                                                                                        height: "100%",
                                                                                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                                                    },
                                                                                },
                                                                            }}
                                                                            className={`image ${selectedImage === image ? "selected" : ""
                                                                                }`}
                                                                        >
                                                                            <CardActionArea>
                                                                                <CardMedia
                                                                                    sx={{
                                                                                        objectFit: 'cover',
                                                                                        objectPosition: 'top',
                                                                                        height: 200,
                                                                                        width: '100%',
                                                                                    }}
                                                                                    component="img"
                                                                                    image={URL.createObjectURL(image)}
                                                                                    alt={image.name}
                                                                                />
                                                                            </CardActionArea>
                                                                            {selectedImage.includes(image) && (
                                                                                <React.Fragment>
                                                                                    <Backdrop
                                                                                        sx={{
                                                                                            position: "absolute",
                                                                                            top: 0,
                                                                                            left: 0,
                                                                                            zIndex: 1,
                                                                                            backgroundColor: "rgba(255, 255, 255, 0.5)",
                                                                                            width: "100%",
                                                                                            height: "100%",
                                                                                        }}
                                                                                        open={selectedImage.includes(image)}
                                                                                    />
                                                                                    <CheckIcon
                                                                                        style={{ fontSize: 100 }}
                                                                                        sx={{
                                                                                            position: "absolute",
                                                                                            top: "50%",
                                                                                            left: "50%",
                                                                                            transform: "translate(-50%, -50%)",
                                                                                            color: "#5BB318",
                                                                                            fontSize: "2rem",
                                                                                            zIndex: 2,
                                                                                        }}
                                                                                    />
                                                                                </React.Fragment>

                                                                            )}
                                                                        </Card>
                                                                        <Button
                                                                            className="lightbox-button"
                                                                            onClick={() => openImage(image)}
                                                                        >
                                                                            ขยายรูป
                                                                        </Button>
                                                                    </Grid>
                                                                    <Grid item xs={3} md={4}>
                                                                        {(cadDoc?.length != 0 || cadDoc != null) &&
                                                                            <MenuList sx={{
                                                                                maxHeight: 150,
                                                                                overflowY: 'auto',
                                                                            }}>
                                                                                {cadDoc.map((item, index) => (
                                                                                    item.SURVEYDOCTYPE_GROUP == "A" &&
                                                                                    <MenuItem
                                                                                        key={item.SURVEYDOCTYPE_SEQ}
                                                                                        onClick={() => handleImageClick(image, item)}
                                                                                        style={{ whiteSpace: "normal" }}
                                                                                    // disabled={isItemSelected(item.SURVEYDOCTYPE_SEQ)}
                                                                                    >
                                                                                        {`(${item.SURVEYDOCTYPE_GROUP}) ${item.SURVEYDOCTYPE_NAME_TH}`}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </MenuList>
                                                                        }
                                                                    </Grid>
                                                                    <Grid item xs={3} md={4}>
                                                                        {(cadDoc?.length != 0 || cadDoc != null) &&
                                                                            <MenuList sx={{
                                                                                maxHeight: 150,
                                                                                overflowY: 'auto',
                                                                            }}>
                                                                                {cadDoc.map((item, index) => (
                                                                                    item.SURVEYDOCTYPE_GROUP == "B" &&
                                                                                    <MenuItem
                                                                                        key={item.SURVEYDOCTYPE_SEQ}
                                                                                        onClick={() => handleImageClick(image, item)}
                                                                                        style={{ whiteSpace: "normal" }}
                                                                                    // disabled={isItemSelected(item.SURVEYDOCTYPE_SEQ)}
                                                                                    >
                                                                                        {`(${item.SURVEYDOCTYPE_GROUP}) ${item.SURVEYDOCTYPE_NAME_TH}`}
                                                                                    </MenuItem>
                                                                                ))}
                                                                            </MenuList>
                                                                        }
                                                                    </Grid>
                                                                    <Grid item xs={3} md={4}>
                                                                        {(cadDoc?.length != 0 || cadDoc != null) &&
                                                                            <MenuList sx={{
                                                                                maxHeight: 150,
                                                                                overflowY: 'auto',
                                                                            }}>
                                                                                {cadDoc.map((item, index) => (
                                                                                    (item.SURVEYDOCTYPE_GROUP == "C" || item.SURVEYDOCTYPE_GROUP == "D") ?
                                                                                        <MenuItem
                                                                                            key={item.SURVEYDOCTYPE_SEQ}
                                                                                            onClick={() => handleImageClick(image, item)}
                                                                                            style={{ whiteSpace: "normal" }}
                                                                                        // disabled={isItemSelected(item.SURVEYDOCTYPE_SEQ)}
                                                                                        >
                                                                                            {`(${item.SURVEYDOCTYPE_GROUP}) ${item.SURVEYDOCTYPE_NAME_TH}`}
                                                                                        </MenuItem> :
                                                                                        null
                                                                                ))}
                                                                            </MenuList>
                                                                        }
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            // <Grid item key={file.name}>
                                                            //     <IconButton onClick={() => { openImage(file) }}>
                                                            //         <Image
                                                            //             src={URL.createObjectURL(file)}
                                                            //             alt={file.name}
                                                            //             width={200}
                                                            //             height={200}
                                                            //         />
                                                            //     </IconButton>
                                                            // </Grid>
                                                        ))}
                                                </Grid>
                                            </Grid>
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
                                                                cadastralImageData?.map((item, index) => (
                                                                    <TableRow key={index} sx={{
                                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                                        '&:hover': {
                                                                            backgroundColor: '#ECF2FF !important',
                                                                        },
                                                                    }}>
                                                                        <TableCell style={{ width: "25%" }} align="left">{`${item.IMAGE_PNAME} (${item.IMAGE_PNO})`}</TableCell>
                                                                        <TableCell style={{ width: "25%" }} align="left">{
                                                                            item.FILE_STATUS ? <Chip icon={<CheckCircleIcon />} label="อัปโหลดแล้ว" color="success" /> : <Chip icon={<CloseIcon />} label="ไม่ได้อัปโหลด" color="error" />
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
                                {/*
            <Typography>{selectedFiles.length} files selected</Typography>
            <Grid style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                {selectedFiles.map((file) => (
                    <IconButton key={file.name} onClick={openImage(file)}>
                        <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            width={200}
                            height={200}
                        />
                    </IconButton>
                ))}
            </Grid> */}
                            </Grid> :
                            (
                                <Grid p={1} container spacing={1} justifyContent={'center'}>
                                    <Typography fontStyle={'italic'} color={'red'}>
                                        กรุณาเลือกต้นร่าง
                                    </Typography>
                                </Grid>
                            )
                    }
                </Grid>
                {/* <Grid item p={1} xs={12}>
                    <Stack alignContent={"flex-end"} xs={12}>
                        <Grid container justifyContent={"flex-end"} spacing={2} xs={12}>
                            <Grid item>
                                <Button color="success" onClick={onSubmit} variant="contained">บันทึก</Button>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid> */}
            </Grid>
        </Box>
    );
}
