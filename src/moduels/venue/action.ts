import {
  IVenuePicAction,
  IVenuePicFailAction,
  IVenuePicSuccessAction,
  vPhotoObject
} from "./types";

export const venuePic = (queryId: string): IVenuePicAction => ({
  type: "VENUE_PIC",
  queryId
});

export const venuepicSuccess = (
  data: vPhotoObject,
  id: string
): IVenuePicSuccessAction => ({
  type: "VENUE_PIC_SUCCESS",
  data,
  id
});

export const venuepicFail = (error: {
  message: string;
}): IVenuePicFailAction => ({
  type: "VENUE_PIC_FAIL",
  error
});
