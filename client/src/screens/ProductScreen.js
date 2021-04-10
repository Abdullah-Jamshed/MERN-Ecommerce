import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Button, Card, Col, Container, Image, ListGroup, Row, Spinner } from "react-bootstrap";

//  COMPONENTS
import Rating from "../components/Rating";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProduct } from "../store/actions/productActions";

const ProductScreen = ({ match }) => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { product, isLoading } = useSelector((state) => state.productReducer);

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
            <h2 className='text-center'>Product Not Found</h2>
          )
        ) : (
          <Spinner className='mt-4 ' animation='grow' />
        )}
      </Container>
    </>
  );
};

export default ProductScreen;
