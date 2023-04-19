import { createSlice } from "@reduxjs/toolkit";

export const confirmDialogSlice = createSlice({
    name: 'confirmDialog',
    initialState: {
        data: {
            msg: "",
            header: "แจ้งเตือนระบบ",
            open: false,
            callback: null
        }
    },
    reducers: {
        setOpen: (state, action) => {
            state.data.open = true
            if (action.payload.hasOwnProperty("msg")) {
                state.data.msg = action.payload.msg
            }
            if (action.payload.hasOwnProperty("header")) {
                state.data.header = action.payload.header
            }
            if (action.payload.hasOwnProperty("callback")) {
                state.data.callback = action.payload.callback
            }

        },
        setClose: (state) => {
            state.data.open = false
        }
    }
})

export const { setOpen, setClose } = confirmDialogSlice.actions
export default confirmDialogSlice.reducer