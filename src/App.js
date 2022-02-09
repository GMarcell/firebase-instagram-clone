import { useState, useEffect } from 'react';
import './App.css';
import Post from './components/Post';
import { dbfirestore, storage } from './firebase/config'
import { collection, getDocs, addDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';


function App() {
  const [posts, setPosts] = useState([]);
  const [username, setUsername] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const dbPostRef = collection(dbfirestore, "posts")
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(dbPostRef)
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPosts()
  }, [posts])

  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = (e) => {
    e.preventDefault()
    const storageRef = ref(storage, `/images/${selectedFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, selectedFile)
    // const UploadTask = storage.ref(`images/${selectedFile.name}`).put(selectedFile)
    // const UploadTask = ref(storage, `images/${selectedFile.name}`).put(selectedFile)
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.TotalBytes) * 100
        )
        setProgress(prog)
      },
      (error) => {
        console.log(error);
        alert(error.message)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          addDoc(collection(dbfirestore, "posts"), {
            caption: caption,
            imgUrl: url,
            username: username
          })
        })
      }
    )
  }

  return (
    <div className="App">
      {/* Header */}
      <div className='app__header'>
        <img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt='Instagram Logo' />
      </div>
      <h1>💯 Clone Instagram</h1>
      <form onSubmit={handleUpload}>
        <input placeholder='Username' type="text" onChange={(e) => setUsername(e.target.value)} />
        <textarea onChange={(e) => setCaption(e.target.value)}></textarea>
        <input type='file' onChange={handleChange} />
        <button type='submit'>UPLOAD</button>
      </form>
      <h1>Uploaded {progress} %</h1>
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
