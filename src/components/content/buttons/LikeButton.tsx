import React from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { updateLikedPodcasts, updateUserPodcastDataLocally} from "../../../state/userData/userPodcastDataSlice";
import { selectLikedPodcast } from "../../../state/userData/userPodcastDataSlice";

interface LikeButtonProps {
  episodeID: string;
  podcastID: string;
  season: number;
  episode: number;
  timestamp: number;
}



const LikeButton: React.FC<LikeButtonProps> = (props: LikeButtonProps) => {
    console.log(props)
  const { episodeID, podcastID, season, episode, timestamp } = props;

  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.userData.user?.email);

  // Ensure likedEpisodes is always an array, defaulting to an empty array if undefined
  const likedEpisodes = useAppSelector(selectLikedPodcast);
  console.log("Liked",likedEpisodes)
  // Check if the episode is already liked
  const isLiked = likedEpisodes.some(
    item => item?.episodeID === episodeID // Ensure item is not null or undefined
  );

  const handleClick = () => {
    if (email) {
      // If the episode is already liked, remove it from the liked array
      let updatedLikes;
      console.log('handling Update',likedEpisodes)
      if (isLiked) {
         console.log('handleing is liked:',isLiked)
        updatedLikes = likedEpisodes.filter(
          (item: any) => item?.episodeID !== episodeID // Safeguard against null or undefined items
        );
      } else {
        // If the episode is not liked, add it to the liked array
        const newLike = {
          episodeID,
          podcastID,
          season,
          episode,
          likedAt: new Date(timestamp).toLocaleString(),
        };
        updatedLikes = [...likedEpisodes, newLike];
      }
      console.log('about to dispatch these', updatedLikes)
      // Dispatch the action to update the liked episodes in Supabase
      dispatch(updateUserPodcastDataLocally({ userEmail: email, liked: updatedLikes }));

      // Then trigger async thunk to persist data to Supabase
      dispatch(updateLikedPodcasts({ userEmail: email, liked_podcasts: updatedLikes }));    }
  };

  return (
    <IconButton onClick={handleClick}>
      {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
    </IconButton>
  );
};

export default LikeButton;
