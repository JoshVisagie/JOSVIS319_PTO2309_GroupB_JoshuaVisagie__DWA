import { createSlice } from '@reduxjs/toolkit';

//User interface
interface User {
  id: string;
  aud: string;
  role: string;
  email: string;
  email_confirmed_at: string;
  phone: string;
  confirmation_sent_at: string;
  confirmed_at: string;
  last_sign_in_at: string;
  created_at: string;
  updated_at: string;
  is_anonymous: boolean;
  app_metadata?: object;
  user_metadata?: object;
  identities?: object[];
}

// UserState interface
interface UserState {
  loggedIn: boolean;
  user: User | null;
}
// Initial state for the user slice
const initialState : UserState= {
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
      state.user= action.payload; 
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