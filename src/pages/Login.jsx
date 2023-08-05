import React, { useState } from 'react'
import {auth} from "../firebase"
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [err, setErr] = useState(false);  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailId = e.target[0].value;
    const password = e.target[1].value; 
    // const auth  = getAuth();

    try {
      await signInWithEmailAndPassword(auth, emailId, password);
      navigate("/")
    } catch(err) {
      setErr(true);
    } 
  }

  return (
    <div className="formContainer">
        <div className="fromWrapper">
            <span className='logo'>VartalApp</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email ID'/>
                <input type="password" placeholder='Password'/>
                <button>Sign In</button>
            </form>
            {err && <span>Something went wrong</span>}
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login