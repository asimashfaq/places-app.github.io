import React from "react";
import { Container } from "reactstrap";
import { SearchProvider } from "./context/SearchContext";
import Places from "./modules/places/Places";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { Header, Footer } from "./views";


import "../src/App.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div className="bg-app w-100">
              <div className="h-screen flex flex-col">
                <div className="w-full py-2 bg-blue-800 text-white">
                  <Container className="mx-auto">
                    <Header />
                  </Container>
                </div>
                <SearchProvider>
                  <Places />
                </SearchProvider>
              </div>
              <Footer />
            </div>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
