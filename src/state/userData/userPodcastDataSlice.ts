import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../supabaseClient"; // Make sure this is configured

export const fetchUserPodcastData = createAsyncThunk(
  "UserData/fetchUserData",
  async (email: string) => {
    console.log(email);
    const { data, error } = await supabase
      .from("user_podcast_data")
      .select("*")
      .eq("email", email) // Fetch by email
      .single(); // Expect a single row

    if (error) {
      console.error("Error fetching user data:", error.message);
      throw new Error(error.message);
    }

    return data;
  }
);

// Async action to update liked podcasts
export const updateLikedPodcasts = createAsyncThunk(
  "UserData/updateLikedPodcasts",
  async ({
    userEmail,
    liked,
  }: {
    userEmail: string | null;
    liked: string[];
  }) => {
    const { data, error } = await supabase
      .from("user_podcast_data")
      .update({ liked: liked })
      .eq("email", userEmail);
    if (error) throw new Error(error.message);
    return liked;
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
    last_listen: string;
  }) => {
    const { data, error } = await supabase
      .from("user_podcast_data")
      .update({ last_listen: last_listen })
      .eq("email", userEmail);

    if (error) throw new Error(error.message);
    return last_listen;
  }
);

interface UserPodcastDataState {
  userPodcastData: {
    email: string;
    created_at: string;
    listen_time: string[];
    liked: string[];
    last_listen: string;
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPodcastData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPodcastData.fulfilled, (state, action) => {
        state.loading = false;
        state.userPodcastData = action.payload; // Data from Supabase
      })
      .addCase(fetchUserPodcastData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user data";
      });
  },
});

export default userPodcastDataSlice.reducer;
