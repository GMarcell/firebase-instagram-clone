import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Post from './components/Post';
import dbfirestore from './firebase/config'
import { collection, getDocs } from "firebase/firestore"


function App() {
  const [posts, setPosts] = useState([
    {
      username: "GMarcell",
      caption: "Hello It Works",
      imgUrl: "https://reactjs.org/logo-og.png"
    },
    {
      username: "MImanuel",
      caption: "Hello It Works in state",
      imgUrl: "https://reactjs.org/logo-og.png"
    }
  ]);
  useEffect(() => {
    const dbPostRef = collection(dbfirestore, "posts")
    const getPosts = async () => {
      const data = await getDocs(dbPostRef)
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  }, [posts])
  return (
    <div className="App">
      {/* Header */}
      <div className='app__header'>
        <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='Instagram Logo' />
      </div>
      <h1>💯 Clone Instagram</h1>
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
        ))
      }
      {/* Posts */}
      {/* Posts */}
    </div>
  );
}

export default App;
