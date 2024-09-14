// react imports


// mui imports
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Grid } from "@mui/joy";

// PodInfo component import
import PodInfo from "./PodInfo";

/**
 * Define the props interface for the SinglePod component
 */
interface SinglePodProps {
  podcastTitle: string; // Title of the podcast
  podcastID: string; // Unique identifier for the podcast
  podcastGenres: string[]; // Array of genres the podcast belongs to
  podcastSeasons: number; // Number of seasons in the podcast
  podcastImg: string; // URL of the podcast image
  podcastDate: string; // Date when the podcast was last updated
  podcastDescription: string; // Description of the podcast
  expanded: boolean; // Whether the accordion is expanded
  handleCollapse: (id: string) => void; // Function to handle accordion expand/collapse
}

/**
 * SinglePod component represents each individual podcast within the accordion,
 * displaying its summary, title, and expandable details with PodInfo component.
 */
const SinglePod: React.FC<SinglePodProps> = (props) => {
  const date = new Date(props.podcastDate); // Format the podcast's date.

  return (
    <Accordion
      expanded={props.expanded} // Controls whether the accordion is expanded or collapsed.
      onChange={() => props.handleCollapse(props.podcastID)} // Toggle expanded state when clicked.
      square={false}
      sx={{
        backgroundColor:"#06AEFF",
        borderRadius: "15px",
        margin: "20px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel3-content'
        id='panel3-header'
        className='accordian--singlePod--summary'
      >
        {/* Accordion summary showing the podcast's image, title, and season count */}
        <Grid
          container
          className='accordian--singlePod'
          sx={{
            padding: "8px 16px",
            width: "100%",
            color:"#FFFFFF"
          }}
        >
          <Grid item>
            <img
              className='accordian--logo'
              src={props.podcastImg}
              height='100px'
              alt='Podcast Logo'
            />
          </Grid>
          <Grid xs className='accordian--singlePod--div'>
            <h3>{props.podcastTitle}</h3> {date.toLocaleDateString()}
            <p>
              {props.podcastSeasons}{" "}
              {props.podcastSeasons > 1 ? "Seasons" : "Season"}
            </p>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        {/* Display detailed information of the podcast when expanded */}
        {props.expanded && <PodInfo id={props.podcastID} />}
      </AccordionDetails>
      <AccordionActions>
        {/* Buttons for additional actions, e.g., Cancel and Agree */}
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </AccordionActions>
    </Accordion>
  );
};

export default SinglePod