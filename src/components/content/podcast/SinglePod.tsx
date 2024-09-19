import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Typography } from "@mui/material";
import currentTheme from "../../../style";
import PodInfo from "./PodInfo";

interface SinglePodProps {
  podcastTitle: string;
  podcastID: string;
  podcastGenres: number[];
  podcastSeasons: number;
  podcastImg: string;
  podcastDate: string;
  podcastDescription: string;
  expanded: boolean;
  handleCollapse: (id: string) => void;
}

const SinglePod: React.FC<SinglePodProps> = (props) => {
  const date = new Date(props.podcastDate);

  return (
    <Accordion
      expanded={props.expanded}
      onChange={() => props.handleCollapse(props.podcastID)}
      square={false}
      sx={{
        backgroundColor: currentTheme.secondary,
        borderRadius: "15px",
        boxShadow: 5,
        margin: "20px",
        maxWidth: "100%",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel3-content'
        id='panel3-header'
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: "40%", sm: "25%" },
            padding: "8px",
          }}
        >
          <img
            src={props.podcastImg}
            alt='Podcast Logo'
            style={{ width: "100%", height: "auto", borderRadius: "8px",  maxWidth:"100px"}}
          />
        </Box>

        {/* Content Section */}
        <Box
          sx={{
            flex: 1,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Title */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 1,
              whiteSpace: "wrap",
              
              animation: props.podcastTitle && props.podcastTitle.length > 20 ? `scroll 10s linear infinite` : "none",
              "@keyframes scroll": {
                from: { transform: "translateX(0)" },
                to: { transform: "translateX(-100%)" },
              },
              fontSize: { xs: "1.2rem", sm: "1.5rem" },
            }}
          >
            {props.podcastTitle}
          </Typography>

          {/* Last Updated Date */}
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            Last Updated: {date.toLocaleDateString()}
          </Typography>

          {/* Seasons */}
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              fontSize: { xs: "0.9rem", sm: "1rem" },
            }}
          >
            {props.podcastSeasons} {props.podcastSeasons > 1 ? "Seasons" : "Season"}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {props.expanded && <PodInfo id={props.podcastID} />}
      </AccordionDetails>
    </Accordion>
  );
};

export default SinglePod;
