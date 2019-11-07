import {
  IVenuePicAction,
  IVenuePicFailAction,
  IVenuePicSuccessAction,
  pObject
} from "./types";

export const venuePic = (queryId: string): IVenuePicAction => ({
  type: "VENUE_PIC",
  queryId
});

export const venuepicSuccess = (data: pObject): IVenuePicSuccessAction => ({
  type: "VENUE_PIC_SUCCESS",
  data
});

export const venuepicFail = (error: {
  message: string;
}): IVenuePicFailAction => ({
  type: "VENUE_PIC_FAIL",
  error
});
