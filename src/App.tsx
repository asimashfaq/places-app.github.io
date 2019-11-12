import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import Places from "./modules/places/Places";
import { store } from "./store";
import { Header } from "./views";

function App() {
  return (
    <>
      <Provider store={store}>   
          <Router>
            <div className="bg-app w-100 overflow-hidden">
              <div className="h-screen flex flex-col">
              <SearchProvider>
                <div className="w-full py-3 bg-white border-b border-gray-300 text-white lg:py-4">
                  <div className="w-full pl-4 pr-6" style={{maxWidth:'800px'}}>
                    <Header />
                  </div>
                </div>
                  <Switch>
                    <Route path="/" component={Places}></Route>
                  </Switch>
                </SearchProvider>
              </div>
            </div>
          </Router>
      </Provider>
    </>
  );
}

export default App;
