import axios from "../axios-foursquare";
import * as config from "../config";
import * as fakeData from "./data";

window.localStorage.removeItem("use_fake_data"); // intially

export const alwaysUseFakeNow = () => {
  window.localStorage.setItem("use_fake_data", "true");
};

export const getSearchResults = (
  query: string,
  lat: number,
  lng: number,
  useFakeData: boolean = false
) => {
  if (useFakeData || window.localStorage.getItem("use_fake_data")) {
    alwaysUseFakeNow();
    return new Promise(function(resolve) {
      setTimeout(() => resolve({ data: fakeData.locations }), 300);
    });
  } else {
    return axios.get("/venues/explore", {
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
  }
};

export const getvenuePicResults = (
  queryId: string,
  useFakeData: boolean = false
) => {
  if (useFakeData || window.localStorage.getItem("use_fake_data")) {
    alwaysUseFakeNow();
    return new Promise(function(resolve) {
      setTimeout(() => resolve({ data: fakeData.photos[queryId] }), 300);
    });
  } else {
    return axios.get("/venues/" + queryId + "/photos", {
      params: {
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        v: "20180323"
      }
    });
  }
};
