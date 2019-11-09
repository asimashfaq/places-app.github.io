import { Reducer } from "redux";
import { IPlacesListState, TAction } from "./types";

const initialState: IPlacesListState = {
  isLoading: false,
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

export default reducer;
