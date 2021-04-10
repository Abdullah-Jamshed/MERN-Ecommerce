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
  const { products, isLoading } = useSelector((state) => state.productReducer);

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
          <h2 className='text-center'>No Product Found</h2>
        )
      ) : (
        <Spinner className='mt-4' animation='grow' />
      )}
    </Container>
  );
};

export default HomeScreen;
