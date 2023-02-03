import React from 'react'

function Navbar() {
  return (
    <div className='navbar'>
      <span className='logo'>VartalApp</span>
      <div className="user">
        <img src="https://alliancensut.com/wp-content/uploads/photo-gallery/Devang.jpeg?bwg=1661086493" alt="" />
        <span>Dev</span>
        <button>
          logout
        </button>
      </div>
    </div>
  )
}

export default Navbar