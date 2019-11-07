import { ofType } from "redux-observable";
import { from, Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { catchError, map, switchMap } from "rxjs/operators";
import * as api from "../../services/api";
import { venuepicFail, venuepicSuccess } from "./action";
import { IVenuePicAction } from "./types";
export const venuePicEpic = (action$: any) =>
  action$.pipe(
    ofType("VENUE_PIC"),
    switchMap((action: IVenuePicAction) =>
      from(api.getvenuePicResults(action.queryId, true)).pipe(
        map((response: any) => venuepicSuccess(response.data)),
        catchError(error => {
          if (error.needFakeData) {
            return from(api.getvenuePicResults("", true)).map((response: any) =>
              venuepicSuccess(response.data)
            );
          } else {
            return Observable.of(venuepicFail(error));
          }
        })
      )
    )
  );
