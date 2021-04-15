import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../store/actions/userActions";
import Message from "../components/Message";

const RegisterScreen = ({ history, location }) => {
  // STATE;
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const redirect = location.search ? location.search.split("=")[1] : "/";

  // REDUX STATE HOOK
  const { user, errorMessage, isLoading } = useSelector((state) => state.userReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTIONS
  const formHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(userSignUp(form));
  };

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  return (
    <Container className='py-4'>
      <FormContainer>
        <h1>Sign Up</h1>
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name </Form.Label>
            <Form.Control type='name' placeholder='name' value={form.name} name='name' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address : </Form.Label>
            <Form.Control type='email' placeholder='email' value={form.email} name='email' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password : </Form.Label>
            <Form.Control type='password' placeholder='password' value={form.password} name='password' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Row>
            <Col>
              Already Have Account?<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}> login</Link>
            </Col>
          </Row>
          <Button type='submit' className='mt-2' disabled={isLoading}>
            SignUp {isLoading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' className='ml-2' />}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default RegisterScreen;
