import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { logIn } from "./state/userData/userDataSlice";
import { fetchUserPodcastData } from "./state/userData/userPodcastDataSlice";
import { setFormattedLiked } from "./state/userData/formattedDataSlice";

/**
 * A function for retrieving the user from Supabase Auth
 *
 * @returns {UserType | null} returns a User Object or null if no one is logged In.
 */
const getSupabaseUser = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

function Fetch() {
  const dispatch = useAppDispatch();
  const loggedIn = useAppSelector((state) => state.userData.loggedIn);
  const email = useAppSelector((state) => state.userData.user?.email);
  const userPodcastData = useAppSelector(
    (state) => state.userPodcastData.userPodcastData
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!loggedIn) {
          const AlreadyLoggedInUser = await getSupabaseUser();
          if (AlreadyLoggedInUser) {
            dispatch(logIn(AlreadyLoggedInUser));
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();

    if (email) {
      try {
        dispatch(fetchUserPodcastData(email));
      } catch (error) {
        console.error("Error fetching podcast data:", error);
      }
    }
  }, [dispatch, loggedIn, email]);

  const splitLikedData = (likedPodcasts: string[]) => {
    return (
      likedPodcasts?.map((podcast) => {
        if (podcast) {
          // Check that the podcast string is not null/undefined
          const chunks = podcast.split(/[-#]/g);
          const timeAsInt = parseInt(chunks[3]);
          const date = new Date(timeAsInt).toLocaleDateString();
  
          return {
            podcastID: chunks[0],
            season: chunks[1],
            episode: chunks[2],
            date: date,
            episodeID: podcast,
          };
        }
        console.warn('Invalid podcast data encountered:', podcast);
        return null; // Return null for invalid data
      }).filter(Boolean) // Filter out null entries
    );
  };
  
  useEffect(() => {
    if (userPodcastData?.liked && Array.isArray(userPodcastData.liked)) {
      console.log('help', userPodcastData.liked);
  
      const likedDataObj = splitLikedData(userPodcastData.liked);
      console.log(likedDataObj);
  
      const groupedLikedPodcasts = likedDataObj.reduce((acc, episode) => {
        if (!acc[episode.podcastID]) {
          acc[episode.podcastID] = [];
        }
        acc[episode.podcastID].push(episode);
        return acc;
      }, {} as Record<string, Episode[]>);
  
      dispatch(setFormattedLiked(groupedLikedPodcasts));
    } else {
      console.warn('No liked podcasts found or liked data is not an array.');
    }
  }, [userPodcastData, dispatch]);
  

  return <div>{email ? "" : "notLoggedin"}</div>;
}

export default Fetch;
