import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { searchEpic } from "./modules/places/epics";
import datalistReducer from "./modules/places/reducer";
import { venuePhotoEpic } from "./modules/venue/epics";
import venuePicReducer from "./modules/venue/reducer";

const rootReducer = combineReducers({
  dataList: datalistReducer,
  venuePic: venuePicReducer
});
const w: any = window as any;

const epicMiddleware = createEpicMiddleware();
let middlewares = [applyMiddleware(epicMiddleware)];

if (process.env.NODE_ENV === "development") {
  middlewares.push(
    w.__REDUX_DEVTOOLS_EXTENSION__ ? w.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  );
}

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, compose(...middlewares));
const persistor = persistStore(store);

const rootEpic = combineEpics(searchEpic, venuePhotoEpic);
epicMiddleware.run(rootEpic);

export { store, persistor };
