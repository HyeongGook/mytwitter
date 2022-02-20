import React, { useState, useRef, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "routes/home.css"
import { dbService } from "fbase";
import { getDocs, query, deleteDoc, setDoc, updateDoc, collection, doc } from "@firebase/firestore";

const EveryCalendar = ( {userObj} ) => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [events,setEvents] = useState([]);
  const [myF, setMyF] = useState([]);

  useEffect(() => {getMyFriends(); }, []);

  const getMyFriends = async () => {
    const q = query(collection(dbService, userObj.email + " friends"));
    const dbMyFriends = await getDocs(q);
    dbMyFriends.forEach((doc) => {
      const temp1 = {
        email : doc.data().email,}
      setMyF((prev) => [temp1, ...prev]);
    });
  }

  const getEvents = async (email) => {
    setEvents([]);
    const q = query(collection(dbService, email + " event"));
    const dbEvents = await getDocs(q);
    dbEvents.forEach((doc) => {
      const temp = {
        id : doc.data().id,
        title : doc.data().title,
        start : doc.data().start.toDate(),
        end : doc.data().end.toDate(),
        dcId : doc.id
      }
      setEvents((prev) => [temp, ...prev]);
    });
  };
  
  function FriendButton({ email }) {
    return (
      <form onSubmit={(event) => {event.preventDefault();
        getEvents(email)}}>
          <input type= "submit" value = {email}/>
      </form>
    );
  }

  return (
    <div className="bodystyle">
      <div>
        {myF.map(data => (
          <FriendButton email = {data.email} /> ))}
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        style={{height: 500 }}
        className="calMargin"
        selectable
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}

export default EveryCalendar; 