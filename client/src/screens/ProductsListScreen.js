import React, { useEffect, useState } from "react";
import { Link, Route } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";

// COMPONENTS
import Message from "../components/Message";
import ModalComponent from "../components/ModalComponent";
import Paginate from "../components/Paginate";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProduct } from "../store/actions/productActions";

const ProductsListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE HOOK
  const { isLoading: isUserLoading, user, token } = useSelector((state) => state.userReducer);
  const { isLoading, products, errorMessage, deleteSuccess, createdProduct, page, pages } = useSelector((state) => state.productReducer);

  //STATE
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState("");

  // HANDLER FUNCTIONS

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const modalHandler = (id) => {
    setId(id);
    setModalShow(true);
  };

  useEffect(() => {
    if (token) {
      if (!isUserLoading) {
        if (!user.isAdmin) {
          history.push("/login");
        } else {
          dispatch(fetchProduct("", pageNumber));
        }
      }
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [dispatch, user, history, token, createdProduct, pageNumber]);

  useEffect(() => {
    errorMessage && dispatch({ type: "PRODUCT_CLEAR_ERROR_MESSAGE" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (deleteSuccess) dispatch(fetchProduct());
  }, [dispatch, deleteSuccess]);

  return (
    <Container fluid className='p-4'>
      <ModalComponent id={id} handlerFunction={deleteProductHandler} show={modalShow} onHide={() => setModalShow(false)}>
        Are sure you want to delete product ?
      </ModalComponent>

      <Row className='align-items-center my-4'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button as={Link} to='/admin/product/create'>
            <i className='fa fa-plus mr-1' /> Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <div className='text-center'>
          <Spinner animation='border' />
        </div>
      ) : errorMessage ? (
        <Message variant='danger'>{errorMessage}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>PRODUCT NAME</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>

                  <td>
                    <Link to={`/product/${product._id}`}>{product.name}</Link>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>
                    <Row>
                      <Col xs={12} lg={6}>
                        <Button className={"w-100"} as={Link} to={`/admin/product/${product._id}/edit`}>
                          <i className='fa fa-edit' />
                        </Button>
                      </Col>
                      <Col xs={12} lg={6}>
                        <Button className={"w-100"} onClick={() => modalHandler(product._id)}>
                          <i className='fa fa-trash ' />
                        </Button>
                      </Col>
                    </Row>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Route render={({ history }) => <Paginate history={history} page={page} pages={pages} isAdmin={user?.isAdmin} />} />
        </>
      )}
    </Container>
  );
};

export default ProductsListScreen;
