import React from 'react';
import './Post.css'
import Avatar from '@mui/material/Avatar';

function Post(props) {
    return <div className='post'>
        {/* Header -> avatar + Username */}
        <div className='post__header'>
            <Avatar className='post__avatar' alt={props.username} src="/static/images/avatar/1.jpg" />
            <h3>{props.username}</h3>
        </div>
        {/* Post */}
        <img className='post__image' src={props.imgUrl} alt='' />
        {/* username + caption */}
        <h4 className='post__text'><span>{props.username}</span>{props.caption}</h4>
    </div>;
}

export default Post;
