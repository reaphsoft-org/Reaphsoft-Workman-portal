import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import logo from './logo.jpeg';
import { IoLockOpen } from "react-icons/io5";

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-white p-3" style={{ width: '100%' }}>
      <Container fluid>
        <Navbar.Brand href="#" className='nav'> <img src={logo} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavDropdown title="Home" id="home-dropdown">
              <NavDropdown.Item href="#home1">Home 1</NavDropdown.Item>
              <NavDropdown.Item href="#home2">Home 2</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="For Candidate" id="link-dropdown">
              <NavDropdown.Item href="#link1">My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#link2">My Resume</NavDropdown.Item>
              <NavDropdown.Item href="#link3">Applied Job</NavDropdown.Item>
              <NavDropdown.Item href="#link3">Job Alert</NavDropdown.Item>
              <NavDropdown.Item href="#link3">Saved Job </NavDropdown.Item>
              <NavDropdown.Item href="#link3">CV Manager </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="For Employers" id="another-link-dropdown">
              <NavDropdown.Item href="#another-link1">Company's Profile</NavDropdown.Item>
              <NavDropdown.Item href="#another-link2">Employers Resume</NavDropdown.Item>
              <NavDropdown.Item href="#another-link3">Post A Job</NavDropdown.Item>
              <NavDropdown.Item href="#another-link3">Manage A Job</NavDropdown.Item>
              <NavDropdown.Item href="#another-link3">Transcation</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Pages" id="action-dropdown">
              <NavDropdown.Item href="#action1">About Us </NavDropdown.Item>
              <NavDropdown.Item href="#action2">Job Details</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Compaines</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Browser Job</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Job</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Portfolio</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Register</NavDropdown.Item>
              <NavDropdown.Item href="#action2">error</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Blogs" id="action-dropdown">
              <NavDropdown.Item href="#action1">About Us </NavDropdown.Item>
              <NavDropdown.Item href="#action2">Job Details</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Compaines</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Browser Job</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Job</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Portfolio</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Register</NavDropdown.Item>
              <NavDropdown.Item href="#action2">error</NavDropdown.Item>
            </NavDropdown>
          </Nav>
            <div className="btn-nav">
                <Button variant="outline-primary">  <IoLockOpen /> Sign up</Button>
                <Button variant="outline-primary"> <IoLockOpen /> Log out </Button>
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;




      