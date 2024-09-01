import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { fetchPodcasts } from '../state/podcasts/podcastsSlice';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { Description } from '@mui/icons-material';



const SinglePod = (props)=>{


    console.log(props)
    return(
        <Accordion className='accordian--singlePod' square={false}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
          className='accordian--singlePod--summary'
        >
         <div className='accordian--singlePod'> 
            <img src={props.podcastImg} height="100px"/>
            <h3>{props.podcastTitle}</h3>

         </div>
        </AccordionSummary>
        <AccordionDetails>
        {props.podcastDescription}
            
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>

    )
}


const Podcasts = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector(state => state)
   
    useEffect(()=>{
        dispatch(fetchPodcasts())
    },[])
    console.log(data)
    
return(
    <div>
    { data.podcasts.isLoading && <p>loading</p> }   
        { data.podcasts.data.map(podcast =>{ 
        return <SinglePod 
        key={podcast.id}
        podcastTitle= {podcast.title}
        podcastID = {podcast.id}
        podcastGenres={podcast.genres}
        podcastSeasons={podcast.seasons}
        podcastImg ={podcast.image}
        podcastDate = {podcast.updated}
        podcastDescription ={podcast.description}
        />})}
 </div>
)
}   

export default Podcasts