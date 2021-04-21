import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import shippingReducer from "./shippingReducer";
import paymentReducer from "./paymentReducer";
import placeOrderReducer from "./placeOrderReducer";

export default combineReducers({
  productReducer,
  cartReducer,
  userReducer,
  shippingReducer,
  paymentReducer,
  placeOrderReducer,
});
