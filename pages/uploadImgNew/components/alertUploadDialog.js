import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { uploadFileMultiByPath } from '@/service/upload';
import { Typography,Grid } from '@mui/material';

export default function AlertUploadDialog(props) {
    const [data,setData] = React.useState([]);
    const [uploadData,setUploadData] = React.useState([]);

    React.useEffect(()=>{
        setData(props?.data);
        setUploadData(props?.uploadData);
    },[props])

    const count = data?.reduce(
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

      const submit = async () =>{
        let newData = uploadData;
        console.log(newData,"submit");
        let resUploadArr = [];
        // return
        for (let i in newData) {
            let formData = new FormData();
            let item = newData[i]
            formData.append("scanFile", item.FILE_OLD_PATH);
            formData.append("scanFile", `S:${item.IMAGE_PATH}`);
            formData.append("scanFile", 1);
            let resUpolad = await uploadFileMultiByPath(formData);
            resUploadArr.push(resUpolad);
            // console.log(resUpolad,"uploadFile");
        }
        props.close();
        console.log(resUploadArr,"uploadFile resUploadArr");
      }

      console.log(count,"count AlertUploadDialog");

  return (
    <div>
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
                  data.map((item,index) =>
                  <Typography key ={index}>
                    {index+1}. {item.path}
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
