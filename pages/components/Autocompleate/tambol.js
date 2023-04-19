import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { getAmphur } from "@/service/mas/amphur";
import { getTambolByAmphur } from "@/service/mas/tambol";
import { filterRecordStatus } from "@/lib/datacontrol";


export default function AutoTambol(props) {
    const [tambolData, setTambolData] = React.useState([])
    const [amphurData, setAmphurData] = React.useState([])
    const [value, setValue] = React.useState(props.value ? props.value : null)

    React.useEffect(() => {
        if (props.amphur == undefined) {
            setTambolData([])
        }
        if (props.amphur) {
            _req_tambol(props.amphur)
        }
    }, [props.amphur])

    // React.useEffect(() => {
    //     if (
    //         props.value !== undefined
    //     ) {
    //         setValue(props.value)
    //     }

    // }, [props.value])
    React.useEffect(() => {
        setValue(props.value);
    }, [props.value])
    const _req_tambol = async (amphurseq) => {
        console.log("amphurseq", amphurseq)
        let res = await getTambolByAmphur(amphurseq)

        if (!res) {
            SnackbarSet("ไม่สามารถเรียกข้อมูลได้")
            return
        }
        try {
            console.log("props", res.rows)
            setTambolData(filterRecordStatus(res.rows))
            props.valueSeq != undefined && checkDefaultValue(filterRecordStatus(res.rows));
            if (props.getData) {
                props.getData(filterRecordStatus(res.rows));
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleChange = (event, value) => {
        setValue(value);
        if (props.onChange) {
            return props.onChange(event, value)
        }

    }

    const _req_ampur = async () => {
        let res = await getAmphur()
        if (!res) {
            console.log("ไม่สามารถเรียกข้อมูลได้ : _req_ampur");
            return
        }
        setAmphurData(filterRecordStatus(res,"N"));
    }

    const checkDefaultValue = (res) => {
        console.log(res,"res");
        console.log(props.valueSeq, "props.valueSeq");
        if (props.valueSeq != undefined || props.valueSeq != null) {
            let defaultValue = null;
            defaultValue = res.filter(item => item.TAMBOL_SEQ == props.valueSeq);
            console.log(defaultValue,"defaultValue");
            setValue(defaultValue[0]);
            props.setTambol != undefined && props.setTambol(defaultValue[0]);
        } else {
            setValue(null)
        }
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
        // _req_tambol()
        _req_ampur()
    }, [])

    React.useEffect(() => {
        joinData();
    }, [tambolData, amphurData])

    // console.log("tambolData",tambolData);

    return (
        <Autocomplete
            options={tambolData}
            disabled={props.disabled}
            groupBy={(option) => option.AMPHUR_NAME_TH}
            value={value}
            getOptionLabel={(option) => (option.TAMBOL_NAME_TH)}
            onChange={handleChange}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.TAMBOL_SEQ} value={option}>
                        {option.TAMBOL_NAME_TH}
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
                    label="กรุณาเลือกตำบล/แขวง"
                    size="small"
                />
            )}
        />
    )
}