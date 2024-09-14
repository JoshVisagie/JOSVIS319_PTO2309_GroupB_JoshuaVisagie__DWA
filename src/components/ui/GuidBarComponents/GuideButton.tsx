import Button from "@mui/material/Button";
import currentTheme from "../../../style";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { togglePage } from "../../../state/display/displaySlice";
import SearchButton from "../../content/search/SearchButton";

// Destructure theme colors
const {
  primary: primaryColor,
  secondary: secondaryColor,
  text: textColor,
} = currentTheme;

const GuideButton = ({ buttonValue, buttonLabel, icon }) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.display.page);

  const handleExpand = () => {
    if (currentPage !== buttonValue) {
      dispatch(togglePage(buttonValue));
    }
  };

  const renderContent = () => {
    switch (buttonValue) {
      case "search":
        return <SearchButton />;
      default:
        return <div>{buttonValue}</div>;
    }
  };

  return (
    <Button
      value={buttonValue}
      aria-label={buttonLabel}
      onClick={handleExpand}
      sx={{
        borderRadius: "15px",
        backgroundColor: primaryColor,
        color: secondaryColor,
        "&.Mui-selected": {
          backgroundColor: secondaryColor,
          color: textColor,
          scale: 1.3,
          boxShadow: 3,
          transition: "all 0.3s ease",
        },
        "&:hover": {
          backgroundColor: primaryColor,
          scale: 1.1,
          opacity: 0.9,
          boxShadow: 1,
          transition: "all 0.3s ease",
        },
      }}
    >
      {currentPage === buttonValue ? renderContent() : icon}
    </Button>
  );
};

export default GuideButton;
