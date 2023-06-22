import axios from "axios"
import formidable from 'formidable'
var FormData = require('form-data');
const fs = require('fs');

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req, res) {
    const form = formidable({ multiples: true });
    const data = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) reject({ err });
            resolve({ fields, files });
        });
    });
    // console.log(data,"multi_upload1");
    // console.log(data.files,"multi_upload2");
    res.status(200).json({ FORM_DATA: data });
    return
    let readFile = fs.createReadStream(data.files.scanFile[0].filepath);
    let dataFrom = new FormData();
    let url = `${process.env.hostUploadAPI}/api/multi_uploadByPath`
    // let {file} = req.body
    const contentType = req.headers['content-type'];
    dataFrom.append("scanFile", data.fields.scanFile[0]);
    dataFrom.append("scanFile", data.fields.scanFile[1]);
    dataFrom.append("scanFile", readFile);
    console.log(dataFrom,"multi_upload dataFrom");
    try {
        let resdata = await axios.post(url, dataFrom,contentType);
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}