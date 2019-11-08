import {
  VENUE_PHOTOS,
  VENUE_PHOTOS_FAIL,
  VENUE_PHOTOS_SUCCESS
} from "./constants";
import {
  VenuePhotoLoadAction,
  VenuePhotos,
  VenuePhotosFailAction,
  VenuePhotosSuccessAction
} from "./types";

export const venuePhotosLoad = (queryId: string): VenuePhotoLoadAction => ({
  type: VENUE_PHOTOS,
  queryId
});

export const venuePhotosSuccess = (
  data: VenuePhotos,
  id: string
): VenuePhotosSuccessAction => ({
  type: VENUE_PHOTOS_SUCCESS,
  data,
  id
});

export const venuePhotosFail = (error: {
  message: string;
}): VenuePhotosFailAction => ({
  type: VENUE_PHOTOS_FAIL,
  error
});
