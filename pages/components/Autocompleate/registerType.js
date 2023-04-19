import { filterRecordStatus } from "@/lib/datacontrol";
import { getRegisterType, getRegisterTypeBySTS, registerTypeBySTS_ } from "@/service/mas/registerType";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";
export default function AutoRegisterType(props) {
    console.log(props,"AutoRegisterType");
    const [registerTypeData, setRegisterTypeData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_registerType = async () => {
        let obj ={
            "REGISTER_TYPE_STS_":props?.type
        }
        let res = await registerTypeBySTS_(obj);
        res = filterRecordStatus(res?.rows,"N")
        console.log(res, "_req_registerType");
        // console.log("props",props.value)
        await setRegisterTypeData(res)
        props.valueSeq != undefined && checkDefaultValue(res)
        if (props.getData) {
            props.getData(res);
        }
    }
    console.log(registerTypeData,"registerTypeData");
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
            props.setRegisterType != undefined && props.setRegisterType(defaultValue[0]);
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
        _req_registerType()
    }, [])

    React.useEffect(() => {
        _req_registerType()
    }, [props.registerType])


    return (
        <Autocomplete
            options={registerTypeData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.REGISTER_TYPE_NAME)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกประเภทรายการจดทะเบียน"
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.REGISTER_TYPE_SEQ} value={option}>
                        {option.REGISTER_TYPE_NAME}
                    </li>
                )
            }}
        />
    )
}