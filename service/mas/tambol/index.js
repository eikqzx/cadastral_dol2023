import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getTambol() {
    let url = `/api/mas/tambol/getTambol`
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

export async function getTambolByAmphur(seq) {
    // let url = `${process.env.hostAPI}/MAS/tambolByAmphur/${seq}`
    let url = `/api/mas/tambol/getTambolByAmphur`;
    // console.log(url)
    AddLoading();
    let dataput = {
        seq: seq,
    };

    try {
        let res = await axios.post(url, dataput);
        let data = res.data;
        RemoveLoading();
        return data;
    } catch {
        RemoveLoading();
        return false;
    }
}

export async function getTambolByPK(seq) {
    let url = `/api/mas/tambol/getTambolByPK`
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

export async function updTambol(seq, dataSend) {
    let url = `/api/mas/tambol/updTambol`
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

export async function insTambol(dataSend) {
    let url = `/api/mas/tambol/insTambol`
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
