import axios from "axios";
// import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";

export async function getMap(url_api) {
    let url = `/api/mapengine/getMap`;
    console.log(url_api,"url_api");
    let dataput = {
        url_api: url_api
    }
    // AddLoading();
    try {
        let res = await axios.post(url, dataput);
        let data = res.data;
        // RemoveLoading();
        return res;
    } catch {
        // RemoveLoading();
        return false;
    }
}
