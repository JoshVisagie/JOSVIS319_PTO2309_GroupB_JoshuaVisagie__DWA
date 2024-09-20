import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { logIn } from "./state/userData/userDataSlice";
import { fetchUserPodcastData } from "./state/userData/userPodcastDataSlice";
import { setFormattedLiked } from "./state/userData/formattedDataSlice";
import { Box } from "@mui/material";
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

const checkIfUserExists  = async (email) => {
    const { data, error } = await supabase
      .from('user_podcast_data')
      .select('email')
      .eq('email', email)
      .single(); // `single` ensures only one row is returned, or null if not found
  
    if (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
    
    return data ? true : false;
  };

  const createNewUser = async (email) => {
    const { data, error } = await supabase
      .from('user_podcast_data')
      .insert([
        {
          email: email,
          listen_time: [{}], // Empty array for listen times
          liked_podcasts: [], // Empty array for liked episodes
          last_listen: "" // Empty last listen field
        }
      ]);
  
    if (error) {
      console.error('Error creating new user:', error);
      return null;
    }
  
    return data;
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



  useEffect(() => {
    const fetchPodcastDataAndCheckUser = async () => {
      try {
        if (email) {
          // Fetch the user's podcast data if the email is available
          dispatch(fetchUserPodcastData(email));

          // Check if user exists in the Supabase table
          const userExists = await checkIfUserExists(email);

          // Create a new user if not exists
          if (!userExists) {
            const newUser = await createNewUser(email);
            if (!newUser) {
              console.error("Failed to create new user.");
              
              dispatch(fetchUserPodcastData(email))
              return;
            }
          }
        }
      } catch (error) {
        console.error("Error checking or creating user:", error);
      }
    };

    fetchPodcastDataAndCheckUser();
  }, [dispatch, email, loggedIn]);
  
  return <Box sx={{backgroundColor:"#E64A19", display:"flex", justifyContent:"center", color:"#F9F7F7"}}>{email ? "" : "Not Logged In"}</Box>;
}

export default Fetch;
