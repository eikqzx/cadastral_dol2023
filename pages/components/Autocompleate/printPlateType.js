import { filterRecordStatus } from "@/lib/datacontrol";
import { getPrintPlateType, getPrintPlateTypeByStatus } from "@/service/mas/printPlateType";
import { Autocomplete, TextField } from "@mui/material";
import React from "react";

export default function AutoPrintPlateType(props) {
    console.log(props,"props AutoPrintPlateType");
    const [printPlateTypeData, setPrintPlateTypeData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    const _req_province = async () => {
        let res = await getPrintPlateType();
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        // console.log("props",props.value)
        let filterRes = filterRecordStatus(res, "N").filter(item => item.PRINTPLATE_TYPE_SEQ >= 0);
        for (let i in filterRes) {
            let item = filterRes[i]
            let nameAbbr = item.PRINTPLATE_TYPE_ABBR !== null ? " (" + item.PRINTPLATE_TYPE_ABBR + ")" : ""
            let nameStr = item.PRINTPLATE_TYPE_NAME_TH.concat(" ", nameAbbr);
            item.NAME_LABEL = nameStr
        }
        await setPrintPlateTypeData(filterRes)
        props.valueSeq != undefined && checkDefaultValue(filterRes)
        props.filterSeq != undefined && filterData(filterRes)
        if (props.getData) {
            props.getData(res);
        }
    }

    const filterData = async (res) => {
        let filterRes = res.filter(obj => props?.filterSeq.some(filterObj => obj.PRINTPLATE_TYPE_SEQ == filterObj));
        console.log(filterRes, "filterRes");
        await setPrintPlateTypeData([]);
        await setPrintPlateTypeData(filterRes);
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
            defaultValue = res.filter(item => item.PRINTPLATE_TYPE_SEQ == props.valueSeq);
            console.log("defaultValue", defaultValue);
            setValue(defaultValue[0]);
            props.setPrintPlateTypeData != undefined && props.setPrintPlateTypeData(defaultValue[0]);
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
            options={printPlateTypeData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.NAME_LABEL)}
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
                    <li {...props} key={option.PRINTPLATE_TYPE_SEQ} value={option}>
                        {option.NAME_LABEL}
                    </li>
                )
            }}
        />
    )
}
