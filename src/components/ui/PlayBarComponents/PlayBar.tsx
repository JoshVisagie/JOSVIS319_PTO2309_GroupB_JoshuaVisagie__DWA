import { useTheme } from "@mui/material/styles";
import { Fragment, useRef } from "react";
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
import currentTheme from "../../../style";

export default function BottomAppBar() {
  const playerRef = useRef<ReactPlayer | null>(null);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const media = useAppSelector((state) => state.media);
  const { url, episodeTitle, podcastTitle, playing, podcastImage } = media;

  const handleProgress = (progress: { playedSeconds: number }) => {
    const currentTime = Math.floor(progress.playedSeconds);
    dispatch(setTime(currentTime));
  };

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
            boxShadow:0,
          justifyContent: "space-between",
          padding: "10px", // Add some padding around the components
        }}
      >
        {/* Card with Episode Information */}
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "30%", // Limit the size to 30% of the bottom app bar
            borderRadius: "25px",
            padding: "8px",
            backgroundColor: currentTheme.primary,
            color: currentTheme.secondary,
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          {episodeTitle && <CardMedia
            component='img'
            sx={{ width: 60, height: 60, borderRadius: "12px" }}
            image={podcastImage || "src/assets/images/SCR-20240918-lwpk.png"}
            alt='Episode cover'
          />}
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              overflow: "hidden", // Hide overflow content
              marginLeft: "8px",
              whiteSpace: "nowrap", // Prevent wrapping of text
              textOverflow: "ellipsis", // Use ellipsis for overflow text
            }}
          >
            <Typography
              component='div'
              variant='body1'
              sx={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "elispsis", // Apply ellipsis
                animation: !episodeTitle || episodeTitle.length > 20 ? `scroll 10s linear infinite` : "none",
                "@keyframes scroll": {
                  from: { transform: "translateX(0)" },
                  to: { transform: "translateX(-100%)" },
                },
              }}
            >
              {episodeTitle || "No Episode"}
            </Typography>
            <Typography
              variant='subtitle2'
              component='div'
              sx={{
                color: "text.secondary",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              {podcastTitle || "No Podcast"}
            </Typography>
          </CardContent>
        </Card>

        {/* React Player */}
        {url ? (
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing={playing}
            controls={true} // Show the default ReactPlayer controls
            onProgress={handleProgress}
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
