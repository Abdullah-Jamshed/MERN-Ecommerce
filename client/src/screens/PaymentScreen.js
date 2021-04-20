import React, { useEffect, useState } from "react";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Row, Col, Spinner } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
// import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../store/actions/paymentActions";

const PaymentScreen = ({ history, location }) => {
  // REDUX STATE HOOK
  const { shippingAddress } = useSelector((state) => state.shippingReducer);
  const { paymentMethod } = useSelector((state) => state.paymentReducer);

  const [paymentMethod, setPaymentMethod] = useState("");

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTIONS

  // const formHandler = (e) => {
  //   const { value } = e.target;
  //   setPaymentMethod(e.target.value);
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    // history.push("/payment");
  };

  // LIFECYCLE

  useEffect(() => {
    if (!shippingAddress) {
      history.push("/shipping");
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (paymentMethod) {
      setPaymentMethod(paymentMethod);
    }
  }, [paymentMethod]);

  return (
    <Container className='py-4'>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment</h1>
        {/* {(errorMessage || errorMsg) && <Message variant='danger'>{errorMessage || errorMsg}</Message>} */}
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method </Form.Label>
          </Form.Group>
          <Col>
            <Form.Check
              id='PayPal'
              type='radio'
              label='PayPal or Credit Card'
              value='PayPal'
              name='paymentMethod'
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            <Form.Check
              id='Stripe'
              type='radio'
              label='Stripe'
              value='Stripe'
              name='paymentMethod'
              onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
          </Col>

          <Button type='submit' className='mt-2 btn-block' disabled={paymentMethod === ""}>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default PaymentScreen;
