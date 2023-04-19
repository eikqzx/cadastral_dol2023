import Jwt from "jsonwebtoken";
// const convert = require("xml-js")

export function containsObject(obj, list) {
    var x;
    for (x in list) {
        if (list.hasOwnProperty(x) && list[x] === obj) {
            return x;
        }
    }

    return false;

}
export function filterRecordX(list, col, value) {
    let newList = []
    for (var i in list) {
        if (list[i][col] == value) {
            newList.push(list[i])
        }
    }
    return newList
}
export function filterRecordXArray(list, col, value) {
    let newList = []
    // console.log("filterRecordStatusArray", list, value)
    for (var i in list) {
        if (value.includes(list[i][col])) {
            newList.push(list[i])
        }
    }
    return newList
}
export function filterRecordStatus(list, value = "N") {
    let newList = []
    for (var i in list) {
        if (list[i].RECORD_STATUS == value) {
            newList.push(list[i])
        }
    }
    return newList
}
export function filterRecordStatusArray(list, value) {
    let newList = []
    // console.log("filterRecordStatusArray", list, value)
    for (var i in list) {
        if (value.includes(list[i].RECORD_STATUS)) {
            newList.push(list[i])
        }
    }
    return newList
}
export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
export function getCookie(cname) {
    if (process.browser) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
}
export function _createToken(data) {
    // console.log(Jwt.sign(data, process.env.privateKey),"token");
    try {
        var token = Jwt.sign(data, process.env.privateKey);
        console.log(token, "token");
        return token
    } catch (err) {
        console.log(err, "token");
        return false
    }
}
export function _readToken(token) {
    if (token == null) {
        return false
    } else {
        try {
            var decode = Jwt.verify(token, process.env.privateKey);
            return decode
        } catch (err) {
            console.log(err)
            return false
        }
    }
}

export function ReadParameter(string) {
    var url = new URL(window.location.href);
    var c = url.searchParams.get(string);
    return c
}
export function xml2json(xml) {
    try {
        let json = JSON.parse(convert.xml2json(xml, { compact: true }))
        return json;
    } catch (e) {
        console.log(e)
        return false
    }

}
export function joinData(data1, data2, key, newKey) {
    console.log("joindata")
    let newData = data1
    if (newData.length > 0) {
        for (var i in newData) {
            for (var j in data2) {
                if (data2[j][key] == newData[i][key]) {
                    newData[i][newKey] = data2[j][newKey];
                }
            }
        }
    }
    return newData
}

export function formatPIDString(str) {
    if (str != undefined) {
        // console.log(str, "str");
        const maskedStr = str.slice(0, -4) + "****";
        return maskedStr;
    }
}

export function createHRuserToDB(data) {
    let dataObj = {
        "EMPTYPE": data.emptype,
        "EMPID": data.empid,
        "FULLNAME": data.fullname,
        "POSNO": data.posno,
        "SHNAME": data.shname,
        "POSNAME": data.posname,
        "CLEVEL": data.clevel,
        "POSBCODE": data.posbcode,
        "SHBNAME": data.shbname,
        "POSBNAME": data.posbname,
        "DEPCOD": data.depcod,
        "DEPABB": data.depabb,
        "DEPNAM": data.depnam,
        "SECABB": data.secabb,
        "SECNAM": data.secnam,
        "DIVABB": data.divabb,
        "DIVNAM": data.divnam,
        "SIGN_LINE1": data.sign_line1,
        "SIGN_LINE2": data.sign_line2,
        "EMPL_NOTE": "",
        "RECORD_STATUS": "N",
        "CREATE_USER": "0000000000000"

    }
    return dataObj
}

export function dbdateformat(string) {
    //let date = string.replace("Z","")
    try {
        let date = string.split("T")
        return date[0]
    }
    catch {
        return null
    }
}

export function dbdateformatSpecfic(string, index) {
    //let date = string.replace("Z","")
    try {
        let date = string.split("T")
        if (index == 1) {
            return left(String(date[index]), 5)
        } else {
            return date[index]
        }
    }
    catch {
        return null
    }
}



export function manageReqLink(seq, process) {
    let dataJson = { req: seq, processSeq: process }
    let jsonStr = JSON.stringify(dataJson);
    // console.log(jsonStr);
    let encode = btoa(jsonStr)
    // console.log(link,"link");
    return encode;
}

export function manageReqLinkManageDoc(seq, process, manageDocSeq) {
    let dataJson = { req: seq, processSeq: process, manageDocSeq: manageDocSeq }
    let jsonStr = JSON.stringify(dataJson);
    // console.log(jsonStr);
    let encode = btoa(jsonStr)
    // console.log(link,"link");
    return encode;
}


export function linkData(data) {
    let dataJson = data
    let jsonStr = JSON.stringify(dataJson);
    // console.log(jsonStr);
    let encode = btoa(jsonStr)
    // console.log(link,"link");
    return encode;
}

export function right(str, chr) {
    return str.slice(str.length - chr, str.length);
}

export function left(str, chr) {
    return str.slice(0, chr - str.length);
}


export function readUrlBase64(string) {
    return atob(string)
}

export function _getDatafromArray(dataset, pk, colname, seq) {
    // console.log("_getDatafromArray", dataset, colname, seq)

    if (seq == null || seq == undefined) {
        return null
    }
    for (var i in dataset) {
        if (dataset[i] !== undefined) {
            if (dataset[i][pk] == seq) {
                return dataset[i][colname]
            }
        }
    }
    return null
}

export function _getUniqueFromArray(data, colname) {
    let newData = []
    for (var i in data) {
        if (data[i][colname] !== null && data[i][colname] !== undefined) {
            newData.push(data[i][colname])
        }
    }
    return [...new Set(newData)]
}

export function reqSeqNumber(req1, req2, req3) {
    return "REQ" + right(String(req1 + 543), 2) + req2 + right("000000" + req3, 6)
}

export function convertThaiArea(sqm) {
    let area = sqm
    let r = Math.floor(area / 1600)
    // console.log(r)
    let n = Math.floor((area - (r * 1600)) / 400)
    let w = ((area - ((r * 1600) + (n * 400))) / 4).toFixed(2)
    // console.log(w)
    return [r, n, w]
}
export function convertThaiAreaFromThaiArea(wah) {
    let area = wah
    let r = Math.floor(area / 400)
    // console.log(r)
    let n = Math.floor((area - (r * 400)) / 100)
    let w = ((area - ((r * 400) + (n * 100)))).toFixed(2)
    // console.log(w)
    return [r, n, w]
}

export function convertAreaFromThaiArea(r, n, w) {
    let r1 = r * 1600
    let n1 = n * 400
    let w1 = w * 4
    // console.log(r)
    return r1 + n1 + w1
}
export function convertThaiAreaToSqThai(r, n, w) {
    let r1 = r * 400
    let n1 = n * 100
    let w1 = w
    // console.log(r)
    return parseInt(r1) + parseInt(n1) + parseFloat(w1)
}

export const diffDate = (datex, datey) => { // ฟังก์ชั่น เอาวันที่ลบกัน เพื่อหาว่า กี่วัน
    // console.log("datex",datex, datey);
    if (datex == null || datey == null) {
        // console.log("datex",datex, datey);
        return null;
    }
    try {
        // console.log("datex", datex, datey);

        const date1 = new Date(datex);
        const date2 = new Date(datey);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }
    catch {
        return null;
    }
}



export function convertToUTM(lat, long) {
    var a_axis = 6378137
    var b_axis = 6356752.31424518
    var Hemisphere = 'S'
    var polarRadius = Math.abs(a_axis * a_axis) / b_axis
    var Eccentricity = Math.sqrt(Math.pow(a_axis, 2) - Math.pow(b_axis, 2)) / a_axis
    var _2a_Eccentric = Math.sqrt(Math.pow(a_axis, 2) - Math.pow(b_axis, 2)) / b_axis
    var e_prime = Math.pow(_2a_Eccentric, 2)
    var banda = ""
    if (lat > -72) { banda = "C" }
    if (lat > -64) { banda = "D" }
    if (lat > -56) { banda = "E" }
    if (lat > -48) { banda = "F" }
    if (lat > -40) { banda = "G" }
    if (lat > -32) { banda = "H" }
    if (lat > -24) { banda = "J" }
    if (lat > -16) { banda = "K" }
    if (lat > -8) { banda = "L" }
    if (lat > 0) { banda = "M" }
    if (lat > 8) { banda = "N" }
    if (lat > 16) { banda = "P" }
    if (lat > 24) { banda = "Q" }
    if (lat > 32) { banda = "R" }
    if (lat > 40) { banda = "S" }
    if (lat > 48) { banda = "T" }
    if (lat > 56) { banda = "U" }
    if (lat > 64) { banda = "V" }
    if (lat > 72) { banda = "W" }
    if (lat > 84) { banda = "X" }


    var EnRadianesLat = lat * Math.PI / 180
    var EnRadianesLong = long * Math.PI / 180
    var CalculoHuso = Math.trunc((long / 6) + 31)
    var MeridianoHuso = CalculoHuso * 6 - 183
    var DeltaLambda = Math.abs(EnRadianesLong) - ((MeridianoHuso * Math.PI) / 180)
    var A = Math.cos(EnRadianesLat) * Math.sin(DeltaLambda)
    var Xi = 0.5 * Math.log((1 + A) / (1 - A))
    var Ni_ = Math.pow(Math.cos(EnRadianesLat), 2)
    var Ni = (polarRadius / Math.pow(1 + e_prime * Ni_, (1 / 2))) * 0.9996
    var zeta__ = e_prime / 2
    var zeta_ = Math.cos(EnRadianesLat)
    var zeta = zeta__ * Math.pow(Xi, 2) * Math.pow(zeta_, 2)
    var Eta = Math.atan(Math.tan(EnRadianesLat) / Math.cos(DeltaLambda)) - EnRadianesLat

    var Alfa = (3 / 4) * e_prime
    var Beta = (5 / 3) * Math.pow(Alfa, 2)
    var Gramma = (35 / 27) * Math.pow(Alfa, 3)
    var A1 = Math.sin(2 * EnRadianesLat)
    var j2 = EnRadianesLat + (A1 / 2)
    var A2 = Math.abs(A1) * Math.pow(Math.cos(EnRadianesLat), 2)
    var j4 = ((3 * j2) + A2) / 4
    var j6 = (5 * j4 + A2 * Math.pow(Math.cos(EnRadianesLat), 2)) / 3
    var bfi = 0.9996 * polarRadius * (EnRadianesLat - (Alfa * j2) + (Beta * j4) - (Gramma * j6))




    var East = (Xi * Ni * (1 + zeta / 3) + 500000)
    var North = (Eta * Ni * (1 + zeta) + bfi)
    var mapzone = CalculoHuso + banda
    return {
        "Coordinate": { "East": East, "North": North },
        "MAPZONE": mapzone
    }

}

export function padNum(num, size) {
    try {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export function LoopObjectX(data, column) {
    let sum_location = "";
    let old_location = "";
    try {
        for (let i in data) {
            if (old_location != data[i][column]) {
                if (i == 0) {
                    sum_location += data[i][column];
                } else if ((i + 1) == data.length) {
                    sum_location += " และ" + data[i][column];
                } else {
                    sum_location += " " + data[i][column];
                }
            }
            sum_location = data[i][column];
        }
        return sum_location;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export function LoopObjectXComma(data, column) {
    let sum_location = "";
    let old_location = "";
    try {
        for (let i in data) {
            if (old_location != data[i][column]) {
                if (i == 0) {
                    sum_location += data[i][column];
                } else if ((i + 1) == data.length) {
                    sum_location += ", " + data[i][column];
                } else {
                    sum_location += ", " + data[i][column];
                }
            }
            sum_location = data[i][column];
        }
        return sum_location;
    } catch (error) {
        console.log(error);
        return false;
    }
}


export function getFiscalYear(date) {
    let startM = 10
    let m = date.getMonth() + 1
    let y = date.getFullYear()
    if (m < startM) {
        y = y
    } else {
        y = y + 1
    }
    return y
}


export const formatDate = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}


export function urlReader(p = 'data') {
    try {
        const current_url = new URL('' + window.location.href);
        const search_params = current_url.searchParams;
        const token = search_params.get(p);
        let jsonReq = JSON.parse(atob(token));
        // let req = jsonReq;
        let object = {
            current_url: current_url,
            search_params: search_params,
            jsonReq: jsonReq,
            token: token
        }
        return object
    } catch (error) {
        console.log(error, "urlReader");
        return false
    }
}




export function urlReaderFull(p = 'data') {
    try {
        const current_url = new URL('' + window.location.href);
        const search_params = current_url.searchParams;
        // let req = jsonReq;
        let object = {
            current_url: current_url,
            search_params: search_params,
        }
        return object
    } catch (error) {
        console.log(error, "urlReader");
        return false
    }
}

export function checkTypeFile(filename, type) {
    let newList = []
    console.log("typeFile", filename, type)
    if (type.includes(filename[0])) {
        console.log("includes");
        return true;
    } else {
        return false;
    }
}

export function checkTypeFileFull(file, type) {
    console.log("typeFile", file, type)
    let filenameArr = /[.]/.exec(file.name)
        ? /[^.]+$/.exec(file.name)
        : undefined;
    console.log(filenameArr, "viewFile");
    if (type.includes(filenameArr[0])) {
        console.log("includes");
        return true;
    } else {
        return false;
    }
}

export function dbdateformatTime(string) {
    //let date = string.replace("Z","")
    try {
        let date = string.split("T")
        let teme = date[1].split(".")
        return date[0] + '-' + teme[0]
    }
    catch {
        return null
    }
}

export const formatDate2 = (date) => {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [month, day, year].join('/');
}

export function isNotEmpty(obj) {
    return JSON.stringify(obj) !== "{}";
}