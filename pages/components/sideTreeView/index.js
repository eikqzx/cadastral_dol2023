import React from 'react'
import { TreeView, TreeItem } from '@mui/lab';
import { Button, Grid, Paper, Typography, IconButton, Stack, Tooltip, Snackbar, Alert } from '@mui/material';
import { decode } from "next-base64";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
//SERVICES
import { getStatus } from '@/service/mas/status';
import { getRegParcelIndexByParcelSeq } from '@/service/reg/parcelIndex';
import { parcelHSFSByParcelIndexSeqGroup } from '@/service/reg/parcelHSFS';
import { _getUniqueFromArray } from '@/lib/datacontrol';
//LIBRALIES
import { filterRecordStatus, isNotEmpty } from '@/lib/datacontrol';
//ICONS
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { getCadastralImageLog } from '@/service/sva';


var state
export default function SideTreeView(props) {
    console.log(props, "props SideTreeView");
    const [onSearchData, setOnSearchData] = React.useState([]);
    const [treeViewData, setTreeViewData] = React.useState([]);
    const [expanded, setExpanded] = React.useState([]);
    const [processSeq, setProcessSeq] = React.useState(102)
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [type, setType] = React.useState("success");
    const router = useRouter()
    const { pathname, query } = router
    console.log(pathname, "pathname");
    state = useSelector(state => state.job.value);
    const handleClose = () => {
        setOpen(false)
    }

    React.useEffect(() => {
        onCreateObject();
    }, [onSearchData]);

    const handleExpandAll = () => {
        const nodeIds = [];
        const traverse = (node, path) => {
            nodeIds.push(...path);
            node.DATA?.forEach(childNode => {
                if (childNode.PRINTPLATE_TYPE_SEQ == 1) {
                    traverse(childNode, [...path, childNode.PARCEL_SEQ]);
                }
                if (childNode.PRINTPLATE_TYPE_SEQ == 2 || childNode.PRINTPLATE_TYPE_SEQ == 3 || childNode.PRINTPLATE_TYPE_SEQ == 4 || childNode.PRINTPLATE_TYPE_SEQ == 5) {
                    traverse(childNode, [...path, childNode.PARCEL_LAND_SEQ]);
                }
            });
        };
        treeViewData.forEach(node => {
            traverse(node, [node.STATUS_SEQ]);
        });

        return [...new Set(nodeIds)].map(item => String(item));
    };

    console.log(handleExpandAll(), "handleExpandAll");
    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? handleExpandAll()
                : [],
        );
    };

    const handleCollapse = nodeId => {
        setExpanded(prevExpanded => prevExpanded.filter(id => id !== nodeId));
    };

    console.log(onSearchData, "onSearchDataonSearchData");
    React.useEffect(() => {
        if (props?.data?.rows != undefined) {
            setOnSearchData([])
            setOnSearchData(props?.data?.rows);
        }
        if (Array.isArray(props?.data)) {
            setOnSearchData([])
            setOnSearchData(props?.data);
        }
        if (props?.data?.length == 0) {
            setOnSearchData([])
            setTreeViewData([])
            // setOnSearchData(props?.data);
        }
        setProcessSeq(props?.process);
    }, [props]);

    const onClickChange = (data) => {
        // console.log(data);
        props.setTapData(data)
    }

    const onCreateObject = async () => {
        let masStatus = await getStatus();
        let logData = await getCadastralImageLog();
        masStatus = filterRecordStatus(masStatus.rows, "N");
        console.log(logData, "logData");
        console.log(onSearchData, "onSearchData treeview");
        console.log(processSeq, "onSearchData processSeq");
        let onSearchDataFiltered = onSearchData.filter(item => item.PROCESS_SEQ_ == processSeq || (item.PROCESS_SEQ_ == 102 && processSeq == 103))
        console.log(onSearchDataFiltered, "onSearchDataFiltered");
        for (let i in onSearchDataFiltered) {
            let itemSearch = onSearchDataFiltered[i];
            itemSearch["CADASTRAL_IMAGE_DATA"] = logData.rows.filter(item => item.CADASTRAL_SEQ == itemSearch.CADASTRAL_SEQ && item.PROCESS_SEQ_ == processSeq)[0];
            console.log(itemSearch, "itemSearch");
        }
        console.log(onSearchDataFiltered, "onSearchDataFilteredCADASTRAL_IMAGE");

        if (onSearchDataFiltered.length != 0) {
            if (processSeq == 106) {
                let statusSeq101 = onSearchDataFiltered.filter(item => item?.CADASTRAL_IMAGE_DATA?.STATUS_SEQ_ == 101);
                let statusSeq102 = onSearchDataFiltered.filter(item => item?.CADASTRAL_IMAGE_DATA?.STATUS_SEQ_ == 102);
                let statusSeq103 = onSearchDataFiltered.filter(item => item?.CADASTRAL_IMAGE_DATA?.STATUS_SEQ_ == 103);
                let statusSeq104 = onSearchDataFiltered.filter(item => item?.CADASTRAL_IMAGE_DATA?.STATUS_SEQ_ == 104 || item?.CADASTRAL_IMAGE_DATA?.STATUS_SEQ_ == null);
                masStatus.map(item => {
                    item.DATA = [];
                    if (item.STATUS_SEQ == 101 || item.STATUS_SEQ_ == 101) {
                        item.DATA = statusSeq101
                    }
                    if (item.STATUS_SEQ == 102 || item.STATUS_SEQ_ == 102) {
                        item.DATA = statusSeq102
                    }
                    if (item.STATUS_SEQ == 103 || item.STATUS_SEQ_ == 103) {
                        item.DATA = statusSeq103
                    }
                    if (item.STATUS_SEQ == 104 || item.STATUS_SEQ_ == 104) {
                        item.DATA = statusSeq104
                    }
                })
                console.log(masStatus, "onSearchData masStatus");
                await setTreeViewData(masStatus.sort((a, b) => b.STATUS_SEQ - a.STATUS_SEQ));
            } else {
                let statusSeq101 = onSearchDataFiltered.filter(item => item.STATUS_SEQ_ == 101);
                let statusSeq102 = onSearchDataFiltered.filter(item => item.STATUS_SEQ_ == 102);
                let statusSeq103 = onSearchDataFiltered.filter(item => item.STATUS_SEQ_ == 103);
                let statusSeq104 = onSearchDataFiltered.filter(item => item.STATUS_SEQ_ == 104 || item.STATUS_SEQ_ == null);
                masStatus.map(item => {
                    item.DATA = [];
                    if (item.STATUS_SEQ == 101 || item.STATUS_SEQ_ == 101) {
                        item.DATA = statusSeq101
                    }
                    if (item.STATUS_SEQ == 102 || item.STATUS_SEQ_ == 102) {
                        item.DATA = statusSeq102
                    }
                    if (item.STATUS_SEQ == 103 || item.STATUS_SEQ_ == 103) {
                        item.DATA = statusSeq103
                    }
                    if (item.STATUS_SEQ == 104 || item.STATUS_SEQ_ == 104) {
                        item.DATA = statusSeq104
                    }
                })
                console.log(masStatus, "onSearchData masStatus");
                await setTreeViewData(masStatus.sort((a, b) => b.STATUS_SEQ - a.STATUS_SEQ));
            }
        }
        if (props.process == 133) {
            let statusSeq101 = onSearchData.filter(item => item.STATUS_SEQ_ == 101);
            let statusSeq102 = onSearchData.filter(item => item.STATUS_SEQ_ == 102);
            let statusSeq103 = onSearchData.filter(item => item.STATUS_SEQ_ == 103);
            let statusSeq104 = onSearchData.filter(item => item.STATUS_SEQ_ == 104 || item.STATUS_SEQ_ == null);
            masStatus.map(item => {
                item.DATA = [];
                if (item.STATUS_SEQ == 101 || item.STATUS_SEQ_ == 101) {
                    item.DATA = statusSeq101
                }
                if (item.STATUS_SEQ == 102 || item.STATUS_SEQ_ == 102) {
                    item.DATA = statusSeq102
                }
                if (item.STATUS_SEQ == 103 || item.STATUS_SEQ_ == 103) {
                    item.DATA = statusSeq103
                }
                if (item.STATUS_SEQ == 104 || item.STATUS_SEQ_ == 104) {
                    item.DATA = statusSeq104
                }
            })
            console.log(masStatus, "onSearchData masStatus");
            await setTreeViewData(masStatus.sort((a, b) => b.STATUS_SEQ - a.STATUS_SEQ));
        }
        if (props.process == 100) {
            let statusSeq101 = onSearchData.filter(item => item.STATUS_SEQ_ == 101);
            let statusSeq102 = onSearchData.filter(item => item.STATUS_SEQ_ == 102);
            let statusSeq103 = onSearchData.filter(item => item.STATUS_SEQ_ == 103);
            let statusSeq104 = onSearchData.filter(item => item.STATUS_SEQ_ == 104 || item.STATUS_SEQ_ == null);
            masStatus.map(item => {
                item.DATA = [];
                if (item.STATUS_SEQ == 101 || item.STATUS_SEQ_ == 101) {
                    item.DATA = statusSeq101
                }
                if (item.STATUS_SEQ == 102 || item.STATUS_SEQ_ == 102) {
                    item.DATA = statusSeq102
                }
                if (item.STATUS_SEQ == 103 || item.STATUS_SEQ_ == 103) {
                    item.DATA = statusSeq103
                }
                if (item.STATUS_SEQ == 104 || item.STATUS_SEQ_ == 104) {
                    item.DATA = statusSeq104
                }
            })
            console.log(masStatus, "onSearchData masStatus");
            await setTreeViewData(masStatus.sort((a, b) => b.STATUS_SEQ - a.STATUS_SEQ));
        }
    }
    console.log(treeViewData, "treeViewDatatreeViewData");
    return (
        <div>
            <Grid component={Paper} p={1} style={{ background: '#FFFFE8' }} sx={{ height: "100vh", flexGrow: 1, overflowY: 'auto' }}>
                {/* บัญชีคุมเบิกจ่าย */}
                {
                    props.process == 101 &&
                    (
                        <TreeView
                            defaultCollapseIcon={<ArrowDropDownIcon />}
                            defaultExpandIcon={<ArrowRightIcon />}
                            sx={{ height: "95vh", flexGrow: 1, overflowY: 'auto' }}
                        >
                            <TreeItem nodeId="1" label={"เลขที่ต้นร่าง (" + onSearchData.length + ")"}>
                                {onSearchData.length != 0 && onSearchData.map((number, index) => {
                                    let numberStr = index + 2;
                                    // console.log(number.PRINTPLATE_TYPE_SEQ == 10,"numbernumber");
                                    if (number.CADASTRAL_IMAGE_SEQ != null) {
                                        return <TreeItem nodeId={String(numberStr)} key={index} label={number.CADASTRAL_NO} onClick={() => { onClickChange(number) }} />
                                    }
                                })
                                }
                            </TreeItem>
                        </TreeView>
                    )
                }
                {
                    props.process == 102 &&
                    (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack direction={'row'}>
                                    <Grid item xs={10}>
                                        <Typography fontSize={16}>{"เลขที่ต้นร่าง (" + onSearchData.length + ")"}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="เปิด / ปิด แสดงทั้งหมด">
                                            <IconButton size='small' onClick={handleExpandClick}
                                                sx={{
                                                    '&:hover': {
                                                        background: 'linear-gradient(60deg, rgba(255,255,232,1) 40%, rgba(188,243,176,1) 80%) !important',
                                                    },
                                                }}
                                            >
                                                {expanded.length === 0 ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <TreeView
                                    defaultCollapseIcon={<ArrowDropDownIcon />}
                                    defaultExpandIcon={<ArrowRightIcon />}
                                    sx={{ height: "95vh", flexGrow: 1, overflowY: 'auto' }}
                                    expanded={expanded}
                                    onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                                >
                                    {
                                        treeViewData.map((node, index) => (node.DATA != 0 &&
                                            <TreeItem nodeId={String(node.STATUS_SEQ)} label={node.STATUS_NAME_TH + " (" + node.DATA.length + ")"} key={index}>
                                                {node.DATA.map((childNode, indexy) => {
                                                    return <TreeItem
                                                        nodeId={String(childNode.CADASTRAL_SEQ)}
                                                        label={childNode.CADASTRAL_NO}
                                                        key={indexy}
                                                        onClick={() => { onClickChange(childNode) }}
                                                    />
                                                }
                                                )}
                                            </TreeItem>
                                        ))
                                    }
                                </TreeView>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    props.process == 103 &&
                    (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack direction={'row'}>
                                    <Grid item xs={10}>
                                        <Typography fontSize={16}>{"เลขที่ต้นร่าง (" + onSearchData.length + ")"}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="เปิด / ปิด แสดงทั้งหมด">
                                            <IconButton size='small' onClick={handleExpandClick}
                                                sx={{
                                                    '&:hover': {
                                                        background: 'linear-gradient(60deg, rgba(255,255,232,1) 40%, rgba(188,243,176,1) 80%) !important',
                                                    },
                                                }}
                                            >
                                                {expanded.length === 0 ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <TreeView
                                    defaultCollapseIcon={<ArrowDropDownIcon />}
                                    defaultExpandIcon={<ArrowRightIcon />}
                                    sx={{ height: "95vh", flexGrow: 1, overflowY: 'auto' }}
                                    expanded={expanded}
                                    onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                                >
                                    {
                                        treeViewData.map((node, index) => (node.DATA != 0 &&
                                            <TreeItem nodeId={String(node.STATUS_SEQ)} label={node.STATUS_NAME_TH + " (" + node.DATA.length + ")"} key={index}>
                                                {node.DATA.map((childNode, indexy) => {
                                                    return <TreeItem
                                                        nodeId={String(childNode.CADASTRAL_SEQ)}
                                                        label={childNode.CADASTRAL_NO}
                                                        key={indexy}
                                                        onClick={() => { onClickChange(childNode) }}
                                                    />
                                                }
                                                )}
                                            </TreeItem>
                                        ))
                                    }
                                </TreeView>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    props.process == 106 &&
                    (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack direction={'row'}>
                                    <Grid item xs={10}>
                                        <Typography fontSize={16}>{"เลขที่ต้นร่าง (" + onSearchData.length + ")"}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="เปิด / ปิด แสดงทั้งหมด">
                                            <IconButton size='small' onClick={handleExpandClick}
                                                sx={{
                                                    '&:hover': {
                                                        background: 'linear-gradient(60deg, rgba(255,255,232,1) 40%, rgba(188,243,176,1) 80%) !important',
                                                    },
                                                }}
                                            >
                                                {expanded.length === 0 ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <TreeView
                                    defaultCollapseIcon={<ArrowDropDownIcon />}
                                    defaultExpandIcon={<ArrowRightIcon />}
                                    sx={{ height: "95vh", flexGrow: 1, overflowY: 'auto' }}
                                    expanded={expanded}
                                    onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                                >
                                    {
                                        treeViewData.map((node, index) => (node.DATA != 0 &&
                                            <TreeItem nodeId={String(node.STATUS_SEQ)} label={node.STATUS_NAME_TH + " (" + node.DATA.length + ")"} key={index}>
                                                {node.DATA.map((childNode, indexy) => {
                                                    return <TreeItem
                                                        nodeId={String(childNode.CADASTRAL_SEQ)}
                                                        label={childNode.CADASTRAL_NO}
                                                        key={indexy}
                                                        onClick={() => { onClickChange(childNode) }}
                                                    />
                                                }
                                                )}
                                            </TreeItem>
                                        ))
                                    }
                                </TreeView>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    props.process == 133 &&
                    (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack direction={'row'}>
                                    <Grid item xs={10}>
                                        <Typography fontSize={16}>{"เลขที่ต้นร่าง (" + onSearchData.length + ")"}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="เปิด / ปิด แสดงทั้งหมด">
                                            <IconButton size='small' onClick={handleExpandClick}
                                                sx={{
                                                    '&:hover': {
                                                        background: 'linear-gradient(60deg, rgba(255,255,232,1) 40%, rgba(188,243,176,1) 80%) !important',
                                                    },
                                                }}
                                            >
                                                {expanded.length === 0 ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <TreeView
                                    defaultCollapseIcon={<ArrowDropDownIcon />}
                                    defaultExpandIcon={<ArrowRightIcon />}
                                    sx={{ height: "95vh", flexGrow: 1, overflowY: 'auto' }}
                                    expanded={expanded}
                                    onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                                >
                                    {
                                        treeViewData.map((node, index) => (node.DATA != 0 &&
                                            <TreeItem nodeId={String(node.STATUS_SEQ)} label={node.STATUS_NAME_TH + " (" + node.DATA.length + ")"} key={index}>
                                                {node.DATA.map((childNode, indexy) => {
                                                    return <TreeItem
                                                        nodeId={String(childNode.CADASTRAL_SEQ)}
                                                        label={childNode.CADASTRAL_NO}
                                                        key={indexy}
                                                        onClick={() => { onClickChange(childNode) }}
                                                    />
                                                }
                                                )}
                                            </TreeItem>
                                        ))
                                    }
                                </TreeView>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    props.process == 100 &&
                    (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack direction={'row'}>
                                    <Grid item xs={10}>
                                        <Typography fontSize={16}>{"เลขที่ต้นร่าง (" + onSearchData.length + ")"}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="เปิด / ปิด แสดงทั้งหมด">
                                            <IconButton size='small' onClick={handleExpandClick}
                                                sx={{
                                                    '&:hover': {
                                                        background: 'linear-gradient(60deg, rgba(255,255,232,1) 40%, rgba(188,243,176,1) 80%) !important',
                                                    },
                                                }}
                                            >
                                                {expanded.length === 0 ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <TreeView
                                    defaultCollapseIcon={<ArrowDropDownIcon />}
                                    defaultExpandIcon={<ArrowRightIcon />}
                                    sx={{ height: "95vh", flexGrow: 1, overflowY: 'auto' }}
                                    expanded={expanded}
                                    onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                                >
                                    {
                                        treeViewData.map((node, index) => (node.DATA != 0 &&
                                            <TreeItem nodeId={String(node.STATUS_SEQ)} label={node.STATUS_NAME_TH + " (" + node.DATA.length + ")"} key={index}>
                                                {node.DATA.map((childNode, indexy) => {
                                                    return <TreeItem
                                                        nodeId={String(childNode.CADASTRAL_SEQ)}
                                                        label={childNode.CADASTRAL_NO}
                                                        key={indexy}
                                                        onClick={() => { onClickChange(childNode) }}
                                                    />
                                                }
                                                )}
                                            </TreeItem>
                                        ))
                                    }
                                </TreeView>
                            </Grid>
                        </Grid>
                    )
                }
                {
                    props.process == 135 &&
                    (
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Stack direction={'row'}>
                                    <Grid item xs={10}>
                                        <Typography fontSize={16}>{"เลขที่ต้นร่าง (" + onSearchData.length + ")"}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="เปิด / ปิด แสดงทั้งหมด">
                                            <IconButton size='small' onClick={handleExpandClick}
                                                sx={{
                                                    '&:hover': {
                                                        background: 'linear-gradient(60deg, rgba(255,255,232,1) 40%, rgba(188,243,176,1) 80%) !important',
                                                    },
                                                }}
                                            >
                                                {expanded.length === 0 ? <ArrowRightIcon /> : <ArrowDropDownIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Grid>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <TreeView
                                    defaultCollapseIcon={<ArrowDropDownIcon />}
                                    defaultExpandIcon={<ArrowRightIcon />}
                                    sx={{ height: "95vh", flexGrow: 1, overflowY: 'auto' }}
                                    expanded={expanded}
                                    onNodeToggle={(event, nodeIds) => setExpanded(nodeIds)}
                                >
                                    {
                                        treeViewData.map((node, index) => (node.DATA != 0 &&
                                            <TreeItem nodeId={String(node.STATUS_SEQ)} label={node.STATUS_NAME_TH + " (" + node.DATA.length + ")"} key={index}>
                                                {node.DATA.map((childNode, indexy) => {
                                                    return <TreeItem
                                                        nodeId={String(childNode.CADASTRAL_SEQ)}
                                                        label={childNode.CADASTRAL_NO}
                                                        key={indexy}
                                                        onClick={() => { onClickChange(childNode) }}
                                                    />
                                                }
                                                )}
                                            </TreeItem>
                                        ))
                                    }
                                </TreeView>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </div >
    )
}
