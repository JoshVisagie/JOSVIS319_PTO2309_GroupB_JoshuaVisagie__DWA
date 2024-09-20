//import MUI components
import Box from "@mui/material/Box";
//Import MUI Icons
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

//Import Component
import GenreButton from "./GenreButtons";
/**
 * A component for users to Select what genre filters they wish to add
 *  @returns {JSX.Element} A bar of toggleable buttons containing the different genres.
 */
export default function GenreBar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap:"wrap",
        padding: 2,
        gap: 2,
      }}
    >
      <GenreButton
        value={1}
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
