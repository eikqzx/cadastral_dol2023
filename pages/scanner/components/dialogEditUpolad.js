import React from "react";
import {
    Grid,
    Paper,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Stack,
    Avatar,
    Divider,
    Alert,
    AlertTitle,
    TextField,
    Card,
    CardActionArea,
    CardMedia
} from "@mui/material";

export default function DialogEditUpolad(props) {
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [selectedImage, setSelectedImage] = React.useState([]);
    console.log(props, "DialogEditUpoladProps");

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

    return (
        <Grid container>
            <Dialog
                open={props.open}
                // open={true}
                maxWidth={"xl"}
                fullWidth
                onClose={props.onclose}
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Grid item xs={12}  >
                        <Typography sx={{ fontSize: 20 }}>แก้ไขรูปอัปโหลด {props?.data?.IMAGE_PNAME} ({props?.data?.IMAGE_PNO})</Typography>
                    </Grid>
                    {/* <Divider /> */}
                </DialogTitle>
                <DialogContent>
                    <Grid container justifyContent={"center"} p={1} spacing={1}>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button variant="contained" component="label">
                                เลือกไฟล์
                                <input
                                    hidden
                                    accept="image/jpeg"
                                    type="file"
                                    onChange={handleFileChange}
                                />
                            </Button>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            {selectedFiles?.length != 0 &&
                                selectedFiles?.map((image) => (
                                    <React.Fragment key={image.name}>
                                        <Grid p={1}>
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
                                                            height: "50%",
                                                            backgroundColor: "rgba(0, 0, 0, 0.5)",
                                                        },
                                                    },
                                                }}
                                            >
                                                <CardActionArea>
                                                    <CardMedia
                                                        sx={{
                                                            objectFit: 'cover',
                                                            objectPosition: 'top',
                                                            height: '50%',
                                                            width: '100%',
                                                        }}
                                                        component="img"
                                                        image={URL.createObjectURL(image)}
                                                        alt={image.name}
                                                    />
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    </React.Fragment>
                                ))}
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Grid container justifyContent={'flex-end'}>
                        <Button onClick={props.close}>
                            ปิด
                        </Button>
                        <Button
                            color={"success"}
                            variant={"contained"}
                            onClick={() => { props?.onSubmit(selectedFiles,props?.data)}}
                        >
                            อัปโหลด
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid >
    )
}
