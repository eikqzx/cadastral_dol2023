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
} from "@mui/material";
import { useSession } from "next-auth/react";

export default function EditCad(props) {
    console.log(props,"EditCad");
    const [inputPacelNo, setInputPacelNo] = React.useState("");
    const [inputNumofsurveyQty, setInputNumofsurveyQty] = React.useState("");
    const [sheetcode, setSheetcode] = React.useState("");
    const [boxNo, setBoxNo] = React.useState("");
    const [isError, setIsError] = React.useState([]);
    const [objData,setObjData] = React.useState(null);
    const {data} = useSession();
    const _changeInputPacelNo = (event, value) => {
        setInputPacelNo(event.target.value);
    };
    const _changeInputNumofsurveyQty = (event, value) => {
        setInputNumofsurveyQty(event.target.value);
    };
    const _changeSheetcode = (event, value) => {
        setSheetcode(event.target.value);
    };
    const _changeBoxNo = (event, value) => {
        setBoxNo(event.target.value);
    };
    const _onSubmit = () => {
        // let obj = documentData;
        if (inputNumofsurveyQty != "" || inputNumofsurveyQty != undefined || inputNumofsurveyQty != null || inputNumofsurveyQty != '') {
            let newData = objData;
            newData.LAST_UPD_USER = data?.user?.USER_LIST_PID;
            newData.NUMOFSURVEY_QTY = inputNumofsurveyQty;
            console.log(newData, "_onSubmit");
            props?.onSubmit(newData);
            props?.close();
        } else {
            let arr = []
            arr.push("inputNumofsurveyQty");
            setIsError(arr)
        }
    }

    React.useEffect(()=>{
        setInputPacelNo(props?.data?.CADASTRAL_NO);
        setSheetcode(props?.data?.SHEETCODE);
        setBoxNo(props?.data?.BOX_NO);
        setInputNumofsurveyQty(props?.data?.NUMOFSURVEY_QTY);
        setObjData(props?.data);
    },[props?.data])

    return (
        <Grid container>
            <Dialog
                open={props.open}
                // open={true}
                maxWidth={"sm"}
                fullWidth
                onClose={props.onclose}
            >
                <DialogTitle sx={{ background: 'linear-gradient(26deg, rgba(255,255,232,1) 20%, rgba(188,243,176,1) 100%)' }}>
                    <Grid item xs={12}  >
                        <Typography sx={{ fontSize: 20 }}>แก้ไขข้อมูลทะเบียน</Typography>
                    </Grid>
                    {/* <Divider /> */}
                </DialogTitle>
                <DialogContent>
                    <Grid container py={2} spacing={1}>
                        <Grid item xs={4}>
                            <TextField fullWidth disabled={true}  error={isError.includes("inputPacelNo")} size="small" label={"เลขที่ต้นร่าง"} value={inputPacelNo} onChange={_changeInputPacelNo} />
                        </Grid>
                        <Grid item xs={5}>
                            <TextField fullWidth disabled={true} error={isError.includes("sheetcode")} size="small" label={"หมายเลขรหัสแทนระวาง(เลขแฟ้ม)"} value={sheetcode} onChange={_changeSheetcode} />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField fullWidth disabled={true} error={isError.includes("boxNo")} size="small" label={"เลขที่กล่อง"} value={boxNo} onChange={_changeBoxNo} />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth error={isError.includes("inputNumofsurveyQty")} size="small" label={"ครั้งที่รังวัด"} value={inputNumofsurveyQty} onChange={_changeInputNumofsurveyQty} />
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
                            onClick={_onSubmit}
                        >
                            บันทึก
                        </Button>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Grid >
    )
}
