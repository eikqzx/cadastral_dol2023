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
    const labelByprintplate = () => {
        if (state == 1) {
            if (props.data) {
                if (props.data[0]?.PRINTPLATE_TYPE_SEQ == 1 || props.data[0]?.PRINTPLATE_TYPE_SEQ == 2 || props.data[0]?.PRINTPLATE_TYPE_SEQ == 3) {
                    return "หน้าสำรวจเลขที่" + " (" + onSearchData.filter(item => item.PROCESS_SEQ_ == processSeq).length + ")";
                }
                if (props.data[0]?.PRINTPLATE_TYPE_SEQ == 4 || props.data[0]?.PRINTPLATE_TYPE_SEQ == 5) {
                    return "เอกสารสิทธิ์เลขที่" + " (" + onSearchData.filter(item => item.PROCESS_SEQ_ == processSeq).length + ")";
                }
                if (props.data[0]?.PRINTPLATE_TYPE_SEQ == 10 || props.data[0]?.PRINTPLATE_TYPE_SEQ == 20) {
                    return "เลขที่ห้อง" + " (" + onSearchData.filter(item => item.PROCESS_SEQ_ == processSeq).length + ")";
                }
            }
        } else {
            if (props.data) {
                if (props.data[0]?.PRINTPLATE_TYPE_SEQ == 1 || props.data[0]?.PRINTPLATE_TYPE_SEQ == 2 || props.data[0]?.PRINTPLATE_TYPE_SEQ == 3) {
                    return "เอกสารสิทธิ์เลขที่" + " (" + onSearchData.filter(item => item.PROCESS_SEQ_ == processSeq).length + ")";
                }
                if (props.data[0]?.PRINTPLATE_TYPE_SEQ == 4 || props.data[0]?.PRINTPLATE_TYPE_SEQ == 5) {
                    return "เอกสารสิทธิ์เลขที่" + " (" + onSearchData.filter(item => item.PROCESS_SEQ_ == processSeq).length + ")";
                }
                if (props.data[0]?.PRINTPLATE_TYPE_SEQ == 10 || props.data[0]?.PRINTPLATE_TYPE_SEQ == 20) {
                    return "เลขที่ห้อง" + " (" + onSearchData.filter(item => item.PROCESS_SEQ_ == processSeq).length + ")";
                }
            }
        }
    }
    const onCreateObject = async () => {
        let masStatus = await getStatus();
        masStatus = filterRecordStatus(masStatus.rows, "N");
        console.log(onSearchData, "onSearchData treeview");
        console.log(processSeq, "onSearchData processSeq");
        let onSearchDataFiltered = onSearchData.filter(item => item.PROCESS_SEQ_ == processSeq)
        console.log(onSearchDataFiltered, "onSearchDataFiltered");
        if (onSearchDataFiltered.length != 0) {
            let statusSeq101 = onSearchDataFiltered.filter(item => item.STATUS_SEQ_ == 101);
            let statusSeq102 = onSearchDataFiltered.filter(item => item.STATUS_SEQ_ == 102);
            let statusSeq103 = onSearchDataFiltered.filter(item => item.STATUS_SEQ_ == 103);
            let statusSeq104 = onSearchDataFiltered.filter(item => item.STATUS_SEQ_ == 104 || item.STATUS_SEQ_ == null);
            masStatus.map(item => {
                item.DATA = [];
                if (item.STATUS_SEQ == 101) {
                    item.DATA = statusSeq101
                }
                if (item.STATUS_SEQ == 102) {
                    item.DATA = statusSeq102
                }
                if (item.STATUS_SEQ == 103) {
                    item.DATA = statusSeq103
                }
                if (item.STATUS_SEQ == 104) {
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
                                            <IconButton fullWidth size='small' onClick={handleExpandClick}
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
                                            <IconButton fullWidth size='small' onClick={handleExpandClick}
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
                                        <Typography fontSize={16}>{labelByprintplate()}</Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Tooltip title="เปิด / ปิด แสดงทั้งหมด">
                                            <IconButton fullWidth size='small' onClick={handleExpandClick}
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
                                        treeViewData.map((node, index) => (
                                            node.DATA != 0 && <TreeItem nodeId={String(node.STATUS_SEQ)} label={node.STATUS_NAME_TH + " (" + node.DATA.length + ")"} key={index}>
                                                {node.DATA.map((childNode, indexy) => {
                                                    if (childNode.PRINTPLATE_TYPE_SEQ == 1) {
                                                        return <TreeItem
                                                            nodeId={String(childNode.PARCEL_SEQ)}
                                                            label={childNode.PARCEL_SURVEY_NO}
                                                            key={indexy}
                                                            onClick={() => { onClickChange(childNode) }}
                                                        />
                                                    }
                                                    if (childNode.PRINTPLATE_TYPE_SEQ == 2) {
                                                        return <TreeItem
                                                            nodeId={String(childNode.PARCEL_LAND_SEQ)}
                                                            label={childNode.PARCEL_LAND_SURVEY_NO}
                                                            key={indexy}
                                                            onClick={() => { onClickChange(childNode) }}
                                                        />
                                                    }
                                                    if (childNode.PRINTPLATE_TYPE_SEQ == 3) {
                                                        return <TreeItem
                                                            nodeId={String(childNode.PARCEL_LAND_SEQ)}
                                                            label={childNode.PARCEL_LAND_SURVEY_NO}
                                                            key={indexy}
                                                            onClick={() => { onClickChange(childNode) }}
                                                        />
                                                    }
                                                    if (childNode.PRINTPLATE_TYPE_SEQ == 4) {
                                                        return <TreeItem
                                                            nodeId={String(childNode.PARCEL_LAND_SEQ)}
                                                            label={childNode.PARCEL_LAND_NO}
                                                            key={indexy}
                                                            onClick={() => { onClickChange(childNode) }}
                                                        />
                                                    }
                                                    if (childNode.PRINTPLATE_TYPE_SEQ == 5) {
                                                        return <TreeItem
                                                            nodeId={String(childNode.PARCEL_LAND_SEQ)}
                                                            label={childNode.PARCEL_LAND_NO}
                                                            key={indexy}
                                                            onClick={() => { onClickChange(childNode) }}
                                                        />
                                                    }
                                                    if (childNode.PRINTPLATE_TYPE_SEQ == 10) {
                                                        return <TreeItem
                                                            nodeId={String(childNode.PARCEL_LAND_SEQ)}
                                                            label={childNode.PARCEL_LAND_SURVEY_NO}
                                                            key={indexy}
                                                            onClick={() => { onClickChange(childNode) }}
                                                        />
                                                    }
                                                    if (childNode.PRINTPLATE_TYPE_SEQ == 20) {
                                                        return <TreeItem
                                                            nodeId={String(childNode.PARCEL_LAND_SEQ)}
                                                            label={childNode.PARCEL_LAND_SURVEY_NO}
                                                            key={indexy}
                                                            onClick={() => { onClickChange(childNode) }}
                                                        />
                                                    }
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
