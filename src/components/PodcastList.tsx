//react imports
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

//redux imports
import { fetchPodcasts } from "../state/podcasts/podcastsSlice";
import { fetchIndivdualPodcast } from "../state/podcasts/individualPodcastSlice";

//mui imports
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import { TabPanel } from "@mui/joy";

//TS Interfaces

interface PodInfoProps {
  id: string;
}
// Interface representing a podcast
interface Podcast {
  id: string; // Unique identifier for the podcast
  title: string; // Title of the podcast
  genres: string[]; // Array of genres the podcast belongs to
  seasons: number; // Number of seasons
  image: string; // URL for the podcast's image
  updated: string; // Date when the podcast was last updated
  description: string; // Description of the podcast
}
// Interface representing a single episode
interface Episode {
  id: string; // Unique identifier for the episode
  title: string; // Title of the episode
}

// Interface representing a single season
interface Season {
  season: number; // Season number
  episodes: Episode[]; // List of episodes in the season
}

// Interface for the individual podcast data
interface PodcastData {
  description: string; // Description of the podcast
  seasons: Season[]; // Array of seasons with episodes
}

// Define the props interface for the SinglePod component
interface SinglePodProps {
  podcastTitle: string;           // Title of the podcast
  podcastID: string;              // Unique identifier for the podcast
  podcastGenres: string[];        // Array of genres the podcast belongs to
  podcastSeasons: number;         // Number of seasons in the podcast
  podcastImg: string;             // URL of the podcast image
  podcastDate: string;            // Date when the podcast was last updated
  podcastDescription: string;     // Description of the podcast
  expanded: boolean;              // Whether the accordion is expanded
  handleChange: (id: string) => void; // Function to handle accordion expand/collapse
}


 /**  PodInfo component handles displaying detailed information for an individual podcast,
 including its description and a list of episodes grouped by season.*/
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
  const { description, seasons } = podcastData as PodcastData ;
  console.log(seasons);

  return (
    <div>
      <h6>{description}</h6>
      <Tabs
        aria-label='Vertical tabs'
        orientation='vertical'
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

// SinglePod component represents each individual podcast within the accordion,
// displaying its summary, title, and expandable details with PodInfo component.
const SinglePod: React.FC<SinglePodProps> = (props) => {
  const date = new Date(props.podcastDate); // Format the podcast's date.

  return (
    <Accordion
      expanded={props.expanded} // Controls whether the accordion is expanded or collapsed.
      onChange={() => props.handleChange(props.podcastID)} // Toggle expanded state when clicked.
      square={false}
      sx={{
        borderRadius: "50px", // Rounded corners for the accordion.
        margin: "20px", // Space around the accordion.
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />} // Icon for expanding/collapsing the accordion.
        aria-controls='panel3-content'
        id='panel3-header'
        className='accordian--singlePod--summary'
      >
        {/* Accordion summary showing the podcast's image, title, and season count */}
        <div className='accordian--singlePod'>
          <img src={props.podcastImg} height='100px' alt='Podcast' />

          <div className='accordian--singlePod--div'>
            <p>
              <h3>{props.podcastTitle}</h3> {date.toLocaleDateString()}
            </p>
            <p>
              {props.podcastSeasons}{" "}
              {props.podcastSeasons > 1 ? "Seasons" : "Season"}
            </p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {/* Display detailed information of the podcast when expanded */}
        {props.expanded && <PodInfo id={props.podcastID} />}
      </AccordionDetails>
      <AccordionActions>
        {/* Buttons for additional actions, e.g., Cancel and Agree */}
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </AccordionActions>
    </Accordion>
  );
};

// Podcasts component fetches and displays a list of podcasts,
// managing their expanded state to show or hide details.
const Podcasts: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state);
  const [expandedId, setExpandedId] = useState<string | null>(null); // Manage which podcast accordion is expanded.

  // Fetch all podcasts when the component mounts.
  useEffect(() => {
    dispatch(fetchPodcasts());
  }, [dispatch]);

  // Handle expanding/collapsing a specific podcast accordion.
  const handleChange = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id)); // Collapse if clicked again, otherwise expand.
  };

  return (
    <div>
      {/* Display loading state if podcasts are still being fetched */}
      {data.podcasts.isLoading && <p>Loading...</p>}
      {/* Render each podcast within an accordion */}
      {data.podcasts.data.map((podcast: Podcast) => (
        <SinglePod
          key={podcast.id}
          podcastTitle={podcast.title}
          podcastID={podcast.id}
          podcastGenres={podcast.genres}
          podcastSeasons={podcast.seasons}
          podcastImg={podcast.image}
          podcastDate={podcast.updated}
          podcastDescription={podcast.description}
          expanded={expandedId === podcast.id} // Expand the accordion if its ID matches the expanded one.
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

export default Podcasts;
