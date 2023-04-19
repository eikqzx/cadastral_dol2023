import React from "react";
import { Grid, Select, InputLabel, FormControl, Box } from "@mui/material";
import { getAmphurByProvince } from "@/service/mas/amphur";
import { filterRecordStatus } from "@/lib/datacontrol";
import { getProvince } from "@/service/mas/province";
import { getCondoBuilding } from "@/service/reg/condoBuilding";


export default function DropdownCondoBuild(props) {
    const [amphurData, setAmphurData] = React.useState([])
    const [proviceData, setProviceData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    console.log(props.condoSeq,"condoSeq");

    React.useEffect(() => {
        if (props.condoSeq == undefined) {
            setAmphurData([])
        }
        if (props.condoSeq == 0) {
            setAmphurData([])
        }
        if (props.condoSeq) {
            _req_amphur(props.condoSeq)
        }
    }, [props.condoSeq])

    React.useEffect(() => {
        console.log(value,"_req_amphur");
        setValue(props.value)
    }, [props.value])


    const _req_amphur = async (condoSeq) => {
        let res = await getCondoBuilding()
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        let data = filterRecordStatus(res, "N").filter(item => item.CONDO_SEQ == condoSeq?.CONDO_SEQ)
        _setDataAumphur(data.length == 0 ? 0 : data)
        props.valueSeq != undefined && checkDefaultValue(filterRecordStatus(res, "N"))
        if (props.getData) {
            props.getData(filterRecordStatus(res, "N"));
        }
    }

    const checkDefaultValue = (res) => {
        console.log(props.valueSeq, "props.valueSeq");
        if (props.valueSeq != undefined || props.valueSeq != null) {
            let defaultValue = null;
            defaultValue = res.filter(item => item.CONDO_BLD_SEQ == props.valueSeq);
            setValue(defaultValue[0]);
            props.setAmphur != undefined && props.setAmphur(defaultValue[0]);
        } else {
            setValue(null)
        }
    }


    const handleChange = (event, value) => {
        setValue(value);
        if (props.onChange) {
            return props.onChange(event, value)
        }

    }


    React.useEffect(() => {
        if (props.condoSeq) {
            _req_amphur(props.condoSeq)
        }
    }, [])

    const _setDataAumphur = (data) => {
        console.log("setSelectRequest", data);
        let arr_list = [];
        for (var i in data) {
            arr_list.push({
                CONDO_BLD_SEQ: data[i].CONDO_BLD_SEQ,
                CONDO_BLD_NAME_TH: data[i].CONDO_BLD_NAME_TH,
                CONDO_BLD_DATA_OBJ: data[i]
            });
        }
        // console.log("arr_list", arr_list);
        setAmphurData(arr_list);
    };
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel required>ตึก</InputLabel>
                <Select
                    id="bootstrap-input"
                    onChange={handleChange}
                    value={value}
                    label="ตึก"
                    size="small"
                    native
                    error={props.error}
                    disabled={props.disabled}
                >
                    <option value={0}>กรุณาเลือกตึก</option>
                    {amphurData.map((item, index) => (
                        <option key={index} value={JSON.stringify(item)}>
                            {item["CONDO_BLD_NAME_TH"]}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}