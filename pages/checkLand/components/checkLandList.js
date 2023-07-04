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
export default function CheckLandListIndex(props) {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        รายการภาพ
                    </Typography>
                </Grid>
                <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="รายการ" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Grid>
        </Grid >
    )
}