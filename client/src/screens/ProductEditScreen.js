import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Container, Button, Form, Spinner, ProgressBar } from "react-bootstrap";

//  COMPONENT
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
// import {  } from "../store/actions/userActions";
import { fetchProductById, clearProduct, productUpdate, fileUpload } from "../store/actions/productActions";

const ProductEditScreen = ({ match, history }) => {
  const { id } = match.params;

  // STATE;
  const [form, setForm] = useState({
    price: "",
    countInStock: 0,
    name: "",
    image: "",
    description: "",
    brand: "",
    category: "",
  });

  //   const redirect = location.search ? location.search.split("=")[1] : "/";

  // REDUX STATE HOOK
  const { user, isLoading, token } = useSelector((state) => state.userReducer);
  const { product, errorMessage, successUpdate, buttonLoader, imageUrl, progress } = useSelector((state) => state.productReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // HANDLER FUNCTIONS

  const formHandler = async (e) => {
    const { name, value, type } = e.target;
    if (type === "number") {
      setForm({ ...form, [name]: Number(value) });
    } else if (type === "file") {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      dispatch(fileUpload(formData));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(productUpdate(id, form));
    dispatch({ type: "PRODUCT_CLEAR_ERROR_MESSAGE" });
  };

  // LIFECYCLE

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: "PRODUCT_UPDATE_RESET" });
      history.push("/admin/products");
    } else {
      if (token) {
        if (!isLoading) {
          if (user && user.isAdmin) {
            dispatch(fetchProductById(id));
          } else {
            history.push("/");
          }
        }
      } else {
        history.push("/");
      }
    }
    // eslint-disable-next-line
  }, [dispatch, user, token, history, id, successUpdate]);

  useEffect(() => {
    errorMessage && dispatch({ type: "PRODUCT_CLEAR_ERROR_MESSAGE" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  useEffect(() => {
    if (imageUrl) {
      setForm({ ...form, image: imageUrl });
    }
    // eslint-disable-next-line
  }, [imageUrl]);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        dispatch({ type: "PROGRESS", payload: { progress: 0 } });
      }, 5000);
    }
  }, [dispatch, progress]);

  return (
    <Container className='py-4'>
      {isLoading ? (
        <div className='text-center'>
          <Spinner as='span' animation='border' size='lg' role='status' aria-hidden='true' className='ml-2' />
        </div>
      ) : (
        <>
          <div className='p-4'>
            <Link onClick={() => dispatch(clearProduct())} to='/admin/products' style={{ fontSize: "22px", textDecoration: "none" }}>
              <i className='fa fa-chevron-left mr-4' />
              Go Back
            </Link>
          </div>
          <FormContainer>
            {progress !== 0 && <ProgressBar now={progress} label={`${progress}%`} className='mb-4' />}
            <h1>Update Product</h1>
            {errorMessage && <Message variant='danger'>{errorMessage}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='name'>
                <Form.Label>Name : </Form.Label>
                <Form.Control type='text' placeholder='name' value={form.name} name='name' onChange={formHandler}></Form.Control>
              </Form.Group>

              <Form.Group controlId='price'>
                <Form.Label>Price : </Form.Label>
                <Form.Control type='text' placeholder='price' value={form.price} name='price' onChange={formHandler}></Form.Control>
              </Form.Group>

              {/* <Form.Group controlId='image'>
                <Form.Label>Image : </Form.Label>
                <Form.Control type='text' placeholder='upload image' value={form.image} name='image' onChange={formHandler}></Form.Control>
              </Form.Group> */}

              <Form.Group controlId='image'>
                <Form.Label>Image : </Form.Label>
                <Form.Control type='text' placeholder='upload image' value={form.image} name='image' onChange={formHandler}></Form.Control>
                <Form.File id='image-file' label='Choose File' custom onChange={formHandler}></Form.File>
                {/* {uploading && <Spinner animation='border' />} */}
              </Form.Group>

              <Form.Group controlId='brand'>
                <Form.Label>Brand : </Form.Label>
                <Form.Control type='text' placeholder='brand' value={form.brand} name='brand' onChange={formHandler}></Form.Control>
              </Form.Group>

              <Form.Group controlId='countInStock'>
                <Form.Label>Count In Stock : </Form.Label>
                <Form.Control
                  type='number'
                  placeholder='countInStock'
                  value={form.countInStock}
                  name='countInStock'
                  onChange={formHandler}></Form.Control>
              </Form.Group>

              <Form.Group className='descriptionText' controlId='description'>
                <Form.Label>Description : </Form.Label>
                <Form.Control
                  as='textarea'
                  rows={6}
                  maxLength={350}
                  //   type='text'
                  placeholder='description'
                  value={form.description}
                  name='description'
                  onChange={formHandler}></Form.Control>
              </Form.Group>

              <Form.Group controlId='category'>
                <Form.Label>category : </Form.Label>
                <Form.Control type='text' placeholder='category' value={form.category} name='category' onChange={formHandler}></Form.Control>
              </Form.Group>

              {/* <Form.Group controlId='adminCheck'>
              <Form.Check label='isAdmin' name='isAdmin' type={"checkbox"} value={form.isAdmin} checked={form.isAdmin} onChange={formHandler} />
              </Form.Group> */}

              <Button type='submit' className='mt-2 btn-block' disabled={buttonLoader}>
                Update {buttonLoader && <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' className='ml-2' />}
              </Button>
            </Form>
          </FormContainer>
        </>
      )}
    </Container>
  );
};

export default ProductEditScreen;
