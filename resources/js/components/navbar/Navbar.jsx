// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// function MyNavbar() {
//     return (
//         <header className="navbar">
//             <div className="logo">
//                 <img src="https://www.shutterstock.com/image-vector/hostel-logo-hotel-travel-rest-600w-727553260.jpg" />
//             </div>
//             <nav className="nav-links">
//                 <ul>
//                     <li>
//                         <Link to="/">Home</Link>
//                     </li>
//                     <li>
//                         <Link to="/about">About</Link>
//                     </li>
//                     <li>
//                         <Link to="/contact">Contacts</Link>
//                     </li>
//                     <li>
//                         <Link to="/view-dorm">View Dorm</Link>
//                     </li>
//                     <li>
//                         <Link to="/member">Member</Link>
//                     </li>
//                     <li>
//                         <Link to="/admin">Admin</Link>
//                     </li>
//                 </ul>
//             </nav>
//         </header>
//     );
// }

// export default MyNavbar;

import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { Link } from 'react-router-dom' // Import the Link component from react-router-dom
import { SiHomeassistantcommunitystore } from 'react-icons/si'
import './Navbar.css' // Import custom CSS
import { Button } from 'react-bootstrap'
import { MdOutlineLogout } from 'react-icons/md'

function MyNavbar() {
  const expand = 'md'
  return (
    <Navbar
      key={expand}
      expand={expand}
      className="bg-body-tertiary mb-3"
      style={{ position: 'sticky' }}
    >
      <Container>
        <Navbar.Brand href="#" className="nav-brand">
          <span>
            <SiHomeassistantcommunitystore
              style={{
                marginRight: '10px',
                fontSize: '30px',
                color: '#2dbd34',
              }}
            />
          </span>
          Dormitory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Offcanvas
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1 pe-3">
              {/* Use Link from react-router-dom to route to different components */}
              <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/contact">
                Contacts
              </Nav.Link>
              <Nav.Link
                className="text-dark px-3 fs-6"
                as={Link}
                to="/view-dorm"
              >
                View Dorm
              </Nav.Link>
              <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/member">
                Members
              </Nav.Link>
              <Nav.Link className="text-dark px-3 fs-6" as={Link} to="/admin">
                Admin
              </Nav.Link>
            </Nav>
            <div style={{ marginRight: '5px' }}>
              <Button
                style={{
                  backgroundColor: '#2dbd34',
                  border: '1px solid #2dbd34',
                }}
              >
                <span>
                  <MdOutlineLogout
                    style={{
                      marginRight: '20px',
                      fontSize: '20px',
                      color: 'white',
                    }}
                  />
                </span>
                Log in
              </Button>
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default MyNavbar
