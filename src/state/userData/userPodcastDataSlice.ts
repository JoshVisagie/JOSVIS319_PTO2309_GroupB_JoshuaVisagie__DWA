import { createSlice, createAsyncThunk, createSelector, PayloadAction } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient"; // Make sure this is configured
import { RootState } from "../store";

export interface Liked{
  episodeID: string
  podcastID:string
  season:string
  episode:string
  likedAt:string
  }

  
  export const fetchUserPodcastData = createAsyncThunk(
    "UserData/fetchUserData",
    async (email: string) => {
      const { data, error } = await supabase
        .from("user_podcast_data")
        .select("*")
        .eq("email", email)
        .single(); // Fetching a single row
  
      if (error) {
        throw new Error(error.message);
      }
  console.log("fetched",data)
      return data; // Directly return the fetched data
    }
  );

  export const updateLikedPodcasts = createAsyncThunk(
    "UserData/updateLikedPodcasts",
    async ({
      userEmail,
      liked_podcasts, 
    }: {
      userEmail: string | null;
      liked_podcasts;
    }) => {
      if (!userEmail) throw new Error("No user email provided.");
      console.log('updating ', liked_podcasts)
      const { data, error } = await supabase
        .from("user_podcast_data")
        .update({ liked_podcasts })  // Update Supabase field directly
        .eq("email", userEmail);
  
      if (error) throw new Error(error.message);
  
      return liked_podcasts;  // Return the updated array
    }
  );

// Async action to update last listened podcast
export const updateLastListenedPodcast = createAsyncThunk(
  "UserData/updateLastListened",
  async ({
    userEmail,
    last_listen,
  }: {
    userEmail: string;
    last_listen
  }) => {
    const { data, error } = await supabase
      .from("user_podcast_data")
      .update({ last_listen: last_listen })
      .eq("email", userEmail);

    if (error) throw new Error(error.message);
    return last_listen;
  }
);

export const updateListenTime = createAsyncThunk(
  "UserData/updateListenTime",
  async ({
    userEmail,
    listen_time,
  }: {
    userEmail: string;
    listen_time
  }) => {
    const { data, error } = await supabase
      .from("user_podcast_data")
      .update({ listen_time: listen_time })
      .eq("email", userEmail);

    if (error) throw new Error(error.message);
    return listen_time;
  }
);

export interface ListenData{
  episodeID: string|null
  timePlayed: number|null
  isDone: boolean
}

interface UserPodcastDataState {
  userPodcastData: {
    email: string;
    created_at: string;
    listen_time: ListenData[];
    last_listen: ListenData;
    liked_podcasts: Liked[];  // Use this consistently
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserPodcastDataState = {
  userPodcastData: null,
  loading: false,
  error: null,
};

const userPodcastDataSlice = createSlice({
  name: "podcastUserData",
  initialState,
  reducers: {
    updateUserPodcastDataLocally: (
      state,
      action: PayloadAction<{ userEmail: string; liked: Liked[] }>
    ) => {
      // Find the user's podcast data and update liked_podcast locally
      if (state.userPodcastData && state.userPodcastData.email === action.payload.userEmail) {
        state.userPodcastData.liked_podcasts = action.payload.liked;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPodcastData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPodcastData.fulfilled, (state, action) => {
        state.loading = false;
        state.userPodcastData = action.payload;  // Store entire user data
      })
      .addCase(fetchUserPodcastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});

const selectUserPodcastData = (state: RootState) => state.userPodcastData.userPodcastData;

export const selectLikedPodcast = createSelector(
  [selectUserPodcastData],
  (userPodcastData) => userPodcastData?.liked_podcasts || []
);

export const { updateUserPodcastDataLocally } = userPodcastDataSlice.actions;
export default userPodcastDataSlice.reducer;
