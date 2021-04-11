import React, { useEffect } from "react";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "../store/actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { cartItems } = useSelector((state) => state.cartReducer);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    dispatch(addCartItem(match.params.id, qty));
  }, [dispatch, match, qty]);

  return (
    <div>
      <h1>Cart Screen</h1>
    </div>
  );
};

export default CartScreen;
