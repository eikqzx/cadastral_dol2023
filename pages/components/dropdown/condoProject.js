import React from "react";
import { Grid, Select, InputLabel, FormControl, Box, Autocomplete, TextField } from "@mui/material";
import { getAmphurByProvince } from "@/service/mas/amphur";
import { filterRecordStatus, filterRecordXArray } from "@/lib/datacontrol";
import { getProvince } from "@/service/mas/province";
import { getCondo } from "@/service/reg/condo";


export default function DropdownCondoProject(props) {
    const [amphurData, setAmphurData] = React.useState([])
    const [proviceData, setProviceData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    React.useEffect(() => {
        console.log(value,"_req_amphur");
        setValue(props.value)
    }, [props.value])


    const _req_amphur = async () => {
        let res = await getCondo()
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        let filterResData = res.filter(item => item.LANDOFFICE_SEQ == props?.landofficeSeq);
        console.log(filterResData,"filterResData");
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
        _req_amphur()
    }, [props?.landofficeSeq])

    console.log("amphurData", amphurData);

    const _setDataAumphur = (data) => {
        console.log("setSelectRequest", data);
        let arr_list = [];
        for (var i in data) {
            arr_list.push({
                CONDO_SEQ: data[i].CONDO_SEQ,
                CONDO_NAME_TH: data[i].CONDO_NAME_TH,
                CONDO_DATA_OBJ:data[i]
            });
        }
        // console.log("arr_list", arr_list);
        setAmphurData(arr_list);
    };
    return (
        // <Grid item xs={12}>
        //     <FormControl fullWidth>
        //         <InputLabel required>โครงการ</InputLabel>
        //         <Select
        //             id="bootstrap-input"
        //             onChange={handleChange}
        //             value={value}
        //             label="โครงการ"
        //             size="small"
        //             native
        //             error={props.error}
        //             disabled={props.disabled}
        //         >
        //             <option value={0}>กรุณาเลือกโครงการ</option>
        //             {amphurData.map((item, index) => (
        //                 <option key={index} value={JSON.stringify(item)}>
        //                     {item["CONDO_NAME_TH"]}
        //                 </option>
        //             ))}
        //         </Select>
        //     </FormControl>
        // </Grid>
        <Autocomplete
        options={amphurData}
        // groupBy={(option) => option.CONDO_NAME_TH}
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
            // console.log("params",params.inputProps),
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