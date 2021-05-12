import React, { useEffect } from "react";
import { Route } from "react-router-dom";

// UI LIBRARY COMPONENTS
import { Col, Container, Row, Spinner } from "react-bootstrap";

// COMPONENTS
import Product from "../components/Product";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/actions/productActions";
// import { isUserLogin } from "../store/actions/userActions";

const HomeScreen = ({ history, match }) => {
  const { keyword, pageNumber } = match.params;
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { products, errorMessage, isLoading, pages, page } = useSelector((state) => state.productReducer);
  const { isLoading: isUserLoading } = useSelector((state) => state.userReducer);

  // LIFECYCLES

  // useEffect(() => {
  //   dispatch(isUserLogin());
  // }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "PRODUCT_CLEAR_ERROR_MESSAGE" });
    dispatch({ type: "PRODUCTS_RESET" });
    dispatch(fetchProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      <Container fluid className='py-4 text-center'>
        {!isLoading && !isUserLoading ? (
          <>
            {!keyword ? (
              <ProductCarousel />
            ) : (
              <div className='p-4 text-left' style={{ cursor: "pointer" }}>
                <h4
                  onClick={() => {
                    history.push("/");
                  }}
                  style={{ fontSize: "22px", textDecoration: "none" }}>
                  <i className='fa fa-chevron-left mr-4' />
                  Go Back
                </h4>
              </div>
            )}
            <Container className='py-4 text-center'>
              {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
              {products.length !== 0 && (
                <>
                  <h1>Latest Product</h1>
                  <Row>
                    {products.map((product) => (
                      <Col key={product._id} sm={12} md={6} lg={3}>
                        <Product product={product} />
                      </Col>
                    ))}
                  </Row>
                  <Route render={({ history }) => <Paginate history={history} page={page} pages={pages} isAdmin={false} keyword={keyword || ""} />} />
                </>
              )}
            </Container>
          </>
        ) : (
          <Spinner className='mt-4' animation='grow' />
        )}
      </Container>
    </>
  );
};

export default HomeScreen;
