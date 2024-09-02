
import { useState } from "react";
import Button from '@mui/joy/Button';
import HomeIcon from '@mui/icons-material/Home';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SettingsIcon from '@mui/icons-material/Settings';
import TextField from '@mui/material/TextField';


interface Props{
  title:string|JSX.Element;
  icon: JSX.Element;
}

const Search = ()=>{

  return(
    <div>
        <TextField id="outlined-search" label="Search field" type="search" 
        sx={{
          bgcolor:"#00AEFF",
          
        }}
        />
     </div>
      )
}


const GuideButton : React.FC<Props> = (props) => {
  const [hover, setHover] = useState(false);

  const handleOver = () => {
    setHover(true);
  };
  const handleOut = () => {
    setHover(false);
  };
  return (
    <Button  className="guide--button"
    onMouseOver={handleOver} 
    onMouseOut={handleOut} 
    sx={{
      bgcolor:"#00AEFF",
      margin:"2px",
      fontSize :'3 Rem',
      width : hover ? '150px':'10px'
    }}
    >
      {hover?props.title:props.icon}
    </Button>
  ); 
};

const GuideBar = () => {
  return (
    <div className="guideBar">
      
      <GuideButton title="Home" icon ={<HomeIcon/>}/>
      <GuideButton title="favorites" icon = {<RocketLaunchIcon/>}/>
      <GuideButton title={<Search/>} icon={<SettingsIcon/>}/>
      <GuideButton title="user" icon={<SettingsIcon/>}/>
      <GuideButton title="settings" icon={<SettingsIcon/>}/>
     
    </div>
  );
};

export default GuideBar;
