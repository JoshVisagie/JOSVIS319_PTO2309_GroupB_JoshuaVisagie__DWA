// react imports
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

// redux imports
import { fetchIndivdualPodcast } from "../state/podcasts/individualPodcastSlice";

// mui imports
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Stack from "@mui/joy/Stack";


// component imports
import EpisodeCard from "./EpisodeCard";

/**
 * Interface representing a single episode
 */
interface Episode {
  id: string; // Unique identifier for the episode
  title: string; // Title of the episode
  description: string; // Description of the episode
  episode: number; // Episode number
  file: string; // URL for the audio file of the episode
}

/**
 * Interface representing a single season
 */
interface Season {
  season: number; // Season number
  episodes: Episode[]; // List of episodes in the season
}

/**
 * Interface for the individual podcast data
 */
interface PodcastData {
  description: string; // Description of the podcast
  seasons: Season[]; // Array of seasons with episodes
}

/**
 * Interface for PodInfo component props
 */
interface PodInfoProps {
  id: string; // Podcast ID
}

/**
 * PodInfo component handles displaying detailed information for an individual podcast,
 * including its description and a list of episodes grouped by season.
 */
const PodInfo: React.FC<PodInfoProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.individualPodcast);
  const [selectedSeason, setSelectedSeason] = useState<number | "">(""); // State to manage the selected season.

  // Fetch individual podcast data based on the provided id whenever the id changes.
  useEffect(() => {
    dispatch(fetchIndivdualPodcast(id));
  }, [dispatch, id]);

  // Extract podcast data from the state.
  const podcastData = data.data;

  // Render a loading state if the podcast data is not available or if the seasons are missing.
  if (!podcastData || !Array.isArray(podcastData.seasons)) {
    return <CircularProgress />;
  }

  // Destructure description and seasons from the podcast data.
  const { description, seasons } = podcastData as PodcastData;

  return (
    <div>
 
      <div>
        <FormControl fullWidth>
          <InputLabel id='season-select-label'>Select Season</InputLabel>
          <Select
            labelId='season-select-label'
            value={selectedSeason}
            onChange={(event) =>
              setSelectedSeason(event.target.value as number)
            }
            label='Select Season'
          >
            {/* Render a MenuItem for each season */}
            {seasons.map((season) => (
              <MenuItem key={season.season} value={season.season}>
                Season {season.season}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* Display episodes for the selected season */}
      {selectedSeason && (
        <Stack spacing={1} direction='row' useFlexGap sx={{ flexWrap: "wrap" }}>
          {seasons
            .find((season) => season.season === selectedSeason)
            ?.episodes.map((episode) => (
              <EpisodeCard
                key={episode.episode}
                episode={episode}
              ></EpisodeCard>
            ))}
        </Stack>
      )}
    </div>
  );
};

export default PodInfo;
