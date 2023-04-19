import React from "react";
import { Grid, Select, InputLabel, FormControl, Box } from "@mui/material";
import { getAmphurByProvince } from "@/service/mas/amphur";
import { filterRecordStatus } from "@/lib/datacontrol";
import { getProvince } from "@/service/mas/province";


export default function DropdownAmphur(props) {
    const [amphurData, setAmphurData] = React.useState([])
    const [proviceData, setProviceData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    React.useEffect(() => {
        if (props.province == undefined) {
            setAmphurData([])
        }
        if (props.province) {
            _req_amphur(props.province)
        }
    }, [props.province])

    React.useEffect(() => {
        console.log(value,"_req_amphur");
        setValue(props.value)
    }, [props.value])


    const _req_amphur = async (provinceseq) => {
        let res = await getAmphurByProvince(provinceseq)
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        _setDataAumphur(filterRecordStatus(res, "N"))
        props.valueSeq != undefined && checkDefaultValue(filterRecordStatus(res, "N"))
        if (props.getData) {
            props.getData(filterRecordStatus(res, "N"));
        }
    }

    const checkDefaultValue = (res) => {
        console.log(props.valueSeq, "props.valueSeq");
        if (props.valueSeq != undefined || props.valueSeq != null) {
            let defaultValue = null;
            defaultValue = res.filter(item => item.AMPHUR_SEQ == props.valueSeq);
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
    const _req_province = async () => {
        let res = await getProvince()
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้ : _req_province");
            return
        }
        setProviceData(filterRecordStatus(res, "N"))
    }

    const joinData = () => {
        // console.log("join");
        let amphurDataList = amphurData;
        if (proviceData.length > 0) {
            for (let i in amphurDataList) {
                let amphurDataSeq = amphurDataList[i].PROVINCE_SEQ;
                // console.log(sectionData[i].DIVISION_SEQ);
                for (let index in proviceData) {
                    let proviceDataSeq = proviceData[index].PROVINCE_SEQ;
                    if (amphurDataSeq == proviceDataSeq) {
                        amphurDataList[i]["PROVINCE_NAME_TH"] =
                            proviceData[index].PROVINCE_NAME_TH;
                    }
                }
            }
        }
    };

    React.useEffect(() => {
        if (props.province) {
            _req_amphur(props.province)
            _req_province()
        }
    }, [])

    React.useEffect(() => {
        joinData();
    }, [amphurData, proviceData])

    console.log("amphurData", amphurData);

    const _setDataAumphur = (data) => {
        console.log("setSelectRequest", data);
        let arr_list = [];
        for (var i in data) {
            arr_list.push({
                AMPHUR_SEQ: data[i].AMPHUR_SEQ,
                AMPHUR_NAME_TH: data[i].AMPHUR_NAME_TH,
            });
        }
        // console.log("arr_list", arr_list);
        setAmphurData(arr_list);
    };
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel required>อำเภอ</InputLabel>
                <Select
                    id="bootstrap-input"
                    onChange={handleChange}
                    value={value}
                    label="อำเภอ"
                    size="small"
                    native
                    error={props.error}
                    disabled={props.disabled}
                >
                    <option value={0}>กรุณาเลือกอำเภอ</option>
                    {amphurData.map((item, index) => (
                        <option key={index} value={item["AMPHUR_SEQ"]}>
                            {item["AMPHUR_NAME_TH"]}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}