import { filterRecordStatus } from "@/lib/datacontrol";
import { getTypeOfSurvey } from "@/service/mas/typeOfSurvey";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutoTypeOfSurvey(props) {
    const [typeOfSurveyData, setTypeOfSurveyData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_typeOfSurvey = async () => {
        let res = await getTypeOfSurvey();
        res = filterRecordStatus(res.rows, "N")
        console.log(res, "_req_typeOfSurvey");
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        setTypeOfSurveyData(res)
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
            defaultValue = res.filter(item => item.TYPEOFSURVEY_SEQ == props.valueSeq);
            console.log("defaultValue", defaultValue);
            setValue(defaultValue[0]);
            props.setTypeOfSurvey != undefined && props.setTypeOfSurvey(defaultValue[0]);
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
        _req_typeOfSurvey()
    }, [])


    return (
        <Autocomplete
            options={typeOfSurveyData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.TYPEOFSURVEY_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกประเภทการรังวัด"
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.TYPEOFSURVEY_SEQ} value={option}>
                        {option.TYPEOFSURVEY_NAME_TH}
                    </li>
                )
            }}
        />
    )
}
