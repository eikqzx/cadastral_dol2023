import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";
import axios from "axios";

export async function getUserList() {
    let url = `/api/adm/userList/getUserList`
    AddLoading();
    try {
        let res = await axios.get(url)
        let data = res.data
        RemoveLoading();
        //console.log(data)
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading();
        return false
    }
}
export async function getUserListByPK(seq) {
    let url = `/api/adm/userList/getUserListByPK`
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

export async function getUserListByPKList(list) {
    let url = `/api/adm/userList/getUserListByPK`
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
export async function updUserList(seq, dataSend) {
    let url = `/api/adm/userList/updUserList`
    let dataPut = {
        seq: seq,
        dataSend: dataSend,
    }
    console.log(url)
    AddLoading()
    try {
        let res = await axios.post(url, dataPut)
        let data = res.data
        console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        RemoveLoading()
        console.log(err)
        return false
    }
}

export async function insUserList(dataSend) {
    let url = `/api/adm/userList/insUserList`
    console.log(url)
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        console.log(data)
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading()
        return false
    }
}
//ResetPassword

export async function updUserListPassByUsername(dataSend) {
    let url = `/api/adm/userList/updUserListPassByUsername`
    AddLoading();
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading();
        //console.log(data)
        return data
    } catch (err) {
        RemoveLoading();
        console.log(err)
        return false
    }
}