import axios from "axios"

export default async function handler(req, res) {
    let url = `${process.env.hostUploadAPI}/api/fileByPath?filePath=${req.body.dataSend}`
    // console.log(url,"file");
    // return
    try {
        let resdata = await axios.get(url);
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}

export const config = {
    api: {
        responseLimit: false, // Determines how much data should be sent from the response body. It is automatically enabled and defaults to 4mb.
    },
}