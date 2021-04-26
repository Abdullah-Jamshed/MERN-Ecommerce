import React from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../store/actions/userActions";

const Header = () => {
  // REDUX STATE
  const { user } = useSelector((state) => state.userReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTIONS

  const logout = () => {
    dispatch(userLogout());
  };

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
            {user ? (
              <NavDropdown title={user.name} id='username'>
                <NavDropdown.Item as={Link} to='/profile'>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to='/login'>
                <i className='fa fa-user mr-1' aria-hidden='true'></i>SignIn
              </Nav.Link>
            )}
            {user && user.isAdmin && (
              <NavDropdown title='Admin' id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/admin/users'>
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/products'>
                  Products
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/admin/orders'>
                  Order
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href='/link'>Separated link</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
