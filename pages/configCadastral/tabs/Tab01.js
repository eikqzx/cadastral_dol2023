import React from "react";
import { Grid } from "@mui/material";

import { getLandOffice } from '@/service/mas/landOffice';

export default function Tab01(props) {
    const [openAddData, setOpenAddData] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("-");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const { data } = useSession();
    const [title, setTitle] = React.useState("");
    const [typeRegisterSts, setTypeRegisterSts] = React.useState(1);
    const [addRegType, setAddRegType] = React.useState(false);
    const [datagroupA, setDataGroupA] = React.useState([]);
    const [datagroupB, setDataGroupB] = React.useState([]);
    const [datagroupC, setDataGroupC] = React.useState([]);
    const [datagroupD, setDataGroupD] = React.useState([]);
    const [openEdit, setOpenEdit] = React.useState(null);
    const [count, setCount] = React.useState(0);
    const [checkCanEdit, setCheckCanEdit] = React.useState(false);
    const [haveCadImg, setHaveCadImg] = React.useState(false);
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
        <Grid>
            <Grid p={2} spacing={1} component={Paper} container>
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
                            <IconButton size='small' disabled={numofsurveyQty == "-" || checkCanEdit} onClick={() => { setOpenEdit(props?.tabData) }}><Edit /></IconButton>
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
        </Grid>
    )
}