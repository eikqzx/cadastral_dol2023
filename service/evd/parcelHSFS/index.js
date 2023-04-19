import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getParcelHSFS() {
    let url = `/api/evd/parcelHSFS/getParcelHSFS`
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

export async function getParcelHSFSByPK(seq) {
    let url = `/api/evd/parcelHSFS/getParcelHSFSByPK`
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

export async function getParcelHSFSByPKList(list) {
    let url = `/api/evd/parcelHSFS/getParcelHSFSByPK`
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

export async function getParcelHSFSByLandOfficeSeq(seq) {
    let url = `/api/evd/parcelHSFS/getParcelHSFSByLandOfficeSeq/`
    let dataSend = {
        seq: seq
    }
    AddLoading()
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
export async function insParcelHSFS(dataSend) {
    let url = `/api/evd/parcelHSFS/insParcelHSFS`
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

export async function getParcelHSFSByCondition(dataSend) {
    let url = `/api/evd/parcelHSFS/getParcelHSFSByCondition`
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

export async function updateparcelHSFS(seq, dataSend) {
    let url = `/api/evd/parcelHSFS/updateparcelHSFS`
    let dataput = {
        seq: seq,
        dataSend: dataSend,
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

export async function mergeEVDParcelHSFS(dataSend) {
    let url = `/api/evd/parcelHSFS/mergeParcelHSFS`
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
