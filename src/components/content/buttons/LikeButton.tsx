import React from "react";
import { useAppDispatch, useAppSelector } from "../../reduxHooks";
import { likeEpisode } from "../../state/userData/userPodcastData";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface LikeButtonProps {
  episodeID: string;
  timestamp: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ episodeID, timestamp }) => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.userData.user?.email);
  const likedEpisodes = useAppSelector((state) => state.userPodcastData.userPodcastData?.liked || []);
  
  const episodeBaseID = episodeID.split('#')[0];
  const isLiked = likedEpisodes.some(liked => liked.startsWith(episodeBaseID));

  const handleClick = () => {
    if (email) {
      dispatch(likeEpisode({ episodeID: `${episodeID}#${timestamp}`, userEmail: email }));
    }
  };

  return (
    <IconButton onClick={handleClick}>
      {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default LikeButton;
