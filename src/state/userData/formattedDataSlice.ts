import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Episode {
  podcastID: string;
  season: string;
  episode: string;
  date: string;
  episodeID: string;
}

interface FormattedDataState {
  groupedLikedPodcasts: Record<string, Episode[]>;
}

const initialState: FormattedDataState = {
  groupedLikedPodcasts: {},
};

const formattedDataSlice = createSlice({
  name: 'formattedData',
  initialState,
  reducers: {
    setFormattedLiked(state, action: PayloadAction<Record<string, Episode[]>>) {
      state.groupedLikedPodcasts = action.payload;
    },
  },
});

export const { setFormattedLiked } = formattedDataSlice.actions;
export default formattedDataSlice.reducer;
