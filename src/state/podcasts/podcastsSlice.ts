import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPodcasts= createAsyncThunk("fetchPodcasts", async()=>{
    const data = await fetch('https://podcast-api.netlify.app/shows')
    return data.json()
})

const podcastsSlice = createSlice({
    name: 'podcasts',
    initialState: {
      isLoading: false,
      data: [],
      error: false,
    },

    extraReducers: (builder) => {
      builder.addCase(fetchPodcasts.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(fetchPodcasts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      });
      builder.addCase(fetchPodcasts.rejected, (state) => {
        state.error = true;
      });
    },
  });
export default podcastsSlice.reducer;