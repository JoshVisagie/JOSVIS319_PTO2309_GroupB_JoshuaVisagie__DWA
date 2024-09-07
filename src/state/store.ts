import { configureStore } from "@reduxjs/toolkit";
import podcastsReducer from "./podcasts/podcastsSlice";
import individualPodcastReducer from "./podcasts/individualPodcastSlice";


export const store = configureStore({
  reducer: {
    podcasts: podcastsReducer,
    individualPodcast : individualPodcastReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
