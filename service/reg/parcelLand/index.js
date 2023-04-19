import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";


export async function insParcelLand(dataSend) {
    let url = `/api/reg/parcelLand/insParcelLand`
    AddLoading();
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function updParcelLandLand(seq, dataSend) {
    let url = `/api/reg/parcelLand/updParcelLandLand`
    let dataput = {
        seq: seq,
        dataSend: dataSend
    }
    AddLoading()
    try {
        let res = await axios.post(url, dataput)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}

export async function getParcelLand() {
    let url = `/api/reg/parcelLand/getParcelLand`
    AddLoading()
    try {
        let res = await axios.get(url)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function getParcelLandByPK(seq) {
    let url = `/api/reg/parcelLand/getParcelLandByPK`
    let dataSend = {
        seq: seq
    }
    AddLoading();
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        //console.log(data)
        RemoveLoading();
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading();
        return false
    }
}
export async function getParcelLandByPKList(list) {
    let url = `/api/reg/parcelLand/getParcelLandByPK`;
    let newDataSet = [];
    AddLoading();
    for (var i in list) {
        let dataSend = {
            seq: list[i],
        };
        try {
            let res = await axios.post(url, dataSend);
            let data = res.data;
            newDataSet.push(data[0]);
        } catch {
            RemoveLoading();
            return false;
        }
    }
    RemoveLoading();
    return newDataSet;
}

export async function getParcelLandByLandOfficeSeq(seq) {
    let url = `/api/reg/parcelLand/getParcelLandByLandOfficeSeq`
    let dataSend = {
        seq: seq
    }
    AddLoading();
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        //console.log(data)
        RemoveLoading();
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading();
        return false
    }
}

export async function getParcelLandByCondition(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLandByCondition`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}

export async function getParcelLandByConditionParcelLandSurveyNo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLandByConditionParcelLandSurveyNo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}

export async function getParcelLandByConditionParcelLandSurveyNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLandByConditionParcelLandSurveyNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
export async function getParcelLand102ByConditionParcelLandNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLand102ByConditionParcelLandNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
export async function getParcelLand102ByConditionTambolParcelLandNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLand102ByConditionTambolParcelLandNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
export async function getParcelLand102ByConditionTambolMooParcelLandNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLand102ByConditionTambolMooParcelLandNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
export async function getParcelLandHSFS102ByConditionParcelLandSurveyNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLandHSFS102ByConditionParcelLandSurveyNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
export async function getParcelLandHSFS102ByConditionTambolParcelLandNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLandHSFS102ByConditionTambolParcelLandNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
export async function getParcelLandHSFS102ByConditionTambolMooParcelLandNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLandHSFS102ByConditionTambolMooParcelLandNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
export async function getParcelLand10XByConditionParcelLandNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLand10XByConditionParcelLandNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
export async function getParcelLandHSFS10XByConditionParcelLandNoTo(dataSend) {
    let url = `/api/reg/parcelLand/getParcelLandHSFS10XByConditionParcelLandNoTo`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}
