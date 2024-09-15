//react imports
import React, { useState } from "react";
//MUI imports
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Grid from "@mui/joy/Grid";
import ReactPlayer from "react-player";

// Props interface for EpisodeCard
interface EpisodeCardProps {
  episode: Episode; // Single episode object passed as prop
}

// Props interface for Episode
interface Episode {
  id: string;
  title: string;
  description: string;
  episode: number;
  file: string;
}
/**
 * A component for A single Episodes card
 * This will allow each episode to be played, liked and description shown
 * 
 * @param {Episode} episode episode to generate the episode card
 * @returns {React.FC}
 */
const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Handles play and pause functionality
  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handles like/unlike functionality
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

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
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
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