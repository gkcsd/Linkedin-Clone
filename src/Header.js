import React from "react";
import "./Header.css";
import SearchIcon from '@material-ui/icons/Search';
import HeaderOption from "./HeaderOption";
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BusinessCenterIcon from "@material-ui/icons/BusinessCenter";
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications'


const Header = () => {
    return(
        <div className="header">
            <div className="header_left">
                <img src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg" alt="" />

                <div className="header_search">
                    <SearchIcon />
                    <input type="text" placeholder="Search"/>
                </div>
            </div>

            <div className="header_right">
                <HeaderOption Icon={HomeIcon} title="Home" />
                <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
                <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
                <HeaderOption Icon={ChatIcon} title="Messaging" />
                <HeaderOption Icon={NotificationsIcon} title="Notifications" />
                <HeaderOption avatar='https://media-exp3.licdn.com/dms/image/C4D03AQEM2D65fFBo9A/profile-displayphoto-shrink_200_200/0/1624609394813?e=1631750400&v=beta&t=DTMWnIBzq25KUK0ArVeglCULBK3q0eAotxccEvVqxxQ' 
                title="Ganesh Kale"
                />
            </div>
        </div>
    )
}
export default Header;