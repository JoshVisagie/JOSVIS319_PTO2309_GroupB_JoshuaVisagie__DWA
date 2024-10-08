// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../reduxHooks"; // Assuming you have these hooks set up
// import { fetchUserPodcastData } from "../state/userData/userPodcastDataSlice";
// import { selectLikedPodcast } from "../state/userData/userPodcastDataSlice";
// const MyPodcastComponent = () => {
//   const dispatch = useAppDispatch();

//   // Fetch the user data from the Redux store
//   const userData = useAppSelector((state) => state.userPodcastData);
//   const email = useAppSelector((state) => state.userData.user?.email);
//   // Call the fetchUserData thunk when the component is mounted
//   useEffect(() => {
//     // Dispatch fetchUserData action here
//     console.log("Dispatching fetchUserData");
//     dispatch(fetchUserPodcastData(email));
//   }, [dispatch]);

//   // Render your component based on the state
//   if (userData.loading) {
//     return <p>Loading...</p>;
//   }

//   if (userData.error) {
//     return <p>Error loading user data: {userData.error}</p>;
//   }
//   const likedEpisodes = useAppSelector(selectLikedPodcast);

//   const likedDataAsString = userData.userPodcastData? JSON.stringify(userData.userPodcastData.likedPodcast) : [{}]
    
  
//   return (
//     <div>
//       <h1>Podcast Data</h1>
//       {/* Render the podcast data */}
//       {userData.userPodcastData && (
//         <ul>
//           <li>Last Listened: {userData.userPodcastData.last_listen}</li>
//           <li>Liked Podcasts: {likedDataAsString}</li>
//           {/* Render other data as needed */}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MyPodcastComponent;
