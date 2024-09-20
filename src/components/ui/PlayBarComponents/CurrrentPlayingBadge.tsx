import { Fragment } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import currentTheme from "../../../style";

interface PropsType{
  episodeTitle:string
  podcastTitle:string
}

 const CurrentPlayingBadge=(props:PropsType) =>{
  
 const {episodeTitle, podcastTitle } =props

 
  return (
    <Fragment>
      <CssBaseline />
      
        {/* Card with Episode Information */}
        <Card
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"space-around",
            width: "100%", // Limit the size to 30% of the bottom app bar
            height:40,
            borderRadius: "25px",
            padding: "8px",
            backgroundColor: currentTheme.primary,
            color: currentTheme.secondary,
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          
      
            <Typography
              component='div'
              variant='body1'
              sx={{
                whiteSpace: "nowrap",
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
        </Card>

       
    </Fragment>
  );
}
export default CurrentPlayingBadge