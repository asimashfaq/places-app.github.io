import { Action } from "redux";
import {
  VENUE_PHOTOS,
  VENUE_PHOTOS_FAIL,
  VENUE_PHOTOS_SUCCESS
} from "./constants";
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

export interface VenuePhotos {
  meta: Meta;
  response: Response;
}

export interface VenuePhotoLoadAction extends Action<typeof VENUE_PHOTOS> {
  queryId: string;
}

export interface VenuePhotosSuccessAction
  extends Action<typeof VENUE_PHOTOS_SUCCESS> {
  data: VenuePhotos;
  id: string;
}

export interface VenuePhotosFailAction
  extends Action<typeof VENUE_PHOTOS_FAIL> {
  error: { message: string };
}

export type VenueAction =
  | VenuePhotoLoadAction
  | VenuePhotosSuccessAction
  | VenuePhotosFailAction;

export interface IVenueState {
  isLoading?: boolean;
  error?: { message: string } | null;
  photos?: { [key: string]: VenuePhotos };
}
