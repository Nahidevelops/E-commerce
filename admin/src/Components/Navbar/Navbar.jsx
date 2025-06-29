import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.png'
import navProfile from '../../assets/nav-profile.jpg'
import navDropdown from '../../assets/nav_dropdown.png'

const Navbar = () => {
  return (
   <div className="navbar">
  <img src={navlogo} alt="Logo" className="nav-logo" />

  <div className="nav-user">
    <img src={navProfile} alt="Profile" className="nav-profile" />
    <img src={navDropdown} alt="Dropdown" className="nav-dropdown" />
  </div>
</div>

  )
}

export default Navbar
