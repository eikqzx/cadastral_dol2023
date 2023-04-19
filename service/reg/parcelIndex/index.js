import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getRegParcelIndex() {
    let url = `/api/reg/parcelIndex/getRegParcelIndex`
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
export async function parcelIndexOrderByParcelIndexREGDTM(datasend) {
    let url = `/api/reg/parcelIndex/parcelIndexOrderByParcelIndexREGDTM`
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
export async function getRegParcelIndexByPK(seq) {
    let url = `/api/reg/parcelIndex/getRegParcelIndexByPK`
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

export async function getRegParcelIndexByParcelSeq(seq) {
    let url = `/api/reg/parcelIndex/getRegParcelIndexByParcelSeq`
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

export async function insertParcelIndex(dataSend) {
    let url = `/api/reg/parcelIndex/insertParcelIndex`
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

export async function updateParcelIndex(seq, dataSend) {
    let url = `/api/reg/parcelIndex/updateParcelIndex`;
    let dataput = {
        seq: seq,
        dataSend: dataSend
    }
    AddLoading();
    try {
        let res = await axios.post(url, dataput)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}