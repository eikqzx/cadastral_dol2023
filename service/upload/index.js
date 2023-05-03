import { AddLoading, RemoveLoading } from '@/pages/components/loadingscreen';
import axios from 'axios';

export async function uploadFileMulti(file) {
    // let url = "api/upload/uploadFile"
    let url = `${process.env.hostUploadAPI}/api/multi_upload`
    AddLoading()
    try {
        let res = await axios.post(url, file, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
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

export async function uploadFileSingle(file) {
    // let url = "api/upload/uploadFile"
    let url = `${process.env.hostUploadAPI}/api/single`
    AddLoading()
    try {
        let res = await axios.post(url, file)
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

export async function getFile(path) {
    let url = "api/upload/getFile"
    let dataPut = {
        dataSend:path
    }
    AddLoading()
    try {
        let res = await axios.post(url,dataPut)
        let data = res.data
        //console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}