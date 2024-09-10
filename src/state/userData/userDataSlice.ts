import { createSlice } from '@reduxjs/toolkit';

// Define the User interface based on your actual user data structure


// Define the UserState interface

// Initial state for the user slice
const initialState = {
  loggedIn: false,
  user: null,
};

// Create a slice for user data
const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    // Action to log in and set user data
    logIn(state, action) {
      state.user = action.payload; // Sets user data into state
      state.loggedIn = true;
    },
    
    // Action to log out and clear user data
    logOut(state) {
      state.user = null;
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;