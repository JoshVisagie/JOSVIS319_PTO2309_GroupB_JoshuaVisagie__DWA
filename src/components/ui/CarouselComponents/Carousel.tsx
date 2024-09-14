import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";


import CarouselCard from "./CarouselCard";


const RecomendedCarousel = () => {
  return (
    <Carousel emulateTouch={true} infiniteLoop={true} showThumbs={false}>
      <CarouselCard />
      <CarouselCard />
      <CarouselCard />
      <CarouselCard />
      <CarouselCard />
      <CarouselCard />
    </Carousel>
  );
};

export default RecomendedCarousel;
