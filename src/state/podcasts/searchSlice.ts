//redux toolkit imports
import { createSlice } from "@reduxjs/toolkit";

//fuse import for fuzzy search
import Fuse from "fuse.js";

import { Podcast } from "./podcastsSlice";

import { RootState as RootStateType } from "../store";

interface SearchState {
  search: string;
  selectedGenres: number[];
  filteredData: Podcast[];
}

// Initial state for search
const initialState: SearchState = {
  search: "",
  selectedGenres: [],
  filteredData: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setSearch: (state, action) => {
      const { search, data } = action.payload;

      // Update search term and filtered data based on search
      state.search = search;
      state.filteredData = filterPodcasts(data, search, state.selectedGenres);
    },
    setSelectedGenres: (state, action) => {
      const { genres, data } = action.payload;

      // Update selected genres and filtered data based on genres
      state.selectedGenres = Array.isArray(genres) ? genres : [];
      state.filteredData = filterPodcasts(data, state.search, genres);
    },
  },
});

// Function to filter podcasts by search term and genres
const filterPodcasts = (data:Podcast[], search: string , selectedGenres:number[]) => {
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

// Selector to get the filtered podcasts
export const selectFilteredPodcasts = (state : RootStateType ) => state.search.filteredData;

export const { setSearch, setSelectedGenres } = searchSlice.actions;

export default searchSlice.reducer;
