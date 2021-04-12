import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Button, Col, Container, Image, ListGroup, Row } from "react-bootstrap";

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
      <h1 className='text-center pt-4'>Shopping Cart</h1>
      <Container>
        <Row>
          <Col md={8}>
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
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>

          <Col md={2}></Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
