//carousel component import
import "react-responsive-carousel/lib/styles/carousel.min.css";
//mui import
import { Card } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//redux toolkit imports
import { useAppSelector } from "../../../reduxHooks";
//react imports
import { useEffect, useState } from "react";

import PodcastDetailsModal from "../../PodcastModal";
/**
 * CarouselCard component displays a random podcast's image and title.
 *
 * @component
 * @returns {JSX.Element} A card component that displays a podcast's image and title.
 */

const CarouselCard = (props: { cardColor: string }): JSX.Element => {
  /** Podcast data from the Redux store */
  const podcasts = useAppSelector((state) => state.podcasts.data);

  /** Randomly selected podcast index */
  const [randomPod, setRandomPod] = useState<number | null>(null);

  /** Set a random podcast index when podcasts are available */
  useEffect(() => {
    if (podcasts.length > 0) {
      const randomIndex = Math.floor(podcasts.length * Math.random());
      setRandomPod(randomIndex);
    }
  }, [podcasts]);

  /** Currently selected podcast */
  const currentPodcast = podcasts[randomPod ?? 0];

  /** Image URL and title of the selected podcast */
  const imageUrl = currentPodcast?.image ?? "";
  const title = currentPodcast?.title ?? "Unknown Title";
  const id = currentPodcast?.id?? ""
  const [modalOpen, setModalOpen] = useState(false);


  const handleClick=()=>{
    setModalOpen(currentState=>!currentState);
  }
  const handleClose = () => {
    console.log("closed")
    setModalOpen(currentState=>!currentState);
    console.log(modalOpen)
  };
  useEffect(() => {
    console.log("Modal open state changed:", modalOpen);
  }, [modalOpen]);
  return (
    <Card
    onClick = {handleClick}
      sx={{
        position: "relative",
        width: "100%",
        height: "200px",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      <Box
         

        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          backgroundColor: props.cardColor,
        }}
      ></Box>

      {/* Foreground image and podcast title */}
      <Box
        sx={{
          position: "relative",
          height: "20%",
          width: "100%",
          zIndex: 2,
        }}
      >
        <Box sx={{ backgroundColor: "#FFFFFF", boxShadow: 4 }}>
          <img
            src={imageUrl}
            alt='foreground'
            style={{
              maxHeight: "140px",
              padding: "10px",
              maxWidth: "140px",
              borderRadius: "22px",
            }}
          />
        </Box>
        <Typography
          variant='h4'
          sx={{
            color: "white",
            fontWeight: "bold",
            overflowY: "scroll",
            fontSize: { xs: "1.5rem", sm: "2rem" },

          }}
        >
          {title}
        </Typography>
      </Box>
     {modalOpen && <PodcastDetailsModal
      podcastID={id}
      open={modalOpen}
      onClose={handleClick}
      podcastTitle={title}
      />}
    </Card>
  );
};

export default CarouselCard;
