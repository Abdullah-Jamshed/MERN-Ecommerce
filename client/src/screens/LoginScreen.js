import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { userLogin, clearErrorMessage } from "../store/actions/userActions";
import Message from "../components/Message";

const LoginScreen = ({ history, location }) => {

  //STATE
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
  const redirect = location.search ? location.search.split("=")[1] : "/";

  // REDUX STATE 
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
    dispatch(userLogin(form));
  };


  // LIFECYCLES

  useEffect(() => {
    errorMessage && dispatch(clearErrorMessage());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  return (
    <Container className='py-4'>
      <FormContainer>
        <h1>Sign In</h1>
        {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
        <Form onSubmit={submitHandler}>
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
              Dont Have Account?<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}> create account</Link>
            </Col>
          </Row>
          <Button type='submit' className='mt-2 btn-block' disabled={isLoading || form.email === "" || form.password === ""}>
            Login {isLoading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' className='ml-2' />}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default LoginScreen;
