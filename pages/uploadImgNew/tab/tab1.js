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
import { ciracoreImageByCadastralSeq } from "@/service/sva_ciracore";
import { getFileByPath } from '@/service/upload';
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

    React.useEffect(() => {
        if (
            typeof props?.tabData == "object" &&
            props?.tabData.length !== 0 &&
            props?.tabData != undefined
        ) {
            getMasterData(props?.tabData);
            createPageData(props?.tabData);
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
        let ciracoreData = await ciracoreImageByCadastralSeq(data.CADASTRAL_SEQ);
        let ciracoreDataArr = ciracoreData.rows;
        console.log(ciracoreDataArr, "createPageData");
        let surveydoctypeData = await getSurveyDocType();
        let surveydoctypeDataArr = surveydoctypeData.rows;
        console.log(surveydoctypeDataArr, "createPageData");
        for (let i in ciracoreDataArr) {
            let item = ciracoreDataArr[i];
            let link = <CopyButton text={item?.IMAGE_PATH} />
            const filePath = item.IMAGE_PATH;
            const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
            const directoryPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
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
            item['SURVEYDOC_TYPE_NAME'] = surveydoctypeDataArr.filter(itemDoc => itemDoc.SURVEYDOCTYPE_SEQ == item.SURVEYDOCTYPE_SEQ)[0]?.SURVEYDOCTYPE_NAME_TH;
            item['FILE_NAME'] = fileName;
            item['DIRECTORY_PATH'] = directoryPath;
            let folderNumber = String(item.LANDOFFICE_SEQ).padStart(5, '0');
            let pathFileString = `U:\\${folderNumber}\\${item.IMAGE_FILENAME}.${item.IMAGE_EXTENSION}`;
            console.log();
            let file = await getFileByPath(pathFileString);
            if (file.status) {
                item["FILE_DATA"] = `data:image/*;base64,${file.fileAsBase64}`
            } else {
                item["FILE_DATA"] = "/img_not_found.png"
            }
        }
        setImageArrData([]);
        setImageArrData(ciracoreDataArr);
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

    const uploadFile = async () =>{
        console.log(imageArrData, "uploadFile");
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
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
                                                                width={300}
                                                                height={350}
                                                                alt={item.IMAGE_FILENAME}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>ประเภทเอกสาร: {item.SURVEYDOC_TYPE_NAME}</Typography>
                                                    <Typography>ที่อยู๋ไฟล์ใหม่: {item.DIRECTORY_PATH}</Typography>
                                                    <Typography>ชื่อไฟล์ใหม่: {item.FILE_NAME}</Typography>
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
                            tab1
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
