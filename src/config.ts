export const CLIENT_ID = "5BN1BRUYVWKHUZWNFCUXBNS5LQWO2SDOLOVOWENTYKZ5ARXU";
export const CLIENT_SECRET = "ITAWSJXNZ2FFCXUQNVH4SBDDZZNKSDL12OWQGBZ1W3WRJKIV";
export const LAT = 51.55284104544104;
export const LNG = 0.2006714879431466;

export let USE_FAKE_DATA = process.env.NODE_ENV == "test" ? true : false;
export const UpdateFakeData = (status: boolean) => {
  USE_FAKE_DATA = status;
};
