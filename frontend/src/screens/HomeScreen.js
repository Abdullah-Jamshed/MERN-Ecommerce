import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

// DUMMY DATA
import products from "../dummyData/products";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row className=''>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4}>
            <Card style={{ width: "18rem" }} className='m-2'>
              <Card.Img variant='top' src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                {/* <Button variant='primary'>Go somewhere</Button> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
