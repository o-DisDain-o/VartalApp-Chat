import React from 'react'
import Add from "../img/add.png"

const Register = () => {
  return (
    <div className="formContainer">
        <div className="fromWrapper">
            <span className='logo'>VartalApp</span>
            <span className='title'>Register</span>
            <form action="">
                <input type="text" placeholder='Display Name'/>
                <input type="email" placeholder='Email ID'/>
                <input type="password" placeholder='Password'/>
                <input style={{display:"none"}} type="file" id='file'/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add your avatar</span>
                </label>

                <button>Sign Up</button>
            </form>
            <p>Already have an account? Login</p>
        </div>
    </div>
  )
}

export default Register