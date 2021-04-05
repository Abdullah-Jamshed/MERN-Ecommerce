import React from "react";

// UI LIBRARY COMPONENTS
import { Col, Container, Row } from "react-bootstrap";

// DUMMY DATA
import products from "../dummyData/products";

// COMPONENTS
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <Container className='py-4 text-center'>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={3} className=''>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomeScreen;
