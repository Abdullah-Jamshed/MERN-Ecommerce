import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Spinner } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, clearUserDetail, getUserDetails, userUpdateByAdmin } from "../store/actions/userActions";

const UserEditScreen = ({ match, history, location }) => {
  const { id } = match.params;
  // STATE;
  const [form, setForm] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  //   const redirect = location.search ? location.search.split("=")[1] : "/";

  // REDUX STATE HOOK
  const { user, errorMessage, isLoading, buttonLoader, token, userDetails, successUpdate } = useSelector((state) => state.userReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTIONS
  const formHandler = (e) => {
    const { name, value, checked } = e.target;
    if (name !== "isAdmin") {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: checked });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // LIFECYCLE

  useEffect(() => {
    if (successUpdate) {
      dispatch(clearUserDetail());
      history.push("/admin/users");
    } else {
      if (token) {
        if (!isLoading) {
          if (user && user.isAdmin) {
            dispatch(getUserDetails(id));
          } else {
            history.push("/");
          }
        }
      } else {
        history.push("/");
      }
    }
    // eslint-disable-next-line
  }, [dispatch, user, token, history, id, successUpdate]);

  useEffect(() => {
    errorMessage && dispatch(clearErrorMessage());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (userDetails && userDetails.name) {
      setForm(userDetails);
    }
  }, [userDetails]);

  return (
    <Container className='py-4'>
      {isLoading ? (
        <div className='text-center'>
          <Spinner as='span' animation='border' size='lg' role='status' aria-hidden='true' className='ml-2' />
        </div>
      ) : (
        <>
          <div className='p-4'>
            <Link onClick={() => dispatch(clearUserDetail())} to='/admin/users' style={{ fontSize: "22px", textDecoration: "none" }}>
              <i className='fa fa-chevron-left mr-4' />
              Go Back
            </Link>
          </div>
          <FormContainer>
            <h1>Update User</h1>
            {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name : </Form.Label>
                <Form.Control type='name' placeholder='name' value={form.name} name='name' onChange={formHandler}></Form.Control>
              </Form.Group>
              <Form.Group controlId='email'>
                <Form.Label>Email Address : </Form.Label>
                <Form.Control type='email' placeholder='email' value={form.email} name='email' onChange={formHandler}></Form.Control>
              </Form.Group>

              <Form.Group controlId='adminCheck'>
                <Form.Check label='isAdmin' name='isAdmin' type={"checkbox"} value={form.isAdmin} checked={form.isAdmin} onChange={formHandler} />
              </Form.Group>

              <Button type='submit' className='mt-2 btn-block' disabled={buttonLoader} onClick={() => dispatch(userUpdateByAdmin(id, form))}>
                Update {buttonLoader && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' className='ml-2' />}
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </Container>
  );
};

export default UserEditScreen;
