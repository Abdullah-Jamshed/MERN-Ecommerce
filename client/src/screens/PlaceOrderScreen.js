import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";

//  COMPONENT
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../store/actions/placeOrderActions";

const PlaceOrderScreen = ({ history }) => {
  // STATE;

  const [prices, setPrices] = useState({
    itemPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  });

  // REDUX STATE HOOK
  const { shippingAddress } = useSelector((state) => state.shippingReducer);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const { paymentMethod } = useSelector((state) => state.paymentReducer);
  //   const { user } = useSelector((state) => state.userReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // Price Calculator  Function
  const priceCalculator = () => {
    const itemPrice = Number(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2));
    const shippingPrice = itemPrice > 130 ? 0 : 100;
    const taxPrice = Number(((itemPrice + itemPrice * 15) / 100).toFixed(2));
    const totalPrice = itemPrice + shippingPrice + taxPrice;
    setPrices({ itemPrice, shippingPrice, taxPrice, totalPrice });
  };

  // HANDLER FUNCTIONS

  const placeOrderHandler = () => {
    dispatch(createOrder(prices));
  };

  // LIFECYCLE

  useEffect(() => {
    priceCalculator();
  }, []);

  return (
    <Container className='pt-4'>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant={"flush"}>
            <ListGroup.Item>
              <h4>Shipping</h4>
              <p>
                <strong>Address : </strong>
                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Payment Method</h4>
              <strong>Method : </strong>
              {paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h4>Order Items</h4>
              {cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cartItems.map((item) => (
                    <Row key={item.productId}>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.productId}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x {item.price} = ${(item.qty * item.price).toFixed(2)}
                      </Col>
                    </Row>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Order Summary</h4>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${prices.itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${prices.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax </Col>
                  <Col>${prices.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${prices.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={placeOrderHandler}>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceOrderScreen;
