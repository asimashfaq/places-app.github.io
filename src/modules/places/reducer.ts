import { Reducer } from "redux";
import { IPlacesListState, TAction } from "./types";

const initialState: IPlacesListState = {
  isLoading: true,
  data: undefined,
  error: null
};

const reducer: Reducer<IPlacesListState, TAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "SEARCH":
      return { ...state, error: null, isLoading: true };
    case "SEARCH_SUCCESS":
      return { ...state, error: null, isLoading: false, data: action.data };
    case "SEARCH_FAIL":
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};
export const MapReducer = (state, action) => {
  switch (action.type) {
    case "init":
      return action.payload;
    case "change":
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng,
        loader: true
      };
    case "stoploader":
      return {
        ...state,
        loader: false
      };
    default: {
      return state;
    }
  }
};
export default reducer;
