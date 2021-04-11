import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Col, Row } from "react-bootstrap";

// COMPONENTS
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store/actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { cartItems } = useSelector((state) => state.cartReducer);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    if (match.params.id) dispatch(addCartItem(match.params.id, qty));
  }, [dispatch, match, qty]);

  return (
    <>
      <Row className='text-center p-4'>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your Cart is Empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            "items"
          )}
        </Col>
        <Col md={2}></Col>
        <Col md={2}></Col>
      </Row>
    </>
  );
};

export default CartScreen;
