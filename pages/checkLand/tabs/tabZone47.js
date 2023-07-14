import React from "react"
import {
    Grid,
    Paper,
    Box,
    Typography,
    Divider,
    Card,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    Tooltip,
    Chip
} from "@mui/material"
//COMPONENTS
import CheckLandList from "@/pages/checkLand/components/checkLandList";
import Map47 from "@/pages/components/mapengine/map47";
import LayerPanel from "@/pages/components/mapengine/function/layerpanel";
//IMAGE
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
import { getSurveyDocType } from '@/service/mas/surveyDocTypeGroup';
import { getFile } from '@/service/upload';
import { getLandOffice } from '@/service/mas/landOffice';
import { getCadastralLandByCadastralSeq } from "@/service/sva";
import { getProvinceByPK } from "@/service/mas/province";
import { getAmphurByPK } from "@/service/mas/amphur";
import { getTambolByPK } from "@/service/mas/tambol";

export default function TabZone47Index(props) {
    console.log(props, "props_TabZone47Index");
    const [layerSeq, setLayerSeq] = React.useState(101)
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    //CADASTRAL_LANDDATA
    const [cadastralLand, setCadastralLand] = React.useState([]);
    const [provinceData, setProvinceData] = React.useState([]);
    const [amphurData, setAmphurData] = React.useState([]);
    const [tambolData, setTambolData] = React.useState([]);
    //IMAGE
    const [imageData, setImageData] = React.useState([])
    const [imageObj, setImageObj] = React.useState([]);
    const [imageArrData, setImageArrData] = React.useState([]);
    const [advancedExampleOpen, setAdvancedExampleOpen] = React.useState(false);
    React.useEffect(() => {
        if (props?.tabData) {
            getMasterData(props.tabData)

            _cadastralLandData(props.tabData)
        }
    }, [props.tabData]);

    React.useEffect(() => {
        if (imageData) {
            _createData(imageData)
            console.log(imageArrData, "imageArrData");
        }

    }, [imageData])
    const handleClick = (el) => {
        setImageData(el);
    };

    const getMasterData = async (data) => {
        console.log(data, "getMasterData");
        if (data != undefined && data != null) {
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(
                (item) => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ
            );
            setSheetcode(data?.SHEETCODE);
            setBoxNo(data?.BOX_NO?.toString().padStart(2, "0"));
            setNumofsurveyQty(data?.NUMOFSURVEY_QTY ?? "-");
            setCadastralNo(data?.CADASTRAL_NO);
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
        }
    };


    const _cadastralLandData = async (data) => {
        console.log(data, "data_cadastralLandData");
        if (data == null || data === undefined) {
            return;
        }
        if (data != undefined && data != null) {
            let cadastralSeq = data.CADASTRAL_SEQ
            let resCadastralLand = await getCadastralLandByCadastralSeq(cadastralSeq)
            resCadastralLand = resCadastralLand.rows
            console.log(resCadastralLand, "resCadastralLand");
            setCadastralLand(resCadastralLand)
            let getProvinceData = await getProvinceByPK(data.CADASTRAL_PROVINCE_SEQ);
            console.log(getProvinceData, "getProvinceData");
            if (Array.isArray(getProvinceData) && getProvinceData.length > 0) {
                setProvinceData(getProvinceData[0]);
            }

            let getAmphurData = await getAmphurByPK(data.CADASTRAL_AMPHUR_SEQ);
            console.log(getAmphurData, "getAmphurData");
            if (Array.isArray(getAmphurData) && getAmphurData.length > 0) {
                setAmphurData(getAmphurData[0]);
            }

            let getTambolData = await getTambolByPK(data.CADASTRAL_TAMBOL_SEQ);
            console.log(getTambolData, "getTambolData");
            if (Array.isArray(getTambolData) && getTambolData.length > 0) {
                setTambolData(getTambolData[0]);
            }
        }
    };

    const _createData = async (data) => {
        try {
            let dataRows = data;
            let arr = [];
            let resDocData = await getSurveyDocType();
            let arrDocData = resDocData.rows;


            let item = dataRows
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
        <Grid container >
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
            <Grid item xs={12} p={1}>
                <Grid p={2} spacing={1} component={Paper} container>
                    <Grid item xs={3} md={5}>
                        <Grid container>
                            <Grid item>
                                <Typography>สำนักงาน: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{office == 0 || office == null ? "-" : office}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={4}>
                        <Grid container>
                            <Grid item>
                                <Typography>หมายเลขรหัสแทนระวาง(เลขแฟ้ม):</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{sheetcode == 0 || sheetcode == null ? "-" : sheetcode}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item >
                                <Typography>เลขที่กล่อง:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{boxNo == 0 || boxNo == null ? "-" : boxNo}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={4}>
                        <Grid container>
                            <Grid item >
                                <Typography>เลขที่ต้นร่าง:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{cadastralNo == 0 || cadastralNo == null ? "-" : cadastralNo}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item >
                                <Typography>ครั้งที่รังวัด:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{numofsurveyQty == 0 || numofsurveyQty == null ? "-" : numofsurveyQty}&nbsp;</Typography>
                                {/* <IconButton size='small' disabled={numofsurveyQty == "-" || checkCanEdit} onClick={() => { setOpenEdit(props?.tabData) }}><Edit /></IconButton> */}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} p={1}>
                <Grid p={2} spacing={1} component={Paper} container>
                    <Grid item xs={3} md={4}>
                        <Grid container>
                            <Grid item>
                                <Typography>จังหวัด: </Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{provinceData?.PROVINCE_NAME_TH == 0 || provinceData?.PROVINCE_NAME_TH == null ? "-" : provinceData?.PROVINCE_NAME_TH}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={4}>
                        <Grid container>
                            <Grid item>
                                <Typography>อำเภอ:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{amphurData?.AMPHUR_NAME_TH == 0 || amphurData?.AMPHUR_NAME_TH == null ? "-" : amphurData?.AMPHUR_NAME_TH}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item >
                                <Typography>ตำบล:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{tambolData?.TAMBOL_NAME_TH == 0 || tambolData?.TAMBOL_NAME_TH == null ? "-" : tambolData?.TAMBOL_NAME_TH}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item >
                                <Typography>เนื้อที่:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{cadastralLand?.CADASTRAL_LAND_RAI_NUM}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={3} md={3}>
                        <Grid container>
                            <Grid item >
                                <Typography>ตำบล:</Typography>
                            </Grid>
                            <Grid item>
                                <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{tambolData?.TAMBOL_NAME_TH == 0 || tambolData?.TAMBOL_NAME_TH == null ? "-" : tambolData?.TAMBOL_NAME_TH}&nbsp;</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container columns={24} component={Paper}>
                <Grid item xs={12} >
                    <Grid item px={1} py={2}>
                        <Card>
                            {/* <CheckLandMap layerSeq={layerSeq} /> */}
                            <Map47 mapName="แผนที่รูปแปลงที่ดิน โซน 47" height={67}>
                                <LayerPanel minZoom={10} layerSeq={layerSeq} />
                            </Map47>
                        </Card>
                    </Grid>
                    <Grid item px={1} py={3}>
                        <CheckLandList tabData={props?.tabData} setImageData={handleClick} />
                    </Grid>
                </Grid>
                <Grid item xs={12} px={1} py={2}>
                    <Grid component={Paper} elevation={2}>
                        {/* {imageData &&
                            <CheckLandImage imageData={imageData} />} */}
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
                                                                            <IconButton onClick={() => openImageUrl(item?.childData)}>
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
            </Grid>
        </Grid>
    )
}
