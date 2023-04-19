import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getCondoRoomHSFS() {
    let url = `/api/evd/condoRoomHSFS/getCondoRoomHSFS`
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

export async function getCondoRoomHSFSByPK(seq) {
    let url = `/api/evd/condoRoomHSFS/getCondoRoomHSFSByPK`
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


export async function insCondoRoomHSFS(dataSend) {
    let url = `/api/evd/condoRoomHSFS/insCondoRoomHSFS`
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

export async function getcondoRoomHSFSByCondition(dataSend) {
    let url = `/api/evd/condoRoomHSFS/getCondoRoomHSFSByCondition`
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

export async function updateCondoRoomHSFS(seq, dataSend) {
    let url = `/api/evd/condoRoomHSFS/updateCondoRoomHSFS`
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

export async function condoRoomHSFSFolderSeqNextVal() {
    let url = `/api/evd/condoRoomHSFS/condoRoomHSFSFolderSeqNextVal`
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

export async function mergeCondoRoomHSFS(dataSend) {
    let url = `/api/evd/condoRoomHSFS/mergeCondoRoomHSFS`
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
