import GuideBar from "./components/ui/GuidBarComponents/GuideBar";
import RecomendedCarousel from "./components/ui/CarouselComponents/Carousel";
import Content from "./components/content/Content";
import BottomAppBar from "./components/ui/PlayBarComponents/PlayBar";

import Fetch from "./Fetch";



function App() {


  return (
    <div>
      <Fetch/>
      <RecomendedCarousel />
      <GuideBar />
      <Content />
      <BottomAppBar />
    </div>
  );
}

export default App;
