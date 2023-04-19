import React from "react";
import { Grid, Select, InputLabel, FormControl, Box } from "@mui/material";
import { getAmphur } from "@/service/mas/amphur";
import { getTambolByAmphur } from "@/service/mas/tambol";
import { filterRecordStatus } from "@/lib/datacontrol";


export default function DropdownTambol(props) {
    const [tambolData, setTambolData] = React.useState([])
    const [amphurData, setAmphurData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)
    console.log(value, "DropdownTambol");
    React.useEffect(() => {
        if (props.amphur == undefined) {
            setTambolData([])
        }
        if (props.amphur) {
            _req_tambol(props.amphur)
        }
    }, [props.amphur])

    React.useEffect(() => {
        setValue(props.value)
    }, [props.value])


    const _req_tambol = async (amphurseq) => {
        let res = await getTambolByAmphur(amphurseq)
        console.log(res, "_req_tambol");
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้");
            return
        }
        _setDataTambol(filterRecordStatus(res, "N"))
        props.valueSeq != undefined && checkDefaultValue(filterRecordStatus(res, "N"))
        if (props.getData) {
            props.getData(filterRecordStatus(res, "N"));
        }
    }

    const checkDefaultValue = (res) => {
        console.log(props.valueSeq, "props.valueSeq");
        if (props.valueSeq != undefined || props.valueSeq != null) {
            let defaultValue = null;
            defaultValue = res.filter(item => item.TAMBOL_SEQ == props.valueSeq);
            setValue(defaultValue[0]);
            props.setTambol != undefined && props.setTambol(defaultValue[0]);
        } else {
            setValue(null)
        }
    }


    const handleChange = (event, value) => {
        setValue(value);
        if (props.onChange) {
            return props.onChange(value)
        }

    }
    const _req_amphur = async () => {
        let res = await getAmphur()
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้ : _req_amphur");
            return
        }
        setAmphurData(filterRecordStatus(res, "N"))
    }

    const joinData = () => {
        // console.log("join");
        let tambolDataList = tambolData;
        if (amphurData.length > 0) {
            for (let i in tambolDataList) {
                let tambolDataSeq = tambolDataList[i].AMPHUR_SEQ;
                // console.log(sectionData[i].DIVISION_SEQ);
                for (let index in amphurData) {
                    let amphurDataSeq = amphurData[index].AMPHUR_SEQ;
                    if (tambolDataSeq == amphurDataSeq) {
                        tambolDataList[i]["AMPHUR_NAME_TH"] =
                            amphurData[index].AMPHUR_NAME_TH;
                    }
                }
            }
        }
    };

    React.useEffect(() => {
        if (props.amphur) {
            _req_tambol(props.amphur)
            _req_amphur()
        }
    }, [])

    React.useEffect(() => {
        joinData();
    }, [tambolData, amphurData])

    console.log("amphurData", amphurData);

    const _setDataTambol = (data) => {
        console.log("setSelectRequest", data);
        let arr_list = [];
        for (var i in data) {
            arr_list.push({
                TAMBOL_SEQ: data[i].TAMBOL_SEQ,
                TAMBOL_NAME_TH: data[i].TAMBOL_NAME_TH,
            });
        }
        // console.log("arr_list", arr_list);
        setTambolData(arr_list);
    };
    return (
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel required>ตำบล</InputLabel>
                <Select
                    id="bootstrap-input"
                    onChange={handleChange}
                    value={value}
                    label="ตำบล"
                    size="small"
                    native
                    error={props.error}
                    disabled={props.disabled}
                >
                    <option value={0}>กรุณาเลือกตำบล</option>
                    {tambolData.map((item, index) => (
                        <option key={index} value={item["TAMBOL_SEQ"]}>
                            {item["TAMBOL_NAME_TH"]}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </Grid>
    )
}