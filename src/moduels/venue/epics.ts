import { ofType } from "redux-observable";
import { from, Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as api from "../../services/api";
import { venuepicFail, venuepicSuccess } from "./action";
import { IVenuePicAction } from "./types";
export const venuePicEpic = (action$: any) =>
  action$.pipe(
    ofType("VENUE_PIC"),
    mergeMap((action: IVenuePicAction) =>
      from(api.getvenuePicResults(action.queryId, true)).pipe(
        map((response: any, err: any) =>
          venuepicSuccess(response.data, action.queryId)
        ),
        //tap(item => console.log(item)),
        catchError(error => {
          if (error.needFakeData) {
            return from(api.getvenuePicResults(action.queryId, true)).map(
              (response: any) => venuepicSuccess(response.data, action.queryId)
            );
          } else {
            return Observable.of(venuepicFail(error));
          }
        })
      )
    )
  );
