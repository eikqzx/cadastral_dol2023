import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { uploadFileMultiByPath } from '@/service/upload';
import { Typography, Grid, Snackbar, Alert } from '@mui/material';
import { useSession } from 'next-auth/react';
import { cadastralImage_CiraCore_ } from '@/service/sva_ciracore';
import { cadastralImageByCadastralSeq, updateCadastralImage } from '@/service/sva';

export default function AlertUploadDialog(props) {
  console.log(props, "AlertUploadDialog");
  const [dataProps, setDataProps] = React.useState([]);
  const [uploadData, setUploadData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [type, setType] = React.useState("success");
  const { data } = useSession();

  React.useEffect(() => {
    setDataProps(props?.data);
    setUploadData(props?.uploadData);
  }, [props])

  const handleClose = () => {
    setOpen(false)
}

  const count = dataProps?.reduce(
    (acc, item) => {
      if (item.status) {
        acc.trueCount++;
      } else {
        acc.falseCount++;
      }
      return acc;
    },
    { trueCount: 0, falseCount: 0 }
  );

  const submit = async () => {
    let newData = uploadData;
    console.log(newData, "submit");
    let resUploadArr = [];
    // return
    for (let i in newData) {
      let formData = new FormData();
      let item = newData[i]
      formData.append("scanFile", item.FILE_OLD_PATH);
      formData.append("scanFile", `S:${item.IMAGE_PATH}`);
      formData.append("scanFile", 1);
      try {
        let resUpolad = await uploadFileMultiByPath(formData);
        resUploadArr.push(resUpolad);
      } catch (error) {
        console.log(error, "uploadFile trycatch");
        await setMessage("เกิดข้อผิดพลาดไม่สามารถอัปโหลดได้");
        await setOpen(true);
        await setType("error");
      }
    }
    const checStatusFile = resUploadArr.every(item => item.status == true);
    if (checStatusFile) {
      console.log(checStatusFile, "uploadFile checStatusFile");
      let mergeObj = {
        "CADASTRAL_SEQ": props?.uploadData[0]?.CADASTRAL_SEQ,
        "PROCESS_SEQ_": 102,
        "STATUS_SEQ_": 101,
        "CADASTRAL_IMAGE_NOTE": null,
        "RECORD_STATUS": "A",
        "CREATE_USER": data?.user?.USER_LIST_PID
      }
      let mergeRes = await cadastralImage_CiraCore_(mergeObj);
      console.log(mergeRes, "mergeRes uploadFile");
      let resCadastralImageData = await cadastralImageByCadastralSeq(props?.uploadData[0]?.CADASTRAL_SEQ);
      let resCadastralImageDataFilter = resCadastralImageData.rows.filter(item => item.RECORD_STATUS == "N")
      for (let i in resCadastralImageDataFilter) {
        let item = resCadastralImageDataFilter[i];
        try {
          item.PROCESS_SEQ_ = 103;
          item.STATUS_SEQ_ = 101;
          item.LAST_UPD_USER = data?.user?.USER_LIST_PID;
          let resUpd = await updateCadastralImage(item.CADASTRAL_IMAGE_SEQ, item);
          console.log(resUpd, "resUpd uploadFile");
          if (i == (resCadastralImageDataFilter.length - 1)) {
            props.createPageData();
            props._req_getCadastralImage();
            await setMessage("บันทึกสำเร็จ");
            await setOpen(true);
            await setType("success");
          }
        } catch (error) {
          console.log(error, "uploadFile trycatch");
          await setMessage("เกิดข้อผิดพลาดไม่สามารถอัปโหลดได้");
          await setOpen(true);
          await setType("error");
        }
      }
      //await updateCadastralImage()
    } else {
      console.log(checStatusFile, "uploadFile checStatusFile");
      setUploadAlert(true);
      setUploadResData(resUploadArr);
    }
    props.close();
    console.log(resUploadArr, "uploadFile resUploadArr");
  }

  console.log(count, "count AlertUploadDialog");

  return (
    <div>
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
        onClose={props.close}
      >
        <DialogTitle >
          {"แจ้งเตือนไฟล์มีรูปภาพอยู่ก่อนแล้ว"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText >
            <Grid contrainer>
              <Grid item>
                <Typography>
                  มีไฟล์อยู่แล้วทั้งหมด {count?.falseCount} รูปและยังไม่มีรูปอีก {count?.trueCount}
                </Typography>
              </Grid>
              <Grid item>
                <Typography>
                  ที่อยู่ไฟล์
                </Typography>
                {
                  dataProps.map((item, index) =>
                    <Typography key={index}>
                      {index + 1}. {item.path}
                    </Typography>
                  )
                }
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.close}>ยกเลิก</Button>
          <Button onClick={submit} autoFocus >
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
