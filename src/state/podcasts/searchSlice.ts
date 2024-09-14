import { createSlice } from "@reduxjs/toolkit";
import Fuse from "fuse.js";

// Initial state for search
const initialState = {
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
const filterPodcasts = (data, search, selectedGenres) => {
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
export const selectFilteredPodcasts = (state) => state.search.filteredData;

export const { setSearch, setSelectedGenres } = searchSlice.actions;

export default searchSlice.reducer;
