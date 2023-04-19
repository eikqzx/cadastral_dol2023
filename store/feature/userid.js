import { createSlice } from "@reduxjs/toolkit";

export const useridSlice = createSlice({
    name: 'userid',
    initialState: {
        value: "0",
        type: "0",
        data: {}
    },
    reducers: {
        setValue: (state, actions) => {
            state.value = actions.payload
        },
        setType: (state, actions) => {
            state.type = actions.payload
        },
        setData: (state, actions) => {
            state.data = actions.payload
        },
    }
})

export const { setValue, setType, setData } = useridSlice.actions
export default useridSlice.reducer