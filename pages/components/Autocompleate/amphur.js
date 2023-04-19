import { Autocomplete, TextField, Select } from "@mui/material";
import React from "react";
import { getAmphurByProvince } from "@/service/mas/amphur";
import { filterRecordStatus } from "@/lib/datacontrol";
import { getProvince } from "@/service/mas/province";


export default function AutoAmphur(props) {
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

    // React.useEffect(() => {
    //     if (
    //         props.value !== undefined
    //     ) {
    //         setValue(props.value)
    //     }

    // }, [props.value])

    React.useEffect(() => {
        setValue(props.value)
    }, [props.value])


    const _req_amphur = async (provinceseq) => {
        let res = await getAmphurByProvince(provinceseq)
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        let filterResData = res.rows.filter(item => item.LANDOFFICE_SEQ == props?.landofficeSeq);
        console.log("_req_amphur", res)
        setAmphurData(filterRecordStatus(filterResData, "N"))
        props.valueSeq != undefined && checkDefaultValue(filterRecordStatus(filterResData, "N"))
        if (props.getData) {
            props.getData(filterRecordStatus(filterResData, "N"));
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
        setProviceData(filterRecordStatus(res.rows, "N"))
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

    // console.log("amphurData",amphurData);

    return (
        <Autocomplete
            options={amphurData}
            groupBy={(option) => option.PROVINCE_NAME_TH}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.AMPHUR_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.AMPHUR_SEQ} value={option}>
                        {option.AMPHUR_NAME_TH}
                    </li>
                )
            }}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกเขต/อำเภอ"
                    size="small"
                />
            )}
        />
    )
}