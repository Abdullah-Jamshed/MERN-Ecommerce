import React from "react";
import { Col, Row } from "react-bootstrap";

// DUMMY DATA
import products from "../dummyData/products";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((item) => (
          <Col sm={12} md={6}>
            <h3>{products.name}</h3>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
