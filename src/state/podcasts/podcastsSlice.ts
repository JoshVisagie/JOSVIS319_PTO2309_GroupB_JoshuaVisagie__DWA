/**
 * 
 * This slice handles fetching podcasts from the API
 * 
 * 
 */

// Redux Toolkit imports
import { createAsyncThunk, createSlice, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Fetch podcasts asynchronously from the Podcast API on Netlify.
 * 
 * @returns {Promise<Podcast[]>} - A promise that resolves with a list of podcasts.
 */
export const fetchPodcasts = createAsyncThunk("podcasts/fetch", async (): Promise<Podcast[]> => {
  const response = await fetch("https://podcast-api.netlify.app/shows");
  return response.json();
});

/**
 * Interface for a single Podcast.
 * 
 * @property {string} id - The unique identifier of the podcast.
 * @property {string} title - The title of the podcast.
 * @property {string} description - The description of the podcast.
 * @property {number} seasons - The number of seasons available.
 * @property {string} image - The URL of the podcast's image.
 * @property {number[]} genres - An array of genre IDs associated with the podcast.
 * @property {string} updated - The date when the podcast was last updated.
 */
export interface Podcast {
  id: string;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}

/**
 * Interface for the state of the podcasts slice.
 * 
 * @property {boolean} isLoading - Whether the podcasts are currently being loaded.
 * @property {Podcast[]} data - The list of fetched podcasts.
 * @property {boolean} error - Whether there was an error during the fetching process.
 * @property {"recent" | "alphabetic" | "revAlphabetic" | "oldest"} sortType - The current sort type for the podcasts.
 */
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
    /**
     * Sets the sorting type for the podcasts.
     * 
     * @param {PodcastsState} state - The current state of the podcasts.
     * @param {PayloadAction<"recent" | "alphabetic" | "revAlphabetic" | "oldest">} action - The new sort type.
     */
    setSortType: (state, action: PayloadAction<"recent" | "alphabetic" | "revAlphabetic" | "oldest">) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcasts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPodcasts.fulfilled, (state, action: PayloadAction<Podcast[]>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPodcasts.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

/**
 * Selector to get sorted podcasts based on the current sortType.
 * 
 * @param {RootState} state - The Redux state.
 * @returns {Podcast[]} - The list of sorted podcasts.
 */
export const selectSortedPodcasts = createSelector(
  // Input selectors
  (state: RootState) => state.podcasts.data,
  (state: RootState) => state.podcasts.sortType,

  // Output selector: sorting the podcasts based on sortType
  (data, sortType) => {
    return [...data].sort((a, b) => {
      switch (sortType) {
        case "alphabetic":
          return a.title.localeCompare(b.title);
        case "revAlphabetic":
          return b.title.localeCompare(a.title);
        case "recent":
          return new Date(b.updated).getTime() - new Date(a.updated).getTime();
        case "oldest":
          return new Date(a.updated).getTime() - new Date(b.updated).getTime();
        default:
          return 0;
      }
    });
  }
);

export const { setSortType } = podcastsSlice.actions;
export default podcastsSlice.reducer;