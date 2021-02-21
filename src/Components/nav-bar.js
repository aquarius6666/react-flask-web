import React, { useContext } from 'react'
import {Nav, Navbar} from "react-bootstrap";
import { NavLink } from 'react-router-dom'
import { logout } from '../API/action';
import userContext from './userContext';
import logo1 from "../img/hogwart.svg";

const NavBar = () => {
    const {user, setUser} = useContext(userContext)

    const handleLogOut =() => {
        logout(() => setUser(undefined))
    }
    
    if (user) {
        return (
            <>
                <Navbar className="navbar navbar-dark navbar-expand-sm fixed-top" expand="lg">
                    <a className="navbar-brand" href="/"><img src={logo1} height="40" width="auto" alt="logo1"/></a>
                    <Navbar.Brand id="navbarbrand" href="/">HỌC VIỆN PHÁP THUẬT HOGWART</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto row">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
                            <Nav.Link href="/info">Info</Nav.Link>
                            <Nav.Link href="/update">Update</Nav.Link>
                            <Nav.Link href="/login" onClick={handleLogOut}>Log out</Nav.Link>
                            <Nav.Link href="/register" onClick={handleLogOut}>Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    } else {
        return(
            <>
            <NavLink exact to="/login" onClick={handleLogOut}>Log in</NavLink>
            <NavLink exact to="/register" onClick={handleLogOut}>Register</NavLink>
            </>
        )
    }
}; export default NavBar