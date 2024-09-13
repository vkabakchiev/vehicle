import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import logo from '../logo.png';

const Navbar = ({ user }) => {
  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <BootstrapNavbar.Brand href="/">
        <img
          src={logo}
          alt="Logo"
          style={{ width: '40px', marginLeft: '10px' }}
        />
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/register">Add Users</Nav.Link>
          <Nav.Link as={Link} to="/vehicle">Add Vehicle</Nav.Link>
          <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
        </Nav>
        {user && (
          <Nav className="ml-auto" style={{ marginLeft: '60%' }}>
            <Nav.Link>Welcome, {user.name}!</Nav.Link>
          </Nav>
        )}
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;