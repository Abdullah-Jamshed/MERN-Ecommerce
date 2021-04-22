import React, { useEffect } from "react";

// UI LIBRARY COMPONENT
import { Container, Button, Row, Col, ListGroup, Image, Card, Spinner } from "react-bootstrap";

//  COMPONENT
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../store/actions/orderDetailActions";

// STATE;

const OrderScreen = ({ history, match }) => {
  // REDUX STATE HOOK
  //   const { user } = useSelector((state) => state.userReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // LIFECYCLE

  useEffect(() => {
    dispatch(getOrderById(match.params.id));
  }, []);
  return (
    <div>
      <h1>Order id == {match.params.id}</h1>
    </div>
  );
};

export default OrderScreen;
