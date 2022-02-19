import { authService } from "fbase";
import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "routes/home.css"

export default () => {
    const onLogOutClick = () => authService.signOut();
    return (
        <div className="bodystyle">
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
    );
};