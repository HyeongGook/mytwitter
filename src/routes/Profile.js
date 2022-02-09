import { authService } from "fbase";
import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";

export default () => {
    const onLogOutClick = () => authService.signOut();
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};