import React from "react";
import { Link } from "react-router-dom";
// UI LIBRARY COMPONENTS
import { Button, Card, Col } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card style={{ width: "18rem" }} className='m-2'>
      <Link to={`product/${product._id}`}>
        <Card.Img variant='top' src={product.image} />
      </Link>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        {/* <Card.Text>{product.description}</Card.Text> */}
        <Card.Text>
          {product.rating} from {product.numReviews}
        </Card.Text>
        <Card.Text as='h3'>${product.price}</Card.Text>
        {/* <Button variant='primary'>Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default Product;
