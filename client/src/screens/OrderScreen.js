import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Row, Col, ListGroup, Spinner, Image, Card } from "react-bootstrap";

//  COMPONENT
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../store/actions/orderDetailActions";
import {} from "../store/actions/userActions";

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
            <h3>ORDER ID : {match.params.id}</h3>
            <Row>
              <Col md={8}>
                <ListGroup variant={"flush"}>
                  <ListGroup.Item className='pt-4'>
                    <h3>Shipping</h3>
                    <p className='mt-2'>
                      <strong>Name : </strong>
                      {order.user.name}
                    </p>
                    <p className='mt-2'>
                      <strong>Email : </strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p className='mt-2'>
                      <strong>Address : </strong>
                      {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                    <div className='mt-2'>
                      {order.isDelivered ? (
                        <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                      ) : (
                        <Message variant='danger'>Not Delivered</Message>
                      )}
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className='pt-4'>
                    <h4>Payment Method</h4>
                    <p>
                      <strong>Method : </strong>
                      {order.paymentMethod}
                    </p>
                    <div className='mt-2'>
                      {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Not Paid</Message>}
                    </div>
                  </ListGroup.Item>

                  <ListGroup.Item className='pt-4'>
                    <h4>Order Items</h4>
                    {order.orderItems.length === 0 ? (
                      <Message>No Orders</Message>
                    ) : (
                      <ListGroup variant='flush'>
                        {order.orderItems.map((item) => (
                          <ListGroup.Item key={item._id}>
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
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </Container>
  );
};

export default OrderScreen;
