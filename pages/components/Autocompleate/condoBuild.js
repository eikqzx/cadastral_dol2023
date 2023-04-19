import React from "react";
import { Grid, Select, InputLabel, FormControl, Box, Autocomplete, TextField } from "@mui/material";
import { filterRecordStatus, filterRecordXArray } from "@/lib/datacontrol";
import { getCondoBuilding } from "@/service/reg/condoBuilding";


export default function AutoCondoBuild(props) {
    const [condoBuildData, setCondoBuildData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    React.useEffect(() => {
        console.log(value, "_req_condoBuild");
        setValue(props.value)
    }, [props.value])


    const _req_condoBuild = async () => {
        let res = await getCondoBuilding()
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        let filterResData = res.filter(item => item.LANDOFFICE_SEQ == props?.landofficeSeq);
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
        _req_condoBuild()
    }, [props?.landofficeSeq])

    console.log("condoBuildData", condoBuildData);

    const _setDataAumphur = (data) => {
        console.log("setSelectRequest", data);
        let arr_list = [];
        for (var i in data) {
            arr_list.push({
                CONDO_BLD_SEQ: data[i].CONDO_BLD_SEQ,
                CONDO_BLD_NAME_TH: data[i].CONDO_BLD_NAME_TH,
                CONDO_BLD_DATA_OBJ: data[i]
            });
        }
        // console.log("arr_list", arr_list);
        setCondoBuildData(arr_list);
    };
    return (
        <Autocomplete
            options={condoBuildData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.CONDO_BLD_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.CONDO_BLD_SEQ} value={option}>
                        {option.CONDO_BLD_NAME_TH}
                    </li>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกตึก"
                    size="small"
                />
            )}
        />
    )
}