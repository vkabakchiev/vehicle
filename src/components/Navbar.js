import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user }) => {
  return (
    <nav>
      <div className="navbar-left">
        {user && <span>Welcome, {user.name}!</span>}
      </div>
      <ul className="navbar-menu">
        <li><Link to="/register">Add Users</Link></li>
        <li><Link to="/vehicle">Add Vehicle</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;