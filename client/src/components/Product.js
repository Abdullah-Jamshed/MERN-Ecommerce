import React from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Card } from "react-bootstrap";

//  COMPONENTS
import Rating from "./Rating";

// STYLES
const styles = {
  textStyle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const Product = ({ product }) => {
  return (
    <Card style={{ width: "100%" }} className='my-2 mx-auto'>
      <Link to={`product/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
      </Link>
      <Card.Body className='text-left'>
        <Card.Title style={styles.textStyle}>{product.name}</Card.Title>
        <Card.Text as='div'>
          <Rating rating={product.rating} reviews={product.numReviews} />
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
