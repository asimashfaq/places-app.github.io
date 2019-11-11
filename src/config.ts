export const CLIENT_ID = "DZEQOEKD0XDQM5QRGG25FMDSZC05AZLEXQR5HCLTAKGETEAA";
export const CLIENT_SECRET = "X4MLA1C5XBEZFOQAYQELZ3QNET5CJOL2IUHGOSRC2CHNOUO5";
export const LAT = 51.55284104544104;
export const LNG = 0.2006714879431466;

export let USE_FAKE_DATA = process.env.NODE_ENV == "test" ? true : false;
export const UseFakeData = (status: boolean) => {
  USE_FAKE_DATA = status;
};
