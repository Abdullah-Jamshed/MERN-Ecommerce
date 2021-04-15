import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../store/actions/userActions";
import Message from "../components/Message";

const ProfileScreen = ({ history, location }) => {
  // STATE;
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    if (form.password !== form.confirmPassword) return setErrorMsg("Password Not Match");
    errorMsg && setErrorMsg("");
    dispatch(userUpdate(form));
  };

  useEffect(() => {
    if (user) {
      setForm({ ...form, name: user.name, email: user.email });
    }
  }, [user]);

  return (
    <Container className='py-4'>
      <FormContainer>
        <h1>Profile</h1>
        {(errorMessage || errorMsg) && <Message variant='danger'>{errorMessage || errorMsg}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name : </Form.Label>
            <Form.Control type='name' placeholder='name' value={form.name} name='name' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address : </Form.Label>
            <Form.Control disabled type='email' placeholder='email' value={form.email} name='email' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>New Password : </Form.Label>
            <Form.Control type='password' placeholder='password' value={form.password} name='password' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password : </Form.Label>
            <Form.Control
              type='password'
              placeholder='confirmPassword'
              value={form.confirmPassword}
              name='confirmPassword'
              onChange={formHandler}></Form.Control>
          </Form.Group>
          <Row>
            <Col>
              Already Have Account?<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}> login</Link>
              {/* Already Have Account?<Link to={"/login"}>Login</Link> */}
            </Col>
          </Row>
          <Button
            type='submit'
            className='mt-2 btn-block'
            disabled={
              isLoading ||
              form.name === "" ||
              form.email === "" ||
              (form.password !== "" && form.confirmPassword === "") ||
              (form.confirmPassword !== "" && form.password === "")
            }>
            Update {isLoading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' className='ml-2' />}
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ProfileScreen;
