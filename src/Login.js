import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { login } from "./features/userSlice";
import "./Login.css";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();
    }

    const register = () => {
        if(!name) {
            return alert("Please Enter Full Name!");
        }

        auth.createUserWithEmailAndPassword(email, password)
        .then(
            (userAuth) => {
                userAuth.user.updateProfile({
                    displayName: name,
                    photoURL: profilePic,
                })
                .then(() => {
                    dispatch(login({
                        email: userAuth.user.email,
                        uid: userAuth.user.uid,
                        displayName: name,
                        photoUrl: profilePic,
                    }))
                })
            }
        ).catch(error => alert(error));
    }

    return(
        <div className="login">
            <img
                src="https://news.hitb.org/sites/default/files/styles/large/public//field/image/500px-LinkedIn_Logo.svg__1.png?itok=q_lR0Vks"
                alt=""
            />
            <form>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full name ( required if registering)" />
                <input type="text" value={profilePic} onChange={e => setProfilePic(e.target.value)} placeholder="Profile pic URL ( optional )" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <button type="submit" onClick={loginToApp} >Sign In</button>
            </form>
            <p>Not a member ? <span className="login_register" onClick={register}>Register Now</span></p>
        </div>
    )
}
export default Login;