import { Box, Button } from "grommet";
import { HomeRounded, Deploy } from "grommet-icons";
import { useState } from "react";

const NavButton = (props) => {
  const [hover, setHover] = useState(false);

  const handleOver = () => {
    setHover(true);
  };
  const handleOut = () => {
    setHover(false);
  };
  return (
    <Button primary 
    label={hover && props.title} 
    icon={!hover && props.icon}
    onMouseOver={handleOver} 
    onMouseOut={handleOut} 
    
    />
  );
};

const GuideBar = () => {
  return (
    <Box align='center' direction='row' justify='center' >
      <NavButton title="Home" icon = {<HomeRounded/>}/>
      <NavButton title="explore" icon = {<Deploy/>}/>
      <NavButton title="Home" icon = {<HomeRounded/>}/>
      
    </Box>
  );
};

export default GuideBar;
