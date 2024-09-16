import GuideBar from "./components/ui/GuidBarComponents/GuideBar";
import RecomendedCarousel from "./components/ui/CarouselComponents/Carousel";
import Content from "./components/content/Content";
import BottomAppBar from "./components/ui/PlayBarComponents/PlayBar";
import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { logIn } from "./state/userData/userDataSlice"; // Actions to update user state

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

function App() {
  const dispatch = useAppDispatch();

  const loggedIn = useAppSelector((state) => state.userData.loggedIn);

  /**
   * An Effect to see if a user has already logged in
   *
   */
  useEffect(() => {
    // Define an async function to handle fetching and dispatching

    const fetchUser = async () => {
      if (!loggedIn) {
        const AlreadyLoggedInUser = await getSupabaseUser();
        // Dispatch if there is a logged-in user
        if (AlreadyLoggedInUser) {
          dispatch(logIn(AlreadyLoggedInUser));
        }
      }
    };
    fetchUser();
  });

  return (
    <div>
      <RecomendedCarousel />
      <GuideBar />
      <Content />
      <BottomAppBar />
    </div>
  );
}

export default App;
