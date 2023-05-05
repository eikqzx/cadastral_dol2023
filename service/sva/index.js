import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function cadastralImage102ByConditionParcelNoTo(dataSend) {
    let url = `/api/sva/cadastralImage102ByConditionParcelNoTo`
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
export async function cadastralImage10XByConditionParcelNoTo(dataSend) {
    let url = `/api/sva/cadastralImage10XByConditionParcelNoTo`
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

export async function getCadastral() {
    let url = `/api/sva/getCadastral`
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

export async function updateCadastral(seq, dataSend) {
    let url = `/api/sva/updateCadastral`
    let dataput = {
        seq: seq,
        dataSend: dataSend
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

export async function updateCadastralImage(seq, dataSend) {
    let url = `/api/sva/updateCadastralImage`
    let dataput = {
        seq: seq,
        dataSend: dataSend
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

export async function insertCadastral(dataSend) {
    let url = `/api/sva/insertCadastral`
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

export async function mrgCadastralImage(dataSend) {
    let url = `/api/sva/mrgCadastralImage`
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

export async function getCadastralImage() {
    let url = `/api/sva/getCadastralImage`
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

export async function cadastralImageByCadastralSeq(seq) {
    let url = `/api/sva/cadastralImageByCadastralSeq`
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