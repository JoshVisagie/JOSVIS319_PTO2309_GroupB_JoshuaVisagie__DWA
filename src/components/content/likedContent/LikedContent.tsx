import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { fetchUserPodcastData } from "../../../state/userData/userPodcastDataSlice";
import { selectLikedPodcast } from "../../../state/userData/userPodcastDataSlice";
import { Card, Box, Paper } from "@mui/material";
import LikedPodcastCard from "./LikedPodcastCard";



const LikedContent = () => {
  const dispatch = useAppDispatch();

  // Fetch the user data from the Redux store
  const likedEpisodes = useAppSelector(selectLikedPodcast);
  const email = useAppSelector((state) => state.userData.user?.email);
  const allPods = useAppSelector((state) => state.podcasts.data); // All podcasts data


  // State to store the selected podcast
  const [selectedPodcast, setSelectedPodcast] = useState<{ podcastID: string; likedShows: Liked[] } | null>(null);

  // Interface for Liked podcasts
  interface Liked {
    episodeID: string;
    podcastID: string;
    season: string;
    episode: string;
    likedAt: string;
  }

  interface GroupedByPodcast {
    [podcastID: string]: Liked[];
  }

  // Function to group liked podcasts by their podcastID
  const groupLikedByPodcast = (likedPodcasts: Liked[]): GroupedByPodcast => {
    return likedPodcasts.reduce((acc: GroupedByPodcast, likedPodcast: Liked) => {
      const { podcastID } = likedPodcast;

      // If the podcast doesn't exist in the accumulator, create it
      if (!acc[podcastID]) {
        acc[podcastID] = [];
      }

      // Add the liked podcast to the correct podcast ID
      acc[podcastID].push(likedPodcast);

      return acc;
    }, {}); // Initial value is an empty object
  };

  // Group liked episodes by podcastID
  const groupedByPodcast = groupLikedByPodcast(likedEpisodes);

  // Handle podcast card click
  const handleClick = (podcastID: string) => {
    const likedShows = groupedByPodcast[podcastID]; // Get liked shows for the podcastID
    setSelectedPodcast({ podcastID, likedShows }); // Set the selected podcast state
    console.log("handleclick props",podcastID, likedShows)
  };

  // Handle closing the modal
  const handleClose = () => {
    setSelectedPodcast(null); // Reset the selected podcast to close the modal
  };

  return (
    <div>
      <h1>Liked Podcasts</h1>
      {Object.entries(groupedByPodcast).map(([podcastID, likedPodcasts]) => {
        // Find the corresponding podcast in the allPods array by podcastID
        const matchingPodcast = allPods.find((podcast) => podcast.id === podcastID);

        // If the podcast is not found, we skip rendering this group
        if (!matchingPodcast) return null;

        return (
          <Card
            key={podcastID}
            className="podcast-card"
            onClick={() => handleClick(podcastID)} // Pass podcastID on click
            sx={{
              margin: 3,
              padding: "5px",
              display: "flex",
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                padding: 3,
                width: "75%",
              }}
            >
              <h2>{matchingPodcast.title}</h2>
              <h3>Liked Episodes: {groupedByPodcast[podcastID].length}</h3>
            </Box>
            <img src={matchingPodcast.image} height={120} alt={matchingPodcast.title} />
          </Card>
        );
      })}

      {/* Conditionally render the LikedPodcastCard when a podcast is selected */}
      {selectedPodcast && (
        <LikedPodcastCard
          likedShows={selectedPodcast.likedShows}
          podcastID={selectedPodcast.podcastID}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default LikedContent;
