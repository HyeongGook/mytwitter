import React, { useState, useRef, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from 'react-modal';
import "react-datepicker/dist/react-datepicker.css";
import "routes/home.css"
import { dbService } from "fbase";
import { getDocs, query, deleteDoc, setDoc, updateDoc, collection, doc } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const PlusFriend = ({userObj}) => {
 
  const [myF, setMyF] = useState([]);
  const [listF, setListF] = useState([]);
  const [getEmail, setGetEmail] = useState("");
  const [plusState, setPlusState] = useState("");

  useEffect(() => {getMyFriends(); }, []);

  const getMyFriends = async () => {
    const q = query(collection(dbService, userObj.email + " friends"));
    const dbMyFriends = await getDocs(q);
    dbMyFriends.forEach((doc) => {
      const temp1 = {
        email : doc.data().email,}
      setMyF((prev) => [temp1, ...prev]);
    });
    const m = query(collection(dbService, "users"));
    const dbFriendList = await getDocs(m);
    dbFriendList.forEach((doc) => {
      const temp2 = doc.data().email;
      setListF((prev) => [temp2, ...prev]);
    });
  };

  const onChangeMake = (event) => {
    setGetEmail(event.target.value);
  }

  const checkEmailCorrect = async () => {
    if(listF.includes(getEmail))
    {
      const temp = getEmail;
      setMyF((prev) => [temp, ...prev]);
      await setDoc(doc(dbService, userObj.email + " friends", getEmail), {
        email : getEmail,
      });
      setPlusState("팔로우 완료했습니다.");
    } else if (myF.includes(getEmail)) {
      setPlusState("이미 팔로우 상태입니다.");
    } else {
      setPlusState("올바른 계정이 아닙니다.");
    }
  }

  return (
    <div className="bodystyle">
      <h3>친구 추가</h3>
      <form onSubmit={(event) => {event.preventDefault(); checkEmailCorrect()}}>
        <h2>친구 Email</h2>
        <input type = "text" placeholder='추가할 친구의 e-mail을 입력하세요.' required onChange = {onChangeMake} />
        <input type= "submit" value = "추가" />
      </form>
      <h4>{plusState}</h4>
      <h3>친구 리스트</h3>
      <div>
        {myF.map(data => (<h4>{data.email}</h4>))}
      </div>
    </div>
  )
}

export default PlusFriend; 