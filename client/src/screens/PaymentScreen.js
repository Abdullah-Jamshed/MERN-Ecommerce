import React, { useEffect, useState } from "react";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";

const PaymentScreen = ({ history, location }) => {
  // REDUX STATE HOOK
  const { shippingAddress } = useSelector((state) => state.shippingReducer);

  // REDUX DISPATCH HOOK
  //   const dispatch = useDispatch();

  // HANDLER FUNCTIONS

  // LIFECYCLE

  useEffect(() => {
    if (shippingAddress) {
      console.log(shippingAddress);
      // setForm(shippingAddress);
    }
  }, [shippingAddress]);

  return (
    <Container className='py-4'>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Shipping</h1>
        {/* {(errorMessage || errorMsg) && <Message variant='danger'>{errorMessage || errorMsg}</Message>} */}
        {/* <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address : </Form.Label>
            <Form.Control type='address' placeholder='address' value={form.address} name='address' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City </Form.Label>
            <Form.Control type='city' placeholder='city' value={form.city} name='city' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code : </Form.Label>
            <Form.Control type='postalCode' placeholder='postalCode' value={form.postalCode} name='postalCode' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='country'>
            <Form.Label>Country : </Form.Label>
            <Form.Control type='text' placeholder='country' value={form.country} name='country' onChange={formHandler}></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            className='mt-2 btn-block'
            disabled={form.address === "" || form.city === "" || form.postalCode === "" || form.country === ""}>
            Continue
          </Button>
        </Form> */}
      </FormContainer>
    </Container>
  );
};

export default PaymentScreen;
