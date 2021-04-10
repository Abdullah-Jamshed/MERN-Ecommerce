import React, { useEffect } from "react";

// import API from "../api";

// UI LIBRARY COMPONENTS
import { Col, Container, Row, Spinner } from "react-bootstrap";

// DUMMY DATA
// import products from "../dummyData/products";

// COMPONENTS
import Product from "../components/Product";

// REDUX
// actions
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/actions/productActions";

const HomeScreen = () => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    console.log("Loading data ...");
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <Container className='py-4 text-center'>
      <h1>Latest Product</h1>
      {products.length !== 0 ? (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={3} className=''>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Spinner className='mt-4' animation='grow' />
      )}
    </Container>
  );
};

export default HomeScreen;
