import React from 'react';
import * as Excel from "exceljs";
import { saveAs } from 'file-saver';
import { Grid, Button, Avatar, Tooltip } from '@mui/material';
import Image from 'next/image'
//SERVICES
import { getProvince, getProvinceByPK } from "@/service/mas/province";
import { getLandOffice, getLandOfficeByPK } from "@/service/mas/landOffice";
import { getAmphur, getAmphurByPK } from "@/service/mas/amphur";
import { getTambol, getTambolByPK } from "@/service/mas/tambol";
import { getParcelByPK } from '@/service/evd/parcel';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from "next-auth/react";
var disPacth
var state
export default function ExportExcel(props) {
  const { data } = useSession();
  const [excelBodyData, setExcelBodyData] = React.useState([])
  const [excelHeadData, setExcelHeadData] = React.useState([])
  const [documentNo, setDocumentNo] = React.useState("-")
  disPacth = useDispatch();
  state = useSelector(state => state.job.value);
  console.log(documentNo, "documentNoExportExcel");
  React.useEffect(() => {
    if (props.number) {
      setExcelBodyData(props.number)
      console.log(excelBodyData, "ExportExcel");
    }
  }, [props.number])

  // React.useEffect(() => {
  //   if (props.searchData != null && props.searchData != undefined) {
  //     setExcelHeadData(props.searchData)
  //     console.log(excelHeadData, "ExportExcel");
  //   }
  // }, [props.searchData])
  React.useEffect(() => {
    setExcelHeadData(data?.user)
  }, [])
  React.useEffect(() => {
    if (props.documentNo != null && props.documentNo != undefined) {
      setDocumentNo(props.documentNo)
    }
  }, [props.documentNo])
  async function exTest() {
    let masterData = excelHeadData
    console.log(masterData, "documentNOData");
    // let getProvinceData = await getProvinceByPK(masterData?.PROVINCE_SEQ);
    // if (getProvinceData != null && getProvinceData != undefined) {
    //   console.log(getProvinceData, "getProvinceData");
    //   // getProvinceData = getProvinceData.rows[0]
    // }

    let getLandOfficeData = await getLandOfficeByPK(masterData?.LANDOFFICE_SEQ);
    if (getLandOfficeData != null && getLandOfficeData != undefined) {
      // console.log(getLandOfficeData, "getLandOfficeData");
      getLandOfficeData = getLandOfficeData.rows[0]
      console.log(getLandOfficeData, "getLandOfficeData");
    }
    let getAmpuhrData = await getAmphurByPK(getLandOfficeData?.AMPHUR_SEQ);
    if (getAmpuhrData != null && getAmpuhrData != undefined) {
      getAmpuhrData = getAmpuhrData.rows[0]
      console.log(getAmpuhrData, "getAmpuhrData");
    }

    let getTambolData = await getTambolByPK(getLandOfficeData?.TAMBOL_SEQ);
    if (getTambolData != null && getTambolData != undefined) {
      getTambolData = getTambolData.rows[0]
      console.log(getTambolData, "getTambolData");
    }
    console.log(masterData, "masterData");
    let dataMaster =
    {
      "LANDOFFICE_NAME_TH": getLandOfficeData?.LANDOFFICE_NAME_TH ? getLandOfficeData?.LANDOFFICE_NAME_TH : "-",
      // "PROVINCE_NAME_TH": getProvinceData?.PROVINCE_NAME_TH ? getProvinceData?.PROVINCE_NAME_TH : "-",
      "AMPHUR_NAME_TH": getAmpuhrData?.AMPHUR_NAME_TH ? getAmpuhrData?.AMPHUR_NAME_TH : "-",
      "TAMBOL_NAME_TH": getTambolData?.TAMBOL_NAME_TH ? getTambolData?.TAMBOL_NAME_TH : "-",
    }


    console.log(dataMaster, "dataMaster");

    let dataObj = excelBodyData;
    console.log(dataObj, "dataObj");
    let newArr = []
    for (let i in dataObj) {
      if (dataObj[i].hasOwnProperty('PARCEL_SURVEY_NO')) {
        let item = dataObj[i];
        if (item.active == true) {
          item.PARCEL_HSFS = 1
        }
        if (item.active == false) {
          item.PARCEL_HSFS = 0
        }
        console.log(item, "item");
        let newData =
        {
          "ROW_NO": "",
          "SURVEY_ID": item.PARCEL_SURVEY_NO,
          "RECEIVE": item.PARCEL_HSFS == 1 ? item.PARCEL_HSFS = "/" : null,
          "NO_RECEIVE": item.PARCEL_HSFS == 0 ? item.PARCEL_HSFS = "/" : null,
          "REMARK": "",
          "DELIMITER": "",
          //// col 2
          "ROW_NO_2": "",
          "SURVEY_ID_2": item.PARCEL_SURVEY_NO,
          "RECEIVE_2": item.PARCEL_HSFS == 1 ? item.PARCEL_HSFS = "/" : null,
          "NO_RECEIVE_2": item.PARCEL_HSFS == 0 ? item.PARCEL_HSFS = "/" : null,
          "REMARK_2": "",
          "DELIMITER_2": "",
          //// col 3
          "ROW_NO_3": "",
          "SURVEY_ID_3": item.PARCEL_SURVEY_NO,
          "RECEIVE_3": item.PARCEL_HSFS == 1 ? item.PARCEL_HSFS = "/" : null,
          "NO_RECEIVE_3": item.PARCEL_HSFS == 0 ? item.PARCEL_HSFS = "/" : null,
          "REMARK_3": "",
          "DELIMITER_3": "",
        }
        newArr.push(newData)
      } else if (dataObj[i].hasOwnProperty('PARCEL_LAND_SURVEY_NO')) {
        let item = dataObj[i];
        if (item.active == true) {
          item.PARCEL_LAND_HSFS = 1
        }
        if (item.active == false) {
          item.PARCEL_LAND_HSFS = 0
        }
        console.log(item, "item");
        let newData =
        {
          "ROW_NO": "",
          "SURVEY_ID": item.PARCEL_LAND_NO,
          "RECEIVE": item.PARCEL_LAND_HSFS == 1 ? item.PARCEL_LAND_HSFS = "/" : null,
          "NO_RECEIVE": item.PARCEL_LAND_HSFS == 0 ? item.PARCEL_LAND_HSFS = "/" : null,
          "REMARK": "",
          "DELIMITER": "",
          //// col 2
          "ROW_NO_2": "",
          "SURVEY_ID_2": item.PARCEL_LAND_NO,
          "RECEIVE_2": item.PARCEL_LAND_HSFS == 1 ? item.PARCEL_LAND_HSFS = "/" : null,
          "NO_RECEIVE_2": item.PARCEL_LAND_HSFS == 0 ? item.PARCEL_LAND_HSFS = "/" : null,
          "REMARK_2": "",
          "DELIMITER_2": "",
          //// col 3
          "ROW_NO_3": "",
          "SURVEY_ID_3": item.PARCEL_LAND_NO,
          "RECEIVE_3": item.PARCEL_LAND_HSFS == 1 ? item.PARCEL_LAND_HSFS = "/" : null,
          "NO_RECEIVE_3": item.PARCEL_LAND_HSFS == 0 ? item.PARCEL_LAND_HSFS = "/" : null,
          "REMARK_3": "",
          "DELIMITER_3": "",
        }
        newArr.push(newData)
      }
    }
    console.log(newArr, "newArr");
    // await setExcelHeadData(newArr)
    let data = await _createData(newArr)
    const workbook = new Excel.Workbook();
    // workbook.creator = logindata.USER_PID;
    const worksheet = workbook.addWorksheet("บัญชีคุมเบิก-จ่ายเอกสารสารบบ");
    worksheet.pageSetup.paperSize = 9;
    worksheet.pageSetup.orientation = 'portrait';
    worksheet.pageSetup.fitToPage = true;
    worksheet.pageSetup.font = 'TH Sarabun New';
    //==========================================================HEAD========================================================================//
    worksheet.mergeCells("A1", "R1");
    worksheet.getCell("A1").value = dataMaster.LANDOFFICE_NAME_TH;
    worksheet.getCell("A1").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("A1").font = { bold: true, size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(1).height = 35.00;

    worksheet.mergeCells("A2", "R2");
    worksheet.getCell("A2").value = "บัญชีคุมเบิก-จ่ายเอกสารสารบบ";
    worksheet.getCell("A2").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("A2").font = { size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(2).height = 30.00;

    worksheet.mergeCells("A3", "R3");
    worksheet.getCell("A3").value = "ต้นร่างเลขที่" + " " + documentNo;
    worksheet.getCell("A3").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("A3").font = { size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(3).height = 30.00;

    worksheet.mergeCells("A4", "H4");
    worksheet.getCell("A4").value = "อำเภอ" + "  " + dataMaster.AMPHUR_NAME_TH + "  ";
    worksheet.getCell("A4").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("A4").font = { size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(4).height = 30.00;

    worksheet.mergeCells("I4", "M4");
    worksheet.getCell("I4").value = "ตำบล" + "  " + dataMaster.TAMBOL_NAME_TH + "  "
    worksheet.getCell("I4").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("I4").font = { size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(4).height = 30.00;

    worksheet.mergeCells("N4", "R4");
    worksheet.getCell("N4").value = "วันที่เบิก…..................................................................";
    worksheet.getCell("N4").alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("N4").font = { size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(4).height = 30.00;

    worksheet.mergeCells("A5", "M5");
    worksheet.getCell("A5").value = "";
    worksheet.getCell("A5").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(5).height = 30.00;

    worksheet.mergeCells("N5", "R5");
    worksheet.getCell("N5").value = "วันที่คืน…...................................................................";
    worksheet.getCell("N5").alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getCell("N5").font = { size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(5).height = 30.00;

    //=================================================COLUMN
    worksheet.getRow(7).values = ["ลำดับ", "ต้นร่างเลขที่", "ได้รับ", "ไม่ได้รับ", "หมายเหตุ", "", "ลำดับ", "ต้นร่างเลขที่", "ได้รับ", "ไม่ได้รับ", "หมายเหตุ", "", "ลำดับ", "ต้นร่างเลขที่", "ได้รับ", "ไม่ได้รับ", "หมายเหตุ", ""];
    worksheet.getRow(7).font = { bold: true };
    worksheet.getRow(7).height = 30;
    worksheet.getRow(7).alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getRow(7).font = { size: 18, name: 'TH Sarabun New' };
    const row7 = worksheet.getRow(7);
    for (let i = 1; i <= worksheet.columns.length; i++) {
      const cell = row7.getCell(i);
      const colLetter = cell.address.substring(0, 1);

      if (colLetter !== 'F' && colLetter !== 'L' && colLetter !== 'R') {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      }
    }
    //CONFIG_COLUMN
    worksheet.columns = [
      { key: 'ROW_NO_1', width: 10 },
      { key: 'SURVEY_ID_1', width: 15 },
      { key: 'RECEIVE_1', width: 12 },
      { key: 'NO_RECEIVE_1', width: 12 },
      { key: 'REMARK_1', width: 25 },
      { key: 'DELIMITER_1', width: 2 },
      { key: 'ROW_NO_2', width: 10 },
      { key: 'SURVEY_ID_2', width: 15 },
      { key: 'RECEIVE_2', width: 12 },
      { key: 'NO_RECEIVE_2', width: 12 },
      { key: 'REMARK_2', width: 25 },
      { key: 'DELIMITER_2', width: 2 },
      { key: 'ROW_NO_3', width: 10 },
      { key: 'SURVEY_ID_3', width: 15 },
      { key: 'RECEIVE_3', width: 12 },
      { key: 'NO_RECEIVE_3', width: 12 },
      { key: 'REMARK_3', width: 25 },
      { key: 'DELIMITER_3', width: 2 },
    ]
    //==========================================================BODY========================================================================//
    worksheet.addRows(data);
    // set border for all cells in rows 8-47, excluding columns F, L, and R
    for (let row = 8; row <= 47; row++) {
      for (let col = 1; col <= worksheet.columnCount; col++) {
        worksheet.getCell(row, col).font = { size: 16, name: 'TH Sarabun New' }
        if (col !== 6 && col !== 12 && col !== worksheet.columnCount) {
          worksheet.getCell(row, col).border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
          worksheet.getCell(row, col).alignment = {
            vertical: 'middle',
            horizontal: 'center',
          };

        }

      }
    }
    //==========================================================FOOTER========================================================================//
    worksheet.mergeCells("A49", "E49");
    worksheet.getCell("A49").value = "ลงชื่อ......................................................ผู้เบิกเอกสาร";
    worksheet.getCell("A49").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("A49").font = { size: 18, name: 'TH Sarabun New' };

    worksheet.mergeCells("G49", "K49");
    worksheet.getCell("G49").value = "";
    worksheet.getCell("G49").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("G49").font = { size: 18, name: 'TH Sarabun New' };

    worksheet.mergeCells("M49", "Q49");
    worksheet.getCell("M49").value = "ลงชื่อ....................................................ผู้รับคืนเอกสาร";
    worksheet.getCell("M49").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("M49").font = { size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(49).height = 33.00;

    worksheet.mergeCells("A51", "E51");
    worksheet.getCell("A51").value = "(.................................................................)";
    worksheet.getCell("A51").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("A51").font = { size: 18, name: 'TH Sarabun New' };

    worksheet.mergeCells("G51", "K51");
    worksheet.getCell("G51").value = "";
    worksheet.getCell("G51").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("G51").font = { size: 18, name: 'TH Sarabun New' };

    worksheet.mergeCells("M51", "Q51");
    worksheet.getCell("M51").value = "(.................................................................)";
    worksheet.getCell("M51").alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getCell("M51").font = { size: 18, name: 'TH Sarabun New' };
    worksheet.getRow(51).height = 33.00;

    const buffer = await workbook.xlsx.writeBuffer();
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    const fileExtension = '.xlsx';

    const blob = new Blob([buffer], { type: fileType });

    saveAs(blob, "บัญชีคุมเบิก-จ่ายเอกสารสารบบ ต้นร่างเลขที่" + " " + documentNo + fileExtension);

  };

  const _createData = (data) => {
    console.log(data, "_createDataExcel");
    let dataLength = data.length;
    let newData = [];

    for (let i = 0; i < dataLength; i++) {
      let columnIndex = Math.floor(i / 40) + 1; // determine which column to add the data to

      if (columnIndex > 3) { // maximum of 3 columns
        console.error('Data exceeds maximum column count.');
        break;
      }

      let objIndex = i % 40; // determine the index of the object in the newData array

      if (!newData[objIndex]) {
        // create a new object if it doesn't exist in the array
        newData[objIndex] = {
          [`ROW_NO_${columnIndex}`]: i + 1,
          [`SURVEY_ID_${columnIndex}`]: data[i].SURVEY_ID,
          [`RECEIVE_${columnIndex}`]: data[i].RECEIVE,
          [`NO_RECEIVE_${columnIndex}`]: data[i].NO_RECEIVE,
          [`REMARK_${columnIndex}`]: data[i].REMARK,
          [`DELIMITER_${columnIndex}`]: "",
        };
      } else {
        // add the data to an existing object
        newData[objIndex][`ROW_NO_${columnIndex}`] = i + 1;
        newData[objIndex][`SURVEY_ID_${columnIndex}`] = data[i].SURVEY_ID;
        newData[objIndex][`RECEIVE_${columnIndex}`] = data[i].RECEIVE;
        newData[objIndex][`NO_RECEIVE_${columnIndex}`] = data[i].NO_RECEIVE;
        newData[objIndex][`REMARK_${columnIndex}`] = data[i].REMARK;
        newData[objIndex][`DELIMITER_${columnIndex}`] = "";
      }
    }

    console.log(newData, "newData");
    return newData;
  }


  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Tooltip title={"ส่งออกบัญชีเบิกเอกสาร"}>
              <Button
                variant="contained"
                label="Export"
                color="success"
                onClick={exTest}
                disabled={props.disabled}
                startIcon={
                  <Avatar sx={{ width: 24, height: 24 }}>
                    <Image src={"/excel.png"} width={20} height={20} />
                  </Avatar>
                }
              >
                Export
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}