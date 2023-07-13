import React from "react";
import {
    Grid,
    Typography,
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    Chip
} from "@mui/material";
//IMAGE_COMPONENTS
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
//ICONS
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
//SERVICES
import { cadastralImageByCadastralSeq } from "@/service/sva";
import { getSurveyDocType } from '@/service/mas/surveyDocTypeGroup';
import { getFile } from '@/service/upload';

export default function CheckLandImageIndex(props) {
    console.log(props, "props_CheckLandImageIndex");
    const [imageData, setImageData] = React.useState([])
    const [imageObj, setImageObj] = React.useState([]);
    const [imageArrData, setImageArrData] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [advancedExampleOpen, setAdvancedExampleOpen] = React.useState(false);

    React.useEffect(() => {
        if (props?.imageData) {
            setImageData(props?.imageData)
            _createData([imageData])
            console.log(imageArrData, "imageArrData");
        }

    }, [props.imageData])

    const _createData = async (data) => {
        try {
            let dataRows = data;
            let arr = [];
            let resDocData = await getSurveyDocType();
            let arrDocData = resDocData.rows;

            for (let i in dataRows) {
                let item = dataRows[i];
                let resGetFile = await getFile(item.IMAGE_PATH);
                let docArr = arrDocData.filter(
                    (doc) => doc.SURVEYDOCTYPE_SEQ === item.SURVEYDOCTYPE_SEQ
                );
                item['FILE_STATUS'] = resGetFile.status;
                item['DOC_DATA'] = docArr[0];

                if (resGetFile.status) {
                    item['FILE_DATA'] = `data:image/*;base64,${resGetFile.fileAsBase64}`;
                    item['FILE_DES'] = (
                        <React.Fragment>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography>
                                        <Grid item>
                                            JPG File
                                            <br />
                                            Bit depth 24
                                            <br />
                                            Resolution 300 dpi
                                            <br />
                                        </Grid>
                                        <Grid item>{item?.IMAGE_PATH}</Grid>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    );
                } else {
                    item['FILE_DATA'] = '/img_not_found.png';
                    item['FILE_DES'] = '';
                }

                arr.push(item);
            }

            const groupedImages = arr.reduce((groups, image) => {
                const { SURVEYDOCTYPE_SEQ } = image;

                if (!groups[SURVEYDOCTYPE_SEQ]) {
                    groups[SURVEYDOCTYPE_SEQ] = [];
                }

                groups[SURVEYDOCTYPE_SEQ].push(image);

                return groups;
            }, {});

            const uniqueArray = Object.keys(groupedImages).map((key) => ({
                SURVEYDOCTYPE_SEQ: key,
                data: groupedImages[key][0],
                childData: groupedImages[key],
            }));

            console.log(uniqueArray, 'uniqueArray');
            console.log(arr, 'arr');

            await setImageArrData(uniqueArray);
        } catch (error) {
            console.error('Error in _createData:', error);
        }
    };

    const openImageUrl = async (file) => {
        console.log(file, "file");
        let arr = [];
        for (let i in file) {
            const element = file[i];
            if (element.FILE_STATUS) {
                let obj = {
                    src: element.FILE_DATA,
                    title: `${element.IMAGE_PNAME} (${element.IMAGE_PNO})`,
                    description: element.FILE_DES,
                };
                console.log(obj, "file");
                arr.push(obj);
            }
        }
        console.log(arr, "imageObj");
        setImageObj(arr);
        setAdvancedExampleOpen(true);
    };
    return (
        <Grid container>
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
            <Grid item xs={12}>
                <Typography variant="h5">
                    ภาพเอกสารสิทธิ์
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent="flex-start" xs={12}>
                    <Grid item xs={12} p={2}>
                        <Paper sx={{ textAlign: 'center' }}>
                            <TableContainer>
                                <Table size="small" >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell style={{ width: "40%" }} align="left">หลักฐานการรังวัด</TableCell>
                                            {/* <TableCell style={{ width: "40%" }} align="left">ที่อยู่ไฟล์</TableCell> */}
                                            <TableCell style={{ width: "35%" }} align="left">สถานะ</TableCell>
                                            <TableCell style={{ width: "25%" }} align="left">รูปภาพ</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            imageArrData?.length > 0 ?
                                                imageArrData?.map((item, index) => (
                                                    <TableRow key={index} sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                        '&:hover': {
                                                            backgroundColor: '#ECF2FF !important',
                                                        },
                                                    }}>
                                                        <TableCell style={{ width: "30%" }} align="left">{item?.data?.DOC_DATA ? `${item?.data?.DOC_DATA?.SURVEYDOCTYPE_GROUP} - ${item?.data?.IMAGE_PNAME}` : "-"}</TableCell>
                                                        {/* <TableCell style={{ width: "30%" }} align="left">{`${item?.IMAGE_PATH ?? "-"}`}</TableCell> */}
                                                        <TableCell style={{ width: "20%" }} align="left">{
                                                            item?.data?.FILE_STATUS ? <Chip icon={<CheckCircleIcon />} label="อัปโหลดแล้ว" color="success" /> : <Chip icon={<CloseIcon />} label="ไม่ได้อัปโหลด" color="error" />
                                                        }</TableCell>
                                                        <TableCell style={{ width: "20%" }} align="left">
                                                            {item?.childData?.map((item2, i) => (
                                                                <Tooltip key={i} title="ดูรูปภาพ">
                                                                    <IconButton onClick={() => openImageUrl(item2)}>
                                                                        <Image alt={item2.IMAGE_PNAME} src={item2.FILE_DATA} width={50} height={70.5} />
                                                                    </IconButton>
                                                                </Tooltip>
                                                            ))}
                                                        </TableCell>
                                                    </TableRow>
                                                )) :
                                                (
                                                    <TableRow sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                        '&:hover': {
                                                            backgroundColor: '#ECF2FF !important',
                                                        },
                                                    }}>
                                                        <TableCell colSpan={3} align="center" sx={{ borderRight: '1px solid ', borderBottom: '1px solid' }}>
                                                            <Typography fontStyle={'italic'} color={'red'}>
                                                                กรุณาเลือกรายการภาพ หรือ ค้นหาใหม่อีกครั้ง
                                                            </Typography>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}