
import React, { useContext, useState } from "react";
import Button from '@mui/joy/Button';
import GuideBar from "./components/GuideBar";
import RecomendedCarousel from "./components/Carousel";
import Podcasts from "./components/PodcastList";
function App() {

  return (
    <div>
      <RecomendedCarousel/>
      <GuideBar/>
      <Podcasts/>
    </div>
   )
}

export default App;
