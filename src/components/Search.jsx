import React, { useContext, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import {db} from "../firebase"
import {AuthContext} from "../context/AuthContext"

function Search() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [search, setSearch] = useState(false);
  const {currentUser} = useContext(AuthContext)
  

  const handleSearch = async () => {
    setSearch(true)
    const q = query(
      collection(db, "users"), 
      where("displayName", "==", userName)
    );
    
    
    try {
      console.log(userName);
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }
    catch(err) {

      setErr(true);
    }    

  };
  
  const handleKey = (event) => {
    if(event.code === "Enter" || event.code === "Return"){
      handleSearch()
    }
  };

  const handleSelect = async (user) => {
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if(!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), {messages: []});

        await updateDoc(doc(db, "userChat", currentUser.uid), {
          [combinedId + ".userInfo"] : {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + ".date"] : serverTimestamp()
        });

        await updateDoc(doc(db, "userChat", user.uid), {
          [combinedId + ".userInfo"] : {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"] : serverTimestamp()
        });
      }
    }
    catch(err) { }

    setUser(null);
    setUserName("");
    setSearch(false)
  }


  return (
    <div className='search'>
      <div className="searchForm">
        <input type="text" placeholder='Enter Username here...' onKeyDown={handleKey} onChange={e=>setUserName(e.target.value)} value={userName} name="" id="" />
      </div>
      {err && <span className='seachErr'>Something Went Wrong!😟</span>}
      {search && userName !== "" && !user && <span className='seachErr'>No such user found🥲</span>}
      {user && 
      <div className="userChat" onClick={() => handleSelect(user)}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo">
          <span>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search