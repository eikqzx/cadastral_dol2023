import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
    name: 'job',
    initialState: {
        value: 1,
    },
    reducers: {
        setValue: (state, actions) => {
            state.value = actions.payload
        },
    }
})

export const { setValue } = jobSlice.actions
export default jobSlice.reducer