import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function condoRoomHSFSByCondoRoomlIndexSeqGroup(dataSend) {
    let url = `/api/reg/condoRoomHSFS/condoRoomHSFSByCondoRoomlIndexSeqGroup`
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

export async function mergeCondoRoomHSFS(dataSend) {
    let url = `/api/reg/condoRoomHSFS/mergeCondoRoomHSFS`
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

export async function condoRoomHSFSListByCondoRoomIndexSeq(dataSend) {
    let url = `/api/reg/condoRoomHSFS/condoRoomHSFSListByCondoRoomIndexSeq`
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

export async function condoRoomHSFSLogByCondoRoomIndexSeq(dataSend) {
    let url = `/api/reg/condoRoomHSFS/condoRoomHSFSLogByCondoRoomIndexSeq`
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
