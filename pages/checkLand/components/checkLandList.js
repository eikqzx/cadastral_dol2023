import React from "react";
import {
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    Typography
} from "@mui/material";
//ICONS
import InboxIcon from '@mui/icons-material/Inbox';
//SERVICES
import { cadastralImageByCadastralSeq } from "@/service/sva";
//COMPONENTS

export default function CheckImageListIndex(props) {
    console.log(props, "CheckImageListIndex");
    const [cadastralImageData, setCadastralImage] = React.useState([])
    const [imageData, setImageData] = React.useState([])

    React.useEffect(() => {
        if (props?.tabData) {
            _createNewData(props?.tabData)
        }
        console.log(cadastralImageData, "cadastralImageData");
    }, [props.tabData])

    const _createNewData = async (data) => {
        let res = await cadastralImageByCadastralSeq(data?.CADASTRAL_SEQ)
        res = res.rows
        setCadastralImage(res)
    }

    const handleClick = (el) => {
        props?.setImageData(el);
    };

    return (
        <Grid container>
            {/* {<CheckLandImageIndex data={imageData} />} */}
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        รายการภาพ
                    </Typography>
                </Grid>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List sx={{ overflow: 'auto', height: 'calc(40vh - 150px)' }}>
                        {
                            cadastralImageData?.map((el, index) => (
                                <ListItem
                                    key={index}
                                    onClick={() => handleClick({ ...el })}
                                >
                                    <ListItemButton>
                                        <ListItemText
                                            primary={
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <span>{el.IMAGE_PNAME}</span>
                                                    <span>{'แผ่นที่' + " " + el.IMAGE_PNO}</span>
                                                </div>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </Grid>
        </Grid >
    )
}
