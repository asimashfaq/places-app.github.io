import {
  IObject,
  ISearchAction,
  ISearchFailAction,
  ISearchSuccessAction
} from "./types";

export const search = (
  query: string,
  lat: number,
  lng: number
): ISearchAction => ({
  type: "SEARCH",
  query,
  lat,
  lng
});

export const searchSuccess = (data: IObject): ISearchSuccessAction => ({
  type: "SEARCH_SUCCESS",
  data
});

export const searchFail = (error: { message: string }): ISearchFailAction => ({
  type: "SEARCH_FAIL",
  error
});
