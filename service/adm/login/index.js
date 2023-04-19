import { AddLoading,RemoveLoading } from "@/pages/components/loadingscreen"
import axios from "axios"

export async function loginByUsername(dataSend) {
    let url = `/api/adm/userList/loginByUsername`
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading()
        return false
    }
}

export async function userListLastLogin(seq) {
    let url = `/api/adm/userList/userListLastLogin`
    let dataSend = {
        seq: seq
    }
    AddLoading()
    try {
        let res = await axios.post(url, dataSend)
        let data = res.data
        RemoveLoading()
        return data
    } catch (err) {
        console.log(err)
        RemoveLoading()
        return false
    }
}
