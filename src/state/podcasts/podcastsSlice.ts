import { createAsyncThunk, createSlice ,createSelector} from "@reduxjs/toolkit";

import { RootState } from "../store";
// Fetch podcasts asynchronously from Podcast API on netlify
export const fetchPodcasts = createAsyncThunk("podcasts/fetch", async () => {
  const response = await fetch("https://podcast-api.netlify.app/shows");
  return response.json();
});

//interface for a single Podcast
export interface Podcast {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}

//interface for the state of this slice
interface PodcastsState {
  isLoading: boolean;
  data: Podcast[];
  error: boolean;
  sortType: "recent" | "alphabetic" | "revAlphabetic" | "oldest";
}

// Initial state for podcasts
const initialState: PodcastsState = {
  isLoading: false,
  data: [],
  error: false,
  sortType: "recent",
};

const podcastsSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setSortType: (state, action) => {
      //update the sorting type , the action is a new sorting type recieved from a component
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //set the state when data is being retrieved
      .addCase(fetchPodcasts.pending, (state) => {
        state.isLoading = true;
      })
      //set the state after data has been retrieved
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      //sets an error if retrieving the data has failed
      .addCase(fetchPodcasts.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

// Memoized selector to get sorted podcasts based on the current sortType
export const selectSortedPodcasts = createSelector(
  // Input selectors
  (state: RootState) => state.podcasts.data,
  (state: RootState) => state.podcasts.sortType,
  
  // Output selector: sorting the podcasts based on sortType
  (data, sortType) => {
    return [...data].sort((a, b) => {
      switch (sortType) {
        case 'alphabetic':
          return a.title.localeCompare(b.title);
        case 'revAlphabetic':
          return b.title.localeCompare(a.title);
        case 'recent':
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
        case 'oldest':
          return new Date(a.updated).getTime() - new Date(b.updated).getTime();
        default:
          return 0;
      }
    });
  }
);

export const { setSortType } = podcastsSlice.actions;
export default podcastsSlice.reducer;
