import React from "react";
import { Col, Row } from "react-bootstrap";

// DUMMY DATA
import products from "../dummyData/products";

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6}>
            <h3>{product.name}</h3>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
