
//redux imports
import { useAppSelector } from "../../reduxHooks";
//component imports
import PodcastList from "./podcast/PodcastList";
import LogInForm from "./user/LogInForm";
import SearchContent from "./search/SearchContent";
import SupabaseTest from "../SupabaseTest";
import LikedContent from "./likedContent/LikedContent";

import { Box } from "@mui/material";
/**
 * A component for handling what will be shown on the page depending on what the state is
 *
 * @component
 * @returns {JSX.Element} Content that will be displayed depending on what the display state is
 */
const Content = () => {
  const nav = useAppSelector((state) => state.display.page);

  return (
    <div>
      {nav == "user" && <LogInForm />}
      {nav == "home" && <PodcastList />}
      {nav == "search" && <SearchContent />}
      {nav== "liked" &&<LikedContent/>}
      <Box sx={{marginTop:"100px"}} >""</Box>
    </div>
  );
};

export default Content;
