import React, { useState } from 'react'
import Add from "../img/add.png"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import {auth, storage} from "../firebase"
import {db} from "../firebase"
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [err, setErr] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName= e.target[0].value;
    const emailId = e.target[1].value;
    const password = e.target[2].value; 
    const file = e.target[3].files[0];
    console.log(emailId)
    // const auth  = getAuth();

    try {
      const res = await createUserWithEmailAndPassword(auth, emailId, password);
      // console.log(res);

      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on( 
        (error) => {
          setErr(true);
        }, 
        () => {
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user, {
              displayName, 
              photoURL: downloadURL
            });
            
            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName,
              emailId,
              photoURL: downloadURL
            });

            await setDoc(doc(db, 'userChat', res.user.uid), {});
            navigate("/")
          });

          
        }
      );
    } catch(err) {
      setErr(true);
    } 
  }


  return (
    <div className="formContainer">
        <div className="fromWrapper">
            <span className='logo'>VartalApp</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Display Name'/>
                <input type="email" placeholder='Email ID'/>
                <input type="password" placeholder='Password'/>
                <input style={{display:"none"}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add your avatar</span>
                </label>

                <button>Sign Up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <p>Already have an account? Login</p>
        </div>
    </div>
  )
}

export default Register