import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// SCREEN
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ShippingScreen from "../screens/ShippingScreen";
import PaymentScreen from "../screens/PaymentScreen";
import PlaceOrderScreen from "../screens/PlaceOrderScreen";
import OrderScreen from "../screens/OrderScreen";

// UI LIBRARY COMPONENT
import { Spinner } from "react-bootstrap";

// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

// STYLES
import "../styles/App.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { isUserLogin } from "../store/actions/userActions";

const Routes = () => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  // REDUX STATE
  const { isLoading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(isUserLogin());
  }, [dispatch]);

  return (
    <Router>
      <div className='App'>
        <main>
          <Header />
          {isLoading ? (
            <div className='text-center mt-4'>
              <Spinner animation='border' />
            </div>
          ) : (
            <Switch>
              <Route exact path='/' component={HomeScreen} />
              <Route exact path='/product/:id' component={ProductScreen} />
              <Route exact path='/cart/:id?' component={CartScreen} />
              <Route exact path='/login' component={LoginScreen} />
              <Route exact path='/register' component={RegisterScreen} />
              <Route exact path='/profile' component={ProfileScreen} />
              <Route exact path='/shipping' component={ShippingScreen} />
              <Route exact path='/payment' component={PaymentScreen} />
              <Route exact path='/placeOrder' component={PlaceOrderScreen} />
              <Route exact path='/order/:id' component={OrderScreen} />
              <Route component={NotFoundScreen} />
            </Switch>
          )}
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default Routes;
