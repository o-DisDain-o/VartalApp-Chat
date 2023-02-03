import React from 'react'

const Login = () => {
  return (
    <div className="formContainer">
        <div className="fromWrapper">
            <span className='logo'>VartalApp</span>
            <span className='title'>Login</span>
            <form action="">
                <input type="email" placeholder='Email ID'/>
                <input type="password" placeholder='Password'/>
                <button>Sign In</button>
            </form>
            <p>Don't have an account? Register</p>
        </div>
    </div>
  )
}

export default Login