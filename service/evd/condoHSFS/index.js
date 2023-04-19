import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getCondoHSFS() {
    let url = `/api/evd/condoHSFS/getCondoHSFS`
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

export async function getCondoHSFSByPK(seq) {
    let url = `/api/evd/condoHSFS/getCondoHSFSByPK`
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


export async function insCondoHSFS(dataSend) {
    let url = `/api/evd/condoHSFS/insCondoHSFS`
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

export async function getCondoHSFSByCondition(dataSend) {
    let url = `/api/evd/condoHSFS/getCondoHSFSByCondition`
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

export async function updateCondoHSFS(seq, dataSend) {
    let url = `/api/evd/condoHSFS/updateCondoHSFS`
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

export async function condoHSFSFolderSeqNextVal() {
    let url = `/api/evd/condoHSFS/condoHSFSFolderSeqNextVal`
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

export async function mergeCondoHSFS(dataSend) {
    let url = `/api/evd/condoHSFS/mergeCondoHSFS`
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
