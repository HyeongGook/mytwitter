import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import {getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [initialiazed, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);
  
  return (
    <>
      {initialiazed ? <AppRouter isLoggedIn = {isLoggedIn} userObj={userObj} /> : "Initializing..." }
      <footer>&copy; Nwitter {new Date().getFullYear()} </footer>
    </>
  )}

export default App;
