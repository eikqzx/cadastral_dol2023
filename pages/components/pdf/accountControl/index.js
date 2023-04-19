
import React from "react";
import { manageReqLink } from "@/lib/datacontrol";
import { saveAs } from 'file-saver';
import { AddLoading, RemoveLoading } from "@/pages/components/loadingscreen";

export default function AccountControl(props) {
    const [src, setSrc] = React.useState(null);
    const [documentNo, setDocumentNo] = React.useState(props.documentNo)
    React.useEffect(() => {
        console.log("AccountControl", props);
        _genPDF();
    }, [props.pdfData]);
    const _genPDF = async () => {
        // let req_test = "100011";
        let requestdata = manageReqLink(props.pdfData, 0)
        const current_url = new URL('' + window.location.href);
        // const url = current_url.protocol + "//" + current_url.hostname + "/pdf_api_dol2023/?ur=accountControl&data_r=" + requestdata;
        console.log();
        const url = process.env.hostPdf + "pdf_api_dol2023/?ur=accountControl&data_r=" + requestdata;
        if (props.type_export == "print") {
            // window.open(url, "_blank");
            // print(url);
            console.log(url, "url_accountControl");
            await setSrc(url);
        }
        if (props.type_export == "export") {
            console.log(url, "export");
            AddLoading();
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const blob = await response.blob();
                const fileExtension = '.pdf';
                saveAs(blob, "บัญชีคุมเบิก-จ่ายเอกสารสารบบ หน้าสำรวจเลขที่" + " " + documentNo + fileExtension);
            } catch (error) {
                console.error("Error fetching data: ", error);
                // Handle the error appropriately, such as displaying an error message to the user
            }
            RemoveLoading();
        }
    }
}
