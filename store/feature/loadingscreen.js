import { createSlice } from "@reduxjs/toolkit";

export const loadingScreenSlice = createSlice({
    name: 'opendrawer',
    initialState: {
        value: 0
    },
    reducers: {
        addQue: (state) => {
            state.value = state.value + 1
            // console.log(state.value)
        },
        removeQue: (state) => {
            state.value = state.value - 1
            // console.log(state.value)
        }
    }
})

export const { addQue, removeQue } = loadingScreenSlice.actions
export default loadingScreenSlice.reducer