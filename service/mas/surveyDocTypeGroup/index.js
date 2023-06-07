import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function surveyDocTypeBySurveyDocTypeGroup(seq) {
    let url = `/api/mas/surveyDocTypeGroup/surveyDocTypeBySurveyDocTypeGroup`
    let dataSend = {
        seq:seq
    }
    AddLoading();
    try {
        let res = await axios.post(url,dataSend)
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

export async function getSurveyDocType() {
    let url = `/api/mas/surveyDocTypeGroup/getSurveyDocType`
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