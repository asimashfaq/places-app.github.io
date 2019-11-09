import axios from "../axios-foursquare";
import * as config from "../config";
import * as fakeData from "./data";
export const getSearchResults = async (
  query: string,
  lat: number,
  lng: number,
  useFakeData: boolean = false
) => {
  if (useFakeData) {
    return new Promise(function(resolve) {
      setTimeout(() => resolve({ data: fakeData.locations }), 3000);
    });
  } else {
    try {
      const result = await axios.get("/venues/explore", {
        params: {
          client_id: config.CLIENT_ID,
          client_secret: config.CLIENT_SECRET,
          v: "20180323",
          ll: `${lat},${lng}`,
          limit: 15,
          query: query,
          radius: 5049,
          llAcc: 1000
        }
      });

      return new Promise(function(resolve) {
        return resolve({ data: result.data });
      });
    } catch (e) {
      return Promise.reject(new Error(e.message));
    }
  }
};

export const getvenuePicResults = async (
  queryId: string,
  useFakeData: boolean = false
) => {
  if (useFakeData) {
    if (fakeData.photos[queryId]) {
      return new Promise(function(resolve) {
        setTimeout(() => {
          return resolve({ data: fakeData.photos[queryId as string] });
        }, 50);
      });
    } else {
      return Promise.reject(
        new Error("There is no data for this venue in fake DB.")
      );
    }
  } else {
    try {
      const result = await axios.get("/venues/" + queryId + "/photos", {
        params: {
          client_id: config.CLIENT_ID,
          client_secret: config.CLIENT_SECRET,
          v: "20180323"
        }
      });
      return new Promise(function(resolve) {
        return resolve({ data: result.data });
      });
    } catch (e) {
      return Promise.reject(new Error(e.message));
    }
  }
};
