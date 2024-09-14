import GuideBar from "./components/ui/GuidBarComponents/GuideBar";
import RecomendedCarousel from "./components/ui/Carousel";
import Content from "./components/content/Content";
function App() {
  return (
    <div>
      <RecomendedCarousel />
      <GuideBar />
      <Content />
    </div>
  );
}

export default App;
