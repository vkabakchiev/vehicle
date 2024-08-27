import React from 'react';

const Navbar = ({ user }) => {
  return (
    <nav>
      <div className="navbar-left">
        {user && <span>Welcome, {user.name}!</span>}
      </div>
      <ul className="navbar-menu">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;