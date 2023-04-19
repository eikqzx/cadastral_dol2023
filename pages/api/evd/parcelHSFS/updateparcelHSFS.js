import axios from "axios";

export default async function handler(req, res) {
    // let url = `${process.env.hostAPI}/MAS/religion/${req.body.seq}`
    let url = `${process.env.hostAPI}/EVD_/parcelHSFS/${req.body.seq}`

    try {
        console.log(url);
        let resdata = await axios.put(url, req.body.dataSend)
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}