
//redux imports
import { useAppSelector } from "../../reduxHooks";
//component imports
import PodcastList from "./podcast/PodcastList";
import LogInForm from "./user/LogInForm";
import SearchContent from "./search/SearchContent";

/**
 * A component for handling what will be shown on the page depending on what the state is
 *
 * @component
 * @returns {JSX.Element} Content that will be displayed depending on what the display state is
 */
const Content = () => {
  const nav = useAppSelector((state) => state.display.page);

  return (
    <div>
      {nav == "user" && <LogInForm />}
      {nav == "home" && <PodcastList />}
      {nav == "search" && <SearchContent />}
    </div>
  );
};

export default Content;
