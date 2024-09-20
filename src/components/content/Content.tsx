
//redux imports
import { useAppSelector,useAppDispatch } from "../../reduxHooks";
//component imports
import PodcastList from "./podcast/PodcastList";
import LogInForm from "./user/LogInForm";
import SearchContent from "./search/SearchContent";
import LikedContent from "./likedContent/LikedContent";
import { useEffect } from "react";
import { Box } from "@mui/material";

import { togglePage } from "../../state/display/displaySlice";
/**
 * A component for handling what will be shown on the page depending on what the state is
 *
 * @component
 * @returns {JSX.Element} Content that will be displayed depending on what the display state is
 */
const Content = () => {
  const nav = useAppSelector((state) => state.display.page);
  const loggedIn = useAppSelector((state=>state.userData))
  const dispatch = useAppDispatch()

  
  useEffect(() => {
  if(!loggedIn.loggedIn){
    dispatch(togglePage("user"));
  }else{
    dispatch(togglePage("home"));
  }
  }, [loggedIn.user?.email])
  

  return (
    <div>
      {nav == "user" && <LogInForm />}
      {nav == "home" && <PodcastList />}
      {nav == "search" && <SearchContent />}
      {nav== "liked" &&<LikedContent/>}
      <Box sx={{marginTop:"100px"}} ></Box>
    </div>
  );
};

export default Content;
