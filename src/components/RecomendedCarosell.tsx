import { Box, Button, Carousel, Card,  Image ,PageHeader, } from "grommet";

const CarouselCard=()=>{
return(
    <Box pad={"medium"} direction="row" background={"dark-3"}>
    <Image fit="cover" src="//v2.grommet.io/assets/Wilderpeople_Ricky.jpg" width={"small"}/>
    <PageHeader
    title="Page Title"
    subtitle="A subtitle for the page."
    actions={<Button label="Edit" primary />}
/>
    </Box>
)
}


const RecomendedCarosell=()=>{
return(
    <Box height="small"  overflow="hidden">
            
    <Carousel fill>
    <CarouselCard/>
    <CarouselCard/>

  </Carousel>
  </Box>
)
}

export default RecomendedCarosell