import axios from "axios";
import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";

export async function getTitle() {
    let url = `/api/mas/title/getTitle`
    try {
        let res = await axios.get(url)
        let data = res.data
        //console.log(data)
        return data
    } catch (err) {
        console.log(err)
        return false
    }
}
export async function getTitleByPK(seq) {
    let url = `/api/mas/title/getTitleByPK`
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
export async function getTitleByPKList(list) {
    let url = `/api/mas/title/getTitleByPK`
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
export async function updTitle(seq, dataSend) {
    let url = `/api/mas/title/updTitle`
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

export async function insTitle(dataSend) {
    let url = `/api/mas/title/insTitle`
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
