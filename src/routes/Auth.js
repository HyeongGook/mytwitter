import { authService } from "fbase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import "routes/authc.css"
import BackGroundVideo from 'main_login.mp4';
import Modal from 'react-modal';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const [login, setLogin] = useState(false);
    const [create, setCreate] = useState(false);
    
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
        } catch (error) {
            console.log(error);
        }
    }

    const toggleAccount = () => setNewAccount(prev => !prev);
    
    const onSocialClick = async (event) => {
        const {target:{name}} = event;
        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();

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
                    <h1 id="fstyle_title">Every Calendar</h1>
                    <h3 id="fstyle_subtitle">시간을 잘 쓰는 가장 빠른 방법</h3>
                    
                    <div>
                        <button onClick = {onSocialClick}  name="google" className="googleBt"></button>
                        <button onClick = {onSocialClick} name="github" className="githubBt"></button>
                        <button onClick = {() => {setLogin(true); setNewAccount(false)}} className="emailBt"></button>
                    </div>
                    <button onClick = {() => {setCreate(true); setNewAccount(true)}} id ="fstyle_subtitle" className="createBt" >새로 시작하기</button>
                </div>
            </div>
            <Modal
                style = {{
                    overlay : {
                        position: "fixed",
                        top: 300,
                        left: 700,
                        right: 700,
                        bottom: 300,
                        backgroundColor : "rgba(0,0,0,0.3)",
                        zIndex : 4,
                    },
                    const : {
                        //position: "absolute",
                        //top : '10px',
                        //left : '10px',
                        //right: '10px',
                        //bottom: '10px',
                        //border: "10px solid #ccc",
                        //overflow: "auto",
                    }
                    }}
                ariaHideApp={false}
                isOpen = {login}
                onRequestClose ={() => setLogin(false)}
            >
                <button onClick ={() => setLogin(false)} >"X"</button>
                <form onSubmit={onSubmit}>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email"
                        required 
                        value={email}
                        onChange={onChange}
                    />
                    <input
                        name="password"
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password}
                        onChange={onChange}                   
                    />
                    <input type="submit" value= "Log In" />
                </form>
            </Modal>
            <Modal
                style = {{
                    overlay : {
                        position: "fixed",
                        top: 300,
                        left: 700,
                        right: 700,
                        bottom: 300,
                        backgroundColor : "rgba(0,0,0,0.3)",
                        zIndex : 4,
                    },
                    const : {
                        position: "absolute",
                        top : '10px',
                        left : '10px',
                        right: '10px',
                        bottom: '10px',
                        border: "10px solid #ccc",
                        overflow: "auto",
                    }
                    }}
                ariaHideApp={false}
                isOpen = {create}
                onRequestClose ={() => setCreate(false)}
            >
                <form onSubmit={onSubmit}>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="Email"
                        required 
                        value={email}
                        onChange={onChange}
                    />
                    <input
                        name="password"
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password}
                        onChange={onChange}                   
                    />
                    <input type="submit" value="Create Account" />
                </form>
            </Modal>
        </div>
    );
};
export default Auth;