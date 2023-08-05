import React, { useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../context/ChatContext'
import { AuthContext } from '../context/AuthContext';
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

function Message({message}) {
  TimeAgo.addDefaultLocale(en)
  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext);

  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])
  return (
    <div ref={ref}className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="Profile Picture" />
        <span >
          <ReactTimeAgo date={message.date.toDate()} locale="en-US" timeStyle="twitter"/>
        </span>
      </div>
      <div className="messageContent">
        {message.text !== "" && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message