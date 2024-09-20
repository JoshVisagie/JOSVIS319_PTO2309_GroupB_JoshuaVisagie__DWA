//react imports
import React, { useState, useEffect } from "react";
//MUI imports
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { CheckCircleRounded } from "@mui/icons-material";
import Grid from "@mui/joy/Grid";

import { useAppSelector, useAppDispatch } from "../../../reduxHooks";
import { playPause, setMedia } from "../../../state/mediaPlayer/mediaSlice";

import LikeButton from "../buttons/LikeButton";
import { Box, duration } from "@mui/material";

// Props interface for EpisodeCard
interface EpisodeCardProps {
  episode: Episode; // Single episode object passed as prop
  podcastID:string
  podcastTitle: string;
  podcastImage: string;
  season:number
}

// Props interface for Episode
interface Episode {
  id: string;
  title: string;
  description: string;
  episode: number;
  file: string;
  podcastImage: string;
  
}
/**
 * A component for A single Episodes card
 * This will allow each episode to be played, liked and description shown
 *
 * @param {Episode} episode episode to generate the episode card
 * @returns {React.FC}
 * 
 */
const EpisodeCard: React.FC<EpisodeCardProps> = (props) => {
  const { podcastID, podcastTitle, episode, podcastImage, season} = props;
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const media = useAppSelector((state) => state.media);
  const isMediaPlaying = useAppSelector((state) => state.media.playing);
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.userData.user?.email);
  const loggedIn = useAppSelector(state=>state.userData.loggedIn)

  const listenTime = useAppSelector(state=>state.userPodcastData.userPodcastData?.listen_time)
  const [currentEpisodeListenTime, setCurrentEpisodeListenTime] = useState(0)
  const [currentEpisodeFin, setCurrentEpisodeListenFin] = useState(false)

  const id = `${podcastID}-${season}-${episode.episode}`
  // Handles play and pause functionality

  useEffect(() => {
   
    const foundListenPodcast = listenTime?.find(episode=> episode.episodeID == id)

    if(foundListenPodcast){
      setCurrentEpisodeListenTime(foundListenPodcast.timePlayed)
      setCurrentEpisodeListenFin(foundListenPodcast.isDone)
    }else{
      setCurrentEpisodeListenTime(0)
    }
    
  })
  

  const handlePlayPause = () => {
    if (media.id !== id) {
      console.log(episode.file, id);
      const newMedia = {
        id: id,
        podcastID:podcastID,
        url: episode.file,
        episodeTitle: episode.title,
        podcastTitle: podcastTitle,
        podcastImage: podcastImage,
    
      };
      dispatch(playPause(false));
      dispatch(setMedia(newMedia));
      dispatch(playPause(true));

    } else {
      dispatch(playPause(!isMediaPlaying));
    }
  };

  // Handles like/unlike functionality
 
  
  return (
    <Grid
      container
      alignItems='center'
      spacing={0}
      sx={{
        borderBottom: "1px solid #ddd",
        padding: "8px 16px",
        width: "100%",
      }}
    >
      <Grid xs>
        <h4>
          {episode.episode}. {episode.title}
        </h4>
      </Grid>

     {loggedIn && <Grid>
        <Box>
          {currentEpisodeFin?<CheckCircleRounded/> : <h6>listened to: {currentEpisodeListenTime} Seconds</h6>}
        </Box>
       <audio ref={audioRef} src={episode.file} />
        {/* Play/Pause Button */}
        <IconButton onClick={handlePlayPause}>
          {isMediaPlaying && media.id === id ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </IconButton>

        {/* Like Button */}
        <LikeButton
           episodeID= {`${podcastID}-${season}-${episode.episode}`}
           podcastID= {podcastID}
           season= {season}
           episode= {episode.episode}
           timestamp= {new Date().getTime()}
        />
      </Grid>}
    </Grid>
  );
};

export default EpisodeCard;
