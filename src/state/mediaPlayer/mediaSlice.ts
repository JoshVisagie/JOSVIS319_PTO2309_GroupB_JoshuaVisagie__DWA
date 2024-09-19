/**
 * 
 * 
 * 
 * 
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Interface for the state of the individual podcast slice.
 * 
 * @property {string} page - what page should be loaded
 */
interface MediaState{
    id:string |null,
    url: string |null,
    episodeTitle: string |null,
    podcastTitle: string |null,
    podcastID:string|null,
    podcastImage: string |null,
    playing: boolean,
    isLiked:boolean,
    volume: number,
    muted: boolean,
    timePlaying: number,
    duration: number,
    
}

interface SetMediaAction{
    id:string|null
    url: string |null,
    episodeTitle: string |null,
    podcastTitle: string |null,
    podcastID: string|null,
    podcastImage: string |null,
   
}
/**
 * Sets the initial state of the page to home
 *
 */
const initialState : MediaState = { 
    id: null,
    url: null,
    episodeTitle: null,
    podcastTitle: null,
    podcastImage: null,
    podcastID:null,
    playing: false,
    isLiked:false,
    volume: 0.8,
    muted: false,
    timePlaying: 0,
    duration: 0,
} 

/**
 * Creates a slice for handling changing what should be displayed.
 *
 * The slice includes:
 * - `togglePage`: Updates the state so other components know what to render.
 * 
 */
const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
      setMedia(state, action: PayloadAction<SetMediaAction>) {
        state.url = action.payload.url;
        state.id = action.payload.id;
        state.podcastTitle = action.payload.podcastTitle;
        state.episodeTitle = action.payload.episodeTitle;
        state.podcastImage= action.payload.podcastImage;
        state.podcastID= action.payload.podcastID;
        

      },
      playPause(state, action: PayloadAction<boolean>) {
        state.playing = action.payload;
      },
      setTime(state, action:PayloadAction<number>){
        console.log(action.payload)
        state.timePlaying = action.payload
      },
      setDuration(state, action:PayloadAction<number>){
        state.duration = action.payload;
      }
    }
  });
  
  export const { setMedia, playPause,setTime, setDuration } = mediaSlice.actions;
  export default mediaSlice.reducer;
  