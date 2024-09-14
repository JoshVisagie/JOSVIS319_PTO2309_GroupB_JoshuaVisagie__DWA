//mui imports
import { Box } from "@mui/material";
import { Search, Home, Favorite, Settings, Portrait } from "@mui/icons-material";
//component imports
import GuideButton from "./GuideButton";

/**
 * A guide bar for navigating between different sections of the app.
 *
 * @component
 * @returns {JSX.Element} The guide bar containing navigation buttons.
 */
export default function GuideBar(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(1px)",
        background:
          "linear-gradient(to bottom, rgba(231, 241, 255, 1) 0%,rgba(255,255,255,0) 100%)",
      }}
    >
      <GuideButton buttonValue="home" buttonLabel="Home" icon={<Home />} />
      <GuideButton buttonValue="liked" buttonLabel="Liked" icon={<Favorite />} />
      <GuideButton buttonValue="search" buttonLabel="Search" icon={<Search />} />
      <GuideButton buttonValue="user" buttonLabel="User" icon={<Portrait />} />
      <GuideButton buttonValue="settings" buttonLabel="Settings" icon={<Settings />} />
    </Box>
  );
}
