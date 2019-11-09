import { ofType } from "redux-observable";
import { from, Observable } from "rxjs";
import "rxjs/add/observable/of";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import { catchError, map, mergeMap } from "rxjs/operators";
import * as api from "../../services/api";
import { venuePhotosFail, venuePhotosSuccess } from "./action";
import { VenuePhotoLoadAction } from "./types";
export const venuePhotoEpic = (action$: any) =>
  action$.pipe(
    ofType("VENUE_PHOTOS"),
    mergeMap((action: VenuePhotoLoadAction) =>
      from(api.getvenuePicResults(action.queryId, false)).pipe(
        map((response: any, err: any) =>
          venuePhotosSuccess(response.data, action.queryId)
        ),
        catchError(error => {
          if (error.needFakeData) {
            return from(api.getvenuePicResults(action.queryId, true)).map(
              (response: any) =>
                venuePhotosSuccess(response.data, action.queryId)
            );
          } else {
            return Observable.of(venuePhotosFail(error));
          }
        })
      )
    )
  );
