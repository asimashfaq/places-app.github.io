import { Reducer } from "redux";
import { IVenueState, TAction } from "./types";

const initialState: IVenueState = {
  isLoading: false,
  data: undefined,
  error: null
};

const reducer: Reducer<IVenueState, TAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "VENUE_PIC":
      return { ...state, error: null, isLoading: true };
    case "VENUE_PIC_SUCCESS":
      return { ...state, error: null, isLoading: false, data: action.data };
    case "VENUE_PIC_FAIL":
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default reducer;
