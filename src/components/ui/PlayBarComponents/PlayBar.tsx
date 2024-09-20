import { Fragment, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import {
  setTime,
  setDuration,
  setMedia,
} from "../../../state/mediaPlayer/mediaSlice";
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

interface Episode{
episodeID: string
isDone : boolean
timePlayed : number
}
const checkCurrent = (playerRef, dispatch, listenedState, media) => {
  if (playerRef.current) {
    dispatch(setDuration(playerRef.current.getDuration()));

    if (listenedState) {
      const potentialData = listenedState.find((episode:Episode) => {
        console.log("🚀 ~ potentialData ~ episode:", episode)
        return episode.episodeID === media.id;
      });

      if (potentialData) {
        playerRef.current.seekTo(potentialData.timePlayed, "seconds");
      } else {
        playerRef.current.seekTo(0, "seconds");
      }
    }
  }
};
export default function BottomAppBar() {
  const playerRef = useRef<ReactPlayer | null>(null);

  const dispatch = useAppDispatch();
  const individualPodcast = useAppSelector(
    (state) => state.individualPodcast.data
  );
  const loading = useAppSelector(state=> state.podcasts.isLoading)
  const loggedIn = useAppSelector((state) => state.userData.loggedIn);
  const allPodcasts = useAppSelector((state) => state.podcasts.data);
  const media = useAppSelector((state) => state.media);

  const listenedState = useAppSelector(
    (state) => state.userPodcastData.userPodcastData?.listen_time
  );
  const lastListenState = useAppSelector(
    (state) => state.userPodcastData.userPodcastData?.last_listen
  );
  const {
    url,
    episodeTitle,
    podcastTitle,
    playing,
    id,
    timePlaying,
    duration,
  } = media;
  const email = useAppSelector((state) => state.userData.user?.email);
  const [isDone, setIsDone] = useState(false);
  const [oldMediaHasLoaded, setOldMediaHasLoaded] = useState(false);

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
    console.log("started");
  };

  useEffect(() => {
    checkCurrent(playerRef, dispatch, listenedState, media);
  }, [media.playing, media.id]);

  const handleEnd = () => {
    setIsDone(true);
  };

  useEffect(() => {
    const LoadPrevMedia = () => {
      if (!media.id && allPodcasts && !loading) {
        const episodeID = lastListenState?.episodeID;
        if (episodeID) {
          const splitData = episodeID.split("-");
          const lastListenPodID = splitData?.at(0);
          const seasonNum = splitData?.at(1);
          const episodeNum = splitData?.at(2);
          const selectedPod = allPodcasts.find(
            (podcast) => podcast.id == lastListenPodID
          );

          if (splitData && lastListenPodID) {
            //@ts-expect-error expected
            dispatch(fetchIndivdualPodcast(lastListenPodID));

            if (individualPodcast) {
              //@ts-expect-error it works
              const selectedSeason = individualPodcast.seasons[seasonNum - 1];

              if (selectedSeason) {
                //@ts-expect-error it works
                const selectedEpisode = selectedSeason.episodes[episodeNum - 1];

                const setMediaAction = {
                  id: lastListenState.episodeID,
                  url: selectedEpisode.file,
                  episodeTitle: selectedEpisode.title,
                  podcastTitle: selectedPod?.title,
                  podcastID: lastListenPodID,
                  podcastImage: selectedPod?.image,
                };
                dispatch(setMedia(setMediaAction));
                console.log(
                  "🚀 ~ LoadPrevMedia ~ media:",
                  lastListenState.timePlayed
                );
              }
            }
          }
        }
      }
    };
    LoadPrevMedia();
  });

  const handleReady = () => {
    if (!oldMediaHasLoaded && playerRef.current) {
      playerRef.current?.seekTo(lastListenState.timePlayed, "seconds");

      setOldMediaHasLoaded(true);
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Fragment>
      <CssBaseline />
      {loggedIn && (
        <AppBar
          position='fixed'
          color='primary'
          sx={{
            background:
              "linear-gradient(to top, rgba(231, 241, 255, 1) 0%,rgba(255,255,255,0) 100%)",
            backdropFilter: "blur(1px)",
            top: "auto",
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 0,
            justifyContent: "space-between",
            padding: "10px", // Add some padding around the components
          }}
        >
          <Box sx={{ width: "100%", display: "flex", flexDirection: "row" }}>
            {/* React Player */}
            
              <Box
                sx={{
                  backgroundColor: currentTheme.primary,
                  width: "60px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                {media.podcastImage && (
                  <img
                    src={media.podcastImage}
                    style={{
                      objectFit: "contain",
                      width: "100%",
                      height: "100%",
                    }}
                    alt='Podcast'
                  />
                )}
              </Box>
           
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
                style={{ flexGrow: 1 }}
                onReady={handleReady}
              />
            ) : (
              <Typography
                variant='h6'
                sx={{ color: currentTheme.primary, padding: 2, width: "100%" }}
              >
                No episode selected
              </Typography>
            )}
            {width > 500 && (
            <Box
              sx={{
                backgroundColor: currentTheme.primary,
                width: "60px",
                borderRadius: "50%",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            ></Box>)}
          </Box>

          <CurrentPlayingBadge
            episodeTitle={episodeTitle}
            podcastTitle={podcastTitle}
          />
        </AppBar>
      )}
    </Fragment>
  );
}
