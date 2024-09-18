import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../reduxHooks";
import { fetchUserPodcastData } from "../../../state/userData/userPodcastDataSlice";
import { selectLikedPodcast } from "../../../state/userData/userPodcastDataSlice";

const LikedContent = () => {
  const dispatch = useAppDispatch();

  // Fetch the user data from the Redux store
  const likedEpisodes = useAppSelector(selectLikedPodcast);
  const email = useAppSelector((state) => state.userData.user?.email);
  const allPods = useAppSelector((state) => state.podcasts.data); // All podcasts data
  
  interface Liked {
    episodeID: string;
    podcastID: string;
    season: string;
    episode: string;
    likedAt: string;
  }
  
  interface GroupedByPodcast {
    [podcastID: string]: Liked[];
  }

  // Function to group liked podcasts by their podcastID
  const groupLikedByPodcast = (likedPodcasts: Liked[]): GroupedByPodcast => {
    return likedPodcasts.reduce((acc: GroupedByPodcast, likedPodcast: Liked) => {
      const { podcastID } = likedPodcast;

      // If the podcast doesn't exist in the accumulator, create it
      if (!acc[podcastID]) {
        acc[podcastID] = [];
      }

      // Add the liked podcast to the correct podcast ID
      acc[podcastID].push(likedPodcast);

      return acc;
    }, {}); // Initial value is an empty object
  };

  // Group liked episodes by podcastID
  const groupedByPodcast = groupLikedByPodcast(likedEpisodes);

  return (
    <div>
      <h1>Liked Podcasts</h1>
      {Object.entries(groupedByPodcast).map(([podcastID, likedPodcasts]) => {
        // Find the corresponding podcast in the allPods array by podcastID
        const matchingPodcast = allPods.find((podcast) => podcast.id === podcastID);

        // If the podcast is not found, we skip rendering this group
        if (!matchingPodcast) return null;

        return (
          <div key={podcastID} className="podcast-card">
            <h2>{matchingPodcast.title}</h2>
            <p>Description: {matchingPodcast.description}</p>
            <h3>Liked Episodes:</h3>
            <ul>
              {likedPodcasts.map((episode) => (
                <li key={episode.episodeID}>
                  Season {episode.season}, Episode {episode.episode} - Liked on {episode.likedAt}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default LikedContent;
