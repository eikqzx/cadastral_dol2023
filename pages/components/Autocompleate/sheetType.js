import { filterRecordStatus } from "@/lib/datacontrol";
import { getSheetType } from "@/service/mas/sheetType";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutoSheetType(props) {
    const [sheetTypeData, setSheetTypeData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_sheetType = async () => {
        let res = await getSheetType();
        res = filterRecordStatus(res.rows, "N")
        console.log(res,"_req_sheetType");
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        setSheetTypeData(res)
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
            defaultValue = res.filter(item => item.SHEETTYPE_SEQ == props.valueSeq);
            console.log("defaultValue", defaultValue);
            setValue(defaultValue[0]);
            props.setSheetType != undefined && props.setSheetType(defaultValue[0]);
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
        _req_sheetType()
    }, [])


    return (
        <Autocomplete
            options={sheetTypeData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.SHEETTYPE_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกประเภทระวาง"
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.SHEETTYPE_SEQ} value={option}>
                        {option.SHEETTYPE_NAME_TH}
                    </li>
                )
            }}
        />
    )
}
