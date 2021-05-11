import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Button, Card, Col, Container, Form, Image, ListGroup, Row, Spinner } from "react-bootstrap";

//  COMPONENTS
import Rating from "../components/Rating";
import Message from "../components/Message";
import Meta from "../components/Meta";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProduct, createReview } from "../store/actions/productActions";

const ProductScreen = ({ history, match }) => {
  // STATE
  const [qty, setQty] = useState(1);
  const [form, setForm] = useState({
    name: "",
    rating: 0,
    comment: "",
    user: "",
  });

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { product, errorMessage, isLoading, buttonLoader, successCreate } = useSelector((state) => state.productReducer);
  const { user } = useSelector((state) => state.userReducer);

  // HANDLER FUNCTIONS

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const formHandler = async (e) => {
    const { name, value, type } = e.target;
    if (type === "select-one") {
      setForm({ ...form, [name]: Number(value) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(match.params.id, { ...form, name: user.name, user: user._id }));
  };

  // LIFECYCLES

  useEffect(() => {
    if (successCreate) {
      setForm({ ...form, rating: 0, comment: "" });
      dispatch({ type: "PRODUCT_CREATE_REVIEW_RESET" });
    }
    dispatch(fetchProductById(match.params.id));
    // eslint-disable-next-line
  }, [match.params.id, dispatch, successCreate]);

  useEffect(() => {
    errorMessage && dispatch({ type: "PRODUCT_CLEAR_ERROR_MESSAGE" });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className='p-4'>
        <h4
          onClick={() => {
            dispatch(clearProduct());
            history.goBack();
          }}
          style={{ fontSize: "22px", textDecoration: "none" }}>
          <i className='fa fa-chevron-left mr-4' />
          Go Back
        </h4>
      </div>
      <Container className='text-center'>
        {!isLoading ? (
          product ? (
            <>
              <Meta title={product.name} />
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

                      <ListGroup.Item className='border-bottom-0 pb-0'>
                        <Row>
                          <Col>Quantity</Col>
                        </Row>
                      </ListGroup.Item>

                      {product.countInStock > 0 && (
                        <ListGroup.Item className='pt-1'>
                          <Row>
                            <Col xs={12} className='mt-2'>
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
                              {/* <p className='d-inline px-3'>{qty}</p> */}
                              <span className='d-inline px-3'>{qty}</span>
                              <Button
                                onClick={() => {
                                  if (qty < product.countInStock) setQty(qty + 1);
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
                        <Button onClick={addToCartHandler} className='btn-block' disabled={product.countInStock === 0} type='button'>
                          Add To Cart
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row className='mt-4 '>
                <Col md={6} className='mt-4 text-left'>
                  <h2>Reviews</h2>
                  {product.reviews.length === 0 ? (
                    <Message variant='info'>No Review</Message>
                  ) : (
                    <ListGroup variant='flush' className='mt-4'>
                      {product.reviews.map((review, i) => (
                        <ListGroup.Item key={i}>
                          <p style={{ fontSize: "18px", fontWeight: "bold" }}>{review.name}</p>
                          <Rating rating={review.rating} reviews={null} />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                  <ListGroup className='mt-4'>
                    {errorMessage && <Message variant='info'>{errorMessage}</Message>}
                    <h2> Write a Customer Review </h2>
                    {successCreate && <Message variant='success'>Successful</Message>}
                    {user ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control as='select' name='rating' value={form.rating} onChange={formHandler}>
                            <option value=''>...Select</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control as='textarea' row='3' name='comment' value={form.comment} onChange={formHandler}></Form.Control>
                        </Form.Group>
                        <Button disabled={buttonLoader || !form.rating || !form.comment} type='submit'>
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to review product
                      </Message>
                    )}
                  </ListGroup>
                </Col>
              </Row>
            </>
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
