import { filterRecordStatus } from "@/lib/datacontrol";
import { getRegister } from "@/service/mas/register";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutoRegister(props) {
    const [registerData, setRegisterData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_register = async () => {
        let res = await getRegister();
        res = filterRecordStatus(res)
        console.log(res,"_req_register");
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        setRegisterData(res)
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
            defaultValue = res.filter(item => item.REGISTER_SEQ == props.valueSeq);
            console.log("defaultValue", defaultValue);
            setValue(defaultValue[0]);
            props.setRegister != undefined && props.setRegister(defaultValue[0]);
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
        _req_register()
    }, [])


    return (
        <Autocomplete
            options={registerData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.REGISTER_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกรายการจดทะเบียน"
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.REGISTER_SEQ} value={option}>
                        {option.REGISTER_NAME_TH} {option.REGISTER_ABBR != null &&" ("+option.REGISTER_ABBR+")"}
                    </li>
                )
            }}
        />
    )
}
