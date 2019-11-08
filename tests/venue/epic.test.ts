import { of } from "rxjs";
import sinon from "sinon";
import axios from "../../src/axios-foursquare";
import { VENUE_PHOTOS_FAIL } from "../../src/moduels/venue/constants";
import { venuePhotoEpic } from "../../src/moduels/venue/epics";
import * as api from "../../src/services/api";
const sandbox = sinon.createSandbox();
const mockResponse = {
  data: {
    meta: "game of thrones"
  }
};
let apiServiceStub;

describe("venue epic", () => {
  beforeEach(() => {
    const resolved = new Promise(resolve =>
      resolve({ data: { body: "Hello World" } })
    );

    apiServiceStub = sandbox.stub(axios, "get").returns(resolved);
    sandbox
      .stub(api, "getvenuePicResults")
      .returns(Promise.resolve(mockResponse) as any);
  });

  afterEach(() => {
    sandbox.restore();
  });
  /* it("shoud return VENUE_PHOTOS_SUCCESS", async () => {
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

  */
  it("shoud return multiple VENUE_PHOTOS_FAIL", async done => {
    const response = {
      type: VENUE_PHOTOS_FAIL,
      error: new Error("There is no data for this venue in fake DB.")
    };

    const type = "VENUE_PHOTOS";
    const action$ = of({ type, queryId: 1 });
    const epic$ = venuePhotoEpic(action$);

    epic$.subscribe(async () => {
      //console.log( api.getvenuePicResults("1"););
      const a = await apiServiceStub("venue/1/photos", {});
      console.log(a, "---");
      sinon.assert.calledWith(a);
      done();
      //
    });
    //done();
  });

  /*it("should dispatch the correct response on success", done => {
    const type = "VENUE_PHOTOS";
    const action$ = of({ type, queryId: 1 });
    const epic$ = venuePhotoEpic(action$);

    apiServiceStub.returns(of(mockResponse));

    epic$.subscribe(action => {
      console.log(action);
      done();
    });
  });*/
});
