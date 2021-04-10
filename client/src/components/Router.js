import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// SCREEN
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";

// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

// STYLES
import "../styles/App.css";

const Routes = () => {
  return (
    <Router>
      <div className='App'>
        <main>
          <Header />
          <Route exact path='/' component={HomeScreen} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart' component={CartScreen} />
          <Route path='/login' component={LoginScreen} />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
};

export default Routes;
