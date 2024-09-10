import React, { useState } from "react";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import { useAppDispatch } from "../reduxHooks"; // Hook to dispatch actions
import { logIn, logOut } from "../state/userData/userDataSlice"; // Actions to update user state
import { useAppSelector } from "../reduxHooks";
type AuthFormProps = {
  isSignUp?: boolean; // Determines if the form is for sign-up or login
};

// Initialize Supabase client
const supabase = createClient(
  "https://erabqfmktwgyazauewro.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyYWJxZm1rdHdneWF6YXVld3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU4MTMxOTEsImV4cCI6MjA0MTM4OTE5MX0.H-oeI-ULMFiMZDy72X0BYKhCThxFZnY25wgaPBST5Jk"
);

const AuthForm: React.FC<AuthFormProps> = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const user = useAppSelector((state) => state.userData.user);
  const loggedIn = useAppSelector((state) => state.userData.loggedIn);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (isSignUp) {
        // Sign Up
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }
        const {
          data: { user },
        } = await supabase.auth.getUser();

        dispatch(logIn(user)); // Dispatch login action with the user data
        alert("Sign-up successful! Please verify your email.");
      } else {
        // Log In
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          alert(error.message);
          return;
        }

        dispatch(logIn(data.user)); // Dispatch login action with the user data
        alert("Log in successful!");
      }
    } catch (error) {
      console.error("Error handling submission:", error);
    }
  };

  const handleSignInToggle = () => {
    setIsSignUp((currentSignUpState) => !currentSignUpState);
  };

   const  handleSignOut=async()=>{
     
    const { error } = await supabase.auth.signOut()
    dispatch(logOut())
    console.log(error)
    

  }
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
          <Button onClick={handleSignInToggle}>Create Account</Button>
        </Container>
      )}
      {loggedIn && <Button onClick={handleSignOut}>Sign Out</Button>}
    </div>
  );
};

export default AuthForm;
