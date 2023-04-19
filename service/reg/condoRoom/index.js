import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getCondoRoom() {
    let url = `/api/reg/condoRoom/getCondoRoom`
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

export async function insCondoRoom(dataSend) {
    let url = `/api/reg/condoRoom/insCondoRoom`
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

export async function getCondoRoomByPK(seq) {
    let url = `/api/reg/condoRoom/getCondoRoomByPK`
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


export async function updateCondoRoom(seq, dataSend) {
    let url = `/api/reg/condoRoom/updateCondoRoom`;
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

export async function condoRoomHSFS102ByConditionCondoRoomNoTo(dataSend) {
    let url = `/api/reg/condoRoom/condoRoomHSFS102ByConditionCondoRoomNoTo`
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

export async function condoRoomHSFS10XByConditionCondoRoomNoTo(dataSend) {
    let url = `/api/reg/condoRoom/condoRoomHSFS10XByConditionCondoRoomNoTo`
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