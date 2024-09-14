/**
 * 
 * This slice handles what information should be displayed
 * 
 * 
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface for the state of the individual podcast slice.
 * 
 * @property {string} page - what page should be loaded
 */
interface DisplayState{
    page:string
}
/**
 * Sets the initial state of the page to home
 *
 */
const initialState = {page:"home"} satisfies DisplayState as DisplayState

/**
 * Creates a slice for handling changing what should be displayed.
 *
 * The slice includes:
 * - `togglePage`: Updates the state so other components know what to render.
 * 
 */
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