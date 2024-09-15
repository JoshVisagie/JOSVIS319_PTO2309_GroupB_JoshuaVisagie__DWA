//carousel component import
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

//component import
import CarouselCard from "./CarouselCard";

/**
 * A carousel that shows random podcasts to the user
 * @component
 * @returns {JSX.Element} a carousel component that displays CarouselCards
 */
const RecomendedCarousel = () => {
  return (
    <Carousel emulateTouch={true} infiniteLoop={true} showThumbs={false} width={"100%"}>
      <CarouselCard cardColor="#D3302F"/>
      <CarouselCard cardColor="#9D27B0" />
      <CarouselCard cardColor="#2E7E32" />
      <CarouselCard cardColor="#D3302F"/>
      <CarouselCard cardColor="#0688D1"/>
      <CarouselCard cardColor="#9D27B0"/>
    </Carousel>
  );
};

export default RecomendedCarousel;
