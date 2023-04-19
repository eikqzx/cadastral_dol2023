import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getParcelSurveyNo() {
    let url = `/api/evd/parcelSurvey/getParcelSurveyNo`
    AddLoading();
    try {
        let res = await axios.get(url)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading()
        return false
    }
}