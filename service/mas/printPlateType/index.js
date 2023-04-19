import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getPrintPlateType() {
    let url = `/api/mas/printPlateType/getPrintPlateType`
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

export async function getPrintPlateTypeByStatus(status) {
    let url = `/api/mas/printPlateType/getPrintPlateTypeByStatus`
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
export async function getPrintPlateTypeByPK(seq) {
    let url = `/api/mas/printPlateType/getPrintPlateTypeByPK`
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

export async function getPrintPlateTypeByPKList(list) {
    let url = `/api/mas/printPlateType/getPrintPlateTypeByPK`;
    let newDataSet = []
    AddLoading()
    for (var i in list) {
        if (list[i] !== undefined && list[i] !== null) {
            let dataSend = {
                seq: list[i]
            }
            try {
                let res = await axios.post(url, dataSend)
                let data = res.data
                for (var i in data) {
                    newDataSet.push(data[i])
                }
            } catch {
                RemoveLoading()
                return false
            }
        }
    }
    RemoveLoading()
    return newDataSet
}
export async function updPrintPlateType(seq, dataSend) {
    let url = `/api/mas/printPlateType/updPrintPlateType`
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

export async function insPrintPlateType(dataSend) {
    let url = `/api/mas/printPlateType/insPrintPlateType`
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
