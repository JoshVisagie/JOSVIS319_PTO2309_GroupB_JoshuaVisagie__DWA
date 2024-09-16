import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../reduxHooks'; // Assuming you have these hooks set up
import { fetchUserData } from '../state/userData/userDataPodcasts';

const MyPodcastComponent = () => {
  const dispatch = useAppDispatch();

  // Fetch the user data from the Redux store
  const userData = useAppSelector((state) => state.podcastUserData);
    const email = useAppSelector((state)=>state.userData.user?.email)
  // Call the fetchUserData thunk when the component is mounted
  useEffect(() => {
    // Dispatch fetchUserData action here
    console.log("Dispatching fetchUserData");
    dispatch(fetchUserData(email)); 
  }, [dispatch]);

  // Render your component based on the state
  if (userData.loading) {
    return <p>Loading...</p>;
  }

  if (userData.error) {
    return <p>Error loading user data: {userData.error}</p>;
  }

  return (
    <div>
      <h1>Podcast Data</h1>
      {/* Render the podcast data */}
      {userData.userData && (
        <ul>
          <li>Last Listened: {userData.userData.last_listen}</li>
          <li>Liked Podcasts: {userData.userData.liked.join(', ')}</li>
          {/* Render other data as needed */}
        </ul>
      )}
    </div>
  );
};

export default MyPodcastComponent;