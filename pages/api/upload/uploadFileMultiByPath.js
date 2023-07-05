import axios from "axios"
import formidable from 'formidable'
var FormData = require('form-data');
const path = require('path');
const fs = require('fs');

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req, res) {
    let url = `${process.env.hostUploadAPI}/api/multi_uploadByPath`
    const form = formidable({ multiples: true });
    const data = await new Promise((resolve, reject) => {
        form.parse(req, function (err, fields, files) {
            if (err) reject({ err });
            resolve({ fields, files });
        });
    });
    let dataFrom = new FormData();
    const contentType = req.headers['content-type'];
    dataFrom.append("scanFile", data.fields.scanFile[0]);
    dataFrom.append("scanFile", data.fields.scanFile[1]);
    dataFrom.append("scanFile", data.fields.scanFile[2]);
    console.log(data,"multi_upload1");
    // console.log(data.files,"multi_upload2");
    // let dataFull = resdata.data
    try {
        let resdata = await axios.post(url, dataFrom,contentType);
        let data = resdata.data
        res.send(data)
    } catch (err) {
        res.status(403).send(err)
    }
}