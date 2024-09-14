import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Box } from "@mui/material";
import SinglePod from "../podcast/SinglePod";
import currentTheme from "../../../style";


const FilteredPodcastList: React.FC = () => {
  const dispatch = useAppDispatch();
  const podcasts = useAppSelector();
  const isLoading = useAppSelector((state) => state.podcasts.isLoading);
  const [sort, setSort] = useState("alphabetic");

  const {
    primary: primaryColor,
    secondary: secondaryColor,
    background: backgroundColor,
    text: textColor,
  } = currentTheme;

  // Fetch podcasts when the component mounts

  // Handle sort type change
  const handleChange = (event: SelectChangeEvent) => {
    const newSort = event.target.value as string;
    setSort(newSort);
    dispatch(setSortType(newSort)); // Dispatch action to update sort type
  };

  // Handle expanding/collapsing a specific podcast accordion
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCollapse = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id)); // Collapse if clicked again, otherwise expand
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
            width: "120px", // Adjusted width for compact design
            height: "30px", // Reduced height
            padding: "0px", // Remove padding for a compact look
            fontSize: "0.875rem", // Smaller font size
            marginBottom: 2, // Bottom margin
            border: "none", // Removes the border
            boxShadow: "1", // Removes any box shadow
            outline: "none",
            borderRadius: "10px",
            backgroundColor: secondaryColor, // Removes the focus outline
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none", // Removes border of the notched outline
            },
            "&:focus": {
              outline: "none", // Removes outline on focus
              boxShadow: "none", // Removes any shadow on focus
            },
            ".MuiSelect-select": {
              padding: "4px 8px", // Adjust padding inside the select dropdown
            },
          }}
        >
          <MenuItem value='alphabetic'>A - Z</MenuItem>
          <MenuItem value='revAlphabetic'>Z - A</MenuItem>
          <MenuItem value='recent'>New - Old</MenuItem>
          <MenuItem value='oldest'>Old - New</MenuItem>
        </Select>
        <Box
          sx={{
            width: "100%",
            backgroundColor: secondaryColor,
            height: "10px",
            boxShadow: "1",
            borderRadius: "10px",
            marginTop: "7px",
          }}
        ></Box>
      </Box>
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
