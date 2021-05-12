import React, { useEffect, useState } from "react";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Col } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
// import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../store/actions/paymentActions";

const PaymentScreen = ({ history }) => {
  // REDUX STATE HOOK
  const { shippingAddress } = useSelector((state) => state.shippingReducer);
  const { paymentMethod } = useSelector((state) => state.paymentReducer);

  const [method, setPaymentMethod] = useState("");

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTIONS

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(method));
    history.push("/placeOrder");
  };

  // LIFECYCLE

  useEffect(() => {
    if (!shippingAddress) {
      history.push("/shipping");
    }
  }, [shippingAddress, history]);

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
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method </Form.Label>
            <Col>
              <Form.Check
                id='PayPal'
                type='radio'
                label='PayPal or Credit Card'
                value='PayPal'
                name='paymentMethod'
                checked={method === "PayPal"}
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
              <Form.Check
                id='Stripe'
                type='radio'
                label='Stripe'
                value='Stripe'
                name='paymentMethod'
                checked={method === "Stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            </Col>
          </Form.Group>

          <Button type='submit' className='mt-2 btn-block' disabled={method === ""}>
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default PaymentScreen;
