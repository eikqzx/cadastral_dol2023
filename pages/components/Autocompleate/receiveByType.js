import { filterRecordStatus } from "@/lib/datacontrol";
import { getRegister,registerByPrintPlateTypeSeq } from "@/service/mas/register";
import { getRegisterType, getRegisterTypeBySTS } from "@/service/mas/registerType";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutoRegisterByType(props) {
    const [registerTypeData, setRegisterTypeData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    console.log(props,"propsAutoRegisterByType");

    const _req_registerType = async () => {
        let obj = {
            "REGISTER_TYPE_SEQ": props?.registerType,
            "PRINTPLATE_TYPE_SEQ": props?.printplateType
        }
        let res = await registerByPrintPlateTypeSeq(obj);
        console.log(res, "res brfore filter");
        res = filterRecordStatus(res?.rows,"N")
        console.log(res, "res AutoRegisterByType");
        // if (props.registerType != undefined) {
        //     res = res.filter(item => item.REGISTER_TYPE_SEQ == props.registerType)
        // }
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        setRegisterTypeData(res)
        props.valueSeq != undefined && checkDefaultValue(res)
        if (props.getData) {
            props.getData(res?.rows);
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
            props.setRegisterByType != undefined && props.setRegisterByType(defaultValue[0]);
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
        if (props.registerType == undefined) {
            setRegisterTypeData([])
        }
        if (props.registerType) {
            _req_registerType()
        }
    }, [props.registerType,props.printplateType])


    return (
        <Autocomplete
            options={registerTypeData}
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
                        {option.REGISTER_NAME_TH}
                    </li>
                )
            }}
        />
    )
}
