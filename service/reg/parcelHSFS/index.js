import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function insertParcelHSFS(dataSend) {
    let url = `/api/reg/parcelHSFS/insertParcelHSFS`
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

export async function updateRegParcelHSFS(seq,dataSend) {
    let url = `/api/reg/parcelHSFS/updateRegParcelHSFS`
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

export async function parcelHSFSByParcelIndexSeqGroup(dataSend) {
    let url = `/api/reg/parcelHSFS/parcelHSFSByParcelIndexSeqGroup`
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

export async function parcelHSFSListByParcelIndexSeq(dataSend) {
    let url = `/api/reg/parcelHSFS/parcelHSFSListByParcelIndexSeq`
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

export async function parcel102ByConditionParcelSurveyNoTo(dataSend) {
    let url = `/api/reg/parcelHSFS/parcel102ByConditionParcelSurveyNoTo`
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

export async function mergeParcelHSFS(dataSend) {
    let url = `/api/reg/parcelHSFS/insertParcelHSFS`
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

export async function parcelHSFS10XByConditionParcelSurveyNoTo(dataSend) {
    let url = `/api/reg/parcelHSFS/parcelHSFS10XByConditionParcelSurveyNoTo`
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

export async function parcelOwnerByParcelSeq(seq) {
    let url = `/api/reg/parcelHSFS/parcelOwnerByParcelSeq`
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

export async function parcelOLGTByParcelSeq(seq) {
    let url = `/api/reg/parcelHSFS/parcelOLGTByParcelSeq`
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

export async function parcelHSFSLogByParcelIndexSeq(seq) {
    let url = `/api/reg/parcelHSFS/parcelHSFSLogByParcelIndexSeq`
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

export async function parcelHSFSLogByParcelIndexSeqPost(dataSend) {
    let url = `/api/reg/parcelHSFS/parcelHSFSLogByParcelIndexSeqPost`
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

export async function insertParcelHSFSLog(dataSend) {
    let url = `/api/reg/parcelHSFS/insertParcelHSFSLog`
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

export async function parcelHSFSByParcelIndexSeq(seq) {
    let url = `/api/reg/parcelHSFS/parcelHSFSByParcelIndexSeq`
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