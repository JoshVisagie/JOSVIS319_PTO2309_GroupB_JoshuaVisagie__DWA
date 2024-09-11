import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Card } from "@mui/material";
import Typography from '@mui/material/Typography';

import Box from '@mui/material/Box';

import { useAppSelector } from "../reduxHooks";
import { useEffect , useState} from "react";
import { WidthNormal } from "@mui/icons-material";
 

const CarouselCard = () =>{
  
  const podcasts = useAppSelector((state) => state.podcasts.data);
  const [randomPod, setRandomPod] = useState<number | null>(null);

  useEffect(() => {
    if (podcasts.length > 0) {
      const randomIndex = Math.floor(podcasts.length * Math.random());
      setRandomPod(randomIndex);
    }
  }, [podcasts]);

  const currentPodcast = podcasts[randomPod ?? 0]; 

  const imageUrl = currentPodcast?.image ?? '';
  const title = currentPodcast?.title ?? 'Unknown Title';

        

    return(
        
      <Card
      sx={{
        position: 'relative',
        width: '100%',
        height:'200px',
        cursor: 'pointer',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          filter: 'blur(50px)',
          zIndex: 1,
        }}
      >
        <img
          src={imageUrl}
          alt="background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'relative',
          height: '20%',
          width: '100%',
          zIndex: 2,
        }}
      >
        <img
          src={imageUrl}
          alt="foreground"
          style={{
            maxHeight:"140px",
            padding: "10px",
            maxWidth: "140px",
            borderRadius:"22px",
            
          }}
        />
         <Typography variant="h4"
         sx={{
          color:"white",
          fontWeight:"bold",
          overflowy:"scroll",

         }}
         >{title}</Typography>
      </Box>
      
    </Card>
        

)
}

const RecomendedCarousel=()=>{

    return(
        <Carousel
        emulateTouch={true}
        infiniteLoop={true}
        showThumbs={false}
        >
        <CarouselCard/>
        <CarouselCard/>
        <CarouselCard/>
        <CarouselCard/>
        <CarouselCard/>
        <CarouselCard/>

    </Carousel>

    )

}

export default RecomendedCarousel