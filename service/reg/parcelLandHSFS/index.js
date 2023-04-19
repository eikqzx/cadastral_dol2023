// parcelLandHSFS102ByConditionparcelLandLandLandSurveyNoTo
import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getRegParcelLandHSFS() {
    let url = `/api/reg/parcelLandHSFS/getRegParcelLandHSFS`
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

export async function getParcelLandHSFSByPK(seq) {
    let url = `/api/reg/parcelLandHSFS/getParcelLandHSFSByPK`
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


export async function insertParcelLandHSFS(dataSend) {
    let url = `/api/reg/parcelLandHSFS/insertParcelLandHSFS`
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
export async function mergeParcelLandHSFS(dataSend) {
    let url = `/api/reg/parcelLandHSFS/mergeParcelLandHSFS`
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
export async function updateRegParcelLandLandHSFS(seq,dataSend) {
    let url = `/api/reg/parcelLandHSFS/updateRegparcelLandHSFS`
    let dataput = {
        seq:seq,
        dataSend:dataSend
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

export async function parcelLandHSFSListByParcelLandIndexSeq(dataSend) {
    let url = `/api/reg/parcelLandHSFS/parcelLandHSFSListByParcelLandIndexSeq`
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

export async function parcelLandHSFSGroupByParcelLandIndexSeq(dataSend) {
    let url = `/api/reg/parcelLandHSFS/parcelLandHSFSGroupByParcelLandIndexSeq`
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

export async function parcelLand102ByConditionParcelLandLandSurveyNoTo(dataSend) {
    let url = `/api/reg/parcelLandHSFS/parcelLand102ByConditionParcelLandLandSurveyNoTo`
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

export async function parcelLandHSFS102ByConditionParcelLandSurveyNoTo(dataSend) {
    let url = `/api/reg/parcelLandHSFS/parcelLandHSFS102ByConditionParcelLandSurveyNoTo`
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

export async function parcelLandHSFS10XByConditionParcelLandSurveyNoTo(dataSend) {
    let url = `/api/reg/parcelLandHSFS/parcelLandHSFS10XByConditionParcelLandSurveyNoTo`
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

export async function parcelLandOwnerByParcelLandSeq(seq) {
    let url = `/api/reg/parcelLandHSFS/parcelLandOwnerByParcelLandSeq`
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

export async function parcelLandOLGTByParcelSeq(seq) {
    let url = `/api/reg/parcelLandHSFS/parcelLandOLGTByParcelSeq`
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

export async function parcelLandLog(dataSend) {
    let url = `/api/reg/parcelLandHSFS/parcelLandLog`
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