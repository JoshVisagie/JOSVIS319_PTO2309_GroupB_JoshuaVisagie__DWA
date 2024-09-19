import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { fetchUserPodcastData } from "../../../state/userData/userPodcastDataSlice";
import { selectLikedPodcast } from "../../../state/userData/userPodcastDataSlice";
import { Card, Box, Paper } from "@mui/material";
import LikedPodcastCard from "./LikedPodcastCard";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import currentTheme from "../../../style";

const sortPods = (data, sortType, allpodcasts) => {
  console.log("~  data", data)
  console.log( "~ all podcasts:",allpodcasts)
  return [...data].sort((a, b) => {
    

  const podcastA =  allpodcasts.find((podcast) => podcast.id === a[0])
  const podcastB = allpodcasts.find((podcast) => podcast.id === b[0])
  
    // const podcast1= allPodcasts[a[0]]
    // const podcast2= allPodcasts[]
    console.log("~ podcast1:",podcastA)
    switch (sortType) {
      case "alphabetic":
        return podcastA.title.localeCompare(podcastB.title);
      case "revAlphabetic":
        return podcastB.title.localeCompare(podcastA.title);
      case "recent":
        return new Date(podcastA.updated).getTime() - new Date(podcastB.updated).getTime();
      case "oldest":
        return new Date(podcastB.updated).getTime() - new Date(podcastA.updated).getTime();
      default:
        return 0;
    }
  });
}


const LikedContent = () => {
  const dispatch = useAppDispatch();

  // Fetch the user data from the Redux store
  const likedEpisodes = useAppSelector(selectLikedPodcast);
  const email = useAppSelector((state) => state.userData.user?.email);
  const allPods = useAppSelector((state) => state.podcasts.data); // All podcasts data
  const [filterType, setFilterType] = useState('revAlphabetic')
  console.log("~ all pods ",allPods)
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
  console.log(groupLikedByPodcast(likedEpisodes))
  // Group liked episodes by podcastID
  const groupedByPodcast = groupLikedByPodcast(likedEpisodes);
  console.log("~grouped", groupedByPodcast)
  const sortedPods= sortPods(Object.entries(groupedByPodcast),filterType, allPods )
  console.log("~ sortedPods", sortedPods)
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

  const handleChange= (event) =>{
    setFilterType(event.target.value)
  }
  
  return (
    <Box>
      <h1>Liked Podcasts</h1>
      <Box 
      sx={{display:"flex"}}>
      <Box
          sx={{
            width: "100%",
            backgroundColor: currentTheme.secondary,
            height: "10px",
            boxShadow: "1",
            borderRadius: "10px",
            marginTop: "7px",
          }}
        ></Box>
      <Select
          label='sort'
          value={filterType}
          onChange={handleChange}
          variant='outlined'
          sx={{
            width: "120px",
            height: "30px",
            padding: "0px",
            fontSize: "0.875rem",

            margin: 2,
            border: "none",
            boxShadow: "1",
            outline: "none",
            borderRadius: "10px",
            backgroundColor: currentTheme.secondary,
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "&:focus": {
              outline: "none",
              boxShadow: "none",
            },
            ".MuiSelect-select": {
              padding: "4px 8px",
            },
          }}
        >
          <MenuItem value='recent'>New - Old</MenuItem>
          <MenuItem value='oldest'>Old - New</MenuItem>
          <MenuItem value='alphabetic'>A - Z</MenuItem>
          <MenuItem value='revAlphabetic'>Z - A</MenuItem>
        
        </Select>
        <Box
          sx={{
            width: "100%",
            backgroundColor: currentTheme.secondary,
            height: "10px",
            boxShadow: "1",
            borderRadius: "10px",
            marginTop: "7px",
          }}
        ></Box>
        </Box>
      {sortedPods.map(([podcastID, likedPodcasts]) => {
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
        //@ts-expect-error it works
          likedShows={selectedPodcast.likedShows}
          podcastID={selectedPodcast.podcastID}
          onClose={handleClose}
        />
      )}
    </Box>
  );
};

export default LikedContent;
