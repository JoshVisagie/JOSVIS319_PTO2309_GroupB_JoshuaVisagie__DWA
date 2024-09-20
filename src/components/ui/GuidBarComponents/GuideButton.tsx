//mui component imports
import Button from "@mui/material/Button";
//redux toolkit imports
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { togglePage } from "../../../state/display/displaySlice";

//component imports
import SearchButton from "./SearchButton";
//styling imports
import currentTheme from "../../../style";

/** Props interface for GuideButton component */
interface GuideButtonProps {
  buttonValue: string;
  buttonLabel: string;
  icon: React.ReactNode;
}

// Destructure theme colors
const {
  primary: primaryColor,
  secondary: secondaryColor,
} = currentTheme;

/**
 * A navigation button used for switching pages in the app.
 *
 * @param {GuideButtonProps} props - Contains the button's value, label, and icon.
 * @returns {JSX.Element} A stylized button for guiding users between pages.
 */
const GuideButton = ({
  buttonValue,
  buttonLabel,
  icon,
}: GuideButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.display.page);

  /** Handle button click to toggle the active page */
  const handleExpand = () => {
    if (currentPage !== buttonValue) {
      dispatch(togglePage(buttonValue));
    }
  };

  /** Conditionally render content based on the button's value */
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
        color: buttonValue === currentPage ? secondaryColor : primaryColor,
        backgroundColor: buttonValue === currentPage ? primaryColor : secondaryColor,
        scale: buttonValue === currentPage ? 1.1 : 0.8,
        margin: buttonValue === currentPage ? "7px" : "5px",
        boxShadow: buttonValue === currentPage ? 2 : 1,
        transition: "all 0.3s ease",
        "&:hover": {
          backgroundColor: primaryColor,
          color: secondaryColor,
          scale: 1.1,
          opacity: 0.8,
          boxShadow: 1,
        },
      }}
    >
      {currentPage === buttonValue ? renderContent() : icon}
    </Button>
  );
};

export default GuideButton;
