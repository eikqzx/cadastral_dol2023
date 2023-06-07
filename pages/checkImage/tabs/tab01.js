import React from 'react'
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Paper,
    Snackbar,
    Typography,
    Divider,
    Card,
    CardActionArea,
    CardMedia,
    MenuList,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Tooltip,
    Chip,
    CardContent,
    CardHeader,
    CardActions,
    RadioGroup,
    TextField,
    FormControlLabel,
    Radio,
} from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { useSession } from 'next-auth/react';
import { getLandOffice } from '@/service/mas/landOffice';
import { cadastralImageByCadastralSeq, cadastralImageLogByCadastralSeq, getCadastralImageLog } from '@/service/sva';
import { getFile } from '@/service/upload';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReactImageMagnify from 'react-image-magnify';
import { getStatus } from '@/service/mas/status';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ImageMui from "@mui/icons-material/Image"
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import CopyButton from "@/pages/components/copyButton";
import { getDocument } from '@/service/mas/document';
import { getSurveyDocType } from '@/service/mas/surveyDocTypeGroup';

export default function Tab01(props) {
    const [imageObj, setImageObj] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const [imageArrData, setImageArrData] = React.useState([]);
    const [options, setOptions] = React.useState(null);
    const [note, setNote] = React.useState("");
    const [isCheck, setIsCheck] = React.useState(0);
    const { data } = useSession();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [advancedExampleOpen, setAdvancedExampleOpen] = React.useState(false);

    const req_options = async () => {
        let res = await getStatus();
        console.log(res, "req_options");
        res = res.rows;
        let newObj = []
        for (let i in res) {
            let item = res[i];
            if (item.STATUS_SEQ == 101) {
                let obj = {
                    label: "ถูกต้อง",
                    value: item.STATUS_SEQ
                }
                newObj.push(obj);
            }
            if (item.STATUS_SEQ == 103) {
                let obj = {
                    label: "ไม่ถูกต้อง",
                    value: item.STATUS_SEQ
                }
                newObj.push(obj);
            }
        }
        // console.log(newObj,"req_options");
        await setOptions(newObj);
    }

    const handleOptionChange = (option) => {
        setIsCheck(option);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageArrData?.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageArrData?.length - 1 : prevIndex - 1
        );
    };

    const handleClose = () => {
        setOpen(false)
    }

    console.log(props, "propsprops");
    console.log(imageArrData, "imageArrData");
    React.useEffect(() => {
        if (Array.isArray(props?.searchData)) {
            if (props?.searchData?.length != 0) {
                let filterData = props?.searchData?.filter(
                    (item) => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ
                );
                console.log(filterData, "filterDatafilterData");
                if (filterData?.length != 0) {
                    getMasterData(filterData[0]);
                    // createData(filterData[0]);
                }
            }
        }
    }, [props]);

    React.useEffect(() => {
        createData(props?.tabData);
        setCurrentImageIndex(0);
        getLogData();
        setNote("");
        setIsCheck(0);
    }, [props?.tabData]);

    React.useEffect(() => {
        req_options();
    }, []);

    const getLogData = async () => {
        let res = await getCadastralImageLog();
        console.log(res, "getLogData");
        let filtered = res?.rows.filter(item => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ && item.PROCESS_SEQ_ == 106);
        console.log(filtered, "getLogData filtered");
        setNote(filtered[0]?.CADASTRAL_IMAGE_NOTE ?? "");
        setIsCheck(filtered[0]?.STATUS_SEQ_ ?? 0);
    }

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

    const createData = async (data) => {
        let resImage = await cadastralImageByCadastralSeq(data.CADASTRAL_SEQ);
        console.log(resImage, "createData");
        let dataRows = resImage.rows
        let arr = [];


        for (let i in dataRows) {
            let item = dataRows[i]
            let resGetFile = await getFile(item.IMAGE_PATH);
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
            arr.push(item);
            // arrNew.push(item);
        }
        const groupedImages = arr.reduce((groups, image) => {
            const { SURVEYDOCTYPE_SEQ } = image;

            if (!groups[SURVEYDOCTYPE_SEQ]) {
                groups[SURVEYDOCTYPE_SEQ] = [];
            }

            groups[SURVEYDOCTYPE_SEQ].push(image);

            return groups;
        }, {});
        const uniqueArray = [];
        console.log(groupedImages, "groupedImages");

        for (const key in groupedImages) {
            const images = groupedImages[key];

            for (let i = 0; i < images.length; i++) {
                const index = uniqueArray.findIndex((obj) => obj.SURVEYDOCTYPE_SEQ === images[i].SURVEYDOCTYPE_SEQ);
                if (index === -1) {
                    uniqueArray.push({
                        SURVEYDOCTYPE_SEQ: images[i].SURVEYDOCTYPE_SEQ,
                        data: images[i],
                        childData: [images[i]],
                    });
                } else {
                    uniqueArray[index].childData.push(images[i]);
                }
            }
        }

        console.log(uniqueArray, "uniqueArray");
        console.log(arr, "arrarrarr");
        setImageArrData([]);
        setImageArrData(uniqueArray);
    }

    const onSave = async () => {
        // console.log("onSave");
        let objInsert = {
            "CADASTRAL_HSFS_SEQ": null,
            "CADASTRAL_SEQ": props?.tabData?.CADASTRAL_SEQ,
            "PROCESS_SEQ_": Number(props?.process ?? 106),
            "STATUS_SEQ_": isCheck,
            "CADASTRAL_IMAGE_NOTE": note == "" ? null : note,
            "RECORD_STATUS": "N",
            "CREATE_USER": data?.user?.USER_LIST_PID
        }
        console.log(objInsert, "onSave");
        try {
            let resInsert = await cadastralImageLogByCadastralSeq(objInsert);
            console.log(resInsert, "onSave");
            if (typeof resInsert == "object") {
                await setMessage("บันทึกสำเร็จ");
                await setOpen(true);
                await setType("success");
            }
        } catch (error) {
            await setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
            await setOpen(true);
            await setType("error");
            console.log(error, "onSave");
        }
    }

    const openImageUrl = async (file) => {
        console.log(file, "file");
        let arr = [];
        // console.log("tesrt");
        for(let i in file){
            const element = file[i];
            if (element.FILE_STATUS) {
                let obj = { src: element.FILE_DATA, title: `${element.IMAGE_PNAME} (${element.IMAGE_PNO})`, description: element.FILE_DES };
                console.log(obj, "file");
                arr.push(obj);
            }
        }
        console.log(arr, "imageObj");
        setImageObj(arr);
        setAdvancedExampleOpen(true);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            {imageObj?.length != 0 && <Lightbox
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
            <Grid container spacing={1} p={1}>
                <Grid item xs={12} p={1}>
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
                                    <Typography>ครั้งที่รังวัด:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        color={"darkblue"}
                                        fontWeight={"bold"}
                                        sx={{ textDecoration: "underline" }}
                                        display="inline"
                                    >
                                        &nbsp;{numofsurveyQty}&nbsp;
                                    </Typography>
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
                {props?.tabData?.length != 0 &&
                    <React.Fragment>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-start" xs={12}>
                                <Grid item xs={12} p={2}>
                                    <Paper sx={{ textAlign: 'center' }}>
                                        {imageArrData?.length != 0 &&
                                            <TableContainer>
                                                <Table size="small" >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell style={{ width: "40%" }} align="left">ชื่อเอกสาร</TableCell>
                                                            {/* <TableCell style={{ width: "40%" }} align="left">ที่อยู่ไฟล์</TableCell> */}
                                                            <TableCell style={{ width: "35%" }} align="left">สถานะ</TableCell>
                                                            <TableCell style={{ width: "25%" }} align="left">รูปภาพ</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            imageArrData?.map((item, index) => (
                                                                <TableRow key={index} sx={{
                                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                                    '&:hover': {
                                                                        backgroundColor: '#ECF2FF !important',
                                                                    },
                                                                }}>
                                                                    <TableCell style={{ width: "30%" }} align="left">{`${item?.data?.IMAGE_PNAME}`}</TableCell>
                                                                    {/* <TableCell style={{ width: "30%" }} align="left">{`${item?.IMAGE_PATH ?? "-"}`}</TableCell> */}
                                                                    <TableCell style={{ width: "20%" }} align="left">{
                                                                        item?.data?.FILE_STATUS ? <Chip icon={<CheckCircleIcon />} label="อัปโหลดแล้ว" color="success" /> : <Chip icon={<CloseIcon />} label="ไม่ได้อัปโหลด" color="error" />
                                                                    }</TableCell>
                                                                    <TableCell style={{ width: "20%" }} align="left">
                                                                        {item?.childData?.map((item2, i) => (
                                                                            <Tooltip key={i} title="ดูรูปภาพ">
                                                                                <IconButton onClick={() => { openImageUrl(item?.childData) }}>
                                                                                    <Image alt={item2.IMAGE_PNAME} src={item2.FILE_DATA} width={50} height={70.5} />
                                                                                </IconButton>
                                                                            </Tooltip>
                                                                        ))}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                        }
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        }
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container justifyContent="flex-start" xs={12}>
                                <Grid item xs={12} p={2}>
                                    <TextField inputProps={{ maxLength: 100 }}
                                        helperText={isCheck == 103 ? 'กรุณาใส่หมายเหตุ' : ' '}
                                        error={isCheck == 103} fullWidth type="textarea" size="small" label={"หมายเหตุ"} value={note} onChange={(e) => { setNote(e.target.value) }} />
                                </Grid>
                                {options != null && options?.map((option, index) => (
                                    <Grid item xs={6} p={2} key={index} md={3}>
                                        <RadioGroup
                                            aria-labelledby="radio-buttons"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel control={<Radio checked={isCheck == option.value} value={isCheck} onChange={() => handleOptionChange(option.value)} />} label={option.label} />
                                        </RadioGroup>
                                    </Grid>
                                ))}
                                <Grid item xs={12} p={2}>
                                    <Button variant="contained"
                                        disabled={isCheck == 103 && note == "" || isCheck == 0}
                                        onClick={onSave}
                                        color="success">บันทึก</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                }
            </Grid>
        </div>
    )
}