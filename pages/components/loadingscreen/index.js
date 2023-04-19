import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import * as LoadingScreenStore from './../../../store/feature/loadingscreen'
import { useDispatch, useSelector } from 'react-redux';
var disPacth
var state
export default function LoadingScreen() {
    disPacth = useDispatch()
    state = useSelector(state => state.loadingScreen.value)
    const que = useSelector(state => (state.loadingScreen.value))

    return (
        <Backdrop
            sx={{ zIndex: 1000000 }}
            open={que > 0}
        >
            <CircularProgress color="success" />
        </Backdrop>
    )
}


export function AddLoading() {
    // console.log("add loading")
    disPacth(LoadingScreenStore.addQue())
}
export function RemoveLoading() {
    disPacth(LoadingScreenStore.removeQue())
}