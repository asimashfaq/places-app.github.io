import {
  VENUE_PHOTOS,
  VENUE_PHOTOS_FAIL,
  VENUE_PHOTOS_SUCCESS
} from "./constants";
import {
  IVenuePhotoLoadAction,
  IVenuePhotos,
  IVenuePhotosFailAction,
  IVenuePhotosSuccessAction
} from "./types";

export const venuePhotosLoad = (queryId: string): IVenuePhotoLoadAction => ({
  type: VENUE_PHOTOS,
  queryId
});

export const venuePhotosSuccess = (
  data: IVenuePhotos,
  id: string
): IVenuePhotosSuccessAction => ({
  type: VENUE_PHOTOS_SUCCESS,
  data,
  id
});

export const venuePhotosFail = (error: {
  message: string;
}): IVenuePhotosFailAction => ({
  type: VENUE_PHOTOS_FAIL,
  error
});
