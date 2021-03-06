import React, { useEffect, useState } from "react";

// UI LIBRARY COMPONENT
import { Container, Button, Form } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../store/actions/shippingActions";

const ShippingScreen = ({ history }) => {
  // STATE;

  const [form, setForm] = useState({
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // REDUX STATE HOOK
  const { shippingAddress } = useSelector((state) => state.shippingReducer);
  const { user } = useSelector((state) => state.userReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTIONS
  const formHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(form));
    history.push("/payment");
  };

  // LIFECYCLE

  useEffect(() => {
    if (shippingAddress) {
      setForm(shippingAddress);
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (!user) {
      history.push("/cart");
    }
  }, [user, history]);

  return (
    <Container className='py-4'>
      <FormContainer>
        <CheckoutSteps step1 step2 history={history} />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='address'>
            <Form.Label>Address : </Form.Label>
            <Form.Control type='address' placeholder='address' value={form.address} name='address' onChange={formHandler}></Form.Control>
          </Form.Group>
          <Form.Group controlId='city'>
            <Form.Label>City : </Form.Label>
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
        </Form>
      </FormContainer>
    </Container>
  );
};

export default ShippingScreen;
