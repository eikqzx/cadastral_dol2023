import { filterRecordStatus } from "@/lib/datacontrol";
import { getDocument } from "@/service/mas/document";
import { getRegisterDoc } from "@/service/mas/registerDoc";
import { getSurveyDocType } from "@/service/mas/surveyDocTypeGroup";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutoSurveyDocType(props) {
    const [documentsData, setDocumentsData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_documents = async () => {
        let res = await getSurveyDocType();
        console.log(res, "res");
        res = filterRecordStatus(res.rows,"N");
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        for (let i in res) {
            let item = res[i];
            let nameStr = item.SURVEYDOCTYPE_NAME_TH
            item.LABEL_NAME = nameStr
        }
        setDocumentsData(res)
        props.valueSeq != undefined && checkDefaultValue(res)
        if (props.getData) {
            props.getData(res);
        }
    }
    console.log(documentsData, "documentsData");
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
            defaultValue = res.filter(item => item.SURVEYDOCTYPE_SEQ == props.valueSeq);
            console.log("defaultValue", defaultValue);
            setValue(defaultValue[0]);
            props.setDocuments != undefined && props.setDocuments(defaultValue[0]);
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
        _req_documents()
    }, [])


    return (
        <Autocomplete
            options={documentsData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.LABEL_NAME)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderInput={(params) => (
                // console.log("params",params.inputProps),
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกประเภทเอกสาร"
                    size="small"
                />
            )}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.SURVEYDOCTYPE_SEQ} value={option}>
                        {option.LABEL_NAME}
                    </li>
                )
            }}
        />
    )
}
