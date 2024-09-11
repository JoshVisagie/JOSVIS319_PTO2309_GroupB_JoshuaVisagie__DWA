import PodcastList from "./content/podcast/PodcastList";
import LogInForm from   "./content/user/LogInForm"
import { useAppSelector } from "../reduxHooks";
const Content=()=>{
    const nav = useAppSelector((state) => state.display.page);

    return(
        <div>
       {nav=="user" &&<LogInForm/>}
       {nav=="home" &&<PodcastList/>}
       </div>
    )
}

export default Content