import React from "react";
import { useHistory, Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Container } from "react-bootstrap";

//  COMPONENTS
import Rating from "./Rating";

// DUMMY DATA
import products from "../dummyData/products";

const ProductScreen = () => {
  const history = useHistory();
  console.log(history);
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

export default ProductScreen;
