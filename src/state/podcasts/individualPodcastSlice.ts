import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchIndivdualPodcast= createAsyncThunk("fetchIndividualPodcast", async(id)=>{
    const data = await fetch(`https://podcast-api.netlify.app/id/${id}`)
    return data.json()
})

const individualPodcastSlice = createSlice({
    name: 'individualPodcast',
    initialState: {
        isLoading: false,
        data: [],
        error: false,
    },

    extraReducers: (builder) => {
        builder.addCase(fetchIndivdualPodcast.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchIndivdualPodcast.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchIndivdualPodcast.rejected, (state) => {
            state.error = true;
        });
    },
    reducers: {}
});
  
export default individualPodcastSlice.reducer;