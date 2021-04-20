import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";

// COMPONENTS
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../store/actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { cartItems } = useSelector((state) => state.cartReducer);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  // HANDLER FUNCTIONS

  const removeCartHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkOutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  // LIFECYCLE

  useEffect(() => {
    if (match.params.id) dispatch(addCartItem(match.params.id, qty));
  }, [dispatch, match, qty]);

  return (
    <>
      <Container className='text-center mt-2 pt-4'>
        <Row className='mt-4'>
          <Col md={8}>
            <h1 className='text-left mb-4'>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Your Cart is Empty <Link to='/'>Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant='flush'>
                {cartItems.map((product) => (
                  <ListGroup.Item key={product.productId}>
                    <Row className='p-0'>
                      <Col xs={12} md={2}>
                        <Image src={product.image} alt={product.name} fluid rounded />
                      </Col>
                      <Col xs={12} md={3}>
                        <Link to={`/product/${product.productId}`}>{product.name}</Link>
                      </Col>
                      <Col xs={12} md={2}>
                        ${product.price}
                      </Col>

                      <Col xs={12} md={4} className='text-center mt-2'>
                        <Button
                          onClick={() => {
                            if (product.qty > 1) dispatch(addCartItem(product.productId, product.qty - 1));
                          }}
                          className='px-2 py-1'
                          style={{ fontSize: "16px" }}
                          variant='dark'>
                          -
                        </Button>
                        <p className='d-inline px-3'>{product.qty}</p>
                        <Button
                          onClick={() => {
                            if (product.qty <= product.countInStock) dispatch(addCartItem(product.productId, product.qty + 1));
                          }}
                          className='px-2 py-1'
                          style={{ fontSize: "16px" }}
                          variant='dark'>
                          +
                        </Button>
                      </Col>
                      <Col className='text-right' md={1}>
                        <Button type='button' variant='ligth' onClick={() => removeCartHandler(product.productId)}>
                          <i style={{ fontSize: "16px" }} className='fa fa-trash' />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h4>Subtotals ({cartItems.reduce((acc, product) => acc + product.qty, 0)}) items</h4>$
                  {cartItems.reduce((acc, product) => acc + product.qty * product.price, 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button type='button' className='btn-block' onClick={checkOutHandler} disabled={cartItems.length === 0}>
                    Proceed to Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
