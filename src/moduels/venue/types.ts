import { Action } from "redux";

export interface Meta {
  code: number;
  requestId: string;
}

export interface Source {
  name: string;
  url: string;
}

export interface Photo {
  prefix: string;
  suffix: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  gender: string;
  photo: Photo;
}

export interface Checkin {
  id: string;
  createdAt: number;
  type: string;
  timeZoneOffset: number;
  with?: any;
}

export interface Item {
  id: string;
  createdAt: number;
  source: Source;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  user: User;
  checkin: Checkin;
  visibility: string;
}

export interface Photos {
  count: number;
  items: Item[];
  dupesRemoved: number;
}

export interface Response {
  photos: Photos;
}

export interface vPhotoObject {
  meta: Meta;
  response: Response;
}

export interface IVenuePicAction extends Action<"VENUE_PIC"> {
  queryId: string;
}

export interface IVenuePicSuccessAction extends Action<"VENUE_PIC_SUCCESS"> {
  data: vPhotoObject;
  id: string;
}

export interface IVenuePicFailAction extends Action<"VENUE_PIC_FAIL"> {
  error: { message: string };
}

export type TAction =
  | IVenuePicAction
  | IVenuePicSuccessAction
  | IVenuePicFailAction;

export interface IVenueState {
  isLoading?: boolean;
  error?: { message: string } | null;
  photos?: { [key: string]: vPhotoObject };
}
