import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getParcel() {
    let url = `/api/evd/parcel/getParcel`
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

export async function getParcelByStatus(status) {
    let url = `/api/evd/parcel/getParcelByStatus`
    let dataSend = {
        status: status,
    };
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}

export async function insParcel(dataSend) {
    let url = `/api/evd/parcel/insParcel`
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

export async function getParcelFolder(dataSend) {
    let url = `/api/evd/parcel/getParcelFolder`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        //console.log(data)
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading()
        return false
    }
}
export async function getParcelByCondition(dataSend) {
    let url = `/api/evd/parcel/getParcelByCondition`
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

export async function getParcelByPK(seq) {
    let url = `/api/evd/parcel/getParcelByPK`
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

export async function updateParcel(seq, dataSend) {
    let url = `/api/evd/parcel/updateParcel`
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