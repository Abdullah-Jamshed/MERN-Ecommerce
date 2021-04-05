import React from "react";

// UI LIBRARY COMPONENTS
import { Container, Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className='' bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <Navbar.Brand href='#home'>MyShop</Navbar.Brand>
        {/* <Form inline>
        <FormControl type='text' placeholder='Search' className='mr-sm-2' />
        <Button variant='outline-success'>Search</Button>
      </Form> */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link href='#home'>
              <i class='fa fa-shopping-cart mr-1' aria-hidden='true'></i>Cart
            </Nav.Link>
            <Nav.Link href='#link'>
              <i class='fa fa-user mr-1' aria-hidden='true'></i>SignIn
            </Nav.Link>
            <NavDropdown title='Admin' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Users</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>Order</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
