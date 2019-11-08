import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.foursquare.com/v2/",
  timeout: 10000
});

export default instance;
