import { useTheme } from "@mui/material/styles";
import { Fragment, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import {
  setTime,
  setDuration,
  setMedia,
} from "../../../state/mediaPlayer/mediaSlice"; // Action to set progress time
import ReactPlayer from "react-player";
import currentTheme from "../../../style";
import { useEffect } from "react";
import { fetchIndivdualPodcast } from "../../../state/podcasts/individualPodcastSlice";
import {
  updateLastListenedPodcast,
  updateListenTime,
  fetchUserPodcastData,
} from "../../../state/userData/userPodcastDataSlice";
import { ListenData } from "../../../state/userData/userPodcastDataSlice";

import CurrentPlayingBadge from "./CurrrentPlayingBadge";
import userDataSlice from "../../../state/userData/userDataSlice";

export default function BottomAppBar() {
  const playerRef = useRef<ReactPlayer | null>(null);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const individualPodcast = useAppSelector(
    (state) => state.individualPodcast.data
  );
  const allPodcasts = useAppSelector((state) => state.podcasts.data);
  const media = useAppSelector((state) => state.media);
  const userPodcastDataLoaded= useAppSelector((state) => state.userPodcastData.loading)
  const listenedState = useAppSelector(
    (state) => state.userPodcastData.userPodcastData?.listen_time
  );
  const lastListenState = useAppSelector(
    (state) => state.userPodcastData.userPodcastData?.last_listen
  );
  console.log("🚀 ~ BottomAppBar ~ listenedState:", listenedState);
  const {
    url,
    episodeTitle,
    podcastTitle,
    playing,
    podcastImage,
    id,
    podcastID,
    timePlaying,
    duration,
  } = media;
  const email = useAppSelector((state) => state.userData.user?.email);
  const [isDone, setIsDone] = useState(false);

  /**
   * this function handles all pushing the media metadata to Database
   * @param data
   * @returns
   */
  const updateListnedToData = (data: ListenData) => {
    if (listenedState) {
      const potentialData = listenedState.find((episode) => {
        return episode.episodeID === data.episodeID;
      });

      const store = [...listenedState];

      if (potentialData) {
        store[listenedState.indexOf(potentialData)] = data;
      } else {
        store.push(data);
      }

      return store;
    }
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (timePlaying < duration) {
      setIsDone(false);
    }

    const currentTime = Math.floor(progress.playedSeconds);
    dispatch(setTime(currentTime));

    const data: ListenData = {
      episodeID: id,
      timePlayed: timePlaying,
      isDone: isDone,
    };

    dispatch(
      updateLastListenedPodcast({ userEmail: email, last_listen: data })
    );

    const dataToUpdate = updateListnedToData(data);
    dispatch(updateListenTime({ userEmail: email, listen_time: dataToUpdate }));
    dispatch(fetchUserPodcastData(email));
  };

  useEffect(() => {
    const onBeforeUnload = (ev: Event) => {
      if (playing) {
        ev.preventDefault();
      }
      ev.returnValue = media.playing;

      return media.playing;
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  const handlePlay = () => {
    if (playerRef.current) {
      dispatch(setDuration(playerRef.current.getDuration()));

      if (listenedState) {
        const potentialData = listenedState.find((episode) => {
          console.log("🚀 ~ potentialData ~ episode.episodeID === media.id:", episode.episodeID === media.id)
          return episode.episodeID === media.id;
        });

        if (potentialData) {
          playerRef.current.seekTo(potentialData.timePlayed, "seconds");
        } else {
          playerRef.current.seekTo(0, "seconds");
        }
      }
    }

    console.log("started");
  };

  useEffect(() => {
   
  }, [media.id])
  
  const handleEnd = () => {
    setIsDone(true);
  };

  useEffect(() => {
   
   
    if (!media.id){
    const episodeID = lastListenState?.episodeID
    if(episodeID){

    const splitData = episodeID.split("-");
    console.log("🚀 ~ useEffect ~ split:", splitData)

    const lastListenPodID = splitData?.at(0);
    console.log("🚀 ~ useEffect ~ lastListenPodID:", lastListenPodID)
    
    const seasonNum = splitData?.at(1);
    console.log("🚀 ~ useEffect ~ seasonNum:", seasonNum)

    const episodeNum= splitData?.at(2);
    console.log("🚀 ~ useEffect ~ episodeNum:", episodeNum)

    const selectedPod = allPodcasts.find(podcast=> podcast.id ==lastListenPodID)
    console.log("🚀 ~ useEffect ~ selectedPod:", selectedPod)

    if (splitData && lastListenPodID) {
      dispatch(fetchIndivdualPodcast(lastListenPodID));
      
      if (individualPodcast) {
        const selectedSeason = individualPodcast.seasons[seasonNum - 1];
        console.log("🚀 ~ useEffect ~ selectedSeason:", selectedSeason)
        
        if (selectedSeason) {
          const selectedEpisode = selectedSeason.episodes[episodeNum - 1];
          console.log("🚀 ~ useEffect ~ selectedEpisode:", selectedEpisode)

         const setMediaAction = {
            id:lastListenState.episodeID,
            url: selectedEpisode.file,
            episodeTitle: selectedEpisode.title,
            podcastTitle: selectedPod?.title,
            podcastID: lastListenPodID,
            podcastImage: selectedPod?.image,
           
        }
         console.log("🚀 ~ useEffect ~ setMediaAction:", setMediaAction)
       
        dispatch(setMedia(setMediaAction))

        }
      }
    }}
      console.log("🚀 ~ useEffect ~ media:", media)}
  });
    console.log("🚀 ~ AfteruseEffect ~ lastListenState:", lastListenState)

  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position='fixed'
        color='primary'
        sx={{
          backgroundColor: "rgba(0,0,0,0)",
          top: "auto",
          bottom: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          boxShadow: 0,
          justifyContent: "space-between",
          padding: "10px", // Add some padding around the components
        }}
      >
        {/* Card with Episode Information */}
        <CurrentPlayingBadge
          episodeTitle={episodeTitle}
          podcastImage={podcastImage}
          podcastTitle={podcastTitle}
        />
        {/* React Player */}
        {url ? (
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing={playing}
            controls={true} // Show the default ReactPlayer controls
            onProgress={handleProgress}
            onPlay={handlePlay}
            onEnded={handleEnd}
            height='60px'
            width='65%' // Adjust the player width
            style={{ marginLeft: "10px", flexGrow: 1 }}
          />
        ) : (
          <Typography variant='body1' sx={{ padding: 2 }}>
            No episode selected
          </Typography>
        )}
      </AppBar>
    </Fragment>
  );
}
