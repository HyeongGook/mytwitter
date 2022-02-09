import { authService } from "fbase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import "routes/authc.css"
import BackGroundVideo from 'main_login.mp4';
import google from "google.png";
import github from "github.png";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value},} = event;
        if(name === "email"){
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();

            if(newAccount) {
                data = await createUserWithEmailAndPassword(auth, email, password);

            } else {
                data = await signInWithEmailAndPassword(auth, email, password);

            }
            console.log(data);
        } catch (error) {
            //console.log(error);
            //setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount(prev => !prev);
  
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
            //const result = await signInWithPopup(authService, provider);
            //const credential = GoogleAuthProvider.credentialFromResult(result);

        } else if (name === "github") {
            provider = new GithubAuthProvider();
            //const result = await signInWithPopup(authService, provider);
            //const credential = GithubAuthProvider.credentialFromResult(result);
        }
        await signInWithPopup(authService, provider);
    }

    return (
        <div>
            <video autoPlay loop muted
                       style={{
                           position: 'absolute',
                           width: '100%',
                           height: '100%',
                           objectFit: "fill",
                           right: "0px",
                           left: "0px",
                           top: "0px",
                       }}>
                    <source src={BackGroundVideo} type="video/mp4"/>
                </video>
            
            <div className="backGroundSet">
                <div className="Login_Container">
                    
                    <div classname="Login_Title">
                        <h1 id="fstyle_title">Every Calendar</h1>
                        <h3 id="fstyle_subtitle">시간을 잘 쓰는 가장 빠른 방법</h3>
                    </div>
                    
                    <div classname="Login_form">
                        <div>
                            <button onClick = {onSocialClick} name="google" classname="googlebutton"></button>
                            <button onClick = {onSocialClick} name="github" classname="githubbutton"></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Auth;