import { filterRecordStatus } from "@/lib/datacontrol";
import { getProvince } from "@/service/mas/province";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutoProvince(props) {
    const [provinceData, setProvinceData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_province = async () => {
        let res = await getProvince();
        res = filterRecordStatus(res,"N")
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        setProvinceData(res)
        props.valueSeq != undefined && checkDefaultValue(res)
        if (props.getData) {
            props.getData(res);
        }
    }

    const handleChange = (event, value) => {
        setValue(value);
        if (props.onChange) {
            return props.onChange(event, value)
        }
    }

    const checkDefaultValue = (res) => {
        console.log(props.valueSeq, "props.valueSeq");
        if (props.valueSeq !== undefined || props.valueSeq !== null) {
            let defaultValue = null;
            defaultValue = res.filter(item => item.PROVINCE_SEQ == props.valueSeq);
            console.log("defaultValue", defaultValue);
            setValue(defaultValue[0]);
            props.setProvince != undefined && props.setProvince(defaultValue[0]);
        } else {
            setValue(null)
        }
    }

    React.useEffect(() => {
        console.log("value change", props.value)
        if (
            props.value !== undefined
        ) {
            setValue(props.value)
        }
    }, [props.value])

    React.useEffect(() => {
        _req_province()
    }, [])


    return (
        <Autocomplete
            options={provinceData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.PROVINCE_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกจังหวัด"
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.PROVINCE_SEQ} value={option}>
                        {option.PROVINCE_NAME_TH}
                    </li>
                )
            }}
        />
    )
}
