import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from '@inertiajs/react';

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-vermilion-50 ">
      <Container>
        <Navbar.Brand href="#home" className='text-white'>Bizalert</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">        
          </Nav>
          <Nav>
          <Link href="/" className="nav-link text-vermilion-500" >Home</Link>
          <Link href="/" className="nav-link text-vermilion-500">Services</Link>
          <Link href="/" className="nav-link text-vermilion-500">About Us</Link>
          <Link href="/" className="nav-link text-vermilion-500">Contact Us</Link>
          <Link href="/" class="bg-vermilion-500 align-items-sm-center hover:bgvermilion-500 text-white font-bold mx-2 my-2 py-2 px-4 rounded-full">Sign In</Link>        
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;