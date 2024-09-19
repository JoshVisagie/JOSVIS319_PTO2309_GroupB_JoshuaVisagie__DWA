import { Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import currentTheme from "../../../style";


 const CurrentPlayingBadge=(props) =>{
 const {episodeTitle, podcastImage, podcastTitle } =props
  return (
    <Fragment>
      <CssBaseline />
      
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
              whiteSpace: "wrap", // Prevent wrapping of text
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

       
    </Fragment>
  );
}
export default CurrentPlayingBadge