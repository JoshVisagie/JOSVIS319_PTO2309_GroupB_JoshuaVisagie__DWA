import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DisplayState{
    page:string
}

const initialState = {page:"home"} satisfies DisplayState as DisplayState

const displaySlice= createSlice({
    name:'display',
    initialState,
    reducers:{
        togglePage(state, action: PayloadAction<string>){
            state.page = action.payload
        },
    }
})
export const {togglePage} = displaySlice.actions
export default displaySlice.reducer