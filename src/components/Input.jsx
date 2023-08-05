import React, { useContext, useState } from 'react'
import Img from "../img/img.png"
import Attach from "../img/attach.png"
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { doc, updateDoc, arrayUnion, Timestamp, serverTimestamp } from "firebase/firestore";
import {v4 as uuid} from "uuid";
import { db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

function Input() {
  const {currentUser} = useContext(AuthContext)
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const {data} = useContext(ChatContext);

  const handleKey = (event) => {
    if(event.code === "Enter"){
      handleSend()
    }
  };

  const handleSend = async () => {
    // console.log("handle send called for text: " + text)
    if(img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on( 
        (error) => {
          // setErr(true);
        }, 
        () => {
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL
              })
            });
          })
        } 
      )
    }
    else {
      if(text !== "") {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now()
          })
        });
      }
      
    }

    await updateDoc(doc(db, "userChat", currentUser.uid), {
      [data.chatId + ".lastMessage"] : {text},
      [data.chatId + ".date"] : serverTimestamp()
    })

    await updateDoc(doc(db, "userChat", data.user.uid), {
      [data.chatId + ".lastMessage"] : {text},
      [data.chatId + ".date"] : serverTimestamp()
    })
    
    
    setText("")
    // console.log("message sent now text is : " + text)
    setImg(null)
  }

  return (
    <div className='input'>
        <input type="text" placeholder='Type something...' onKeyDown={handleKey} onChange={(e)=> {setText(e.target.value)}} value={text}/>
        <div className="send">
          <img src={Attach} alt="" />
          <input type="file" style={{display: "none"}} id="file" onChange={(e) => {setImg(e.target.files[0])}}/>
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label>
          <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input