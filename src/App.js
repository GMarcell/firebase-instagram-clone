import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react';
import './App.css';
import storage from './firebase/config';

function App() {
  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    // console.log(file)
    uploadFile(file)
  }

  const uploadFile = (file) => {
    // 
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setProgress(prog)
    }, (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url))
      })
  }

  return (
    <div className="App">
      <div>
        <div>
          <div className='flex'>
            <FontAwesomeIcon icon={faUserCircle} size='6x' />
            <div className='my-auto ml-7'>
              <h1 className='text-3xl font-bold'>User Name</h1>
              <h1 className='text-left mt-3'>
                Jumlah Post:
                <span className='underline mx-1'>
                  00
                </span>
                Post
              </h1>
            </div>
          </div>
          <button className='bg-blue-700 w-full rounded text-white font-bold mt-2'>Add Post</button>
          <form onSubmit={formHandler}>
            <input type='file' />
            <button type='submit'>UPLOAD</button>
          </form>
          <hr />
          <h3>Uploaded {progress} % </h3>
        </div>
        <div className='grid grid-flow-row grid-cols-3 gap-4 mt-5'>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
          <div className='bg-red-900 rounded'>1</div>
        </div>
      </div>
    </div>
  );
}

export default App;
