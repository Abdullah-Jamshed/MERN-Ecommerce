import React, { useEffect } from "react";

// UI LIBRARY COMPONENT
import { Container, Spinner } from "react-bootstrap";

//  COMPONENT
// import Message from "../components/Message";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { getOrderById } from "../store/actions/orderDetailActions";

const OrderScreen = ({ history, match }) => {
  // STATE;

  // REDUX STATE HOOK
  const { order, isLoading } = useSelector((state) => state.orderDetailReducer);

  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // LIFECYCLE

  useEffect(() => {
    dispatch(getOrderById(match.params.id));
  }, []);
  return (
    <Container>
      <div className='text-center py-4'>{isLoading && <Spinner className='mt-4' animation='grow' />}</div>
      {/* <h1>Order id == {match.params.id}</h1> */}
      {order && order.orderItems.map((item) => <p>{item.name}</p>)}
    </Container>
  );
};

export default OrderScreen;
