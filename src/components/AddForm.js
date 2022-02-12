import { Button, Input, TextField } from '@mui/material';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { dbfirestore, storage } from '../firebase/config';
import './AddForm.css'

function AddForm(props) {
    const [username, setUsername] = useState("");
    const [caption, setCaption] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
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
        <div className='popup-box'>
            <div className='box'>
                <form onSubmit={handleUpload}>
                    <Input variant='filled' placeholder='Username' type="text" onChange={(e) => setUsername(e.target.value)} />
                    <TextField multiline onChange={(e) => setCaption(e.target.value)}></TextField>
                    <input type='file' onChange={handleChange} />
                    <button type='submit'>UPLOAD</button>
                    {/* <Button variant="contained" component="label" onChange={handleChange}>
                        Upload File
                        <input type="file" hidden />
                    </Button> */}
                </form>
                <div className="close-icon" onClick={props.handleClose}>X</div>
                <h3>Upload {progress} %</h3>
            </div>
        </div>
    )
}

export default AddForm