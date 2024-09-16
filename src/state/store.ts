//import configure store from redux toolkit
import { configureStore } from "@reduxjs/toolkit";

//import slices
import podcastsReducer from "./podcasts/podcastsSlice";
import individualPodcastReducer from "./podcasts/individualPodcastSlice";
import userReducer from "./userData/userDataSlice";
import displayReducer from "./display/displaySlice";
import searchReducer from "./podcasts/searchSlice";
import mediaSlice from "./mediaPlayer/mediaSlice";
import  podcastUserDataSlice from "./userData/userDataPodcasts"
//Global store
export const store = configureStore({
  reducer: {
    podcasts: podcastsReducer,
    search: searchReducer,
    individualPodcast: individualPodcastReducer,
    userData: userReducer,
    display: displayReducer,
    media:mediaSlice,
    podcastUserData: podcastUserDataSlice,


  },
});

//export RootState and App Dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
