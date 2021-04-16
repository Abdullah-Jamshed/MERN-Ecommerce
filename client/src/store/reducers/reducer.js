import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import userReducer from "./userReducer";
import shippingReducer from "./shippingReducer";

export default combineReducers({
  productReducer,
  cartReducer,
  userReducer,
  shippingReducer,
});
