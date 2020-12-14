import React, { useState } from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Navbar color="light" light expand="md">
      <Link className="navbar-brand" to="/">
        Movies app
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/movies/add">
              Ajout d'un film
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
