import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Props interface for EpisodeCard
interface EpisodeCardProps {
  episode: Episode; // Single episode object passed as prop
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);
    
  //TODO use redux to handle this
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
  
    //TODO use redux to handle this
  // Handles like/unlike functionality
  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      className='episode-card'
      style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}
    >
      <h4>{episode.title}</h4>
      <audio ref={audioRef} src={episode.file} />
      <div className="episode--cards--buttons">
        {/* Play/Pause Button */}
        <IconButton onClick={handlePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
        </IconButton>

        {/* Like Button */}
        <IconButton onClick={handleLike}>
          {isLiked ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}
        </IconButton>
      </div>
    </div>
  );
};

export default EpisodeCard;
