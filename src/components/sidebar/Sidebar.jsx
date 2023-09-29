import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Sidebar.scss'
import Logo from '../../assets/Logo.svg'
import { AiOutlineMenu } from "react-icons/ai";

const Sidebar = () => {
  // useState pour le mode responsive
  const [isHidden, setIsHidden] = useState(false);

  const toggleHidden = () => {
    setIsHidden(!isHidden);
  }

  return (
    <div className="sidebar">
          <div className="logoContainer">
            <Link to="/" onClick={() => {}}
            className='logo'>
              <img src={Logo} alt="Logo"/>
            </Link>
            <AiOutlineMenu className="toggle" onClick={toggleHidden}></AiOutlineMenu>
          </div>
      <div className={`content ${isHidden ? 'hidden' : ''}`}>
        <p>Dashboard</p>
        <nav className="navigation">
          <NavLink to="/products">{location.pathname === '/products' ? '• ' : ''}Products management</NavLink>
          <NavLink>Employees management</NavLink>
        </nav>
      </div>
      <hr className={`hr ${isHidden ? 'hidden' : ''}`}/>
      <div className={`connexion ${isHidden ? 'hidden' : ''}`}>
        <Link to="" onClick={() => {}}>Logout</Link>
      </div>
    </div>
  )
}

export default Sidebar