//react imports
import { useState, useEffect } from "react";
//MUI imports
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
//Redux imports
import { useAppDispatch, useAppSelector } from "../../../../reduxHooks";
import { setSelectedGenres } from "../../../../state/podcasts/searchSlice";

//the type of the props for GenreButton
interface GenreButtonProps {
  value: number;
  label: string;
  color: string;
  icon: JSX.Element;
}
/**
 *
 * @param {GenreButtonProps} props the value, lable, color and string and Icon of the button to be rendered
 * @returns {JSX.Element} A button that allows you to change selectedGenres state for filtering podcasts
 */
const GenreButton = (props: GenreButtonProps) => {
  const dispatch = useAppDispatch();
  /**
   * an array of all podcasts from our Podcasts Slice
   */
  const podcastsData = useAppSelector((state) => state.podcasts.data);
  /**
   * an array of all of our genres that have been selected
   */
  const selectedGenres = useAppSelector((state) => state.search.selectedGenres);

  /**
   * state for managing if the button is selected
   */
  const [isSelected, setIsSelected] = useState(false);
  /**
   * updates the buttons state when ever SelectedGenres changes
   */
  useEffect(() => {
    setIsSelected(selectedGenres.includes(props.value));
  }, [selectedGenres]);

  /**
   * Handle button click effect to
   * change the Selected Genres state for filtering podcasts
   * @returns {void}
   */
  const handleClick = () => {
    let newSelection;

    if (isSelected) {
      // If the genre is already selected, remove it from the selection
      newSelection = selectedGenres.filter((genre) => genre !== props.value);
    } else {
      // If the genre is not selected, add it to the selection
      newSelection = [...selectedGenres, props.value];
    }
    //dispatch the updated Genres and podcasts data
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

export default GenreButton;
