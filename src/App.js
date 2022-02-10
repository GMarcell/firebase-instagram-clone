import { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { dbfirestore } from './firebase/config'
import { collection, getDocs } from "firebase/firestore"
import AddForm from './components/AddForm';
import { AddPhotoAlternate } from '@material-ui/icons';


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
    <div className='main'>
      <div className="App">
        {/* Header */}
        <div className='app__header'>
          <h1 className='header__title'>MyGram</h1>
        </div>
        <div className='app__addPost'>
          <button onClick={togglePopUp} >
            <AddPhotoAlternate fontSize='large' />
          </button>
        </div>
        {isOpen && <AddForm handleClose={togglePopUp} />}
        {
          posts.map(post => (
            <Post username={post.username} caption={post.caption} imgUrl={post.imgUrl} iddoc={post.id} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
