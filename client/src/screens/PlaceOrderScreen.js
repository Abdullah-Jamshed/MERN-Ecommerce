import React, { useEffect, useState } from "react";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Row, Col, ListGroup } from "react-bootstrap";

//  COMPONENT
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../store/actions/shippingActions";

const PlaceOrderScreen = ({ history }) => {
  // STATE;

  const [form, setForm] = useState({});

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

  return (
    <>
      <h1>Placeorder Screen</h1>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
          <Col md={8}>
              <ListGroup variant={"flush"}>
                  
              </ListGroup>
          </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
