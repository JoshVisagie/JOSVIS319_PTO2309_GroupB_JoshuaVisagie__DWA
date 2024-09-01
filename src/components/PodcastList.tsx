import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { fetchPodcasts } from "../state/podcasts/podcastsSlice";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Description } from "@mui/icons-material";

interface Props{
            key: string
            podcastTitle:string
            podcastID:string
            podcastGenres: [number]
            podcastSeasons:number
            podcastImg:string
            podcastDate:string
            podcastDescription:string
}

const SinglePod : React.FC<Props>= (props) => {
  const date = new Date(props.podcastDate);

  return (
    <Accordion
      
      square={false}
      sx={{
        borderRadius: "50px",
        margin: "20px",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel3-content'
        id='panel3-header'
        className='accordian--singlePod--summary'
      >
        <div className='accordian--singlePod'>
          <img src={props.podcastImg} height='100px' />
          
          <div className='accordian--singlePod--div'>
            <h3>{props.podcastTitle}</h3>
            <p> {date.toLocaleDateString()}</p>
            <p> {props.podcastSeasons} {props.podcastSeasons>1?"Seasons":"Season"}</p>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>{props.podcastDescription}</AccordionDetails>
      <AccordionActions>
        <Button>Cancel</Button>
        <Button>Agree</Button>
      </AccordionActions>
    </Accordion>
  );
};

const Podcasts : React.FC= () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state);

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, []);
  console.log(data);

  return (
    <div>
      {data.podcasts.isLoading && <p>loading</p>}
      {data.podcasts.data.map((podcast) => {
        return (
          <SinglePod
            key={podcast.id}
            podcastTitle={podcast.title}
            podcastID={podcast.id}
            podcastGenres={podcast.genres}
            podcastSeasons={podcast.seasons}
            podcastImg={podcast.image}
            podcastDate={podcast.updated}
            podcastDescription={podcast.description}
          />
        );
      })}
    </div>
  );
};

export default Podcasts;
