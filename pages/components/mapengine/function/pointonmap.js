import { WKT } from "ol/format";
import React from "react";

import * as ServiceConGis from "../../../../service/GIS/"


export default function PointOnMap(props) {
    const [isAdd, setIsAdd] = React.useState(false)
    React.useEffect(() => {
        _createPoint()
    }, [])

    const _createPoint = async () => {
        console.log(props, "props.pointList")
        let res = await  ServiceConGis.getRentAreaKWTByContract(props.concode)
        console.log(res)
        try {
            let feature = new WKT().readFeature(res[0].WKT) 
            let featureTranfrom = feature.getGeometry().transform("EPSG:3857","EPSG:4326")
            console.log(featureTranfrom,"featureTranfrom")
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div></div>
    )
}