import { useTheme } from "@mui/material/styles";
import { Fragment } from "react/jsx-runtime";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";

import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";

import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { playPause, setTime } from "../../../state/mediaPlayer/mediaSlice"; // Action to toggle play/pause state

import ReactPlayer from "react-player";

import { useRef , useEffect, useState} from "react";


export default function BottomAppBar() {
  const playerRef = useRef<ReactPlayer | null>(null);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.media);
  const { id, url, episodeTitle, podcastTitle, playing, timePlaying, podcastImage } = media;
  

  const handlePlayPause = () => {
    dispatch(playPause(!playing)); // Toggle play/pause state in the Redux store
  };

  const handleProgress=( progress: { playedSeconds: number })=>{
    const currentTime = Math.floor(progress.playedSeconds)
    dispatch(setTime(currentTime)) ;
      
  }



  return (
    <Fragment>
      <CssBaseline />
      <AppBar position='fixed' color='primary' sx={{ top: "auto", bottom: 0 }}>
        <Card sx={{ 
            display: "flex",
            height:"100px" ,
            alignItems: "center", 
            justifyContent: "space-around" }}>
          
          {url ? (
            <ReactPlayer
              url={url}
              playing={playing} 
              controls={false} 
              onProgress={handleProgress}
              height="0px"
              width="0px"
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
            image={podcastImage}
            alt='Episode cover'
          />
        
          <Box sx={{ display: "flex", flexDirection: "row", flex: 1, alignItems: "center" }}>
            <CardContent sx={{
                maxWidth:"300px",
                flex: "1 0 auto" }}>
              <Typography component='div' variant='h5'>
                {episodeTitle || "No Episode"}
              </Typography>
              <Typography
                variant='subtitle1'
                component='div'
                sx={{ color: "text.secondary" }}
              >
                {podcastTitle || "No Podcast"}
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <IconButton aria-label='previous'>
                {theme.direction === "rtl" ? (
                  <SkipNextIcon />
                ) : (
                  <SkipPreviousIcon />
                )}
              </IconButton>
              <IconButton aria-label='play/pause' onClick={handlePlayPause}>
                {playing ? (
                  <PauseIcon sx={{ height: 38, width: 38 }} />
                ) : (
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                )}
              </IconButton>
              <IconButton aria-label='next'>
                {theme.direction === "rtl" ? (
                  <SkipPreviousIcon />
                ) : (
                  <SkipNextIcon />
                )}
              </IconButton>
              <h3>{timePlaying}</h3>
            </Box>
          </Box>
        </Card>
      </AppBar>
    </Fragment>
  );
}
