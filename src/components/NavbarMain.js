import React, { createContext, useContext, useEffect, useState } from "react"
import { UserContext } from '../App'
import { Link, Navigate, redirect } from "react-router-dom"
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteToken, GetEmployeeId, GetPatientId, GetUserRoles } from "../authentication/LocalStorageManager";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarMain() {
  const { user } = useContext(UserContext)

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  let roles = [];
  if (user) {
    roles = user.roles;
  }

  useEffect(() => {
    if (user === null) {
      logOut();
      navigateToLogin();
    }
  }, [])

  const logOut = () => {
    DeleteToken();
  };

  return (

    <Navbar className="mx-auto" style={{ borderRadius: "20px", backgroundColor: "#8DD4F5", height: "65px", width: "850px" }} expand="md" >
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {user && roles.length && roles.includes("ADMINISTRATOR") && (
              <>
                <NavDropdown title="Employees" id="collasible-nav-dropdown">
                  <NavDropdown.Item > <Link className="nav-link" to="/employees">Employees Status</Link></NavDropdown.Item>
                  <NavDropdown.Item><Link className="nav-link" to="/employees/create">Add new employee</Link></NavDropdown.Item>
                </NavDropdown>
                <Link className="nav-link" to={`/statistics`}>Statistics </Link>
              </>
            )}
            {user && roles.length && roles.includes("DOCTOR") && (
              <>
                <Link className="nav-link" to={"/patients"}>Patients</Link>
                <Link className="nav-link" to={`/appointments/${user.employeeId}`}>Appointments</Link>
              </>
            )}

            {user && roles.length && roles.includes("PATIENT") && (
              <>
                <Link className="nav-link" to={"/doctors"}> Make appointment</Link>
                <Link className="nav-link" to={"/newchat"}>Chat support</Link>
              </>
            )}
            {user && roles.length && roles.includes("SECRETARY") && (
              <>
                <Link className="nav-link" to={"/patients"}>Patients</Link>
                <Link className="nav-link" to={"/inboxMsg"} >Inbox messages</Link>
              </>
            )}

          </Nav>
          <Nav>
            {user ? (
              <>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/profile">Profile</Link>
                <Nav.Link href="/login" onClick={logOut} >Log out</Nav.Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to={"/doctors"}> Make appointment</Link>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/registration">Registration</Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarMain;