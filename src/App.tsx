import { mount, route } from 'navi'
import React ,{ Suspense} from "react";
import { Router, View } from 'react-navi'
import { Provider } from "react-redux";
import { SearchProvider } from "./context/SearchContext";
import Places from "./modules/places/Places";

import { store } from "./store";
import { Header } from "./views";

// Define routes using mount(), route(), and other middleware.
const routes =
  mount({
    '/': route( async req => {
      const { lat,lng, fake } = req.params
      return {
        view: <Places lat={parseFloat(lat)} lng={parseFloat(lng)} fake={fake} />
      }
    })
  })

function App() {
  return (
    <>
      <Provider store={store}>   
          <Router routes={routes}>
            <div className="bg-app w-100 overflow-hidden">
              <div className="h-screen flex flex-col">
              <SearchProvider>
                <div className="w-full py-3 bg-white border-b border-gray-300 text-white lg:py-4">
                  <div className="w-full pl-4 pr-6" style={{maxWidth:'800px'}}>
                    <Header />
                  </div>
                </div>
                <Suspense fallback={null}>
                  <View />
                </Suspense>
                </SearchProvider>
              </div>
            </div>
          </Router>
      </Provider>
    </>
  );
}

export default App;
