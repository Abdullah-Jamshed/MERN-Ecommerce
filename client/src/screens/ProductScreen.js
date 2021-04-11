import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Button, Card, Col, Container, Form, Image, ListGroup, Row, Spinner } from "react-bootstrap";

//  COMPONENTS
import Rating from "../components/Rating";
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProduct } from "../store/actions/productActions";

const ProductScreen = ({ match }) => {
  // STATE
  const [qty, setQty] = useState(1);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { product, errorMessage, isLoading } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(fetchProductById(match.params.id));
  }, [match.params.id, dispatch]);

  return (
    <>
      <div className='p-4'>
        <Link onClick={() => dispatch(clearProduct())} to='/' style={{ fontSize: "22px", textDecoration: "none" }}>
          <i className='fa fa-chevron-left mr-4' />
          Go Back
        </Link>
      </div>
      <Container className='text-center'>
        {!isLoading ? (
          product ? (
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating rating={product.rating} reviews={product.numReviews} />
                  </ListGroup.Item>
                  <ListGroup.Item as={"h4"}>Price : ${product.price}</ListGroup.Item>
                  <ListGroup.Item>Description :{product.description}</ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant='flush'>
                    <ListGroup.Item>
                      <Row>
                        <Col>Price :</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status :</Col>
                        <Col>
                          <strong>{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col xs={12} xl={6}>
                            Qty :
                          </Col>
                          <Col xs={12} xl={6} className='mt-2'>
                            {/* <Form.Control
                              as='select'
                              value={qty}
                              onChange={(e) => {
                                setQty(e.target.value);
                              }}>
                              {[...Array(product.countInStock).keys()].map((x) => (
                                <option key={x + 1}>{x + 1}</option>
                              ))}
                            </Form.Control> */}
                            <Button
                              onClick={() => {
                                if (qty > 1) setQty(qty - 1);
                              }}
                              className='px-2 py-1'
                              style={{ fontSize: "16px" }}
                              variant='dark'>
                              -
                            </Button>
                            <p className='d-inline px-3'>{qty}</p>
                            <Button
                              onClick={() => {
                                if (qty <= product.countInStock) setQty(qty + 1);
                              }}
                              className='px-2 py-1'
                              style={{ fontSize: "16px" }}
                              variant='dark'>
                              +
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}

                    <ListGroup.Item>
                      <Button className='btn-block' disabled={product.countInStock === 0} type='button'>
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          ) : (
            <Message variant='info'>{errorMessage}</Message>
          )
        ) : (
          <Spinner className='mt-4 ' animation='grow' />
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
