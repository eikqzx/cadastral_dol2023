import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getDocument() {
    let url = `/api/mas/document/getDocument`
    AddLoading();
    try {
        let res = await axios.get(url)
        let data = res.data
        RemoveLoading();
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading();
        console.log(err)
        return false
    }
}

export async function getDocumentByRegister(dataSend) {
    let url = `/api/mas/document/getDocumentByRegister`
    AddLoading();
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading();
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading();
        console.log(err)
        return false
    }
}

export async function getDocumentByPK(seq) {
    let url = `/api/mas/document/getDocumentByPK`
    let dataSend = {
        seq: seq
    }
    AddLoading();
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading();
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading();
        console.log(err)
        return false
    }
}

export async function getDocumentByPKList(list) {
    let url = `/api/mas/document/getDocumentByPK`;
    let newDataSet = [];
    AddLoading();
    for (var i in list) {
        let dataSend = {
            seq: list[i],
        };
        try {
            let res = await axios.post(url, dataSend);
            let data = res.data;
            newDataSet.push(data.rows[0]);
        } catch {
            RemoveLoading();
            return false;
        }
    }
    RemoveLoading();
    return newDataSet;
}

export async function updDocument(seq, dataSend) {
    let url = `/api/mas/document/updDocument`
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

export async function insDocument(dataSend) {
    let url = `/api/mas/document/insDocument`
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

export async function updDocument_SYS_(dataSend) {
    let url = `/api/mas/document/updDocument_SYS_`
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

export async function documentByDocumentSTS(seq) {
    let url = `/api/mas/document/documentByDocumentSTS`
    let dataSend = {
        seq: seq
    }
    AddLoading();
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading();
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading();
        console.log(err)
        return false
    }
}