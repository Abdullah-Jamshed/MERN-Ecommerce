import React from "react";

// UI LIBRARY COMPONENTS
import { Container } from "react-bootstrap";

// COMPONENTS
import Header from "./Header";
import Footer from "./Footer";

// STYLES
import "../styles/App.css";

const App = () => {
  return (
    <>
      <div className='App'>
        <div>
          <Header />
          <Container classNam='py-3'>
            <h1>Hello world</h1>
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
