// Redux Toolkit imports
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Fuse.js import for fuzzy search
import Fuse from "fuse.js";

// Import the type of a podcast from Podcasts slice
import { Podcast } from "./podcastsSlice";

// Import the type of RootState for typing selectors
import { RootState } from "../store";

/** 
 * Interface for SearchState
 * 
 * @property {string} search - The current search term input by the user.
 * @property {number[]} selectedGenres - List of selected genres for filtering podcasts.
 * @property {Podcast[]} filteredData - The list of filtered podcasts based on search and genres.
 */
interface SearchState {
  search: string;
  selectedGenres: number[];
  filteredData: Podcast[];
}

// Initial state for search slice
const initialState: SearchState = {
  search: "",
  selectedGenres: [],
  filteredData: [],
};

/**
 * Creates a slice for handling search and filtering of podcasts.
 * 
 * The slice includes:
 * - `setSearch`: Updates the search term and filters data based on it.
 * - `setSelectedGenres`: Updates the selected genres and filters data based on them.
 */
const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    /**
     * Sets the search term and filters podcasts based on the search and selected genres.
     * 
     * @param {SearchState} state - The current state of the search.
     * @param {PayloadAction<{ search: string; data: Podcast[] }>} action - Action containing the search term and podcast data.
     */
    setSearch: (state: SearchState, action: PayloadAction<{ search: string; data: Podcast[] }>) => {
      const { search, data } = action.payload;
      state.search = search;
      state.filteredData = filterPodcasts(data, search, state.selectedGenres);
    },

    /**
     * Sets the selected genres and filters podcasts based on the genres and search term.
     * 
     * @param {SearchState} state - The current state of the search.
     * @param {PayloadAction<{ genres: number[]; data: Podcast[] }>} action - Action containing selected genres and podcast data.
     */
    setSelectedGenres: (state: SearchState, action: PayloadAction<{ genres: number[]; data: Podcast[] }>) => {
      const { genres, data } = action.payload;
      state.selectedGenres = Array.isArray(genres) ? genres : [];
      state.filteredData = filterPodcasts(data, state.search, genres);
    },
  },
});

/**
 * Filters podcasts based on the search term and selected genres using Fuse.js.
 * 
 * @param {Podcast[]} data - The list of podcasts to filter.
 * @param {string} search - The search term for filtering.
 * @param {number[]} selectedGenres - The selected genres for filtering.
 * 
 * @returns {Podcast[]} - The filtered list of podcasts.
 */
const filterPodcasts = (
  data: Podcast[],
  search: string,
  selectedGenres: number[]
): Podcast[] => {
  const fuse = new Fuse(data, {
    keys: ["title", "description", "genres"],
    threshold: 0.3,
  });

  // Filter by search term using Fuse.js
  let filtered = search
    ? fuse.search(search).map((result) => result.item)
    : data;

  // Filter by selected genres
  if (selectedGenres.length > 0) {
    filtered = filtered.filter((podcast) => {
      return selectedGenres.some((genre) => podcast.genres.includes(genre));
    });
  }

  return filtered;
};

/**
 * Selector to get the filtered podcasts based on search term and selected genres.
 * 
 * @param {RootState} state - The entire Redux state.
 * @returns {Podcast[]} - The list of filtered podcasts.
 */
export const selectFilteredPodcasts = (state: RootState): Podcast[] => state.search.filteredData;

export const { setSearch, setSelectedGenres } = searchSlice.actions;

export default searchSlice.reducer;
