import { authService } from "fbase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword,
GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";

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
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Log In" : "Create Account"} 
            </span>
            <div>
                <button onClick = {onSocialClick} name="google">Continue with Google</button>
               <button onClick = {onSocialClick} name="github">Continue with Github</button>
            </div>
        </div>
    );
};
export default Auth;