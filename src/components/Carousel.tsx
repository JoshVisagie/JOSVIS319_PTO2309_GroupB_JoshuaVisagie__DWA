import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import { Card } from "@mui/material";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const CarouselCard = () =>{
    return(
        <Card>
            <Card >
      <CardMedia
        sx={{ height: 140 }}
        image="https://www.billboard.com/wp-content/uploads/media/tyler-the-creator-igor-album-art-2019-billboard-embed.jpg?w=600"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
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
        <div>
            <CarouselCard/>
        </div>
        <div>
        <CarouselCard/>

        </div>
        <div>
        <CarouselCard/>

        </div>
    </Carousel>

    )

}

export default RecomendedCarousel