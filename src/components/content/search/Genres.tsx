import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';
import {School, Gavel, HistoryEdu, TheaterComedy, MovieFilter, Work, RocketLaunch, Newspaper, FamilyRestroom, Scale} from '@mui/icons-material/';



const GenreFab=(props)=>{
   const [isSelected, setIsSelected]= useState(false)

    const handleClick=()=>{
        setIsSelected(currentSelect=>!currentSelect)
        console.log(props.value)
    }
    return(
        <Tooltip title={props.label}>
        <Fab
        color={props.color}
        onClick={handleClick}
        sx={{
          boxShadow: isSelected ? 4 : 0,
          transform: isSelected ? 'scale(1.3)' : 'scale(0.8)',
          transition: 'all 0.3s ease',
        }}
        >
            {props.icon}
        </Fab>
        </Tooltip>
    )
}

export default function Genres() {
  return (
    <Box sx={{ 
        display:"flex",
        justifyContent:"space-evenly",
        padding:2
    }}>
      <GenreFab
      value='1'
      label='Personal Growth'
      color="error"
      icon={<School/>}
      />

    <GenreFab
      value='2'
      label='True Crime and Investigative Journalism'
      color="info"
      icon={<Gavel/>}
      />

    <GenreFab
      value='3'
      label='History'
      color="secondary"
      icon={<HistoryEdu/>}
      />

    <GenreFab
      value='4'
      label='Comedy'
      color="success"
      icon={<TheaterComedy/>}
      />

    <GenreFab
      value='5'
      label='Entertainment'
      color="primary"
      icon={<MovieFilter/>}
      />

    <GenreFab
      value='6'
      label='Business'
      color= 'error'
      icon={<Work/>}
      />
    <GenreFab
      value='7'
      label='Fiction'
      color="info"
      icon={<RocketLaunch/>}
      />
      <GenreFab
      value='8'
      label='News'
      color="secondary"
      icon={<Newspaper/>}
      />
      <GenreFab
      value='9'
      label='Kids and Family'
      color="success"
      icon={<FamilyRestroom/>}
      />
    </Box>
  );
}