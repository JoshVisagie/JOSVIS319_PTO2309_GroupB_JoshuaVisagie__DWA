import * as React from "react";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState , useEffect} from "react";

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
    handleShrink()
    }
  , [props.currentNav])
  

  return (
    <ToggleButton
      value={props.buttonValue}
      aria-label={props.buttonLabel}
      onMouseEnter={handleExpand}
      onMouseLeave={handleShrink}
      sx={{
        borderRadius:"12px",
        margin:"20px",
        border:"0"
      }}
    >
      {expanded ? <div>{props.buttonValue}</div> : <FormatAlignJustifyIcon />}
    </ToggleButton>
  );
};

export default function GuideBar() {
  const [nav, setNav] = React.useState<string | null>("home");

  const handleNav = (
    event: React.MouseEvent<HTMLElement>,
    newNav: string | null
  ) => {
    console.log(newNav);
    setNav(newNav);
  };

  return (
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
      <GuideButton buttonValue='home' buttonLabel='home' currentNav={nav} />
      <GuideButton buttonValue='liked' buttonLabel='home' currentNav={nav} />
      <GuideButton buttonValue='search' buttonLabel='home' currentNav={nav} />
      <GuideButton buttonValue='settings' buttonLabel='home' currentNav={nav} />
      <GuideButton buttonValue='user' buttonLabel='home' currentNav={nav} />
    </ToggleButtonGroup>
  );
}
