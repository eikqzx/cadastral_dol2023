import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getProvince() {
    let url = `/api/mas/province/getProvince`
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

export async function getProvinceByPK(seq) {
    let url = `/api/mas/province/getProvinceByPK`
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

export async function getProvinceByPKList(list) {
    let url = `/api/mas/province/getProvinceByPK`;
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

export async function updProvince(seq, dataSend) {
    let url = `/api/mas/province/updProvince`
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

export async function insProvince(dataSend) {
    let url = `/api/mas/province/insProvince`
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
