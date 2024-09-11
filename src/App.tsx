
import React, { useContext, useState } from "react";
import Button from '@mui/joy/Button';
import GuideBar from "./components/GuideBar";
import RecomendedCarousel from "./components/Carousel";
import Content from "./components/Content";
function App() {

  return (
    <div>
      <RecomendedCarousel/>
      <GuideBar/>
      <Content/>
    </div>
   )
}

export default App;
