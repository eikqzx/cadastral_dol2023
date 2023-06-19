import { filterRecordStatus } from "@/lib/datacontrol";
import { getScale } from "@/service/mas/scale";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutoScale(props) {
    const [scaleData, setScaleData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_scale = async () => {
        let res = await getScale();
        res = filterRecordStatus(res.rows, "N")
        console.log(res, "_req_scale");
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        setScaleData(res)
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
            defaultValue = res.filter(item => item.SCALE_SEQ == props.valueSeq);
            console.log("defaultValue", defaultValue);
            setValue(defaultValue[0]);
            props.setScale != undefined && props.setScale(defaultValue[0]);
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
        _req_scale()
    }, [])


    return (
        <Autocomplete
            options={scaleData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.SCALE_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label={
                        props.type == null || props.type === 0 ? "กรุณาเลือกรหัสมาตราส่วน" : "กรุณาเลือกรหัสมาตราส่วน" + " " + "(" + props.type + ")"
                    }
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.SCALE_SEQ} value={option}>
                        {option.SCALE_NAME_TH}
                    </li>
                )
            }}
        />
    )
}
