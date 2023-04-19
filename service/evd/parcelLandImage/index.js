import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getParcelLandImage() {
    let url = `/api/evd/parcelLandImage/getParcelLandImage`
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

export async function getParcelLandImageByCondition(dataSend) {
    let url = `/api/evd/parcelLandImage/getParcelLandImageByCondition`
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

export async function getParcelLandImageByConditionParcelLandNo(dataSend) {
    let url = `/api/evd/parcelLandImage/getParcelLandImageByConditionParcelLandNo`
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

export async function mergeEVDParcelLandImage(dataSend) {
    let url = `/api/evd/parcelLandImage/mergeEVDParcelLandImage`
    AddLoading()
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