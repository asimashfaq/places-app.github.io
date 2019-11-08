import {
  IVenuePicAction,
  IVenuePicFailAction,
  IVenuePicSuccessAction,
  vObject
} from "./types";

export const venuePic = (queryId: string): IVenuePicAction => ({
  type: "VENUE_PIC",
  queryId
});

export const venuepicSuccess = (data: vObject): IVenuePicSuccessAction => ({
  type: "VENUE_PIC_SUCCESS",
  data
});

export const venuepicFail = (error: {
  message: string;
}): IVenuePicFailAction => ({
  type: "VENUE_PIC_FAIL",
  error
});
