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
    Tooltip
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
import { getCadastralImage } from "@/service/sva";
import { filterRecordStatus } from "@/lib/datacontrol";
import { surveyDocTypeBySurveyDocTypeGroup } from '@/service/mas/surveyDocTypeGroup';
import CheckIcon from '@mui/icons-material/Check';

export default function Tab1(props) {
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const [advancedExampleOpen, setAdvancedExampleOpen] = React.useState(false);
    const [imageObj, setImageObj] = React.useState([]);
    const [cadDoc, setCadDoc] = React.useState([]);
    const { data } = useSession();
    const [selectedImage, setSelectedImage] = React.useState([]);

    const handleImageClick = (image) => {
        if (selectedImage.includes(image)) {
            setSelectedImage(selectedImage.filter((selectedImage) => selectedImage !== image));
        } else {
            setSelectedImage([...selectedImage, image]);
        }
    };

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
    }
    console.log(cadDoc, "cadDoc");

    React.useEffect(() => {
        createDoc();
    }, [])

    React.useEffect(() => {
        if (Array.isArray(props?.searchData)) {
            if (props?.searchData.length != 0) {
                let filterData = props?.searchData?.filter(item => item.CADASTRAL_SEQ == props?.tabData?.CADASTRAL_SEQ);
                console.log(filterData, "filterData");
                if (filterData.length != 0) {
                    getMasterData(filterData[0]);
                }
            }
        }
    }, [props?.searchData]);

    React.useEffect(() => {
        if (typeof props?.tabData == "object" && props?.tabData.length !== 0 && props?.tabData != undefined) {
            getMasterData(props?.tabData);
        }
    }, [props?.tabData]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const jpegFiles = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].type === 'image/jpeg') {
                jpegFiles.push(files[i]);
            }
        }
        setSelectedFiles(jpegFiles);
    };

    console.log(selectedFiles, "selectedFiles");

    const openImage = async (file) => {
        console.log(file, "file");
        // console.log("tesrt");
        let arr = []
        // { ...slides[0], title: "Puppy in sunglasses", description: "Mollie Sivaram" }
        let obj = { src: URL.createObjectURL(file), title: file.name };
        arr.push(obj);
        console.log(arr, "imageObj")
        setImageObj(arr);
        setAdvancedExampleOpen(true);
    }

    const getMasterData = async (data) => {
        console.log(data, "getMasterData");
        if (data != undefined) {
            let getLandOfficeData = await getLandOffice();
            let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ);
            setSheetcode(data.SHEETCODE);
            setBoxNo(data.BOX_NO.toString().padStart(2, '0'));
            setNumofsurveyQty(data?.NUMOFSURVEY_QTY ?? "-");
            setCadastralNo(data.CADASTRAL_NO);
            console.log(landOfficeFiltered, "getLandOfficeData");
            setOffice(landOfficeFiltered[0]?.LANDOFFICE_NAME_TH ?? "-");
        }
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
            {imageObj.length != 0 && <Lightbox
                open={advancedExampleOpen}
                styles={{
                    root: {
                        "--yarl__color_backdrop": "rgba(255, 255, 255, 1)",
                        "--yarl__slide_title_color": "rgba(0, 0, 0, 0.7)",
                    },
                    thumbnail: {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid #ccc",
                    },
                    captionsTitleContainer: {
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        border: "1px solid #ccc",
                    }
                }}
                close={() => setAdvancedExampleOpen(false)}
                slides={imageObj}
                plugins={[Captions, Fullscreen, Thumbnails, Zoom]}
                zoom={{
                    scrollToZoom: true,
                }}
            />}
            <Grid p={1} spacing={1} container sx={{ height: "15vh" }}>
                <Grid item xs={3} md={5}>
                    <Grid container>
                        <Grid item>
                            <Typography>สำนักงาน: </Typography>
                        </Grid>
                        <Grid item>
                            <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{office}&nbsp;</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Grid container>
                        <Grid item>
                            <Typography>หมายเลขรหัสแทนระวาง(เลขแฟ้ม):</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{sheetcode}&nbsp;</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Grid container>
                        <Grid item >
                            <Typography>เลขที่กล่อง:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{boxNo}&nbsp;</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} md={3}>
                    <Grid container>
                        <Grid item >
                            <Typography>ครั้งที่รังวัด:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{numofsurveyQty}&nbsp;</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3} md={4}>
                    <Grid container>
                        <Grid item >
                            <Typography>เลขที่ต้นร่าง:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography color={"darkblue"} fontWeight={"bold"} sx={{ textDecoration: 'underline' }} display="inline">&nbsp;{cadastralNo}&nbsp;</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Divider />
                </Grid>
            </Grid>
            <Grid p={1} container spacing={1}>
                <Grid item xs={6} >
                    <Paper style={{ textAlign: 'center' }} sx={{ height: "85vh", border: 1, borderColor: 'grey.500', flexGrow: 1, overflowY: 'auto' }}>
                        <Grid container justifyContent={"space-between"} p={1} spacing={1}>
                            <Grid item xs={6}>
                                <Grid container direction={"column"} >
                                    <Grid item>
                                        <Button variant="contained" component="label">
                                            เลือกไฟล์
                                            <input hidden accept="image/jpeg" multiple type="file" onChange={handleFileChange} />
                                        </Button>
                                    </Grid>
                                    {selectedFiles?.length != 0 && selectedFiles?.map((image) => (
                                        <Card
                                            key={image.name}
                                            sx={{
                                                position: 'relative',
                                                '&:hover': {
                                                    '&::before': {
                                                        content: '""',
                                                        position: 'absolute',
                                                        top: 0,
                                                        left: 0,
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                                    },
                                                },
                                            }}
                                            className={`image ${selectedImage === image ? 'selected' : ''}`}
                                            onClick={() => handleImageClick(image)}
                                        >
                                            <CardActionArea>
                                                <CardMedia width={200} height={200} component="img" image={URL.createObjectURL(image)} alt={image.name} />
                                            </CardActionArea>
                                            {selectedImage.includes(image) && (
                                                <React.Fragment>
                                                    <Backdrop
                                                        sx={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            zIndex: 1,
                                                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                            width: '100%',
                                                            height: '100%',
                                                        }}
                                                        open={selectedImage.includes(image)}
                                                    />
                                                    <CheckIcon style={{ fontSize: 100 }} sx={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(-50%, -50%)',
                                                        color: '#5BB318',
                                                        fontSize: '2rem',
                                                        zIndex: 2,
                                                    }} />
                                                </React.Fragment>
                                            )}
                                        </Card>
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
                            <Grid item xs={6}>
                                <Paper>
                                    <MenuList>
                                        {cadDoc?.length != 0 &&
                                            cadDoc.map(item => (
                                                <MenuItem style={{ whiteSpace: 'normal' }} key={item.SURVEYDOCTYPE_SEQ}>{item.SURVEYDOCTYPE_NAME_TH}</MenuItem>
                                            ))
                                        }
                                        {/* <MenuItem>Profile</MenuItem>
                                        <MenuItem>My account</MenuItem>
                                        <MenuItem>Logout</MenuItem> */}
                                    </MenuList>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        www
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
            </Grid>
        </Box>
    )
}
