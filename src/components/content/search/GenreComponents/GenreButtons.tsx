import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";


import { useAppDispatch, useAppSelector } from "../../../../reduxHooks";
import { setSelectedGenres } from "../../../../state/podcasts/searchSlice";

interface GenreButtonProps{
    value:number
    label:string
    color:string
    icon:JSX.Element
}

 const GenreButton = (props: GenreButtonProps) => {
  const dispatch = useAppDispatch();
  const podcastsData = useAppSelector((state) => state.podcasts.data);
  const selectedGenres = useAppSelector((state) => state.search.selectedGenres);
  const isSelected = selectedGenres.includes(props.value);

  const handleClick = () => {
    const newSelection = isSelected
      ? selectedGenres.filter((genre) => genre !== props.value)
      : [...selectedGenres, props.value];

    console.log(newSelection);
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

export default GenreButton