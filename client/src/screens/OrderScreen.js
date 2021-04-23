import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Row, Col, ListGroup, Spinner, Image, Button, Card } from "react-bootstrap";

//  COMPONENT
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../store/actions/orderDetailActions";
import { clearErrorMessage } from "../store/actions/userActions";

const OrderScreen = ({ history, match }) => {
  // STATE;

  // REDUX STATE HOOK
  const { order, isLoading, errorMessage } = useSelector((state) => state.orderDetailReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // LIFECYCLE

  useEffect(() => {
    dispatch(getOrderById(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <Container className='pt-4'>
      {isLoading ? (
        <div className='text-center py-4'>
          <Spinner className='mt-4' animation='grow' />
        </div>
      ) : errorMessage ? (
        <Message variant='danger'> {errorMessage}</Message>
      ) : (
        order && (
          <>
            <h3>ORDER {match.params.id}</h3>
            <Row>
              <Col md={8}>
                <ListGroup variant={"flush"}>
                  <ListGroup.Item className='pt-4'>
                    <h4>Shipping</h4>
                    <p>
                      <strong>Name : </strong>
                      {order.user.name}
                    </p>
                    <p>
                      <strong>Email : </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
                      <strong>Address : </strong>
                      {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item className='pt-4'>
                    <h4>Payment Method</h4>
                    <strong>Method : </strong>
                    {order.paymentMethod}
                  </ListGroup.Item>

                  <ListGroup.Item className='pt-4'>
                    <h4>Order Items</h4>
                    {order.orderItems.length === 0 ? (
                      <Message>No Orders</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item) => (
                          <ListGroup.Item>
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
                          </ListGroup.Item>
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
                        <Col>${order.itemsPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Tax </Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    {/* 
                {errorMessage && (
                  <ListGroup.Item>
                    <Message variant={"danger"}>{errorMessage}</Message>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button type='button' className='btn-block' disabled={[].length === 0} onClick={() => {}}>
                    Place Order {isLoading && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' className='ml-2' />}
                  </Button>
                </ListGroup.Item> */}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
      )}

      {/* <h1>Order id == {match.params.id}</h1> */}
    </Container>
  );
};

export default OrderScreen;
