import { Action } from "redux";
import {
  VENUE_PHOTOS,
  VENUE_PHOTOS_FAIL,
  VENUE_PHOTOS_SUCCESS
} from "./constants";
export interface IMeta {
  code: number;
  requestId: string;
}

export interface ISource {
  name: string;
  url: string;
}

export interface IPhoto {
  prefix: string;
  suffix: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  gender: string;
  photo: IPhoto;
}

export interface ICheckin {
  id: string;
  createdAt: number;
  type: string;
  timeZoneOffset: number;
  with?: any;
}

export interface IItem {
  id: string;
  createdAt: number;
  source: ISource;
  prefix: string;
  suffix: string;
  width: number;
  height: number;
  user: IUser;
  checkin: ICheckin;
  visibility: string;
}

export interface IPhotos {
  count: number;
  items: IItem[];
  dupesRemoved: number;
}

export interface IResponse {
  photos: IPhotos;
}

export interface IVenuePhotos {
  meta: IMeta;
  response: IResponse;
}

export interface IVenuePhotoLoadAction extends Action<typeof VENUE_PHOTOS> {
  queryId: string;
}

export interface IVenuePhotosSuccessAction
  extends Action<typeof VENUE_PHOTOS_SUCCESS> {
  data: IVenuePhotos;
  id: string;
}

export interface IVenuePhotosFailAction
  extends Action<typeof VENUE_PHOTOS_FAIL> {
  error: { message: string };
}

export type VenueAction =
  | IVenuePhotoLoadAction
  | IVenuePhotosSuccessAction
  | IVenuePhotosFailAction;

export interface IVenueState {
  isLoading?: boolean;
  error?: { message: string } | null;
  photos?: { [key: string]: IVenuePhotos };
}
