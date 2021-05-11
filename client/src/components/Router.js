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
import UserListScreen from "../screens/UserListScreen";
import UserEditScreen from "../screens/UserEditScreen";
import ProductsListScreen from "../screens/ProductsListScreen";
import ProductEditScreen from "../screens/ProductEditScreen";
import ProductCreateScreen from "../screens/ProductCreateScreen";
import OrderListScreen from "../screens/OrderListScreen";

// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

// STYLES
import "../styles/App.css";

// REDUX
import { useDispatch } from "react-redux";
import { isUserLogin } from "../store/actions/userActions";

const Routes = () => {
  // REDUX DISPATCH HOOK
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isUserLogin());
  }, [dispatch]);

  return (
    <Router>
      <div className='App'>
        <main>
          <Header />
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route path='/page/:pageNumber' component={HomeScreen} />
            <Route exact path='/search/:keyword' component={HomeScreen} />
            <Route path='/search/:keyword/page/:pageNumber' component={HomeScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/login' component={LoginScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeOrder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/admin/users' component={UserListScreen} />
            <Route path='/admin/user/:id/edit' component={UserEditScreen} />
            <Route exact path='/admin/products' component={ProductsListScreen} />
            <Route path='/admin/products/:pageNumber' component={ProductsListScreen} />
            <Route path='/admin/product/:id/edit' component={ProductEditScreen} />
            <Route path='/admin/product/create' component={ProductCreateScreen} />
            <Route path='/admin/orders' component={OrderListScreen} />
            <Route path='*' component={NotFoundScreen} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default Routes;
