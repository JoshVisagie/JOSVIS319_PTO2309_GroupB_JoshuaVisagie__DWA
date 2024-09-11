import * as React from "react";

import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import {Search, Home, Favorite, Settings, Portrait, BlurLinear} from "@mui/icons-material"
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect } from "react";
import currentTheme from "../style";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { togglePage } from "../state/display/displaySlice";

//destructure theme
const {
  primary: primaryColor,
  secondary: secondaryColor,
  background: backgroundColor,
  text: textColor,
} = currentTheme;

const GuideButton = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded(true);
  };

  const handleShrink = () => {
    if (props.currentNav == props.buttonValue) {
      return;
    } else {
      setExpanded(false);
    }
  };

  useEffect(() => {
    handleShrink();
  }, [props.currentNav]);

  return (
    <ToggleButton
      value={props.buttonValue}
      aria-label={props.buttonLabel}
      onMouseEnter={handleExpand}
      onMouseLeave={handleShrink}
      sx={{
        borderRadius: "12px",
        margin: "20px",
        border: "0",
        backgroundColor: primaryColor,
        color: secondaryColor,
        "&.Mui-selected": {
          backgroundColor: secondaryColor,
          color: textColor,
          scale: 1.3,
          boxShadow: 3,


        },
        "&:hover": {
          backgroundColor: primaryColor,
          scale: 1.2,
          opacity: 0.8,
          boxShadow: 1,
        },
      }}
    >
      {expanded ? <div>{props.buttonValue}</div> : props.icon}
    </ToggleButton>
  );
};

export default function GuideBar() {
  const dispatch = useAppDispatch();
  const nav = useAppSelector((state) => state.display.page);
  const handleNav = (event: React.MouseEvent<HTMLElement>, newNav: string) => {
    dispatch(togglePage(newNav));
  };

  return (
    <Box
    sx={{position: "sticky",
      top: 0,
      zIndex:1000,
  backdropFilter: "blur(1px)",
  background: 'linear-gradient(to bottom, rgba(231, 241, 255, 1) 0%,rgba(255,255,255,0) 100%)'

    }}
    >
    <ToggleButtonGroup
      value={nav}
      exclusive
      onChange={handleNav}
      aria-label='navigation'
      sx={{
        display: "flex",
        justifyContent: "center",
        
        
      }}
    >
      <GuideButton buttonValue='home' buttonLabel='home' currentNav={nav} icon = {<Home/>}/>
      <GuideButton buttonValue='liked' buttonLabel='home' currentNav={nav} icon = {<Favorite/>}/>
      <GuideButton buttonValue='search' buttonLabel='home' currentNav={nav} icon = {<Search/>}/>
      <GuideButton buttonValue='user' buttonLabel='home' currentNav={nav} icon = {<Portrait/>}/>
      <GuideButton buttonValue='settings' buttonLabel='home' currentNav={nav} icon = {<Settings/>}/>
    </ToggleButtonGroup>
    </Box>
  );
  
}
