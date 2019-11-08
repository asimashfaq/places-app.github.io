import { venuePhotosFail, venuePhotosLoad, venuePhotosSuccess } from "./action";
import {
  VENUE_PHOTOS,
  VENUE_PHOTOS_FAIL,
  VENUE_PHOTOS_SUCCESS
} from "./constants";
import {
  VenuePhotoLoadAction,
  VenuePhotos,
  VenuePhotosFailAction,
  VenuePhotosSuccessAction
} from "./types";

describe("venue actions", () => {
  it("shoud create the action to load venue photos", () => {
    const queryId = "1";
    const expectedAction: VenuePhotoLoadAction = {
      type: VENUE_PHOTOS,
      queryId: queryId
    };
    expect(venuePhotosLoad("1")).toEqual(expectedAction);
  });
  it("shoud create the action to load venue photos successfully ", () => {
    const expectedAction: VenuePhotosSuccessAction = {
      type: VENUE_PHOTOS_SUCCESS,
      data: {} as VenuePhotos,
      id: "1"
    };
    expect(venuePhotosSuccess({} as VenuePhotos, "1")).toEqual(expectedAction);
  });
  it("shoud create the action on loading photos unsuccessfully ", () => {
    const expectedAction: VenuePhotosFailAction = {
      type: VENUE_PHOTOS_FAIL,
      error: { message: "Unable to Load photos" }
    };
    expect(venuePhotosFail({ message: "Unable to Load photos" })).toEqual(
      expectedAction
    );
  });
});
