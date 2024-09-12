import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Fetch podcasts asynchronously
export const fetchPodcasts = createAsyncThunk('podcasts/fetch', async () => {
  const response = await fetch('https://podcast-api.netlify.app/shows');
  return response.json();
});

// Initial state
const initialState = {
  isLoading: false,
  data: [],
  error: false,
  sortType: 'alphabetic', // Added sortType to manage sorting
};

const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcasts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPodcasts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchPodcasts.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      });
  },
});

export const { setSortType } = podcastsSlice.actions;

// Selector to get sorted podcasts based on the current sortType
export const selectSortedPodcasts = (state) => {
  const { data, sortType } = state.podcasts;

  return [...data].sort((a, b) => {
    switch (sortType) {
      case 'alphabetic':
        return a.title.localeCompare(b.title);
      case 'revAlphabetic':
        return b.title.localeCompare(a.title);
      case 'recent':
        return new Date(b.updated) - new Date(a.updated);
      case 'oldest':
        return new Date(a.updated) - new Date(b.updated);
      default:
        return 0;
    }
  });
};

export default podcastsSlice.reducer;