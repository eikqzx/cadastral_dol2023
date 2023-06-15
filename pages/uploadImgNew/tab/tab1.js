import React from 'react'
import {
    Grid,
    Tab,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Divider,
    Button,
    IconButton,
    Box,
    MenuList,
    MenuItem,
    Card,
    CardActionArea,
    CardMedia,
    Backdrop,
    Tooltip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Snackbar,
    Alert,
    Stack
} from "@mui/material";

export default function Tab1() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container>
                <Grid p={1} spacing={1} container sx={{ height: "15vh" }}>
                    tab1
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
                <Grid container p={0.5} spacing={1} >
                    <Grid item xs={9}>
                        <Paper
                            style={{ textAlign: "center" }}
                            sx={{
                                height: "85vh",
                                border: 1,
                                borderColor: "grey.500",
                                flexGrow: 1,
                                overflowY: "auto",
                            }}
                        >
                            tab1
                        </Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper
                            sx={{
                                height: "85vh",
                                border: 1,
                                borderColor: "grey.500",
                                flexGrow: 1,
                                overflowY: "auto",
                                overflowX: "auto"
                            }}
                        >
                            tab1
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
