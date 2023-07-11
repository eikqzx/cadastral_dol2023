import axios from "axios"

export default async function handler(req, res) {
    // console.log(req,"reqhandler");
    let url = req.body.url_api
    // console.log(url,"reqhandlerreqhandler");
    try {
        let resdata = await axios.get(url)
        let data = resdata.data;
        // console.log(data);
        res.send(data)
    } catch (err) {
        console.log(err);
        res.status(403).send(err)
    }
}