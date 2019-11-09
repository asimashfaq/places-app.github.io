import { ActionsObservable } from "redux-observable";
import {
  VENUE_PHOTOS_FAIL,
  VENUE_PHOTOS_SUCCESS
} from "../../src/modules/venue/constants";
import { venuePhotoEpic } from "../../src/modules/venue/epics";
import { photos } from "../../src/services/data";

describe("venue epic", () => {
  it("shoud return VENUE_PHOTOS_SUCCESS", async () => {
    const VenueId = "557c3971498ec5857dd9bdf4";
    const response = {
      type: VENUE_PHOTOS_SUCCESS,
      data: photos[VenueId],
      id: VenueId
    };
    const action$ = ActionsObservable.of({
      type: "VENUE_PHOTOS",
      queryId: VenueId
    });
    const epic$ = venuePhotoEpic(action$);
    const result = await epic$.toPromise();
    expect(result).toEqual(response);
  });

  it("shoud return VENUE_PHOTOS_FAIL", async () => {
    const response = {
      type: VENUE_PHOTOS_FAIL,
      error: new Error("There is no data for this venue in fake DB.")
    };
    const action$ = ActionsObservable.of({
      type: "VENUE_PHOTOS",
      queryId: "1"
    });
    const epic$ = venuePhotoEpic(action$);
    const result = await epic$.toPromise();
    expect(result).toEqual(response);
  });
});
