import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// AXIOS
import API from "../api/";

// UI LIBRARY COMPONENT
import { Container, Row, Col, ListGroup, Spinner, Image, Card, Button } from "react-bootstrap";

//  COMPONENT
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../store/actions/orderDetailActions";
import { payOrder, resetOrderPay } from "../store/actions/paymentActions";
import { deliveryStatus } from "../store/actions/orderDetailActions";

// PAYPAL BUTTON
import { PayPalButton } from "react-paypal-button-v2";

const OrderScreen = ({ history, match }) => {
  // STATE;
  const [sdkReady, setSdkReady] = useState(false);

  // REDUX STATE HOOK
  const { isLoading: isUserLoading, user, token } = useSelector((state) => state.userReducer);
  const { order, isLoading, errorMessage, succesDeliver } = useSelector((state) => state.orderDetailReducer);
  const { successPay, isLoading: loadingPay } = useSelector((state) => state.paymentReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTION

  const successPaymentHandler = async (paymentResult) => {
    dispatch(payOrder(match.params.id, paymentResult));
  };

  // LIFECYCLE

  useEffect(() => {
    if (token) {
      if (!isUserLoading) {
        if (!user && !user.isAdmin) {
          history.push("/login");
        }
      }
    } else {
      history.push("/login");
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await API.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || succesDeliver || order._id !== match.params.id) {
      dispatch(resetOrderPay());
      dispatch({ type: "ORDER_DELIVERY_STATUS_RESET" });
      dispatch(getOrderById(match.params.id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
    // eslint-disable-next-line
  }, [dispatch, token, user, history, match.params.id, order, successPay, succesDeliver]);

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
            <div className='py-4 mb-4'>
              <Link to='/admin/orders' style={{ fontSize: "22px", textDecoration: "none" }}>
                <i className='fa fa-chevron-left mr-4' />
                Go Back
              </Link>
            </div>
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
                    {!order.isPaid && !user?.isAdmin && (
                      <ListGroup.Item className='text-center'>
                        {(loadingPay || !sdkReady) && (
                          <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' className='ml-2' />
                        )}
                        {sdkReady && <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />}
                      </ListGroup.Item>
                    )}
                    {user?.isAdmin && (
                      <ListGroup.Item>
                        {!order.isPaid && (
                          <p className='p-3' style={{ color: "red" }}>
                            * payment pending
                          </p>
                        )}
                        {order.isDelivered && (
                          <p className='p-3' style={{ color: "green" }}>
                            * Order Delivered
                          </p>
                        )}
                        <Button
                          className='btn-block'
                          disabled={!order.isPaid || order.isDelivered}
                          onClick={() => dispatch(deliveryStatus(match.params.id))}>
                          Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
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
