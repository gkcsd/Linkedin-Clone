import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./Firebase/firebase";
import { login } from "./features/userSlice";
import "./Login.css";
import { toast } from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const dispatch = useDispatch();

    const loginToApp = (e) => {
        e.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
        .then(userAuth => {
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                profileUrl: userAuth.user.photoURL,
            }))
            toast(`Welcome, You Successfully Logged In `, {
                type: "success"
            });
        })
        .catch(error => {
            console.log(error)
            toast(error.message, {
                type: 'error'
            })
        }
        );
    }

    const register = () => {
        if(!name) {
            return toast("Please Enter Full Name!", {
                type: "error"
            });
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
                toast(`Welcome, You Successfully Registerd`, {
                    type: "success"
                });
            }
        ).catch(error => {
            console.log(error)
            toast(error.message, {
                type: 'error'
            })
        }
        );
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