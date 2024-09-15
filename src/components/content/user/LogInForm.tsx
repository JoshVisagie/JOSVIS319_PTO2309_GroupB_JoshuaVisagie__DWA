//React imports
import React, { useState, useEffect } from "react";
//MUI imports
import { Box, Button, TextField, Typography, Container } from "@mui/material";
//Redux Imports
import { useAppDispatch } from "../../../reduxHooks"; // Hook to dispatch actions
import { logIn, logOut } from "../../../state/userData/userDataSlice"; // Actions to update user state
import { useAppSelector } from "../../../reduxHooks";
//User Type import 
import { User as UserType } from "../../../state/userData/userDataSlice";
// imports the supabase client to avoid constant rerendering 
import { supabase } from "../../../supabaseClient";
//interface of AuthFormProps
interface AuthFormProps{
  isSignUp?: boolean; // Determines if the form is for sign-up or login
};



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

/**
 * A component allowing users to Log In | Sign Up | Sign out
 *
 * 
 * @returns {JSX.Element} A stylized button for guiding users between pages.
 */
const AuthForm: React.FC<AuthFormProps> = () => {
  const dispatch = useAppDispatch();
  //state to manage what Text fields display and wh
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //State to manage 
  const [isSignUp, setIsSignUp] = useState(false);

  const user: UserType|null = useAppSelector((state) => state.userData.user);
  const loggedIn = useAppSelector((state) => state.userData.loggedIn);

  /**
 * An Effect to see if a user has already logged in 
 * 
 */
  useEffect(() => {
    // Define an async function to handle fetching and dispatching
    
    const fetchUser = async () => {
      if(!loggedIn){
        
      const AlreadyLoggedInUser = await getSupabaseUser();
      // Dispatch if there is a logged-in user
      if (AlreadyLoggedInUser) {
        dispatch(logIn(AlreadyLoggedInUser));
      }
    };
  }
    fetchUser();
  }, );

  /**
 * A navigation button used for switching pages in the app.s
 *
 * @param {React.FormEvent} event The form submission event
 * 
 * @returns {void} 
 */
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      //if the isSign up state is true, handle signing up
      if (isSignUp) {
        // Sign Up
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        // retrieves that email and password state and calls the supabase sign up function
        //destructures any errors 
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        //alerts users to any errors
        if (error) {
          alert(error.message);
          return;
        }
        //If there are no errors, alerts user of success and prompts them to check their email
        alert("Sign-up successful! Please verify your email.");
      } else {
        // Handle Login if !isSignUp
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        dispatch(logIn(data.user)); // Dispatch login action with the user data
      }
    } catch (error) {
      console.error("Error handling submission:", error);
    }
  };
 /**
 * Handle isSignUp state, allowing users to toggle between signing up and loggin in
 * @returns {void} 
 */
  const handleSignInToggle = () => {
    setIsSignUp((currentSignUpState) => !currentSignUpState);
  };
/**
 * Handle sign out button 
 * @returns {void} 
 */
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch(logOut());
    console.log(error);
  };
  return (
    <div>
      {" "}
      {!loggedIn && (
        <Container maxWidth='xs'>
          <Box
            component='form'
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: 4,
            }}
            onSubmit={handleSubmit}
          >
            <Typography variant='h5' component='h1' textAlign='center'>
              {isSignUp ? "Sign Up" : "Log In"}
            </Typography>

            <TextField
              label='Email'
              type='email'
              variant='outlined'
              required
              fullWidth
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <TextField
              label='Password'
              type='password'
              variant='outlined'
              required
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {isSignUp && (
              <TextField
                label='Confirm Password'
                type='password'
                variant='outlined'
                required
                fullWidth
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            )}

            <Button type='submit' variant='contained' fullWidth>
              {isSignUp ? "Sign Up" : "Log In"}
            </Button>
          </Box>
          <Button onClick={handleSignInToggle}>{isSignUp?"Return to Sign In ":"Create Account"}</Button>
        </Container>
      )}

      {loggedIn && <div>
        <h3>Welcome {user?.email}</h3>
      <Button onClick={handleSignOut}>Sign Out</Button>
      </div>}
    </div>
  );
};

export default AuthForm;
