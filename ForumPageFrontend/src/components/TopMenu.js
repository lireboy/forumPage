import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from './pictures/motorrad-1.png'
import helpIcon from './pictures/helpIcon.png'
import infoIcon from './pictures/infoIcon.png'

import './Styleguide.css'
import './icons.css'

import UserLogin from './UserLogin';



class TopMenu extends Component{

    render(){

        return(
            <div>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                    <img src={logo} style={{width:50}} alt="" />
                        Motorrad-Community
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <UserLogin/>
                        <Nav.Link href="#about-us">
                        <img className="icon" src={infoIcon} alt="" />
                            Über uns
                            </Nav.Link>
                        <Nav.Link href="#faq">
                        <img className="icon" src={helpIcon} alt="" />
                            FAQ
                            </Nav.Link>
                        <NavDropdown className="nav-dropdown" title="Dropdown" id="basic-nav-dropdown" >
                            {/* <NavDropdown.Item className="dropdown-item" ><UserLogin/></NavDropdown.Item> */}
                            <NavDropdown.Item href="#action/3.2">Registrieren</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.3">Kontakt</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }
}

export default TopMenu