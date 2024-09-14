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


/**
 * CarouselCard component displays a random podcast's image and title.
 *
 * @component
 * @returns {JSX.Element} A card component that displays a podcast's image and title.
 */
const CarouselCard = (): JSX.Element => {
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

  return (
    <Card
      sx={{
        position: "relative",
        width: "100%",
        height: "200px",
        cursor: "pointer",
        overflow: "hidden",
        borderRadius: 2,
      }}
    >
      {/* Blurred background image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          filter: "blur(50px)",
          zIndex: 1,
        }}
      >
        <img
          src={imageUrl}
          alt="background"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Foreground image and podcast title */}
      <Box
        sx={{
          position: "relative",
          height: "20%",
          width: "100%",
          zIndex: 2,
        }}
      >
        <img
          src={imageUrl}
          alt="foreground"
          style={{
            maxHeight: "140px",
            padding: "10px",
            maxWidth: "140px",
            borderRadius: "22px",
          }}
        />
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: "bold",
            overflowY: "scroll",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Card>
  );
};

export default CarouselCard;
