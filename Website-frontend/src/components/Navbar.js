import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='navbar-container'>
        <nav className="navbar">
          <div className="logo">
            <Link to="/">
            <h1 className='name'>Parth</h1>
            </Link>
          </div>
          <Link to='/login'>
             <button className="btn">Login</button>
          </Link>
          <button className="btn build">Start building</button>
        </nav>
    </div>
  )
}

export default Navbar
