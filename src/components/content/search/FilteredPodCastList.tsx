import {  useState } from "react";
import {  useAppSelector } from "../../../reduxHooks";
import { Box } from "@mui/material";
import SinglePod from "../podcast/SinglePod";
import { Podcast } from "../../../state/podcasts/podcastsSlice";
/**
 * FilteredPodcastList component displays a list of filtered podcasts with accordion-style collapse functionality.
 *
 * @component
 * @returns {JSX.Element} A list of filtered podcasts.
 */
const FilteredPodcastList: React.FC = (): JSX.Element => {
  
  /** List of filtered podcasts from the Redux search state */
  const podcasts = useAppSelector(state => state.search.filteredData as Podcast[]);

  /** State to track which podcast accordion is expanded */
  const [expandedId, setExpandedId] = useState<string | null>(null);

  /**
   * Handles collapsing/expanding of a podcast.
   *
   * @param {string} id - The ID of the podcast to collapse or expand.
   */
  const handleCollapse = (id: string): void => {
    setExpandedId((prev) => (prev === id ? null : id)); // Collapse if clicked again, otherwise expand
  };

  return (
    <Box>
      {podcasts.map((podcast) => (
        <SinglePod
          key={podcast.id}
          podcastTitle={podcast.title}
          podcastID={podcast.id}
          podcastGenres={podcast.genres}
          podcastSeasons={podcast.seasons}
          podcastImg={podcast.image}
          podcastDate={podcast.updated}
          podcastDescription={podcast.description}
          expanded={expandedId === podcast.id}
          handleCollapse={handleCollapse}
        />
      ))}
    </Box>
  );
};

export default FilteredPodcastList;
