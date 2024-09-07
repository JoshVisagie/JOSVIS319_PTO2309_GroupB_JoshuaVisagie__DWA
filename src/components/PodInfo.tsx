// react imports
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

// redux imports
import { fetchIndivdualPodcast } from "../state/podcasts/individualPodcastSlice";

// mui imports
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import { TabPanel } from "@mui/joy";

/** 
 * Interface representing a single episode
 */
interface Episode {
  id: string; // Unique identifier for the episode
  title: string; // Title of the episode
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
  const data = useAppSelector((state) => state);
  const [selectedTab, setSelectedTab] = useState(0); // State to manage the selected tab (season).

  // Fetch individual podcast data based on the provided id whenever the id changes.
  useEffect(() => {
    dispatch(fetchIndivdualPodcast(id));
  }, [dispatch, id]);

  // Extract podcast data from the state.
  const podcastData = data.individualPodcast.data;

  // Render a loading state if the podcast data is not available or if the seasons are missing.
  if (!podcastData || !Array.isArray(podcastData.seasons)) {
    return <p>Loading...</p>;
  }

  // Destructure description and seasons from the podcast data.
  const { description, seasons } = podcastData as PodcastData;

  return (
    <div>
      <h6>{description}</h6>
      <Tabs
        aria-label="Vertical tabs"
        orientation="vertical"
        value={selectedTab}
        onChange={(event, newValue) => setSelectedTab(newValue)} // Update selected tab when the user clicks on a different season.
        sx={{
          minWidth: 300,
          height: 160,
        }}
      >
        <TabList
          sx={{
            overflow: "auto", // Allow horizontal scrolling of tabs.
            scrollSnapType: "x mandatory", // Ensure smooth snapping between tabs.
            "&::-webkit-scrollbar": { display: "none" }, // Hide the scrollbar for better UI.
          }}
        >
          {/* Render a Tab for each season */}
          {seasons.map((season, index) => (
            <Tab key={season.season} value={index}>
              Season {season.season}
            </Tab>
          ))}
        </TabList>
        {/* Render corresponding TabPanel for each season */}
        {seasons.map((season, index) => (
          <TabPanel
            key={season.season}
            value={index}
            sx={{
              overflow: "auto",
              scrollSnapType: "x mandatory",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <h4>Episodes for Season {season.season}</h4>
            <ul>
              {/* List each episode within the season */}
              {season.episodes.map((episode) => (
                <li key={episode.id}>{episode.title}</li>
              ))}
            </ul>
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default PodInfo;
