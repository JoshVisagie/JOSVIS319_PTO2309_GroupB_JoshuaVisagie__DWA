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


  return <div>{email ? "" : "notLoggedin"}</div>;
}

export default Fetch;
