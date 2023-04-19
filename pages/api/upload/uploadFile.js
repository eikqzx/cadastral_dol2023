import axios from "axios"

export default async function handler(req, res) {
    let url = `${process.env.hostUploadAPI}/api/multi_upload`
    console.log(req.body);
    try {
        let resdata = await axios.post(url, req.body,{
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}