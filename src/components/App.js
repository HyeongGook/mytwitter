import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {getAuth, onAuthStateChanged } from "firebase/auth";
import { dbService } from "fbase";
import { setDoc, doc } from "@firebase/firestore";

function App() {
  const [initialiazed, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const getUserEmail = async (user) => {
    await setDoc(doc(dbService, "users", user.email), {
      email : user.email,
    });
  }
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        getUserEmail(user);
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
