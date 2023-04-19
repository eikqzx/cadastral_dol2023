import React from "react";
import { Grid, Select, InputLabel, FormControl, Box, Autocomplete, TextField } from "@mui/material";
import { filterRecordStatus, filterRecordXArray } from "@/lib/datacontrol";
import { getCondoRoom } from "@/service/reg/condoRoom";


export default function AutoCondoRoom(props) {
    const [condoRoomData, setCondoRoomData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    React.useEffect(() => {
        console.log(value, "_req_condoRoom");
        setValue(props.value)
    }, [props.value])


    const _req_condoRoom = async () => {
        let res = await getCondo()
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
        _req_condoRoom()
    }, [props?.landofficeSeq])

    console.log("condoRoomData", condoRoomData);

    const _setDataAumphur = (data) => {
        console.log("setSelectRequest", data);
        let arr_list = [];
        for (var i in data) {
            arr_list.push({
                CONDOROOM_SEQ: data[i].CONDOROOM_SEQ,
                CONDOROOM_RNO: data[i].CONDOROOM_RNO,
                CONDOROOM_DATA_OBJ: data[i]
            });
        }
        // console.log("arr_list", arr_list);
        setCondoRoomData(arr_list);
    };
    return (
        <Autocomplete
            options={condoRoomData}
            value={value}
            disabled={props.disabled}
            getOptionLabel={(option) => (option.CONDOROOM_NAME_TH)}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            onChange={handleChange}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.CONDOROOM_SEQ} value={option}>
                        {option.CONDOROOM_NAME_TH}
                    </li>
                )
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={props.error}
                    required={props.required}
                    fullWidth
                    label="กรุณาเลือกห้อง"
                    size="small"
                />
            )}
        />
    )
}