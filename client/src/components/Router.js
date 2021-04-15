import React,{useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// SCREEN
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";

// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

// STYLES
import "../styles/App.css";

// REDUX
// actions
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
            <Route exact path='/product/:id' component={ProductScreen} />
            {/* <Route exact path='/cart' component={CartScreen} /> */}
            <Route exact path='/cart/:id?' component={CartScreen} />
            <Route exact path='/login' component={LoginScreen} />
            <Route exact path='/register' component={RegisterScreen} />
            <Route exact path='/profile' component={ProfileScreen} />
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
