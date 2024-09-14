import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Podcast } from './podcastsSlice'
/**
 * Fetch individual podcast by ID asynchronously from the Podcast API on Netlify.
 * 
 * @param {string} id - The ID of the podcast to fetch.
 * @returns {Promise<Podcast>} - A promise that resolves with the individual podcast data.
 */

export const fetchIndivdualPodcast= createAsyncThunk("fetchIndividualPodcast", async(id)=>{
    const data = await fetch(`https://podcast-api.netlify.app/id/${id}`)
    return data.json()
})

/**
 * Interface for the state of the individual podcast slice.
 * 
 * @property {boolean} isLoading - Whether the individual podcast is currently being loaded.
 * @property {Podcast | null} data - The fetched individual podcast.
 * @property {boolean} error - Whether there was an error during the fetching process.
 */
interface IndividualPodcastState {
    isLoading: boolean;
    data: Podcast | null;
    error: boolean;
  }

  // Initial state for individual podcast
const initialIndividualState: IndividualPodcastState = {
    isLoading: false,
    data: null,
    error: false,
  };
  
const individualPodcastSlice = createSlice({
    name: 'individualPodcast',
    initialState: initialIndividualState,

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