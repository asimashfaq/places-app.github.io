import { ofType } from "redux-observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { from } from "rxjs/internal/Observable/from";
import { of } from "rxjs/internal/Observable/of";
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
        api.getSearchResults(
          action.query,
          action.lat,
          action.lng,
          config.USE_FAKE_DATA
        )
      ).pipe(
        map((response: any) => searchSuccess(response.data)),
        catchError(error => {
          if (error.needFakeData) {
            return from(
              api.getSearchResults("", config.LAT, config.LNG, true)
            ).map((response: any) => searchSuccess(response.data));
          } else {
            return of(searchFail(error));
          }
        })
      )
    )
  );
