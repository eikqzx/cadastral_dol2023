import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function insertParcelLandImageLog(dataSend) {
    let url = `/api/reg/parcelLandImageLog/insertParcelLandImageLog`
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

export async function updateRegParcelLandImageLog(seq, dataSend) {
    let url = `/api/reg/parcelLandImageLog/updateRegParcelLandImageLog`
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

export async function getRegParcelLandImageLog() {
    let url = `/api/reg/parcelLandImageLog/getRegParcelLandImageLog`
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

export async function getRegParcelLandImageLogByPK(seq) {
    let url = `/api/reg/parcelLandImageLog/getRegParcelLandImageLogByPK`
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

export async function getRegParcelLandImageLogByParcelLandSeq(seq) {
    let url = `/api/reg/parcelLandImageLog/getRegParcelLandImageLogByParcelLandSeq`
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

export async function getRegParcelLandImageLogByParcelLandImageSeq(seq) {
    let url = `/api/reg/parcelLandImageLog/getRegParcelLandImageLogByParcelLandImageSeq`
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