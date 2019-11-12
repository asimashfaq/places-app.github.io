import nock from "nock";
import * as config from "../../src/config";
import * as api from "../../src/services/api";
describe("api test", () => {
  config.UseFakeData(false);
  it("should return the empty venue", async () => {
    const expected = {
      venue: {
        count: 0,
        items: [],
        dupesRemoved: 0
      }
    };
    nock("https://api.foursquare.com")
      .get("/v2/venues/explore")
      .query({
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        v: "20180323",
        ll: `0,0`,
        limit: 15,
        query: "cofe",
        radius: 5049,
        llAcc: 1000
      })
      .reply(200, expected);

    const result: any = await api.getSearchResults("cofe", 0, 0, false);
    expect(result.data).toEqual(expected);
  });
  it("should handle the 400 response venues", async () => {
    const expected = {
      venue: {
        count: 0,
        items: [],
        dupesRemoved: 0
      }
    };
    nock("https://api.foursquare.com")
      .get("/v2/venues/explore")
      .query({
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        v: "20180323",
        ll: `0,0`,
        limit: 15,
        query: "cofe",
        radius: 5049,
        llAcc: 1000
      })
      .reply(400, expected);
    try {
      await api.getSearchResults("cofe", 0, 0, false);
    } catch (e) {
      expect(e.message).toEqual("Request failed with status code 400");
    }
  });
  it("should return the venue photos", async () => {
    const VENUE_ID = "1";
    const expected = {
      photos: {
        count: 0,
        items: [],
        dupesRemoved: 0
      }
    };
    nock("https://api.foursquare.com")
      .get("/v2/venues/1/photos")
      .query({
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        v: "20180323"
      })
      .reply(200, expected);

    const result: any = await api.getvenuePicResults(VENUE_ID, false);
    expect(result.data).toEqual(expected);
  });
  it("should return the error on venue photos", async () => {
    const VENUE_ID = "2";
    nock("https://api.foursquare.com")
      .get("/v2/venues/2/photos")
      .query({
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        v: "20180323"
      })
      .reply(404);
    try {
      await api.getvenuePicResults(VENUE_ID, false);
    } catch (e) {
      expect(e.message).toEqual("Request failed with status code 404");
    }
  });
  it("should return the photo not found in fake database", async () => {
    const VENUE_ID = "1";
    const expected = new Error("There is no data for this venue in fake DB.");
    try {
      await api.getvenuePicResults(VENUE_ID, true);
    } catch (e) {
      expect(e).toEqual(expected);
    }
  });
  it("should return the photo in fake database", async () => {
    const VENUE_ID = "5b8acea3ea1e44002c513bea";
    const expected = {
      meta: {
        code: 200,
        requestId: "5dc4e9efcc7d41002b8d325c"
      },
      response: {
        photos: {
          count: 0,
          items: [],
          dupesRemoved: 0
        }
      }
    };
    const result: any = await api.getvenuePicResults(VENUE_ID, true);
    expect(result.data).toEqual(expected);
  });
});
