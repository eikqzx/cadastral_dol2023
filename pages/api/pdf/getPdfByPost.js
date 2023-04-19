import axios from "axios"

var qs = require('qs');
const https = require('https');

export default async function handler(req, res) {
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    let url = req.body.url_api
    try {
        let resdata = await axios.post(url, qs.stringify(req.body), {
            responseType: 'arraybuffer',
            encoding: null,
            headers: {
                'Accept': 'application/pdf'
            },
            method: "POST",
            // httpsAgent: agent
        })
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}