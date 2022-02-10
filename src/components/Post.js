import React from 'react';
import './Post.css'
import Avatar from '@mui/material/Avatar';
import { HighlightOff } from '@material-ui/icons';
import { deleteDoc, doc } from 'firebase/firestore';
import { dbfirestore } from '../firebase/config';

function Post(props) {
    const deletePost = async (id) => {
        await deleteDoc(doc(dbfirestore, "posts", id))
    }
    return (
        <div className='post'>
            {/* Header -> avatar + Username */}
            <div className='post__header'>
                <Avatar className='post__avatar' alt={props.username} src="/static/images/avatar/1.jpg" />
                <h3>{props.username}</h3>
                <button className="post__delete" onClick={() => { deletePost(props.iddoc) }}>
                    <HighlightOff fontSize='large' />
                </button>
            </div>
            {/* Post */}
            <img className='post__image' src={props.imgUrl} alt='' />
            {/* username + caption */}
            <h4 className='post__text'><span>{props.username}</span>{props.caption}</h4>
        </div>
    )
}

export default Post;
