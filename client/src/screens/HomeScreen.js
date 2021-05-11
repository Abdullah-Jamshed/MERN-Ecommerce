import React, { useEffect } from "react";

// UI LIBRARY COMPONENTS
import { Col, Container, Row, Spinner } from "react-bootstrap";

// COMPONENTS
import Product from "../components/Product";
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../store/actions/productActions";
import { isUserLogin } from "../store/actions/userActions";

const HomeScreen = ({ match }) => {
  const { keyword } = match.params;

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { products, errorMessage, isLoading } = useSelector((state) => state.productReducer);

  // LIFECYCLES

  useEffect(() => {
    dispatch(isUserLogin());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: "PRODUCT_CLEAR_ERROR_MESSAGE" });
    dispatch({ type: "PRODUCTS_RESET" });
    dispatch(fetchProduct(keyword));
  }, [dispatch, keyword]);

  return (
    <Container className='py-4 text-center'>
      {!isLoading ? (
        <>
          {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
          {products.length !== 0 && (
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
          )}
        </>
      ) : (
        <Spinner className='mt-4' animation='grow' />
      )}
    </Container>
  );
};

export default HomeScreen;

// import React, { useEffect } from "react";

// // UI LIBRARY COMPONENTS
// import { Col, Container, Row, Spinner } from "react-bootstrap";

// // COMPONENTS
// import Product from "../components/Product";
// import Message from "../components/Message";

// // REDUX
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProduct } from "../store/actions/productActions";
// import { isUserLogin } from "../store/actions/userActions";

// const HomeScreen = ({ match }) => {
//   const { keyword } = match.params;

//   // REDUX DISPATCH HOOK
//   const dispatch = useDispatch();

//   // REDUX STATE
//   const { products, errorMessage, isLoading } = useSelector((state) => state.productReducer);

//   // LIFECYCLES

//   useEffect(() => {
//     dispatch(isUserLogin());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(fetchProduct(keyword));
//   }, [dispatch, keyword]);

//   return (
//     <Container className='py-4 text-center'>
//       {!isLoading ? (
//         products.length !== 0 ? (
//           <>
//             <h1>Latest Product</h1>
//             <Row>
//               {products.map((product) => (
//                 <Col key={product._id} sm={12} md={6} lg={3} className=''>
//                   <Product product={product} />
//                 </Col>
//               ))}
//             </Row>
//           </>
//         ) : errorMessage ? (
//           <Message variant='danger'>{errorMessage}</Message>
//         ) : null
//       ) : (
//         <Spinner className='mt-4' animation='grow' />
//       )}
//     </Container>
//   );
// };

// export default HomeScreen;
