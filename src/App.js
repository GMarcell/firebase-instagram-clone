import { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { dbfirestore } from './firebase/config'
import { collection, getDocs } from "firebase/firestore"
import AddForm from './components/AddForm';


function App() {
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dbPostRef = collection(dbfirestore, "posts")
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(dbPostRef)
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  }, [posts])

  const togglePopUp = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="App">
      {/* Header */}
      <div className='app__header'>
        <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='Instagram Logo' />
      </div>
      <h1>💯 Clone Instagram</h1>
      <button onClick={togglePopUp}>Add Form</button>
      {isOpen && <AddForm handleClose={togglePopUp} />}

      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
        ))
      }
    </div>
  );
}

export default App;
