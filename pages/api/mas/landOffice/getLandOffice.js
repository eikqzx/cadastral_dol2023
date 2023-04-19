import axios from "axios"

export default async function handler(req, res) {
    let url = `${process.env.hostAPI}/MAS_/landOffice`
    try {
        let resdata = await axios.get(url)
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}