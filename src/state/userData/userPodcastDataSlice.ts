import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
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

export const updateLikedPodcasts = createAsyncThunk(
  "UserData/updateLikedPodcasts",
  async ({
    userEmail,
    liked,
  }: {
    userEmail: string | null;
    liked: Liked[];
  }) => {
    console.log(liked)
    if (!userEmail) throw new Error("No user email provided.");

    const { data, error } = await supabase
      .from("user_podcast_data")
      .update({ liked_podcasts: liked }) // directly update with new structured liked data
      .eq("email", userEmail);

    if (error) throw new Error(error.message);

    return liked; // Return the updated liked array for further use
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
    last_listen: string;
    likedPodcast:Liked[]
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
      
        // Parse liked JSON strings into actual objects
        const likedPodcast = action.payload.liked.map((likedItem: string) => {
          return JSON.parse(likedItem); // Convert string to object
        });
      
        // Populate userPodcastData with parsed likedPodcast
        state.userPodcastData = {
          ...action.payload,
          likedPodcast: [...likedPodcast, ...action.payload.liked_podcasts], // Combine both liked sources
        };
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
  (userPodcastData) => {
    console.log("Parsed likedPodcast", userPodcastData?.likedPodcast);
    return userPodcastData?.likedPodcast || [];
  }
);

export default userPodcastDataSlice.reducer;
