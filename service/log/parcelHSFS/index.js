import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getParcelHSFSByLandOfficeSeq(seq) {
    let url = `/api/log/parcelHSFS/getParcelHSFSByLandOfficeSeq`
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

export async function getParcelHSFSCreateDayByLandOfficeSeq(dataSend) {
    let url = `/api/log/parcelHSFS/getParcelHSFSCreateDayByLandOfficeSeq`
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

export async function getParcelHSFSLandOfficeByPeriod(dataSend) {
    let url = `/api/log/parcelHSFS/getParcelHSFSLandOfficeByPeriod`
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

export async function getParcelHSFSLandOfficeByLandOfficeSeq(dataSend) {
    let url = `/api/log/parcelHSFS/getParcelHSFSLandOfficeByLandOfficeSeq`
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

export async function getParcelHSFSLandOfficeHSFSByLandOfficeSeq(dataSend) {
    let url = `/api/log/parcelHSFS/getParcelHSFSLandOfficeHSFSByLandOfficeSeq`
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

export async function getParcelHSFS102ByLandOfficeSeq(dataSend) {
    let url = `/api/log/parcelHSFS/getParcelHSFS102ByLandOfficeSeq`
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

export async function getParcelHSFS103ByLandOfficeSeq(dataSend) {
    let url = `/api/log/parcelHSFS/getParcelHSFS103ByLandOfficeSeq`
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
