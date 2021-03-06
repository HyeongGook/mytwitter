import React, { useState } from "react";

import {HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import MyCalendar from "../routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import PlusFriend from "routes/plusFriend";

const AppRouter = ({ isLoggedIn, userObj }) => {
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                        <Route exact path="/">
                            <MyCalendar userObj={userObj} />
                        </Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} />
                        </Route>
                        <Route exact path="/plusFriend">
                            <PlusFriend userObj={userObj} />
                        </Route>
                        <Redirect from="*" to="/" />
                    </> 
                ) : ( 
                    <>
                    <Route exact path="/">
                        <Auth />
                    </Route>
                    <Redirect from="*" to="/" />
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;