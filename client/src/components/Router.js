import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// SCREEN
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "./NotFoundScreen";

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
          <Switch>
            <Route exact path='/' component={HomeScreen} />
            <Route exact path='/product/:id' component={ProductScreen} />
            {/* <Route exact path='/cart' component={CartScreen} /> */}
            <Route exact path='/cart/:id?' component={CartScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route component={NotFoundScreen} />
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
