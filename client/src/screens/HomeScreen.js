import React, { useEffect } from "react";

// import API from "../api";

// UI LIBRARY COMPONENTS
import { Col, Container, Row, Spinner } from "react-bootstrap";

// DUMMY DATA
// import products from "../dummyData/products";

// COMPONENTS
import Product from "../components/Product";
import Message from "../components/Message";

// REDUX
// actions
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/actions/productActions";
import { isUserLogin } from "../store/actions/userActions";

const HomeScreen = () => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { products, errorMessage, isLoading } = useSelector((state) => state.productReducer);

  // LIFECYCLES

  useEffect(() => {
    dispatch(isUserLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <Container className='py-4 text-center'>
      {!isLoading ? (
        products.length !== 0 ? (
          <>
            <h1>Latest Product</h1>
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={3} className=''>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          </>
        ) : (
          <Message variant='danger'>{errorMessage}</Message>
        )
      ) : (
        <Spinner className='mt-4' animation='grow' />
      )}
    </Container>
  );
};

export default HomeScreen;
