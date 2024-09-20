# **Podcastify - README**

# * Project Overview *
Podcast App is a feature-rich platform for podcast enthusiasts to explore, listen to, and manage their favorite podcasts. Users can create a personalized experience by saving favorite episodes, organizing them, and seamlessly resuming playback across devices. The app is designed with responsiveness in mind, ensuring an optimal experience on both desktop and mobile devices.

This app was developed for my final captsone project at CodeSpace for my Software Development Design Course

# * Author *
- Joshua Visagie

# * Deployment *
- Live Site: Pod-Castify 
- Custom URL: Netlify Deployment - https://pod-castify.netlify.app/

# * Technologies Used *
- Framework: React
- State Management: Redux
- Language: TypeScript
- Front End Pack: Vite
- Package Manager: npm
- Design Libraries: Material UI, MUI Joy
- Backend & Database: Supabase

# Design & Planning
-Figma Planning Board : https://www.figma.com/board/5CIHtBhVnmYx9g4pUZg9mf/Podcast-App?node-id=0-1&node-type=canvas&t=X3O0Xzc2GNPBTAh1-0
Website Design Plan: https://www.figma.com/design/PgS94pUvhgm8VPyoIEVwek/Untitled?node-id=1-13&node-type=canvas&t=jRK544pz5CkaFPRc-0

# User Stories

- DONE!

✅- All metatag information has been created and added via https://metatags.io/ (You are welcome to use any free image on https://unsplash.com/). Be mindful to manually replace all URL values (especially image URL) to absolute Netlify URL values (you will need to deploy to Netlify first)

✅- User can "reset" all their progress, effectively removing their listening history
✅-All favicon information has been created an added correctly via https://realfavicongenerator.net/ (you are welcome to use any free PNG image you find on https://www.flaticon.com/)
✅ -All views in the app display correctly on the smallest mobile device available, “iPhone SE”. This can be emulated in Chrome Dev tools.
✅- User can see the name of all available shows on the platform 


✅-App remembers and shows the timestamp progress of any episode the user has started listening to
✅ App remembers which shows and episodes the user listened to all the way through
✅App remembers which show and episode the user listened to last when returning to the platform
✅ App remembers the timestamp where the user stopped listening within a 10-second accuracy period of closing

✅Project is deployed to a custom Netlify URL
✅User is prompted to confirm they want to close the page when audio is playing

✅  User can arrange favourites by show titles from A-Z
✅  User can arrange favourites by show titles from Z-A
✅  User can arrange favourites by date updated in ascending order
✅ User can arrange favourites by date updated in descending order
✅ User sees a human-readable date as to when a show was last updated

✅ All show data loaded via a fetch call from the https://podcast-api.netlify.app/shows
✅ When viewing a specific show, data is loaded via fetch from individual show endpoint
✅ There is a loading state while initial data is being loaded
✅ There is a loading state while new data is being loaded

✅ User can view the details of a show broken down into seasons, sorted by number
✅ User can listen to any episode in a season of a show
✅ User can see a view where only episodes for a specifically selected season are shown
✅ User can toggle between different seasons for the same show

✅ User sees preview image of shows when browsing
✅ User sees the amount of seasons per show as a number when browsing
✅ User sees what genres (as genre titles) a show is associated with when browsing

✅ User sees a preview image of seasons for a specific show
✅ User sees the amount of episodes in a season as a number
✅ User can go back to a show view from a season-specific view

✅ User can mark specific episodes as favourites to find them again
✅ User can visit a view where they see all their favourites
✅ User can see the show and season of any episode in their favourites list
✅ Episodes related by season/show are grouped in favourites
✅ User is able to remove episodes from their favourites

✅ User can arrange the list of shows by title from A-Z
✅ User can arrange the list of shows by title from Z-A
✅ User can arrange the list of shows by date updated in ascending order
✅ User can arrange the list of shows by date updated in descending order
✅ User can filter shows by title through a text input
✅ User can find shows based on fuzzy matching of strings (you can use something like https://fusejs.io/)
✅ Automatically filter shows by genre if the genre label is clicked on

✅ User sees the date and time that an episode was added to their favourites list

✅ Audio player shows current progress and episode length as timestamps
✅ Audio player is always visible, so the user can listen to episodes while they browse

✅ User is presented with a sliding carousel of possible shows they might be interested in on the landing page
✅ User can log in via https://app.supabase.com authentication
✅ User favourites are stored in the https://app.supabase.com database
✅ User favourites are automatically synced when logged in, ensuring that they share favourites between devices

 - To Do 

[x] Users can share their favourites as a publicly accessible URL