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