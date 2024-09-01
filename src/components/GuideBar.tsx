
import { useState } from "react";
import Button from '@mui/joy/Button';
import HomeIcon from '@mui/icons-material/Home';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SettingsIcon from '@mui/icons-material/Settings';


interface Props{
  title:string;
  icon: JSX.Element;
}



const NavButton : React.FC<Props> = (props) => {
  const [hover, setHover] = useState(false);

  const handleOver = () => {
    setHover(true);
  };
  const handleOut = () => {
    setHover(false);
  };
  return (
    <Button  
    onMouseOver={handleOver} 
    onMouseOut={handleOut} 
    
    >
      {hover?props.title:props.icon}
    </Button>
  ); 
};

const GuideBar = () => {
  return (
    <div>
      <Button></Button>
      <NavButton title="Home" icon ={<HomeIcon/>}/>
      <NavButton title="explore" icon = {<RocketLaunchIcon/>}/>
      <NavButton title="settings" icon={<SettingsIcon/>}/>
      
    </div>
  );
};

export default GuideBar;
