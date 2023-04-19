import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getLandOffice() {
    let url = `/api/log/lanOffice/getLandOffice`
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

export async function getLandOfficeByPeriod(seq) {
    let url = `/api/log/lanOffice/getLandOfficeByPeriod`
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

export async function getLandOfficeByCondition(dataSend) {
    let url = `/api/log/lanOffice/getLandOfficeByCondition`
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

export async function getLandOfficeHSFSByLandOfficeSeq(dataSend) {
    let url = `/api/log/lanOffice/getLandOfficeHSFSByLandOfficeSeq`
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
