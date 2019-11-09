import { Reducer } from "redux";
import {
  VENUE_PHOTOS,
  VENUE_PHOTOS_FAIL,
  VENUE_PHOTOS_SUCCESS
} from "./constants";
import { IVenueState, VenueAction } from "./types";
export const initialState: IVenueState = {
  isLoading: false,
  photos: {},
  error: null
};

const reducer: Reducer<IVenueState, VenueAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case VENUE_PHOTOS:
      return { ...state, error: null, isLoading: true };
    case VENUE_PHOTOS_SUCCESS:
      return {
        ...state,
        error: null,
        isLoading: false,
        photos: {
          ...state.photos,
          [action.id]: action.data
        }
      };
    case VENUE_PHOTOS_FAIL:
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

export default reducer;
