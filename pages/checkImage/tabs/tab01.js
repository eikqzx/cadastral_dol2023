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
    CardActions
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
import { cadastralImageByCadastralSeq } from '@/service/sva';
import { getFile } from '@/service/upload';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ReactImageMagnify from 'react-image-magnify';

function Tab01(props) {
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
    const { data } = useSession();
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageArrData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageArrData.length - 1 : prevIndex - 1
        );
    };

    const handleClose = () => {
        setOpen(false)
    }

    console.log(props, "propsprops");
    console.log(imageArrData, "imageArrData");
    React.useEffect(() => {
        if (Array.isArray(props?.searchData)) {
            if (props?.searchData.length != 0) {
                let filterData = props?.searchData?.filter(
                    (item) => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ
                );
                console.log(filterData, "filterDatafilterData");
                if (filterData.length != 0) {
                    getMasterData(filterData[0]);
                    // createData(filterData[0]);
                }
            }
        }
    }, [props]);

    React.useEffect(() => {
        createData(props?.tabData);
        setCurrentImageIndex(0);
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

    const createData = async (data) => {
        let resImage = await cadastralImageByCadastralSeq(data.CADASTRAL_SEQ);
        console.log(resImage, "createData");
        let dataRows = resImage.rows
        let arr = []
        for (let i in dataRows) {
            let item = dataRows[i]
            let resGetFile = await getFile(item.IMAGE_PATH);
            item['FILE_STATUS'] = resGetFile.status;
            if (resGetFile.status) {
                item['FILE_DATA'] = `data:image/*;base64,${resGetFile.fileAsBase64}`;
            } else {
                item['FILE_DATA'] = "/img_not_found.png"
            }
            arr.push(item);
        }
        setImageArrData([]);
        setImageArrData(arr);
    }

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
            <Grid container spacing={1}>
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
                <Grid item xs={12} p={1}>
                    {imageArrData?.length != 0 && <Grid container alignItems="center"
                        justifyContent="center">
                        <Grid item>
                            <Card sx={{
                                background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%) !important',
                            }}>
                                <CardContent>
                                    <Grid container alignItems="center"
                                        justifyContent="center">
                                        <Grid item>
                                            <IconButton onClick={handlePreviousImage} disabled={currentImageIndex == 0} size='large' aria-label="previous">
                                                <SkipPreviousIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h5">{imageArrData[currentImageIndex]?.IMAGE_PNAME + " (" + imageArrData[currentImageIndex]?.IMAGE_PNO + ")"}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={handleNextImage} disabled={currentImageIndex == (imageArrData.length - 1)} size='large' aria-label="next">
                                                <SkipNextIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                                <CardActions>
                                    <Grid container alignItems="center"
                                        justifyContent="center">
                                        <Grid item xs={10}>
                                            <CardActionArea>
                                                {/* <CardMedia
                                                    component="img"
                                                    width={1000}
                                                    height={1200}
                                                    image={imageArrData[currentImageIndex]?.FILE_DATA}
                                                /> */}
                                                <CardMedia>
                                                    <ReactImageMagnify
                                                        {...{
                                                            smallImage: {
                                                                isFluidWidth: true,
                                                                src: imageArrData[currentImageIndex]?.FILE_DATA,
                                                            },
                                                            largeImage: {
                                                                src: imageArrData[currentImageIndex]?.FILE_DATA,
                                                                width: 2000,
                                                                height: 2000
                                                            },
                                                            enlargedImageContainerDimensions: {
                                                                width: '400%',
                                                                height: '100%'
                                                            },
                                                            enlargedImagePosition: 'over'
                                                        }}
                                                    />
                                                </CardMedia>
                                            </CardActionArea>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Tab01