import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getAmphur() {
    let url = `/api/mas/amphur/getAmphur`
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

export async function getAmphurByProvince(seq) {
    // let url = `${process.env.hostAPI}/MAS/amphurByProvince/${seq}`
    let url = `/api/mas/amphur/getAmphurByProvince`;
    let dataPut = {
        seq: seq,
    };
    AddLoading();
    try {
        let res = await axios.post(url, dataPut);
        let data = res.data;
        RemoveLoading();
        return data;
    } catch (err) {
        RemoveLoading();
        console.log(err);
        return false;
    }
}

export async function getAmphurByPK(seq) {
    let url = `/api/mas/amphur/getAmphurByPK`
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

export async function getAmphurByPKList(list) {
    let url = `/api/mas/amphur/getAmphurByPK`;
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
export async function updAmphur(seq, dataSend) {
    let url = `/api/mas/amphur/updAmphur`
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

export async function insAmphur(dataSend) {
    let url = `/api/mas/amphur/insAmphur`
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
