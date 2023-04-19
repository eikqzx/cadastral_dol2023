import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function insertParcelLandImage(dataSend) {
    let url = `/api/reg/parcelLandImage/insertParcelLandImage`
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

export async function updateRegParcelLandImage(seq, dataSend) {
    let url = `/api/reg/parcelLandImage/updateRegParcelLandImage`
    let dataput = {
        seq: seq,
        dataSend: dataSend
    }
    AddLoading()
    try {
        let res = await axios.post(url, dataput)
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

export async function getRegParcelLandImage() {
    let url = `/api/reg/parcelLandImage/getRegParcelLandImage`
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

export async function getRegParcelLandImageByPK(seq) {
    let url = `/api/reg/parcelLandImage/getRegParcelLandImageByPK`
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

export async function getRegParcelLandImageByPKList(list) {
    let url = `/api/reg/parcelLandImage/getRegParcelLandImageByPK`
    let newDataSet = [];
    AddLoading();
    for (var i in list) {
        let dataSend = {
            seq: list[i],
        };
        try {
            let res = await axios.post(url, dataSend);
            let data = res.data;
            newDataSet.push(data[0]);
        } catch {
            RemoveLoading();
            return false;
        }
    }
    RemoveLoading();
    return newDataSet;
}

export async function getRegParcelLandImageByParcelLandSeq(seq) {
    let url = `/api/reg/parcelLandImage/getRegParcelLandImageByParcelLandSeq`
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


export async function mergeParcelLandImage_F(dataSend) {
    let url = `/api/reg/parcelLandImage/mergeParcelLandImage_F`
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

export async function mergeParcelLandImage_B(dataSend) {
    let url = `/api/reg/parcelLandImage/mergeParcelLandImage_B`
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

export async function mergeParcelLandImage_M(dataSend) {
    let url = `/api/reg/parcelLandImage/mergeParcelLandImage_M`
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

export async function logParcelLandImageLogByParcelLandSeq(seq) {
    let url = `/api/reg/parcelLandImage/logParcelLandImageLogByParcelLandSeq`
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

export async function parcelLandImage102ByConditionParcelLandNoTo(dataSend) {
    let url = `/api/reg/parcelLandImage/parcelLandImage102ByConditionParcelLandNoTo`
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