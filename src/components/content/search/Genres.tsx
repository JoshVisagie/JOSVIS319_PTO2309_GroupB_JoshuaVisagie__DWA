import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import {
  School,
  Gavel,
  HistoryEdu,
  TheaterComedy,
  MovieFilter,
  Work,
  RocketLaunch,
  Newspaper,
  FamilyRestroom,
} from "@mui/icons-material/";

import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { setSelectedGenres } from "../../../state/podcasts/searchSlice";

const GenreButton = (props) => {
  const dispatch = useAppDispatch();
  const podcastsData = useAppSelector((state) => state.podcasts.data);
  const selectedGenres = useAppSelector((state) => state.search.selectedGenres);
  const isSelected = selectedGenres.includes(props.value);

  const handleClick = () => {
    const newSelection = isSelected 
      ? selectedGenres.filter((genre) => genre !== props.value) 
      : [...selectedGenres, props.value];
    
    console.log(newSelection)
      dispatch(setSelectedGenres({ genres: newSelection, data: podcastsData }));  

    };

  return (
    <Tooltip title={props.label}>
      <Button
        onClick={handleClick}
        sx={{
          boxShadow: isSelected ? 4 : 0,
          transform: isSelected ? "scale(1.2)" : "scale(1)",
          transition: "all 0.3s ease",
          backgroundColor: isSelected ? props.color : "#ffffff",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: isSelected ? props.color : "#f0f0f0",
          },
          color: isSelected ? "#ffffff" : props.color,
          minWidth: 48,
          minHeight: 48,
        }}
      >
        {props.icon}
      </Button>
    </Tooltip>
  );
};

export default function Genres() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        padding: 2,
        gap: 2,
      }}
    >
      <GenreButton
        value= {1}
        label='Personal Growth'
        color='error.main'
        icon={<School />}
      />

      <GenreButton
        value={2}
        label='True Crime and Investigative Journalism'
        color='info.main'
        icon={<Gavel />}
      />

      <GenreButton
        value={3}
        label='History'
        color='secondary.main'
        icon={<HistoryEdu />}
      />

      <GenreButton
        value={4}
        label='Comedy'
        color='success.main'
        icon={<TheaterComedy />}
      />

      <GenreButton
        value={5}
        label='Entertainment'
        color='primary.main'
        icon={<MovieFilter />}
      />

      <GenreButton
        value={6}
        label='Business'
        color='error.main'
        icon={<Work />}
      />

      <GenreButton
        value={7}
        label='Fiction'
        color='info.main'
        icon={<RocketLaunch />}
      />

      <GenreButton
        value={8}
        label='News'
        color='secondary.main'
        icon={<Newspaper />}
      />

      <GenreButton
        value={9}
        label='Kids and Family'
        color='success.main'
        icon={<FamilyRestroom />}
      />
    </Box>
  );
}
