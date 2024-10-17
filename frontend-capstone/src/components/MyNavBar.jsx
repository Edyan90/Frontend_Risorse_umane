import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ThemeButton from "./ThemeButton";
// eslint-disable-next-line react/prop-types
const MyNavBar = ({ darkTheme, toggleTheme }) => {
  return (
    <Navbar expand="lg" className=" navbar-dark border-bottom border-light">
      <Container>
        <Navbar.Brand href="/home">
          <img
            id="logoPortal"
            src="https://saas.hrzucchetti.it/hrpbestengsrl/images/login/logo.svg"
            alt="logo-zucchetti"
            width="auto"
            height="50"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="https://www.razer.com/" className="text-white">
              Razer.com
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <ThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavBar;
