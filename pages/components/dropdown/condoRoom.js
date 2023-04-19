import React from "react";
import { Grid, Select, InputLabel, FormControl, Box } from "@mui/material";
import { getAmphurByProvince } from "@/service/mas/amphur";
import { filterRecordStatus } from "@/lib/datacontrol";
import { getCondoBuilding } from "@/service/reg/condoBuilding";
import { getCondoRoom } from "@/service/reg/condoRoom";


export default function DropdownCondoRoom(props) {
    const [amphurData, setAmphurData] = React.useState([])
    const [proviceData, setProviceData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    console.log(props.condoBuildSeq,"condoBuildSeq");

    React.useEffect(() => {
        if (props.condoSeq == 0) {
            setAmphurData([])
        }
        if (props.condoBuildSeq == undefined) {
            setAmphurData([])
        }
        if (props?.condoBuildSeq) {
            _req_amphur(props?.condoBuildSeq)
        }
    }, [props.condoBuildSeq,props.condoSeq])

    React.useEffect(() => {
        console.log(value,"_req_amphur");
        setValue(props.value)
    }, [props.value])


    const _req_amphur = async (condoBuildSeq) => {
        let res = await getCondoRoom()
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        if(props.condoSeq == 0){
            _setDataAumphur([])
            return
        }
        _setDataAumphur(filterRecordStatus(res, "N").filter(item => item.CONDO_BLD_SEQ == condoBuildSeq?.CONDO_BLD_SEQ))
        props.valueSeq != undefined && checkDefaultValue(filterRecordStatus(res, "N"))
        if (props.getData) {
            props.getData(filterRecordStatus(res, "N"));
        }
    }

    const checkDefaultValue = (res) => {
        console.log(props.valueSeq, "props.valueSeq");
        if (props.valueSeq != undefined || props.valueSeq != null) {
            let defaultValue = null;
            defaultValue = res.filter(item => item.CONDOROOM_SEQ == props.valueSeq);
            setValue(defaultValue[0]);
            props.setAmphur != undefined && props.setAmphur(defaultValue[0]);
        } else {
            setValue(null)
        }
    }


    const handleChange = (event, value) => {
        setValue(value);
        if (props.onChange) {
            return props.onChange(event, value)
        }

    }

    React.useEffect(() => {
        if (props.condoBuildSeq) {
            _req_amphur(props.condoBuildSeq)
        }
    }, [])

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
        setAmphurData(arr_list);
    };
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel required>ห้อง</InputLabel>
                <Select
                    id="bootstrap-input"
                    onChange={handleChange}
                    value={value}
                    label="ห้อง"
                    size="small"
                    native
                    error={props.error}
                    disabled={props.disabled}
                >
                    <option value={0}>กรุณาเลือกห้อง</option>
                    {amphurData.map((item, index) => (
                        <option key={index} value={JSON.stringify(item)}>
                            {item["CONDOROOM_RNO"]}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}