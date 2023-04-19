import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getParcelLandHSFS() {
    let url = `/api/evd/parcelLandHSFS/getParcelLandHSFS`
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
    let url = `/api/evd/parcelLandHSFS/getParcelLandHSFSByPK`
    let dataSend = {
        seq: seq
    }
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

export async function insParcelLandHSFS(datasend) {
    let url = `/api/evd/parcelLandHSFS/insParcelLandHSFS`
    AddLoading()
    try {
        let res = await axios.post(url,datasend)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function updateParcelLandHSFS(seq,dataSend) {
    let url = `/api/evd/parcelLandHSFS/updateParcelLandHSFS`
    AddLoading()
    let dataput = {
        seq: seq,
        dataSend: dataSend,
    }
    try {
        let res = await axios.post(url,dataput)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function getParcelLandHSFSByLandOfficeSeq(seq) {
    let url = `/api/evd/parcelLandHSFS/getParcelLandHSFSByLandOfficeSeq`
    AddLoading()
    let dataSend = {
        seq: seq
    }
    try {
        let res = await axios.get(url,dataSend)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function getParcelLandHSFSByPrintPlateTypeSeq(seq) {
    let url = `/api/evd/parcelLandHSFS/getParcelLandHSFSByPrintPlateTypeSeq`
    AddLoading()
    let dataSend = {
        seq: seq
    }
    try {
        let res = await axios.get(url,dataSend)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}

export async function getParcelLandHSFSByConditionParcelLandNo(dataSend) {
    let url = `/api/evd/parcelLandHSFS/getParcelLandHSFSByCondition`
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

export async function getParcelLandHSFSByCondition(dataSend) {
    let url = `/api/evd/parcelLandHSFS/getParcelLandHSFSByCondition`
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

export async function getParcelLandHSFSByConditionParcelLandSurveyNo(dataSend) {
    let url = `/api/evd/parcelLandHSFS/getParcelLandHSFSByCondition`
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

export async function parcelLandHSFSFolderSeqParcelLandSurveyNoNextVal() {
    let url = `/api/evd/parcelLandHSFS/parcelLandHSFSFolderSeqParcelLandSurveyNoNextVal`
    AddLoading()
    try {
        let res = await axios.get(url)
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

export async function parcelLandHSFSFolderSeqParcelLandNoNextVal() {
    let url = `/api/evd/parcelLandHSFS/parcelLandHSFSFolderSeqParcelLandNoNextVal`
    AddLoading()
    try {
        let res = await axios.get(url)
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

export async function mergeEVDParcelLandHSFS(dataSend) {
    let url = `/api/evd/parcelLandHSFS/mergeParcelLandHSFS`
    AddLoading()
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

export async function parcelLandHSFSByConditionParcelLandSurveyNo(dataSend) {
    let url = `/api/evd/parcelLandHSFS/parcelLandHSFSByConditionParcelLandSurveyNo`
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

export async function parcelLandHSFSByConditionParcelLandNo(dataSend) {
    let url = `/api/evd/parcelLandHSFS/parcelLandHSFSByConditionParcelLandNo`
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