import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getCondoRoomImage() {
    let url = `/api/evd/condoRoomImage/getCondoRoomImage`
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

export async function getCondoRoomImageByCondition(dataSend) {
    let url = `/api/evd/condoRoomImage/getCondoRoomImageByCondition`
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

export async function mergeEVDCondoRoomImage(dataSend) {
    let url = `/api/evd/condoRoomImage/mergeEVDCondoRoomImage`
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
