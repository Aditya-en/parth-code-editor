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
          <div>
          <button className="btn">Features</button>
          <button className="btn">About</button>
          <button className="btn">Learn</button>
          </div>
          <div className='button'>
          <Link to='/login'>
             <button className="btn login">Login</button>
          </Link>

          <Link to='/login'>
          <button className="btn build">Start building</button>
          </Link>
          </div>
        </nav>
    </div>
  )
}

export default Navbar
