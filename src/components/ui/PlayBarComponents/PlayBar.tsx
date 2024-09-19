import { useTheme } from "@mui/material/styles";
import { Fragment } from "react/jsx-runtime";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { setTime } from "../../../state/mediaPlayer/mediaSlice"; // Action to set progress time

import ReactPlayer from "react-player";
import { useRef } from "react";

export default function BottomAppBar() {
  const playerRef = useRef<ReactPlayer | null>(null);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.media);
  const { url, episodeTitle, podcastTitle, playing, timePlaying, podcastImage } = media;

  const handleProgress = (progress: { playedSeconds: number }) => {
    const currentTime = Math.floor(progress.playedSeconds);
    dispatch(setTime(currentTime));
  };

  return (
    <Fragment>
      <CssBaseline />
      
      
      <AppBar position='fixed' color='primary' sx={{ top: "auto", bottom: 0 }}>
        <Card
          sx={{
            display: "flex",
            height: "100px",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
            <Box sx={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "center" }}>
            <CardContent
              sx={{
                maxWidth: "300px",
                flex: "1 0 auto",
              }}
            >
              <Typography component='div' variant='p'>
                {episodeTitle || "No Episode"}
              </Typography>
              <Typography variant='subtitle1' component='div' sx={{ color: "text.secondary" }}>
                {podcastTitle || "No Podcast"}
              </Typography>
            </CardContent>
           
          </Box>
          {url ? (
            <ReactPlayer
              ref={playerRef}
              url={url}
              playing={playing}
              controls={true} // Show the default ReactPlayer controls
              onProgress={handleProgress}
              height="50px"
              width="100%" // Make sure it takes up the available space
              style={{ marginLeft: "16px" }}
            />
          ) : (
            <Typography variant='body1' sx={{ padding: 2 }}>
              No episode selected
            </Typography>
          )}

          <CardMedia
            component='img'
            sx={{ width: "100px", height: "100px", padding: 1 }}
            image={media.podcastImage?podcastImage: "src/assets/images/SCR-20240918-lwpk.png"}
            alt='Episode cover'
          />

          
        </Card>
      </AppBar>
    </Fragment>
  );
}
