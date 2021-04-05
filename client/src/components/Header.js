import React from "react";
// import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar className='' bg='dark' variant='dark' expand='lg' collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to='/' href='/'>
          MyShop
        </Navbar.Brand>
        {/* <Form inline>
        <FormControl type='text' placeholder='Search' className='mr-sm-2' />
        <Button variant='outline-success'>Search</Button>
      </Form> */}
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link as={Link} to='/cart'>
              <i className='fa fa-shopping-cart mr-1' aria-hidden='true'></i>Cart
            </Nav.Link>
            <Nav.Link as={Link} to='/login'>
              <i className='fa fa-user mr-1' aria-hidden='true'></i>SignIn
            </Nav.Link>
            <NavDropdown title='Admin' id='basic-nav-dropdown'>
              <NavDropdown.Item as={Link} to='/users'>
                Users
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/orders'>
                Order
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to='/something'>
                Something
              </NavDropdown.Item>
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
