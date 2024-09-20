//react imports
import { useEffect, useState } from "react";
//redux imports
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import {
  fetchPodcasts,
  selectSortedPodcasts,
  setSortType,
} from "../../../state/podcasts/podcastsSlice";
//mui imports
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
//component imports
import SinglePod from "./SinglePod";
import currentTheme from "../../../style";
import PodcastCardSmall from "./PodcastCardSmall";

/**
 * a component that creates a list of SinglePod components based off the Pocasts state
 * @returns {React.FC}
 */
const PodcastList: React.FC = () => {
  const dispatch = useAppDispatch();
  const podcasts = useAppSelector(selectSortedPodcasts);
  const isLoading = useAppSelector((state) => state.podcasts.isLoading);
  const [sort, setSort] = useState("recent");
  const [display, setDisplay] = useState("large");
  const { secondary: secondaryColor } = currentTheme;

  // Fetch podcasts when the component mounts
  useEffect(() => {
    dispatch(fetchPodcasts());
  }, [dispatch]);

  // Handle sort type change
  const handleChange = (event: SelectChangeEvent) => {
    const newSort = event.target.value;
    setSort(newSort);
    //@ts-expect-error this works
    dispatch(setSortType(newSort)); // Dispatch action to update sort type
  };

  const handleDisplayChange = (event: SelectChangeEvent) => {
    const newDisplay = event.target.value;
    setDisplay(newDisplay);
  };

  // Handle expanding/collapsing a specific podcast accordion
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Collapse if clicked again, otherwise expand
  const handleCollapse = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Box>
      {isLoading && <p>Loading...</p>}
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <Select
          label='sort'
          value={sort}
          onChange={handleChange}
          variant='outlined'
          sx={{
            width: "120px",
            height: "30px",
            padding: "0px",
            margin: "1rem",
            fontSize: "0.875rem",
            marginBottom: 2,
            border: "none",
            boxShadow: "1",
            outline: "none",
            borderRadius: "10px",
            backgroundColor: secondaryColor,
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
            backgroundColor: currentTheme.primary,
            height: "10px",
            boxShadow: "1",
            borderRadius: "10px",
            marginTop: "40px",
          }}
        ></Box>

        <Select
          label='display'
          value={display}
          onChange={handleDisplayChange}
          variant='outlined'
          sx={{
            width: "120px",
            height: "30px",
            padding: "0px",
            fontSize: "0.875rem",
            margin: "1rem",
            marginBottom: 2,
            border: "none",
            boxShadow: "1",
            outline: "none",
            borderRadius: "10px",
            backgroundColor: secondaryColor,
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
          <MenuItem value='large'>Card Display</MenuItem>
          <MenuItem value='small'>List Display</MenuItem>
        </Select>
      </Box>
      {display == "large" &&
        podcasts.map((podcast) => (
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
      {display == "small" && (
        <Box sx={{ display: "flex", flexWrap: "wrap", flexDirection: "row", justifyContent:"space-around" }}>
          {podcasts.map((podcast) => (
            <PodcastCardSmall
              key={podcast.id}
              podcastTitle={podcast.title}
              podcastID={podcast.id}
            />
          ))}{" "}
        </Box>
      )}
    </Box>
  );
};

export default PodcastList;
