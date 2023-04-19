import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getRegParcelLog() {
    let url = `/api/reg/parcelLog/getRegParcelLog`
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