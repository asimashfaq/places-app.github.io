import { ofType } from "redux-observable";
import { from, Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { catchError, map, switchMap } from "rxjs/operators";
import * as config from "../../config";
import * as api from "../../services/api";
import { searchFail, searchSuccess } from "./action";
import { ISearchAction } from "./types";
export const searchEpic = (action$: any) =>
  action$.pipe(
    ofType("SEARCH"),
    switchMap((action: ISearchAction) =>
      from(
        api.getSearchResults(action.query, action.lat, action.lng, false)
      ).pipe(
        map((response: any) => searchSuccess(response.data)),
        catchError(error => {
          if (error.needFakeData) {
            return from(
              api.getSearchResults("", config.LAT, config.LNG, true)
            ).map((response: any) => searchSuccess(response.data));
          } else {
            return Observable.of(searchFail(error));
          }
        })
      )
    )
  );
