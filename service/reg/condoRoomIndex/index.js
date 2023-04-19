import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";


export async function condoRoomIndexByCondoRoomSeq(seq) {
    let url = `/api/reg/condoRoomIndex/condoRoomIndexByCondoRoomSeq`
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

export async function insertCondoRoomIndex(dataSend) {
    let url = `/api/reg/condoRoomIndex/insertCondoRoomIndex`
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

export async function condoRoomIndexOrderByCondoRoomIndexREGDTM(datasend) {
    let url = `/api/reg/condoRoomIndex/condoRoomIndexOrderByCondoRoomIndexREGDTM`
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

export async function insCondoRoomIndex(dataSend) {
    let url = `/api/reg/condoRoomIndex/insCondoRoomIndex`
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

export async function updateCondoRoomIndex(seq, dataSend) {
    let url = `/api/reg/condoRoomIndex/updateCondoRoomIndex`;
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