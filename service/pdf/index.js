import axios from "axios"
import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
var FormData = require('form-data');
const https = require('https');

export async function getPdfByPost(ur, data_r, img, url_api) {
    let url = `/api/pdf/getPdfByPost`
    let dataSend = {
        ur: ur,
        data_r: data_r,
        img: img,
        url_api: url_api
    }
    AddLoading()
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    try {
        let res = await axios.post(url, dataSend, {
            responseType: 'arraybuffer',
            encoding: null,
            headers: {
                'Accept': 'application/pdf'
            },
            method: "POST",
            // httpsAgent: agent
        })
        let data = res.data
        RemoveLoading()
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}