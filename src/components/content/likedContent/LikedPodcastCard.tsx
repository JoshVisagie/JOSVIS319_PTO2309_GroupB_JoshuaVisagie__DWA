import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { Box, Card, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchIndivdualPodcast } from "../../../state/podcasts/individualPodcastSlice";
import LikeButton from "../buttons/LikeButton";

interface LikedEpisode {
  episode: number;
  episodeID: string;
  likedAt: string;
  podcastID: string;
  season: number;
}

interface PropsType {
  likedShows: LikedEpisode[];
  podcastID: string;
  onClose: any;
}

const LikedPodcastCard: React.FC<PropsType> = (props) => {
  const { likedShows, podcastID, onClose } = props;
  const dispatch = useAppDispatch();

  // Fetch the individual podcast data from Redux store
  const podcast = useAppSelector((state) => state.individualPodcast.data);

  useEffect(() => {
    if (podcastID) {
      dispatch(fetchIndivdualPodcast(podcastID));
    }
  }, [podcastID, dispatch]);

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          position: "relative",
          width: "80%",
          maxWidth: "600px",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
          maxHeight: "80vh"
          
        }}
      >
        {/* Close Button */}
        <IconButton
          sx={{ position: "absolute", top: 10, right: 10 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h5" gutterBottom>
          Liked Episodes for {podcast?.title}
        </Typography>
        <Box
        sx={{
                      

        }}
        ></Box>
        {/* Render each liked episode */}
        {likedShows.map((likedEpisode) => {
          // Fetch the corresponding episode data
          const episodeData =
            podcast?.seasons[likedEpisode.season -1 ]?.episodes[likedEpisode.episode -1 ];
            console.log("episdode data",episodeData)
          // If the episode data is not available, skip rendering it
          if (!episodeData) return null;

          return (
            <Box
              key={likedEpisode.episodeID}
              sx={{
                marginBottom: 2,
                padding: 2,
                border: "1px solid #ddd",
                borderRadius: "8px",
              }}
            >
              {/* Episode Title and Info */}
              <Typography variant="subtitle1">
                {episodeData.title} (Season {likedEpisode.season}, Episode{" "}
                {likedEpisode.episode})
              </Typography>

              {/* Date Liked */}
              <Typography variant="body2" color="text.secondary">
                Liked at: {likedEpisode.likedAt}
              </Typography>

              {/* Like Button */}
              <LikeButton
                episodeID={likedEpisode.episodeID}
                podcastID={likedEpisode.podcastID}
                isLiked={true} // Since it's in the liked list
              />
            </Box>
          );
        })}
      </Card>
    </Box>
  );
};

export default LikedPodcastCard;
