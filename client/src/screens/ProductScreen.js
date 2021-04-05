import React from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Button, Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";

//  COMPONENTS
import Rating from "../components/Rating";

// DUMMY DATA
import products from "../dummyData/products";

const ProductScreen = ({ match }) => {
  const product = products.find((product) => product._id === match.params.id);
  return (
    <>
      <div className='p-4'>
        <Link to='/' style={{ fontSize: "22px", textDecoration: "none" }}>
          <i className='fa fa-chevron-left mr-4' />
          Go Back
        </Link>
      </div>
      <Container className=''>
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
      </Container>
    </>
  );
};

export default ProductScreen;
