import React, { useState, useRef } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from 'react-modal';
import DatePicker from "react-datepicker";

const MyCalendar = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [makeModal, setMakeModal] = useState(false);
  const [changeModal, setChangeModal] = useState(false);
  const [name, setName] = useState("");
  const [events,setEvents] = useState([]);
 
  const [dayS,setDayS] = useState(0);
  const [monS,setMonS] = useState(0);
  const [yearS, setYearS] = useState(0);
  const [dayE,setDayE] = useState(0);
  const [monE,setMonE] = useState(0);
  const [yearE, setYearE] = useState(0);

  const [start, setStart] = useState(true);
  const [makeMode, setMake] = useState(false);
  const [tempId, setTempId] = useState(0);
  const nextId = useRef(0);

  const addSchedule = (yearS, monthS, dayS, yearE, monthE, dayE) => {
    const sch = {
      id: nextId.current,
      title: name,
      start: new Date(yearS, monthS, dayS),
      end: new Date(yearE, monthE, dayE),
      allday: true,
    };
    console.log(sch.start);
    
    setEvents(events.concat(sch));
    setMakeModal(false);
    nextId.current += 1;
}

const deleteSchedule = () => {
  setEvents(events.filter(sch => sch.id !== tempId));
  setChangeModal(false);
}

const changeScheduleName = () => {
  setEvents(events.map(sch => sch.id === tempId ? { ...sch, title: name } : sch));
};

const changeScheduleDate = () => {
  setEvents(events.map(sch => sch.id === tempId ? { ...sch, title: name } : sch));
};

const onChangeMake = (event) => {
  setName(event.target.value);
}
  
  return (
    <div>
      <h1 id="fstyle_title">Every Calendar</h1>
      <form>
        <input 
        type='radio' 
        name="radio" 
        checked
        onClick={() => setMake(false)} /> 일정 확인모드 
        <input 
        type='radio' 
        name="radio"
        onClick={() => setMake(true)} /> 일정 추가모드
      </form>
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 500 }}
        selectable
        onSelectSlot= {(e) => {
          if(makeMode)
          {
            if(start)
            {
              setDayS(e.start.getDate());
              setMonS(e.start.getMonth());
              setYearS(e.start.getUTCFullYear());
              setStart(false);
              console.log(e.start.getDate());
            } else {
              setDayE(e.start.getDate());
              setMonE(e.start.getMonth());
              setYearE(e.start.getUTCFullYear());
              setStart(true);
              setMakeModal(true);
            }
          }
        }}
        onSelectEvent= {(e) => {
          setTempId(e.id);
          setChangeModal(true);
          console.log(tempId);
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
            height : 800,
            width : 500,
            left : 1100,
          }
        }}
        isOpen = {makeModal}
        onRequestClose ={() => setMakeModal(false)}
      >
        <form onSubmit={(event) => {event.preventDefault();
        addSchedule(yearS,monS,dayS, yearE, monE, dayE+1)}}>
          <h1>{yearS}-{monS}-{dayS} ~ {yearE}-{monE}-{dayE} 일정 등록</h1> 
          <input type = "text" placeholder='약속 이름을 입력하세요.' required onChange = {onChangeMake} />
          <input type= "submit" value = "일정추가" />
      </form>
      </Modal>
      <Modal
        style = {{
          overlay : {
            backgroundColor : "rgba(0,0,0,0.3)",
            zIndex : 4,
          },
          const : {
            height : 800,
            width : 500,
            left : 1100,
          }
        }}
        isOpen = {changeModal}
        onRequestClose ={() => setChangeModal(false)}
      >
        <h1>수정</h1>
        <form onSubmit={(event) => {event.preventDefault();
        changeScheduleName()}}>
          <h2>일정 이름</h2>
          <input type = "text" placeholder='수정할 약속 이름을 입력하세요.' required onChange = {onChangeMake} />
          <input type= "submit" value = "일정 이름수정" />
        </form>
        <form onSubmit={(event) => {event.preventDefault();
        changeScheduleDate()}}>
          <h2>일정 이름</h2>
          <input type = "text" placeholder='수정할 약속 이름을 입력하세요.' required onChange = {onChangeMake} />
          <input type= "submit" value = "일정 이름수정" />
        </form>
        <form onSubmit={(event) => {event.preventDefault();
        deleteSchedule(tempId)}}>
          <h1>삭제</h1> 
          <input type= "submit" value = "일정 삭제" />
        </form>
      </Modal>
    </div>
  )
}


export default MyCalendar; 