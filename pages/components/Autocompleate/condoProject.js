import React from "react";
import { Grid, Select, InputLabel, FormControl, Box, Autocomplete, TextField } from "@mui/material";
import { filterRecordStatus, filterRecordXArray } from "@/lib/datacontrol";
import { getCondo } from "@/service/reg/condo";

export default function AutoCondoProject(props) {
    const [condoProjectData, setCondoProjectData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    React.useEffect(() => {
        console.log(value, "_req_condoProject");
        setValue(props.value)
    }, [props.value])


    const _req_condoProject = async () => {
        let res = await getCondo()
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        let filterResData = res.rows.filter(item => item.LANDOFFICE_SEQ == props?.landofficeSeq);
        console.log(filterResData, "filterResData");
        _setDataAumphur(filterRecordStatus(filterResData, "N"))
        props.valueSeq != undefined && checkDefaultValue(filterRecordStatus(filterResData, "N"))
        if (props.getData) {
            props.getData(filterRecordStatus(filterResData, "N"));
        }
    }

    const checkDefaultValue = (res) => {
        console.log(res, "res");
    }


    const handleChange = (event, value) => {
        setValue(value);
        if (props.onChange) {
            return props.onChange(event, value)
        }

    }

    React.useEffect(() => {
        _req_condoProject()
    }, [props?.landofficeSeq])

    console.log("condoProjectData", condoProjectData);

    const _setDataAumphur = (data) => {
        console.log("setSelectRequest", data);
        let arr_list = [];
        for (var i in data) {
            arr_list.push({
                CONDO_SEQ: data[i].CONDO_SEQ,
                CONDO_NAME_TH: data[i].CONDO_NAME_TH,
                CONDO_DATA_OBJ: data[i]
            });
        }
        // console.log("arr_list", arr_list);
        setCondoProjectData(arr_list);
    };
    return (
        <Autocomplete
            options={condoProjectData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.CONDO_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.CONDO_SEQ} value={option}>
                        {option.CONDO_NAME_TH}
                    </li>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกโครงการ"
                    size="small"
                />
            )}
        />
    )
}