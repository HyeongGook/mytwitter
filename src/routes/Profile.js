import { authService } from "fbase";
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

const MyCalendar = ( {userObj} ) => {
    moment.locale('ko-KR');
    const localizer = momentLocalizer(moment);
    const [makeModal, setMakeModal] = useState(false);
    const [changeModal, setChangeModal] = useState(false);
    const [name, setName] = useState("");
    const [events,setEvents] = useState([]);
    const [idR,setIdR] = useState(0);
  
    const [startDate, setStartDate] = useState(new Date(0, 0, 0));
    const [endDate, setEndDate] = useState(new Date(0, 0, 0));
  
    const [start, setStart] = useState(true);
    const [tempId, setTempId] = useState(0);
  
    useEffect(() => {getEvents(); }, []);
    const onLogOutClick = () => authService.signOut();

    const getEvents = async () => {
      const q = query(collection(dbService, userObj.email + " event"));
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
        console.log(events);
      });
    };
  
    const addSchedule = async () => {
      const sch = {
        id: idR,
        title: name,
        start: startDate,
        end: new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate() + 1),
        allday: true,
      };
      setEvents(events.concat(sch));
      await setDoc(doc(dbService, userObj.email + " event", idR.toString()), {
        id : sch.id,
        title : sch.title,
        start : sch.start,
        end: sch.end,
      });
      setMakeModal(false);
    }
  
  const deleteSchedule = async () => {
    setEvents(events.filter(sch => sch.id !== tempId));
    await deleteDoc(doc(dbService, userObj.email + " event", tempId.toString()));
    setChangeModal(false);
  }
  
  const changeScheduleName = async () => {
    setEvents(events.map(sch => sch.id === tempId ? { ...sch, title: name } : sch));
    updateDoc(doc(dbService, userObj.email + " event", tempId.toString()), {
      name : name,
    });
    setChangeModal(false);
  };
  
  const changeScheduleDate = async () => {
    setEvents(events.map(sch => sch.id === tempId ? { ...sch, start: startDate } : sch));
    setEvents(events.map(sch => sch.id === tempId ? { ...sch, end: new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate() + 1) } : sch));
    updateDoc(doc(dbService, userObj.email + " event", tempId.toString()), {
      start: startDate,
      end: new Date(endDate.getFullYear(),endDate.getMonth(),endDate.getDate() + 1),
    });
    setChangeModal(false);
  };
  
  const onChangeMake = (event) => {
    setName(event.target.value);
  }
    
    return (
      <div className="bodystyle">
        <Calendar
          localizer={localizer}
          events={events}
          style={{height: 500 }}
          className="calMargin"
          selectable
          onSelectSlot= {(e) => {
            if(start)
            {
            setStartDate(e.start);
            setStart(false);
            } else {
            setEndDate(e.start);
            setIdR(Math.floor(Math.random() * 100000000));
            setStart(true);
            setMakeModal(true);
            }
          }}
          onSelectEvent= {(e) => {
            setTempId(e.id);
            setStartDate(e.start);
            setEndDate(new Date(e.end.getFullYear(),e.end.getMonth(),e.end.getDate() - 1));
            setChangeModal(true);
          }}
          startAccessor="start"
          endAccessor="end"
        />
        <Modal
          style = {{
            overlay : {
              backgroundColor : "rgba(0,0,0,0.3)",
              zIndex : 4,
            },
            const : {
              height : 100,
              width : 500,
              left : 110,
            }
          }}
          isOpen = {makeModal}
          ariaHideApp={false}
          onRequestClose ={() => setMakeModal(false)}
        >
          <form onSubmit={(event) => {event.preventDefault();
          addSchedule()}}>
            <h1>일정 등록</h1> 
            <h2>{startDate.getFullYear()}.{startDate.getMonth()+1}.{startDate.getDate()} ~ {endDate.getFullYear()}.{endDate.getMonth()+1}.{endDate.getDate()} 동안의 약속을 추가합니다.</h2>
            <input type = "text" placeholder='약속 이름을 입력하세요.' required onChange = {onChangeMake} />
            <input type= "submit" value = "추가" />
        </form>
        </Modal>
        <Modal
          style = {{
            overlay : {
              backgroundColor : "rgba(0,0,0,0.3)",
              zIndex : 4,
            },
            const : {
              height : 600,
              width : 500,
              left : 1100,
            }
          }}
          ariaHideApp={false}
          isOpen = {changeModal}
          onRequestClose ={() => setChangeModal(false)}
        >
          <h1>수정</h1>
          <form onSubmit={(event) => {event.preventDefault();
          changeScheduleName()}}>
            <h2>일정 이름</h2>
            <input type = "text" placeholder='수정할 약속 이름을 입력하세요.' required onChange = {onChangeMake} />
            <input type= "submit" value = "수정" />
          </form>
          <form onSubmit={(event) => {event.preventDefault();
          changeScheduleDate()}}>
            <h2>일정 날짜</h2>
            <DatePicker
              selected={startDate}
              onChange={(date) => {setStartDate(date)}}
              dateFormat="yyyy/MM/dd"
              >
            </DatePicker>
            <DatePicker
              selected={endDate}
              onChange={(date) => {setEndDate(date)}}
              dateFormat="yyyy/MM/dd"
              >
            </DatePicker>
            <input type= "submit" value = "수정" />
          </form>
          <form onSubmit={(event) => {event.preventDefault();
          deleteSchedule(tempId)}}>
            <h1>삭제</h1> 
            <input type= "submit" value = "삭제" />
          </form>
        </Modal>
        <div>
            <button onClick={onLogOutClick}>Log Out</button>
        </div>
      </div>
    )
  }

  export default MyCalendar; 