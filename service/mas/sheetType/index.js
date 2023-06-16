import axios from "axios";
import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";

export async function getSheetType() {
    let url = `/api/mas/sheetType/getSheetType`
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
export async function getSheetTypeByPK(seq) {
    let url = `/api/mas/sheetType/getSheetTypeByPK`
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
export async function getSheetTypeByPKList(list) {
    let url = `/api/mas/sheetType/getSheetTypeByPK`
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