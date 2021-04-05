import React from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className='' bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <Link to='/'>
          <Navbar.Brand href='/'>MyShop</Navbar.Brand>
        </Link>
        {/* <Form inline>
        <FormControl type='text' placeholder='Search' className='mr-sm-2' />
        <Button variant='outline-success'>Search</Button>
      </Form> */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='/cart'>
              <i class='fa fa-shopping-cart mr-1' aria-hidden='true'></i>Cart
            </Nav.Link>
            <Nav.Link href='/login'>
              <i class='fa fa-user mr-1' aria-hidden='true'></i>SignIn
            </Nav.Link>
            <NavDropdown title='Admin' id='basic-nav-dropdown'>
              <NavDropdown.Item href='/users'>Users</NavDropdown.Item>
              <NavDropdown.Item href='/orders'>Order</NavDropdown.Item>
              <NavDropdown.Item href='/something'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='/link'>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
