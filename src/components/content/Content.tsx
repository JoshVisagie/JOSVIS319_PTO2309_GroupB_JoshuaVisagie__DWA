import PodcastList from "./podcast/PodcastList";
import LogInForm from "./user/LogInForm";
import SearchContent from "./search/SearchContent";
import { useAppSelector } from "../../reduxHooks";
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
