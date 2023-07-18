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
    CardMedia,
    Snackbar,
    IconButton,
    Tooltip
} from "@mui/material";
import { updateCadastralImage } from "@/service/sva";
import { uploadFileMulti } from "@/service/upload";
import { useSession } from "next-auth/react";
import { Delete } from "@mui/icons-material";
import { confirmDialog } from "@/pages/components/confirmDialog";

export default function DialogEditUpolad(props) {
    const [selectedFiles, setSelectedFiles] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const { data } = useSession();
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

    const handleClose = () => {
        setOpen(false)
    }

    const onSubmit = async (obj) => {
        console.log(obj, "onSubmit");
        console.log(selectedFiles[0], "onSubmit");
        delete obj.FILE_DATA;
        delete obj.FILE_DES;
        delete obj.DOC_DATA
        const filePath = obj.IMAGE_PATH;
        const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
        const directoryPath = filePath.substring(0, filePath.lastIndexOf('/') + 1);
        console.log(fileName, "handleImageClick");
        console.log(directoryPath, "handleImageClick");
        let objData = new Object();
        objData.PATH = directoryPath;
        objData.FILE_NAME = fileName;
        objData.FILE = selectedFiles[0];
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
                    props._req_getCadastralImage();
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

    const onDelete = async (obj) => {
        console.log(obj, "onDelete");
        confirmDialog.createDialog(`ต้องการลบรายการนี้หรือไม่ ?`,
            async () => {
                delete obj.FILE_DATA;
                delete newData.FILE_DES;
                obj.RECORD_STATUS = "D";
                obj.LAST_UPD_USER = data?.user?.USER_LIST_PID;
                try {
                    let resUpd = await updateCadastralImage(obj.CADASTRAL_IMAGE_SEQ, obj);
                    console.log(resUpd, "udate 103 uploadFile");
                    props._req_getCadastralImage();
                    await setMessage("บันทึกสำเร็จ");
                    await setOpen(true);
                    await setType("success");
                } catch (error) {
                    console.log(error, "udate 103 uploadFile");
                    await setMessage("เกิดข้อผิดพลาดขณะอัปโหลด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
                    await setOpen(true);
                    await setType("error");
                }
            });
}

return (
    <Grid container>
        {open && <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>}
        <Dialog
            open={props.open}
            // open={true}
            maxWidth={"xl"}
            fullWidth
            onClose={props.onclose}
        >
            <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                <Grid container justifyContent={"space-between"}>
                    <Grid item >
                        <Typography sx={{ fontSize: 20 }}>แก้ไขรูปอัปโหลด {props?.data?.IMAGE_PNAME} ({props?.data?.IMAGE_PNO})</Typography>
                    </Grid>
                    <Grid item >
                        <Tooltip title="ลบรายการนี้">
                            <IconButton onClick={() => { onDelete(props?.data) }}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Grid>
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
                        onClick={() => { onSubmit(props?.data) }}
                    >
                        อัปโหลด
                    </Button>
                </Grid>
            </DialogActions>
        </Dialog>
    </Grid >
)
}
