import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// UI LIBRARY COMPONENT
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";

// COMPONENTS
import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../store/actions/orderDetailActions";

const OrderListScreen = ({ history }) => {
  //STATE

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE HOOK
  const { isLoading: isUserLoading, user, token } = useSelector((state) => state.userReducer);
  const { orders, errorMessage, isLoading } = useSelector((state) => state.orderDetailReducer);

  // HANDLER FUNCTIONS

  useEffect(() => {
    if (token) {
      if (!isUserLoading) {
        if (!user?.isAdmin) {
          history.push("/login");
        } else {
          dispatch(getOrders());
        }
      }
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [dispatch, user, history, token]);

  useEffect(() => {
    errorMessage && dispatch({ type: "ORDER_CLEAR_ERROR_MESSAGE" });
    // eslint-disable-next-line
  }, []);

  return (
    <Container fluid className='p-4'>
      <Row className='align-items-center my-4'>
        <Col>
          <h1>Orders</h1>
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
          {orders.length !== 0 && (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.createdAt.substring(0, 10)}</td>
                    <td>{item.totalPrice}</td>
                    <td className='text-center'>
                      {item.isPaid ? item.paidAt.substring(0, 10) : <i className='fa fa-times' style={{ color: "red" }} />}
                    </td>
                    <td className='text-center'>
                      {item.isDelivered ? item.deliverAt.substring(0, 10) : <i className='fa fa-times' style={{ color: "red" }} />}
                    </td>
                    <td>
                      <Button className='btn-sm' as={Link} to={`/order/${item._id}`} variant='light'>
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </Container>
  );
};

export default OrderListScreen;
