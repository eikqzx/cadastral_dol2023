import { getTitle } from "@/service/mas/title";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { filterRecordStatus } from "@/lib/datacontrol";

export default function AutoTitle(props) {
    const [titleData, setTitleData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_title = async () => {
        let res = await getTitle();
        res = filterRecordStatus(res, "N")
        console.log(res, "_req_title");
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        setTitleData(res)
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
            defaultValue = res.filter(item => item.TITLE_SEQ == props.valueSeq);
            console.log("defaultValue", defaultValue);
            setValue(defaultValue[0]);
            props.setTitle != undefined && props.setTitle(defaultValue[0]);
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
        _req_title()
    }, [])


    return (
        <Autocomplete
            options={titleData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.TITLE_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกคำนำหน้า"
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.TITLE_SEQ} value={option}>
                        {option.TITLE_NAME_TH}
                    </li>
                )
            }}
        />
    )
}
