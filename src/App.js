import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Body/Sidebars/Sidebar';
import Feed from "./components/Body/StorySection/Feed";
import { useSelector, useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import { auth } from './Firebase/firebase';
import Login from "./Login";
import Widgets from './components/Body/WidgetsSection/Widgets';
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.min.css"


const App = () => {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if(userAuth) {
        //user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          dispalyName: userAuth.displayName,
          photoUrl: userAuth.photoURL,
        }))
      }else {
        //user logged out
        dispatch(logout());
      }
    })
  },[dispatch])

  return (
    <div className="app">
      <ToastContainer />
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className="app_body">
          <Sidebar />
          <Feed />
          <Widgets />
        </div>
      )}
    </div>
  );
}

export default App;
