import React from "react";

// UI LIBRARY COMPONENTS
import { Container } from "react-bootstrap";

// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

// SCREENS
import HomeScreen from "../screens/HomeScreen";

// STYLES
import "../styles/App.css";

const App = () => {
  return (
    <>
      <div className='App'>
        <div>
          <Header />
          <Container className='py-4 text-center'>
            <HomeScreen />
          </Container>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
