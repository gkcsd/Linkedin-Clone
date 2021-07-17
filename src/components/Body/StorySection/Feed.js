import React, {useEffect, useState} from "react";
import "./Feed.css";
import CreateIcon from "@material-ui/icons/Create";
import InputOption from "../StorySection/InputOption";
import ImageIcon from "@material-ui/icons/Image"
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import EventNoteIcon from "@material-ui/icons/EventNote"
import CalendarViewDayIcon from "@material-ui/icons/CalendarViewDay"
import Post from "../StorySection/Post";
import { db } from "../../../Firebase/firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../../../features/userSlice";
import FlipMove from "react-flip-move";

const Feed = () => {

    const user = useSelector(selectUser);

    const [inputValue, setInputValue] = useState("");
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection("posts").orderBy('timestamp', 'desc').onSnapshot(snapshot => (
          setPosts(snapshot.docs.map(doc => (
            {
              id: doc.id,
              data: doc.data(),
            }
          )))
        ))
      }, [])

    const sendPost = (e) => {
        e.preventDefault();

        db.collection("posts").add({
            name: user.displayName,
            description: user.email,
            message: inputValue,
            photoUrl: user.photoUrl || "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });

        setInputValue("");
    };

    return(
        <div className="feed">
            <div className="feed_inputContainer">
                <div className="feed_input">
                    <CreateIcon />
                    <form>
                        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" placeholder="Start a post" />
                        <button onClick={sendPost} type="submit">Send</button>
                    </form>
                </div>
                <div className="feed_inputOptions">
                    <InputOption Icon={ImageIcon} title="Photo" color="#7085F9" />
                    <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
                    <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
                    <InputOption Icon={CalendarViewDayIcon} title="Write article" color="#7FC15E" />
                </div>
            </div>

            {/* Post */}

           <FlipMove>
           {posts.map(({id, data: { name, description, message, 
            photoUrl }}) => (
                <Post 
                key={id}
                name={name}
                description={description}
                message={message}
                photoUrl={photoUrl}
                />
            ))}
           </FlipMove>

        </div>
    )
}
export default Feed;






