import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onHomeClick }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" onClick={onHomeClick}>Ana Sayfa</Link>
      <Link to="/favoriler" className="nav-link">Favoriler</Link>
      <Link to="/hakkinda" className="nav-link">Hakkında</Link>
    </nav>
  );
};

export default Navbar;
