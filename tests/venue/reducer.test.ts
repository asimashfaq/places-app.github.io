import {
  VENUE_PHOTOS,
  VENUE_PHOTOS_FAIL,
  VENUE_PHOTOS_SUCCESS
} from "../../src/modules/venue/constants";
import reducer, { initialState } from "../../src/modules/venue/reducer";
import { VenueAction, VenuePhotos } from "../../src/modules/venue/types";
describe("venue reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as VenueAction)).toEqual({
      error: null,
      isLoading: false,
      photos: {}
    });
  });
  it(`should handles ${VENUE_PHOTOS}`, () => {
    expect(
      reducer(initialState, {
        type: VENUE_PHOTOS,
        queryId: "1"
      })
    ).toEqual({
      error: null,
      isLoading: true,
      photos: {}
    });
  });

  it(`should handles ${VENUE_PHOTOS_SUCCESS}`, () => {
    expect(
      reducer(initialState, {
        type: VENUE_PHOTOS_SUCCESS,
        id: "1",
        data: {} as VenuePhotos
      })
    ).toEqual({
      error: null,
      isLoading: false,
      photos: {
        "1": {}
      }
    });
  });

  it(`should handles ${VENUE_PHOTOS_FAIL}`, () => {
    expect(
      reducer(initialState, {
        type: VENUE_PHOTOS_FAIL,
        error: {
          message: "Some thing goes wrong"
        }
      })
    ).toEqual({
      error: {
        message: "Some thing goes wrong"
      },
      isLoading: false,
      photos: {}
    });
  });
});
