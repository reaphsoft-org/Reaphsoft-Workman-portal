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
    <Navbar expand="lg" className="bg-body-white" style={{ width: '100%' }}>
      <Container fluid style={{ padding: '0px 6rem' }}>
        <Navbar.Brand href="#" className='nav'> <img src={logo} alt="" style={{ width: '10%' }} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
        <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          </Nav>
          <div className="btn-nav">
              <Button >Services</Button>
                <Button variant="outline-primary">  <IoLockOpen /> Sign in</Button>
                <Button variant="outline-primary"> <IoLockOpen /> Log In </Button>
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;




      