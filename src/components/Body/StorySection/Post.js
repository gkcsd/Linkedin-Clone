import {Avatar} from "@material-ui/core";
import React, { forwardRef } from "react";
import InputOption from "../StorySection/InputOption";
import "../StorySection/Post.css";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined"
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import FolderSharedOutlinedIcon from "@material-ui/icons/FolderSharedOutlined"
import SendOutlinedIcon from "@material-ui/icons/SendOutlined"

const Post = forwardRef(({name, description, message, photoUrl}, ref) => {
    return(
        <div ref={ref} className="post">
            <div className="post_header">
                <Avatar src={photoUrl}>{description[0]}</Avatar>
                <div className="post_info">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
            </div>

            <div className="post_body">
                <p>{message}</p>
            </div>

            <div className="post_buttons">
                <InputOption className="post_button" Icon={ThumbUpAltOutlinedIcon} 
                title="Like"
                color="gray"
                />
                <InputOption className="post_button" Icon={ChatOutlinedIcon} 
                title="Comment"
                color="gray"
                />
                <InputOption className="post_button" Icon={FolderSharedOutlinedIcon} 
                title="Share"
                color="gray"
                />
                <InputOption className="post_button" Icon={SendOutlinedIcon} 
                title="Send"
                color="gray"
                />
            </div>

        </div>
    )
})
export default Post;