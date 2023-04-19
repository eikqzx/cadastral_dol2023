import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getRegisterType() {
    let url = `/api/mas/registerType/getRegisterType`
    AddLoading();
    try {
        let res = await axios.get(url)
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

export async function getRegisterTypeBySTS(seq) {
    let url = `/api/mas/registerType/getRegisterTypeBySTS`
    let dataSend = {
        seq:seq
    }
    AddLoading();
    try {
        let res = await axios.post(url,dataSend)
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

export async function updRegisterType(seq, dataSend) {
    let url = `/api/mas/registerType/updRegisterType`
    let dataPut = {
        seq: seq,
        dataSend: dataSend,
    }
    console.log(url)
    AddLoading()
    try {
        let res = await axios.post(url, dataPut)
        let data = res.data
        console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}

export async function insRegisterType(dataSend) {
    let url = `/api/mas/registerType/insRegisterType`
    console.log(url)
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading()
        return false
    }
}

export async function registerTypeBySTS_(dataSend) {
    let url = `/api/mas/registerType/registerTypeBySTS_`
    AddLoading();
    try {
        let res = await axios.post(url,dataSend)
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

export async function updRegisterType_SYS_(dataSend) {
    let url = `/api/mas/registerType/updRegisterType_SYS_`
    console.log(url)
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading()
        return false
    }
}
