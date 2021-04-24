import React, { useEffect, useState } from "react";
// import { Link} from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../store/actions/userActions";
import { getUserOrder } from "../store/actions/orderDetailActions";
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

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  // REDUX STATE
  const { user, errorMessage, success, isLoading } = useSelector((state) => state.userReducer);
  const { listLoader, ordersList } = useSelector((state) => state.orderDetailReducer);

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

  // LIFECYCLES

  useEffect(() => {
    if (!user) {
      history.push("/login?redirect=profile");
    } else {
      if (user.name) {
        setForm({ ...form, name: user.name, email: user.email });
      }
    }
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  return (
    <Container className='py-4' fluid>
      <Row>
        <Col md={6} className='mb-2'>
          <FormContainer>
            <h1>Profile</h1>
            {errorMsg && <Message variant={"danger"}>{errorMsg}</Message>}
            {/* {success && <Message variant={"success"}>{"User Updated"}</Message>} */}
            {(errorMessage || success) && <Message variant={success ? "success" : "danger"}>{success ? "User Updated" : errorMessage}</Message>}
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
        </Col>
        <Col md={6}>
          <h1>My Order</h1>
          <div className='text-center'>{listLoader && <Spinner animation='border' />}</div>
          {errorMessage && <Message>{errorMessage}</Message>}
          {!listLoader && ordersList.length !== 0 && (
            <>
              {ordersList.map((item) => (
                <h3 key={item._id}>{item.paymentMethod}</h3>
              ))}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
