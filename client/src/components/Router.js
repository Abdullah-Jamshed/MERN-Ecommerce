import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// COMPONENTS
// import name from './';

// SCREEN
import HomeScreen from "../screens/HomeScreen";

const Routes = () => {
  return (
    <Router>
      <Route path='/' component={HomeScreen} />
    </Router>
  );
};

export default Routes;
