import { configureStore } from "@reduxjs/toolkit";
import podcastsReducer from "./podcasts/podcastsSlice";
import individualPodcastReducer from "./podcasts/individualPodcastSlice";
import userReducer from "./userData/userDataSlice"
import displayReducer from "./display/displaySlice";

export const store = configureStore({
  reducer: {
    podcasts: podcastsReducer,
    individualPodcast : individualPodcastReducer,
    userData: userReducer,
    display:displayReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
