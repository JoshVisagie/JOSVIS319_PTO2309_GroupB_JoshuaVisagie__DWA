//react imports
import React, { useState , useEffect} from "react";
//MUI imports
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Grid from "@mui/joy/Grid";

import { useAppSelector, useAppDispatch } from "../../../reduxHooks";
import { playPause, setMedia } from "../../../state/mediaPlayer/mediaSlice";

import { updateLikedPodcasts } from "../../../state/userData/userDataPodcasts";
import { supabase } from "../../../supabaseClient";

// Props interface for EpisodeCard
interface EpisodeCardProps {
  episode: Episode; // Single episode object passed as prop
  id: string
  podcastTitle:string
  podcastImage: string
}

// Props interface for Episode
interface Episode {
  id: string;
  title: string;
  description: string;
  episode: number;
  file: string;
  podcastImage:string;
}
/**
 * A component for A single Episodes card
 * This will allow each episode to be played, liked and description shown
 * 
 * @param {Episode} episode episode to generate the episode card
 * @returns {React.FC}
 */
const EpisodeCard: React.FC<EpisodeCardProps> = (props) => {
  const {id, podcastTitle, episode, podcastImage} =props  
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const media = useAppSelector(state=>state.media)
  const isMediaPlaying = useAppSelector(state=> state.media.playing)
  const dispatch = useAppDispatch()
  const email = useAppSelector(state=> state.userData.user?.email)
  const liked = useAppSelector(state=>state.podcastUserData.userData?.liked)
  // Handles play and pause functionality
  const handlePlayPause = () => {
    
      if (media.id!== id) {
        console.log(episode.file, id)
        const newMedia={
          id:id,
          url: episode.file,
          episodeTitle: episode.title,
          podcastTitle: podcastTitle,
          podcastImage: podcastImage,
        }

        dispatch(setMedia(newMedia))
        dispatch(playPause(!isMediaPlaying))

      } else {
        dispatch(playPause(!isMediaPlaying))
      }    
  };

  

  // Handles like/unlike functionality
  const handleLike = () => {
    setIsLiked(!isLiked);
    if (email) {
      const time = new Date().getTime()
      dispatch(updateLikedPodcasts({
        userEmail: email,
        liked: [...(liked || []), `${id}#${time}`] // Append the episode ID to the liked list
      }));
  };
  }
  return (
    <Grid
      container
      alignItems="center"
      spacing={0}
      sx={{
        borderBottom: "1px solid #ddd",
        padding: "8px 16px",
        width: "100%",
      }}
    >
      <Grid  xs>
        <h4>
          {episode.episode}. {episode.title}
        </h4>
      </Grid>

      <Grid >
        <audio ref={audioRef} src={episode.file} />
        {/* Play/Pause Button */}
        <IconButton onClick={handlePlayPause}>
          {(isMediaPlaying && media.id === id) ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>

        {/* Like Button */}
        <IconButton onClick={handleLike}>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default EpisodeCard;