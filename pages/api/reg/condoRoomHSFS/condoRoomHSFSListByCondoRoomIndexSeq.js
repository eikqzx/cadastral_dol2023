import axios from "axios"

export default async function handler(req, res) {
    let url = `${process.env.hostAPI}/REG_/condoRoomHSFSListByCondoRoomIndexSeq`;
    try {
        let resdata = await axios.post(url,req.body)
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}