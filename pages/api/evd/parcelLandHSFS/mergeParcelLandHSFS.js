import axios from "axios"
// import { verifyToken } from "../../../../constants/serviceToken";

export default async function handler(req, res) {
    let url = `${process.env.hostAPI}/EVD_/parcelLandHSFS`
    // let decode = verifyToken(req.body.token)
    // if (!decode) {
    //     res.status(403).send("Token is not valid")
    //     return
    // }
    try {
        let resdata = await axios.post(url,req.body)
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}