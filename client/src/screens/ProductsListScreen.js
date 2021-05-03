import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";

// COMPONENTS
import Message from "../components/Message";
import ModalComponent from "../components/ModalComponent";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProduct, createProduct } from "../store/actions/productActions";

const ProductsListScreen = ({ history }) => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE HOOK
  const { isLoading: isUserLoading, user, token } = useSelector((state) => state.userReducer);
  const { isLoading, products, errorMessage, deleteSuccess, createdProduct, successCreate } = useSelector((state) => state.productReducer);

  //STATE
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState("");

  const [product, setProduct] = useState({
    price: 250.99,
    countInStock: 5,
    name: "HP Envy core i7 9th generation Laptop",
    image: "/images/laptop.jpg",
    description: "HP Envy7 core i7 9th generation Laptop",
    brand: "HP",
    category: "Sample category",
    user: "",
  });

  // HANDLER FUNCTIONS

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const modalHandler = (id) => {
    setId(id);
    setModalShow(true);
  };

  const createProductHandler = () => {
    dispatch(createProduct({ ...product, user: user._id }));
  };

  // useEffect(() => {
  //   if (token) {
  //     if (!isUserLoading) {
  //       if (user && user.isAdmin) {
  //         dispatch(fetchProduct());
  //       } else {
  //         history.push("/login");
  //       }
  //     }
  //   } else {
  //     history.push("/login");
  //   }
  //   // eslint-disable-next-line
  // }, [dispatch, user, history, token]);

  useEffect(() => {
    if (token) {
      if (!isUserLoading) {
        if (!user.isAdmin) {
          history.push("/login");
        } else if (successCreate) {
          history.push(`/admin/product/${createdProduct._id}/edit`);
          dispatch({ type: "PRODUCT_CREATE_RESET" });
        } else {
          dispatch(fetchProduct());
        }
      }
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [dispatch, user, history, token, successCreate, createdProduct]);

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
          <Button onClick={createProductHandler}>
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
        </>
      )}
    </Container>
  );
};

export default ProductsListScreen;
