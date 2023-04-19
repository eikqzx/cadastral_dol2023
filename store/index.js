import { configureStore } from '@reduxjs/toolkit'
import { loadingScreenSlice } from './feature/loadingscreen'
import { confirmDialogSlice } from './feature/confirmDialog'
import { useridSlice } from './feature/userid'
import { jobSlice } from './feature/job'


export default configureStore({
    reducer: {
        loadingScreen: loadingScreenSlice.reducer,
        confirmDialog: confirmDialogSlice.reducer,
        userid: useridSlice.reducer,
        job: jobSlice.reducer
    }
})