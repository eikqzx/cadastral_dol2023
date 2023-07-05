import React from "react";
import {
    Grid,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
    FormControl,
    FormControlLabel,
    Checkbox,
    Alert,
    Snackbar
} from "@mui/material";
import { useSession } from 'next-auth/react';
//SERVICE
import { getCadastralByPK } from "@/service/sva";
import { getLandOfficeByPK, getLandOffice } from "@/service/mas/landOffice";
import { updateCadastral, mrgCadastral } from "@/service/sva";
import { getTitleByPK } from "@/service/mas/title";
import { getProvinceByPK } from "@/service/mas/province";
import { getAmphurByPK } from "@/service/mas/amphur";
import { getTambolByPK } from "@/service/mas/tambol";
import { getTypeOfSurveyByPK } from "@/service/mas/typeOfSurvey";
import { getBenchMarkByPK } from "@/service/mas/benchMark";
import { getSheetTypeByPK } from "@/service/mas/sheetType";
import { getScaleByPK } from "@/service/mas/scale";
//LIBRALIE
import { filterRecordStatus, getCookie, isNotEmpty, formatMiddlePIDString } from "@/lib/datacontrol";
//COMPONENTS
import AutoTitle from "@/pages/components/Autocompleate/title";
import AutoAmphur from "@/pages/components/Autocompleate/amphur";
import AutoTambol from "@/pages/components/Autocompleate/tambol";
import AutoBenchMark from "@/pages/components/Autocompleate/benchMark";
import AutoTypeOfSurvey from "@/pages/components/Autocompleate/typeOfSurvey";
import AutoSheetType from "@/pages/components/Autocompleate/sheetType";
import AutoScale from "@/pages/components/Autocompleate/scale";
import AdapterDateFns from '@tarzui/date-fns-be'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { th } from 'date-fns/locale';
import budhaEra from "dayjs/plugin/buddhistEra"
dayjs.extend(budhaEra);
export default function Tab01Index(props) {
    console.log(props, "propsDilogTab01Index");
    const [cadastralData, setCadastralData] = React.useState([]);
    const { data } = useSession();
    const [office, setOffice] = React.useState("-");
    const [sheetcode, setSheetcode] = React.useState("-");
    const [boxNo, setBoxNo] = React.useState("-");
    const [numofsurveyQty, setNumofsurveyQty] = React.useState("");
    const [cadastralNo, setCadastralNo] = React.useState("-");
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");

    const [checked, setChecked] = React.useState(false);
    const [typeofSurveyData, setTypeofSurveyData] = React.useState(null)
    const [typeofSurveyAdd1Data, setTypeofSurveyAdd1Data] = React.useState(null)
    const [typeofSurveyAdd2Data, setTypeofSurveyAdd2Data] = React.useState(null)
    const [typeofSurveyAdd3Data, setTypeofSurveyAdd3Data] = React.useState(null)
    const [tambolData, setTambolData] = React.useState(null)
    const [amphurData, setAmphurData] = React.useState(null)
    const [provinceData, setProvinceData] = React.useState(null)
    const [zoneData, setZoneData] = React.useState("")
    const [sheetTypeData, setSheetTypeData] = React.useState(null)
    const [UTMMAP1Data, setUTMMAP1Data] = React.useState("")
    const [UTMMAP2Data, setUTMMAP2Data] = React.useState("")
    const [UTMMAP3Data, setUTMMAP3Data] = React.useState("")
    const [UTMMAP4Data, setUTMMAP4Data] = React.useState("")
    const [originmap1Data, setOriginmap1Data] = React.useState("")
    const [originmap2Data, setOriginmap2Data] = React.useState("")
    const [originmap3Data, setOriginmap3Data] = React.useState("")
    const [airphotomapName, setAirphotomapName] = React.useState("")
    const [airphotomap1Data, setAirphotomap1Data] = React.useState("")
    const [airphotomap2Data, setAirphotomap2Data] = React.useState("")
    const [airphotomap3Data, setAirphotomap3Data] = React.useState("")
    const [scalemapData, setScalemapData] = React.useState(null)
    const [scaleRawangData, setScaleRawangData] = React.useState(null)
    const [benchmarkData, setBenchmarkData] = React.useState(null)
    const [benchmarkQTY, setBenchmarkQTY] = React.useState("")
    const [benchmark2Data, setBenchmark2Data] = React.useState(null)
    const [benchmark2QTY, setBenchmark2QTY] = React.useState("")
    const [surveyDate, setSurveyDate] = React.useState(null)
    const [titleData, setTitleData] = React.useState(null)
    const [fname, setFname] = React.useState("")
    const [lname, setLname] = React.useState("")
    const [surveyorPosition, setSurveyorPosition] = React.useState("")
    const [surveyorLevelData, setSurveyorLevelData] = React.useState("")
    const [oldRaiData, setOldRaiData] = React.useState("")
    const [oldNganData, setOldNganData] = React.useState("")
    const [oldWaData, setOldWaData] = React.useState("")
    const [oldSubWaData, setOldSubWaData] = React.useState("")
    const [ownerData, setOwnerData] = React.useState("")
    const [noteData, setNoteData] = React.useState("")

    // console.log(provinceData, "provinceData");
    // console.log(titleData, "titleData");
    console.log(typeofSurveyAdd1Data, "typeofSurveyAdd1Data");
    React.useEffect(() => {
        if (props.tabData) {
            console.log(props.tabData, "searchData_getMasterData01");
            _createNewData(props.tabData)
        }
        else if (props.searchDataInsert.length != 0) {
            console.log(props.searchDataInsert, "searchDataInsert_getMasterData01");
            _createNewData(props.searchDataInsert)
        }
    }, [props.tabData, props.searchDataInsert]);

    React.useEffect(() => {
        if (cadastralData) {
            console.log(cadastralData, "props?.cadastralData");
            _checked(cadastralData[0]?.PRIVATESURVEY_FLAG)
            setZoneData(cadastralData[0]?.ZONE_LAND)
            setUTMMAP1Data(cadastralData[0]?.CADASTRAL_UTMMAP1)
            setUTMMAP2Data(cadastralData[0]?.CADASTRAL_UTMMAP2)
            setUTMMAP3Data(cadastralData[0]?.CADASTRAL_UTMMAP3)
            setUTMMAP4Data(cadastralData[0]?.CADASTRAL_UTMMAP4)
            setOriginmap1Data(cadastralData[0]?.CADASTRAL_ORIGINMAP1)
            setOriginmap2Data(cadastralData[0]?.CADASTRAL_ORIGINMAP2)
            setOriginmap3Data(cadastralData[0]?.CADASTRAL_ORIGINMAP3)
            setAirphotomapName(cadastralData[0]?.AIRPHOTOMAP_NAME)
            setAirphotomap1Data(cadastralData[0]?.AIRPHOTOMAP1)
            setAirphotomap2Data(cadastralData[0]?.AIRPHOTOMAP2)
            setAirphotomap3Data(cadastralData[0]?.AIRPHOTOMAP3)
            setSurveyDate(dayjs(cadastralData[0]?.SURVEY_DTM).format("YYYY-MM-DD"))
            _getTitle(cadastralData[0]?.TITLE_SEQ ?? cadastralData[0]?.TITLE_SEQ)
            setFname(cadastralData[0]?.SURVEYOR_FNAME)
            setLname(cadastralData[0]?.SURVEYOR_LNAME)
            setSurveyorPosition(cadastralData[0]?.SURVEYOR_POSITION)
            setSurveyorLevelData(cadastralData[0]?.SURVEYOR_LEVEL)
            setOldRaiData(cadastralData[0]?.OLD_RAI_NUM)
            setOldNganData(cadastralData[0]?.OLD_NGAN_NUM)
            setOldWaData(cadastralData[0]?.OLD_WA_NUM)
            setOldSubWaData(cadastralData[0]?.OLD_SUBWA_NUM)
            setOwnerData(cadastralData[0]?.CADASTRAL_OWNER_QTY)
            setNoteData(cadastralData[0]?.CADASTRAL_NOTE)
        }
    }, [cadastralData])

    const handleCheckboxChange = (event) => {
        setChecked(event.target.checked);
    };
    const _getTitle = async (seq) => {
        try {
            let getTitle = await getTitleByPK(seq);
            getTitle = getTitle.rows;

            if (Array.isArray(getTitle) && getTitle.length > 0) {
                getTitle = getTitle[0];
                console.log(getTitle, "getTitle");
                await setTitleData(getTitle);
            } else {
                console.log("getTitle is not a valid array or has no elements.");
            }
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };

    const _checked = async (data) => {
        console.log(data, "_checkeddata");
        if (data?.PRIVATESURVEY_FLAG == "-" || data?.PRIVATESURVEY_FLAG == undefined) {
            return
        } else if (data?.PRIVATESURVEY_FLAG == 1) {
            setChecked(true)
        }
        else if (data?.PRIVATESURVEY_FLAG == 0) {
            setChecked(false)
        }

    }
    const _createNewData = async (data) => {
        try {
            console.log(data, "getMasterData_createNewData");
            let cadastralData = await getCadastralByPK(data?.CADASTRAL_SEQ);
            console.log(cadastralData, "getMasterDatacadastralData");
            cadastralData = filterRecordStatus(cadastralData.rows, "N");
            await setCadastralData(cadastralData);

            if (data != undefined && data != null) {
                let getLandOfficeData = await getLandOffice();
                let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ);

                if (landOfficeFiltered.length > 0) {
                    if (data.CADASTRAL_PROVINCE_SEQ == null) {
                        let getProvinceData = await getProvinceByPK(landOfficeFiltered[0]?.PROVINCE_SEQ);
                        console.log(getProvinceData, "getProvinceData");
                        await setProvinceData(getProvinceData.rows[0]);
                    } else {
                        let getProvinceData = await getProvinceByPK(data.CADASTRAL_PROVINCE_SEQ);
                        console.log(getProvinceData, "getProvinceData");
                        await setProvinceData(getProvinceData.rows[0]);
                    }
                    if (data.CADASTRAL_AMPHUR_SEQ == null) {
                        let getAmphurData = await getAmphurByPK(landOfficeFiltered[0]?.AMPHUR_SEQ);
                        console.log(getAmphurData, "getAmphurData");
                        await setAmphurData(getAmphurData.rows[0]);
                    } else {
                        let getAmphurData = await getAmphurByPK(data.CADASTRAL_AMPHUR_SEQ);
                        console.log(getAmphurData, "getAmphurData");
                        await setAmphurData(getAmphurData.rows[0]);
                    }

                    if (data.CADASTRAL_TAMBOL_SEQ == null) {
                        await setTambolData(null);
                    } else {
                        let getTambolData = await getTambolByPK(data.CADASTRAL_TAMBOL_SEQ);
                        console.log(getTambolData, "getTambolData");
                        await setTambolData(getTambolData.rows[0]);
                    }
                    //TYPEOFSURVEY
                    if (data.TYPEOFSURVEY_SEQ == null) {
                        await setTypeofSurveyData(null)
                    }
                    else {
                        let getTypeOfSurvey = await getTypeOfSurveyByPK(data.TYPEOFSURVEY_SEQ);
                        console.log(getTypeOfSurvey, "getTypeOfSurvey");
                        await setTypeofSurveyData(getTypeOfSurvey.rows[0])
                    }
                    if (data.TYPEOFSURVEY_ADD1_SEQ == null) {
                        await setTypeofSurveyAdd1Data(null)
                    }
                    else {
                        let getTypeOfSurveyAdd1 = await getTypeOfSurveyByPK(data.TYPEOFSURVEY_ADD1_SEQ);
                        console.log(getTypeOfSurveyAdd1, "getTypeOfSurveyAdd1");
                        await setTypeofSurveyAdd1Data(getTypeOfSurveyAdd1.rows[0])
                    }
                    if (data.TYPEOFSURVEY_ADD2_SEQ == null) {
                        await setTypeofSurveyAdd2Data(null)
                    }
                    else {
                        let getTypeOfSurveyAdd2 = await getTypeOfSurveyByPK(data.TYPEOFSURVEY_ADD2_SEQ);
                        console.log(getTypeOfSurveyAdd2, "getTypeOfSurveyAdd2");
                        await setTypeofSurveyAdd2Data(getTypeOfSurveyAdd2.rows[0])
                    }
                    if (data.TYPEOFSURVEY_ADD3_SEQ == null) {
                        await setTypeofSurveyAdd3Data(null)
                    }
                    else {
                        let getTypeOfSurveyAdd3 = await getTypeOfSurveyByPK(data.TYPEOFSURVEY_ADD3_SEQ);
                        console.log(getTypeOfSurveyAdd3, "getTypeOfSurveyAdd3");
                        await setTypeofSurveyAdd3Data(getTypeOfSurveyAdd3.rows[0])
                    }
                    //SHEETTYPE
                    if (data.SHEETTYPE_SEQ == null) {
                        await setSheetTypeData(null)
                    }
                    else {
                        let sheetType = await getSheetTypeByPK(data.SHEETTYPE_SEQ);
                        console.log(sheetType, "sheetType");
                        await setSheetTypeData(sheetType.rows[0])
                    }
                    //BENCHMARK
                    if (data.BENCHMARK_SEQ == null) {
                        await setBenchmarkData(null)
                    }
                    else {
                        let benchMark = await getBenchMarkByPK(data.BENCHMARK_SEQ);
                        console.log(benchMark, "benchMark");
                        await setBenchmarkData(benchMark.rows[0])
                    }
                    if (data.BENCHMARK2_SEQ == null) {
                        await setBenchmark2Data(null)
                    }
                    else {
                        let benchMark2 = await getBenchMarkByPK(data.BENCHMARK2_SEQ);
                        console.log(benchMark2, "benchMark2");
                        await setBenchmark2Data(benchMark2.rows[0])
                    }
                    //ScaleMap
                    if (data.SCALE_MAP_SEQ == null) {
                        await setScalemapData(null)
                    }
                    else {
                        let scalemap = await getScaleByPK(data.SCALE_MAP_SEQ);
                        console.log(scalemap, "scalemap");
                        await setScalemapData(scalemap.rows[0])
                    }
                    //ScaleRawang
                    if (data.SCALE_RAWANG_SEQ == null) {
                        await setScaleRawangData(null)
                    }
                    else {
                        let scaleRawang = await getScaleByPK(data.SCALE_RAWANG_SEQ);
                        console.log(scaleRawang, "scaleRawang");
                        await setScaleRawangData(scaleRawang.rows[0])
                    }
                    await setSheetcode(data.SHEETCODE);
                    await setBoxNo(data.BOX_NO.toString().padStart(2, "0"));
                    await setNumofsurveyQty(data?.NUMOFSURVEY_QTY !== null ? data?.NUMOFSURVEY_QTY : 0);
                    await setCadastralNo(data.CADASTRAL_NO);
                    console.log(landOfficeFiltered, "getLandOfficeData");
                    await setOffice(landOfficeFiltered[0]);
                } else {
                    console.log("No matching land office found.");
                }
            }
        } catch (error) {
            console.log("An error occurred:", error);
        }
    };

    // const _createNewData = async (data) => {
    //     // data = data.rows
    //     console.log(data, "getMasterData_createNewData");
    //     let cadastralData = await getCadastralByPK(data?.CADASTRAL_SEQ)
    //     // let cadastralData = await getCadastralByPK(1222222222)
    //     console.log(cadastralData, "getMasterDatacadastralData");
    //     cadastralData = filterRecordStatus(cadastralData.rows, "N")
    //     await setCadastralData(cadastralData)
    //     // _createNewData(data.CADASTRAL_SEQ)
    //     if (data != undefined && data != null) {
    //         let getLandOfficeData = await getLandOffice();
    //         let landOfficeFiltered = getLandOfficeData.rows.filter(item => item.LANDOFFICE_SEQ == data?.LANDOFFICE_SEQ);
    //         if (data.CADASTRAL_PROVINCE_SEQ == null) {
    //             let getProvinceData = await getProvinceByPK(landOfficeFiltered[0]?.PROVINCE_SEQ);
    //             console.log(getProvinceData, "getProvinceData");
    //             await setProvinceData(getProvinceData.rows[0])
    //         } else {
    //             let getProvinceData = await getProvinceByPK(data.CADASTRAL_PROVINCE_SEQ);
    //             console.log(getProvinceData, "getProvinceData");
    //             await setProvinceData(getProvinceData.rows[0])
    //         }
    //         if (data.CADASTRAL_AMPHUR_SEQ == null) {
    //             let getAmphurData = await getAmphurByPK(landOfficeFiltered[0]?.AMPHUR_SEQ);
    //             console.log(getAmphurData, "getAmphurData");
    //             await setAmphurData(getAmphurData.rows[0])
    //         } else {
    //             let getAmphurData = await getAmphurByPK(data.CADASTRAL_AMPHUR_SEQ);
    //             console.log(getAmphurData, "getAmphurData");
    //             await setAmphurData(getAmphurData.rows[0])
    //         }
    //         if (data.CADASTRAL_TAMBOL_SEQ == null) {
    //             await setTambolData(null)
    //         }
    //         else {
    //             let getTambolData = await getTambolByPK(data.CADASTRAL_TAMBOL_SEQ);
    //             console.log(getTambolData, "getTambolData");
    //             await setTambolData(getTambolData.rows[0])
    //         }
    //         //TYPEOFSURVEY
    //         if (data.TYPEOFSURVEY_SEQ == null) {
    //             await setTypeofSurveyData(null)
    //         }
    //         else {
    //             let getTypeOfSurvey = await getTypeOfSurveyByPK(data.TYPEOFSURVEY_SEQ);
    //             console.log(getTypeOfSurvey, "getTypeOfSurvey");
    //             await setTypeofSurveyData(getTypeOfSurvey.rows[0])
    //         }
    //         if (data.TYPEOFSURVEY_ADD1_SEQ == null) {
    //             await setTypeofSurveyAdd1Data(null)
    //         }
    //         else {
    //             let getTypeOfSurveyAdd1 = await getTypeOfSurveyByPK(data.TYPEOFSURVEY_ADD1_SEQ);
    //             console.log(getTypeOfSurveyAdd1, "getTypeOfSurveyAdd1");
    //             await setTypeofSurveyAdd1Data(getTypeOfSurveyAdd1.rows[0])
    //         }
    //         if (data.TYPEOFSURVEY_ADD2_SEQ == null) {
    //             await setTypeofSurveyAdd2Data(null)
    //         }
    //         else {
    //             let getTypeOfSurveyAdd2 = await getTypeOfSurveyByPK(data.TYPEOFSURVEY_ADD2_SEQ);
    //             console.log(getTypeOfSurveyAdd2, "getTypeOfSurveyAdd2");
    //             await setTypeofSurveyAdd2Data(getTypeOfSurveyAdd2.rows[0])
    //         }
    //         if (data.TYPEOFSURVEY_ADD3_SEQ == null) {
    //             await setTypeofSurveyAdd3Data(null)
    //         }
    //         else {
    //             let getTypeOfSurveyAdd3 = await getTypeOfSurveyByPK(data.TYPEOFSURVEY_ADD3_SEQ);
    //             console.log(getTypeOfSurveyAdd3, "getTypeOfSurveyAdd3");
    //             await setTypeofSurveyAdd3Data(getTypeOfSurveyAdd3.rows[0])
    //         }
    //         //SHEETTYPE
    //         if (data.SHEETTYPE_SEQ == null) {
    //             await setSheetTypeData(null)
    //         }
    //         else {
    //             let sheetType = await getSheetTypeByPK(data.SHEETTYPE_SEQ);
    //             console.log(sheetType, "sheetType");
    //             await setSheetTypeData(sheetType.rows[0])
    //         }
    //         //BENCHMARK
    //         if (data.BENCHMARK_SEQ == null) {
    //             await setBenchmarkData(null)
    //         }
    //         else {
    //             let benchMark = await getBenchMarkByPK(data.BENCHMARK_SEQ);
    //             console.log(benchMark, "benchMark");
    //             await setBenchmarkData(benchMark.rows[0])
    //         }
    //         if (data.BENCHMARK2_SEQ == null) {
    //             await setBenchmark2Data(null)
    //         }
    //         else {
    //             let benchMark2 = await getBenchMarkByPK(data.BENCHMARK2_SEQ);
    //             console.log(benchMark2, "benchMark2");
    //             await setBenchmark2Data(benchMark2.rows[0])
    //         }
    //         //ScaleMap
    //         if (data.SCALE_MAP_SEQ == null) {
    //             await setScalemapData(null)
    //         }
    //         else {
    //             let scalemap = await getScaleByPK(data.SCALE_MAP_SEQ);
    //             console.log(scalemap, "scalemap");
    //             await setScalemapData(scalemap.rows[0])
    //         }
    //         //ScaleRawang
    //         if (data.SCALE_RAWANG_SEQ == null) {
    //             await setScaleRawangData(null)
    //         }
    //         else {
    //             let scaleRawang = await getScaleByPK(data.SCALE_RAWANG_SEQ);
    //             console.log(scaleRawang, "scaleRawang");
    //             await setScaleRawangData(scaleRawang.rows[0])
    //         }
    //         await setSheetcode(data.SHEETCODE);
    //         await setBoxNo(data.BOX_NO.toString().padStart(2, "0"));
    //         await setNumofsurveyQty(data?.NUMOFSURVEY_QTY !== null ? data?.NUMOFSURVEY_QTY : 0);
    //         await setCadastralNo(data.CADASTRAL_NO);
    //         console.log(landOfficeFiltered, "getLandOfficeData");
    //         await setOffice(landOfficeFiltered[0]);
    //     }
    // }
    const _changeOwnerTitle = (event, value) => {
        console.log(value, "_changeOwnerTitle");
        setTitleData(value);
    };
    const _changeAmphur = (event, value) => {
        setTambolData(null);
        setAmphurData(value);
    };

    const _changeTambol = (event, value) => {
        setTambolData(value);
    };


    const _changeTypeofSurvey = (event, value) => {
        setTypeofSurveyData(value);
    };
    const _changeTypeofSurveyAdd1 = (event, value) => {
        setTypeofSurveyAdd1Data(value);
    };
    const _changeTypeofSurveyAdd2 = (event, value) => {
        setTypeofSurveyAdd2Data(value);
    };
    const _changeTypeofSurveyAdd3 = (event, value) => {
        setTypeofSurveyAdd3Data(value);
    };
    const _changeSheetType = (event, value) => {
        setSheetTypeData(value);
    };

    const _changeBenchmark1 = (event, value) => {
        console.log(value, "_changeBenchmark1");
        setBenchmarkData(value);
    };

    const _changeBenchmark2 = (event, value) => {
        console.log(value, "_changeBenchmark2");
        setBenchmark2Data(value);
    };
    const _changeScalemap = (event, value) => {
        setScalemapData(value);
    };
    const _changeScaleRawang = (event, value) => {
        setScaleRawangData(value);
    };
    const _onSubmit = async () => {
        let seq = cadastralData[0]?.CADASTRAL_SEQ
        let obj = {
            "CADASTRAL_SEQ": seq,
            "SHEETCODE": sheetcode ? sheetcode : null,
            "BOX_NO": boxNo ? boxNo : null,
            "CADASTRAL_NO": cadastralNo ? cadastralNo : null,
            "NUMOFSURVEY_QTY": numofsurveyQty ? numofsurveyQty : 0,
            "LANDOFFICE_SEQ": office?.LANDOFFICE_SEQ ? office?.LANDOFFICE_SEQ : null,
            "PRIVATESURVEY_FLAG": checked == true ? 1 : 0,
            "TYPEOFSURVEY_SEQ": typeofSurveyData?.TYPEOFSURVEY_SEQ ? typeofSurveyData?.TYPEOFSURVEY_SEQ : null,
            "TYPEOFSURVEY_ADD1_SEQ": typeofSurveyAdd1Data?.TYPEOFSURVEY_SEQ ? typeofSurveyAdd1Data?.TYPEOFSURVEY_SEQ : null,
            "TYPEOFSURVEY_ADD2_SEQ": typeofSurveyAdd2Data?.TYPEOFSURVEY_SEQ ? typeofSurveyAdd2Data?.TYPEOFSURVEY_SEQ : null,
            "TYPEOFSURVEY_ADD3_SEQ": typeofSurveyAdd3Data?.TYPEOFSURVEY_SEQ ? typeofSurveyAdd3Data?.TYPEOFSURVEY_SEQ : null,
            "CADASTRAL_TAMBOL_SEQ": tambolData?.TAMBOL_SEQ ? tambolData?.TAMBOL_SEQ : null,
            "CADASTRAL_AMPHUR_SEQ": amphurData?.AMPHUR_SEQ ? amphurData?.AMPHUR_SEQ : null,
            "CADASTRAL_PROVINCE_SEQ": provinceData?.PROVINCE_SEQ ? provinceData?.PROVINCE_SEQ : null,
            "ZONE_LAND": zoneData ? zoneData : null,
            "SHEETTYPE_SEQ": sheetTypeData?.SHEETTYPE_SEQ ? sheetTypeData?.SHEETTYPE_SEQ : null,
            "CADASTRAL_UTMMAP1": UTMMAP1Data ? UTMMAP1Data : null,
            "CADASTRAL_UTMMAP2": UTMMAP2Data ? UTMMAP2Data : null,
            "CADASTRAL_UTMMAP3": UTMMAP3Data ? UTMMAP3Data : null,
            "CADASTRAL_UTMMAP4": UTMMAP4Data ? UTMMAP4Data : null,
            "CADASTRAL_ORIGINMAP1": originmap1Data ? originmap1Data : null,
            "CADASTRAL_ORIGINMAP2": originmap2Data ? originmap2Data : null,
            "CADASTRAL_ORIGINMAP3": originmap3Data ? originmap3Data : null,
            "AIRPHOTOMAP_NAME": airphotomapName ? airphotomapName : null,
            "AIRPHOTOMAP1": airphotomap1Data ? airphotomap1Data : null,
            "AIRPHOTOMAP2": airphotomap2Data ? airphotomap2Data : null,
            "AIRPHOTOMAP3": airphotomap3Data ? airphotomap3Data : null,
            "SCALE_MAP_SEQ": scalemapData?.SCALE_SEQ ? scalemapData?.SCALE_SEQ : null,
            "SCALE_MAP": scalemapData?.SCALE_NAME_TH ? scalemapData?.SCALE_NAME_TH : null,
            "SCALE_RAWANG_SEQ": scaleRawangData?.SCALE_SEQ ? scaleRawangData?.SCALE_SEQ : null,
            "SCALE_RAWANG": scaleRawangData?.SCALE_NAME_TH ? scaleRawangData?.SCALE_NAME_TH : null,
            "BENCHMARK_SEQ": benchmarkData?.BENCHMARK_SEQ ? benchmarkData?.BENCHMARK_SEQ : null,
            "BENCHMARK_QTY": benchmarkQTY ? benchmarkQTY : null,
            "BENCHMARK2_SEQ": benchmark2Data?.BENCHMARK_SEQ ? benchmark2Data?.BENCHMARK_SEQ : null,
            "BENCHMARK2_QTY": benchmark2QTY ? benchmark2QTY : null,
            "SURVEY_DTM": surveyDate ? dayjs(surveyDate).format("YYYY-MM-DD") : null,
            "TITLE_SEQ": titleData?.TITLE_SEQ ? titleData?.TITLE_SEQ : null,
            "SURVEYOR_FNAME": fname ? fname : null,
            "SURVEYOR_LNAME": lname ? lname : null,
            "SURVEYOR_POSITION": surveyorPosition ? surveyorPosition : null,
            "SURVEYOR_LEVEL": surveyorLevelData ? surveyorLevelData : null,
            "OLD_RAI_NUM": oldRaiData ? Number(oldRaiData) : 0,
            "OLD_NGAN_NUM": oldNganData ? Number(oldNganData) : 0,
            "OLD_WA_NUM": oldWaData ? Number(oldWaData) : 0,
            "OLD_SUBWA_NUM": oldSubWaData ? Number(oldSubWaData) : 0,
            "CADASTRAL_OWNER_QTY": ownerData ? ownerData : null,
            "CADASTRAL_NOTE": noteData ? noteData : null,
            "RECORD_STATUS": "N",
            "LAST_UPD_USER": data?.user?.USER_LIST_PID,
            "PROCESS_SEQ_": props?.processSeq ?? 101,
        }
        console.log(obj, "obj_onSubmit_DialogTab01");

        console.log(seq, "seqobj_onSubmit_Dialog02");
        try {
            // return
            let resUpd = await mrgCadastral(obj);
            console.log(resUpd, "onSave");
            if (typeof resUpd == "object") {
                await setMessage("บันทึกสำเร็จ");
                await setOpen(true);
                await setType("success");
                // props.close();
            }
        } catch (error) {
            await setMessage("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งหรือติดต่อเจ้าหน้าที่");
            await setOpen(true);
            await setType("error");
            console.log(error, "onSave");
            // props.close();
        }

    }
    const handleClose = () => {
        setOpen(false)
    }
    return (
        <Grid>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}>
                <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={checked}
                            onChange={handleCheckboxChange}
                            value={checked ? 1 : 0}
                        />
                    }
                    label="เป็นงานรังวัดเอกชน" />
            </Grid>
            {/* ประเภทการรังวัด */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>ประเภทการรังวัด :</Typography>
                </Grid>
                <Grid item xs={12} md={10} py={2}>
                    <AutoTypeOfSurvey
                        value={typeofSurveyData}
                        onChange={_changeTypeofSurvey}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>ประเภทการรังวัดเพิ่มเติม 1 :</Typography>
                </Grid>
                <Grid item xs={12} md={10} py={2}>
                    <AutoTypeOfSurvey
                        value={typeofSurveyAdd1Data}
                        onChange={_changeTypeofSurveyAdd1}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>ประเภทการรังวัดเพิ่มเติม 2 :</Typography>
                </Grid>
                <Grid item xs={12} md={10} py={2}>
                    <AutoTypeOfSurvey
                        value={typeofSurveyAdd2Data}
                        onChange={_changeTypeofSurveyAdd2}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>ประเภทการรังวัดเพิ่มเติม 3 :</Typography>
                </Grid>
                <Grid item xs={12} md={10} py={2}>
                    <AutoTypeOfSurvey
                        value={typeofSurveyAdd3Data}
                        onChange={_changeTypeofSurveyAdd3}
                    />
                </Grid>
            </Grid>
            {/* จังหวัด */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>จังหวัด :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="จังหวัด"
                        value={provinceData?.PROVINCE_NAME_TH}
                        onChange={(e) => {
                            setProvinceData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>อำเภอ :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <AutoAmphur
                        province={provinceData?.PROVINCE_SEQ}
                        onChange={_changeAmphur}
                        value={amphurData}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>ตำบล :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <AutoTambol
                        amphur={amphurData?.AMPHUR_SEQ}
                        onChange={_changeTambol}
                        value={tambolData} />
                </Grid>
            </Grid>
            {/* โซน */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>โซน :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="โซน"
                        value={zoneData}
                        onChange={(e) => {
                            setZoneData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>ประเภทระวาง :</Typography>
                </Grid>
                <Grid item xs={12} md={6} py={2}>
                    <AutoSheetType
                        value={sheetTypeData}
                        onChange={_changeSheetType}
                    />
                </Grid>
            </Grid>
            {/* หมายเลขแผ่น */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>หมายเลขระวางแผนที่ 1:50000 (UTM) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขระวางแผนที่ 1:50000 (UTM)"
                        value={UTMMAP1Data}
                        onChange={(e) => {
                            setUTMMAP1Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>หมายเลขแผ่นของระวางแผนที่ 1:50000 (UTM) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขแผ่นของระวางแผนที่ 1:50000 (UTM)"
                        value={UTMMAP2Data}
                        onChange={(e) => {
                            setUTMMAP2Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>หมายเลขระวางแผนที่ 1:4000 (UTM) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขระวางแผนที่ 1:4000 (UTM)"
                        value={UTMMAP3Data}
                        onChange={(e) => {
                            setUTMMAP3Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>หมายเลขแผ่นของระวางตามมาตราส่วน (UTM) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขแผ่นของระวางตามมาตราส่วน (UTM)"
                        value={UTMMAP4Data}
                        onChange={(e) => {
                            setUTMMAP4Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
            </Grid>
            {/* หมายเลขระวาง */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>หมายเลขระวางศูนย์กำเนิด 1 :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขระวางศูนย์กำเนิด 1"
                        value={originmap1Data}
                        onChange={(e) => {
                            setOriginmap1Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>หมายเลขระวางศูนย์กำเนิด 2 :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขระวางศูนย์กำเนิด 2"
                        value={originmap2Data}
                        onChange={(e) => {
                            setOriginmap2Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>หมายเลขแผ่นของระวางตามมาตราส่วน (ศูนย์กำเนิด) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขแผ่นของระวางตามมาตราส่วน (ศูนย์กำเนิด)"
                        value={originmap3Data}
                        onChange={(e) => {
                            setOriginmap3Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
            </Grid>
            {/* ชื่อระวางภาพถ่ายทางอากาศ */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>ชื่อระวางภาพถ่ายทางอากาศ :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="ชื่อระวางภาพถ่ายทางอากาศ"
                        value={airphotomapName}
                        onChange={(e) => {
                            setAirphotomapName(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>หมายเลขระวางแผนที่ 1:50000 :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขระวางแผนที่ 1:50000"
                        value={airphotomap1Data}
                        onChange={(e) => {
                            setAirphotomap1Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>หมายเลขแผ่นของระวางแผนที่ 1:50000 :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขแผ่นของระวางแผนที่ 1:50000"
                        value={airphotomap2Data}
                        onChange={(e) => {
                            setAirphotomap2Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
            </Grid>
            {/* หมายเลขแผ่นของระวางตามมาตราส่วน */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>หมายเลขแผ่นของระวางตามมาตราส่วน :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="หมายเลขแผ่นของระวางตามมาตราส่วน"
                        value={airphotomap3Data}
                        onChange={(e) => {
                            setAirphotomap3Data(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>รหัสมาตราส่วน (รูปแผนที่) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <AutoScale
                        value={scalemapData}
                        onChange={_changeScalemap}
                        type={"รูปแผนที่"}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>รหัสมาตราส่วน (ระวาง) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <AutoScale
                        value={scaleRawangData}
                        onChange={_changeScaleRawang}
                        type={"ระวาง"}
                    />
                </Grid>
            </Grid>
            {/* ประเภทหมุดหลักเขตที่ 1 */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>ประเภทหมุดหลักเขตที่ 1 :</Typography>
                </Grid>
                <Grid item xs={12} md={6} py={2}>
                    <AutoBenchMark
                        type={1}
                        onChange={_changeBenchmark1}
                        value={benchmarkData}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>จำนวนหลักเขตแบบที่ 1 :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="จำนวนหลักเขตแบบที่ 1"
                        value={benchmarkQTY}
                        onChange={(e) => {
                            setBenchmarkQTY(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
            </Grid>
            {/* ประเภทหมุดหลักเขตที่ 2 */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>ประเภทหมุดหลักเขตที่ 2 :</Typography>
                </Grid>
                <Grid item xs={12} md={6} py={2}>
                    <AutoBenchMark
                        type={2}
                        onChange={_changeBenchmark2}
                        value={benchmark2Data}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>จำนวนหลักเขตแบบที่ 2 :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField
                        placeholder="จำนวนหลักเขตแบบที่ 2"
                        value={benchmark2QTY}
                        onChange={(e) => {
                            setBenchmark2QTY(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
            </Grid>
            {/* วันที่รังวัด */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>วันที่รังวัด :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={th}
                        // dateLibInstance={dayjs.extend(budhaEra)}
                        size="small"
                    >
                        <MobileDatePicker
                            clearable
                            label="วันที่รังวัด"
                            inputFormat="dd MMMM yyyy"
                            disableMaskedInput={true}
                            views={["year", "month", "day"]}
                            value={surveyDate}
                            onChange={(newValue) => {
                                setSurveyDate(newValue);
                            }}
                            renderInput={(params) => (
                                <TextField
                                    size="small"
                                    fullWidth
                                    {...params}
                                    inputProps={{
                                        ...params.inputProps,
                                        placeholder: "วันที่รังวัด"
                                    }}
                                // required
                                // error={isErrorInput.includes("expiredDTM")}

                                />
                            )}
                            cancelButtonText="ปิด"
                            clearButtonText="ล้างค่า"
                            okButtonText="ตกลง"
                            showTodayButton
                            todayButtonText="วันที่ปัจจุบัน"
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
            {/* ชื่อช่างรังวัด */}
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>คำนำหน้าชื่อช่างรังวัด :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <AutoTitle
                        onChange={_changeOwnerTitle}
                        value={titleData}
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>ชื่อช่างรังวัด :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="ชื่อช่างรังวัด"
                        value={fname}
                        onChange={(e) => {
                            setFname(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>นามสกุลช่างรังวัด :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="นามสกุลช่างรังวัด"
                        value={lname}
                        onChange={(e) => {
                            setLname(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>ตำแหน่งช่างรังวัด :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="ตำแหน่งช่างรังวัด"
                        value={surveyorPosition}
                        onChange={(e) => {
                            setSurveyorPosition(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
            </Grid>
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>ระดับ :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="ระดับ"
                        value={surveyorLevelData}
                        onChange={(e) => {
                            setSurveyorLevelData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>เนื้อที่เดิม (ไร่) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="เนื้อที่เดิม (ไร่)"
                        value={oldRaiData}
                        onChange={(e) => {
                            setOldRaiData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>เนื้อที่เดิม (งาน) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="เนื้อที่เดิม (งาน)"
                        value={oldNganData}
                        onChange={(e) => {
                            setOldNganData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2} >
                    <Typography fontSize={16}>เนื้อที่เดิม (วา) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="เนื้อที่เดิม (วา)"
                        value={oldWaData}
                        onChange={(e) => {
                            setOldWaData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>เนื้อที่เดิม (เศษวา) :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="เนื้อที่เดิม (เศษวา)"
                        value={oldSubWaData}
                        onChange={(e) => {
                            setOldSubWaData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small" />
                </Grid>
            </Grid>
            <Grid container justifyItems={'center'} alignItems={'center'}>
                <Grid item xs={12} md={2} py={2}>
                    <Typography fontSize={16}>จำนวนผู้ถือกรรมสิทธิ์ :</Typography>
                </Grid>
                <Grid item xs={12} md={2} py={2}>
                    <TextField


                        placeholder="จำนวนผู้ถือกรรมสิทธิ์"
                        value={ownerData}
                        onChange={(e) => {
                            setOwnerData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
                <Grid item xs={12} md={2} py={2} px={1}>
                    <Typography fontSize={16}>หมายเหตุ :</Typography>
                </Grid>
                <Grid item xs={12} md={6} py={2}>
                    <TextField


                        placeholder="หมายเหตุ"
                        value={noteData}
                        onChange={(e) => {
                            setNoteData(e.target.value);
                        }}
                        style={{ width: "100%" }}
                        size="small"
                    />
                </Grid>
            </Grid>

            <Grid container justifyContent={'flex-end'}>
                <Grid item px={2}>
                    <Button variant="contained" onClick={_onSubmit} color="success">
                        บันทึก
                    </Button>
                </Grid>
                {/* <Grid item>
                    <Button onClick={props.close} color={"error"} variant={"contained"}>
                        ปิด
                    </Button>
                </Grid> */}
            </Grid>

        </Grid>
    )
}