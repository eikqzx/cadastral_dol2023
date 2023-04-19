import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getRegParcelLandIndex() {
    let url = `/api/reg/parcelLandIndex/getRegparcelLandIndex`
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

export async function getRegParcelLandIndexByPK(seq) {
    let url = `/api/reg/parcelLandIndex/getRegparcelLandIndexByPK`
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

export async function getRegParcelLandIndexByParcelLandSeq(seq) {
    let url = `/api/reg/parcelLandIndex/getRegParcelLandIndexByParcelLandSeq`
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

export async function insertParcelLandIndex(dataSend) {
    let url = `/api/reg/parcelLandIndex/insertParcelLandIndex`
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

export async function updateParcelLandIndex(seq, dataSend) {
    let url = `/api/reg/parcelLandIndex/updateParcelLandIndex`;
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

export async function parcelLandIndexOrderByParcelIndexREGDTM(datasend) {
    let url = `/api/reg/parcelLandIndex/parcelLandIndexOrderByParcelIndexREGDTM`
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