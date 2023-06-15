import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";


export async function getAllCiracoreImage() {
    let url = `/api/sva_ciracore/getAllCiracoreImage`
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

export async function insCiracoreImage(dataSend) {
    let url = `/api/sva_ciracore/insCiracoreImage`
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

export async function updCiracoreImage(seq, dataSend) {
    let url = `/api/sva_ciracore/updCiracoreImage`
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

export async function mrgCiracoreImage1(dataSend) {
    let url = `/api/sva_ciracore/mrgCiracoreImage1`
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

export async function ciracoreImage10XByConditionCadastralNoTo(dataSend) {
    let url = `/api/sva_ciracore/ciracoreImage10XByConditionCadastralNoTo`
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

export async function ciracoreImageByCadastralSeq(seq) {
    let url = `/api/sva_ciracore/ciracoreImageByCadastralSeq`
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
