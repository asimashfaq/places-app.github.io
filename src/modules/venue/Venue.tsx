import _get  from 'lodash/get';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchContext } from "../../context/SearchContext";
import PlaceHolder from "../placeholder/placeholder";
import { ICategory, IVenue as IVenue } from "../places/types";
import { venuePhotosLoad } from "./action";
import { IItem, IVenueState } from "./types";

interface IProps {
  venue: IVenue;
  onMouseEnter: any;
  onMouseLeave: any;
}
export type Ref = any;

const Venue = React.memo(
  React.forwardRef<Ref, IProps>((props, ref) => {
    let errorMessage;
    const { query } = useSearchContext();
    const dispatch = useDispatch();
    const { photos, isLoading, error } = useSelector(
      ({ venuePic }: { venuePic: IVenueState }) => {
        return {
          isLoading: venuePic.isLoading,
          photos: venuePic.photos,
          error: venuePic.error
        };
      }
    ) as IVenueState;

    React.useEffect(() => {
      if (!props.venue.id || query.length < 1) { return; }
      dispatch(venuePhotosLoad(props.venue.id));
    }, [props.venue.id, dispatch]);
    if (error) {
      const parseMessage: any = JSON.parse(_get(error, "message", "{}"));
      if (_get(parseMessage, "meta", "").code === 429) {
        errorMessage = parseMessage.meta.errorDetail;
      }
    }

    return (
      <div
        id={`box-${props.venue.id}`}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        ref={ref}
        className={`recipe-item px-4 py-3 d-flex align-items-start justify-content-start flex-column flex-lg-row flex justify-between
    border-b border-dark-700 cursor-pointer bg-white hover:bg-gray-300 `}
        style={{ minHeight: "6rem" }}
      >
        <div className="flex-1">
          <h1 className="text-2xl">{props.venue.name}</h1>
          <div className="text-sm mt-1 text-gray-600 w-1/2">
            {props.venue.location.formattedAddress}
          </div>
          <div>
            {_get(props, "venue.categories", []).map(
              (category: ICategory, index: number) => {
                return (
                  <button
                    key={`${category.id},${index}`}
                    className="px-5 py-3 text-gray-500 text-center mt-3 rounded-full border border-gray-300 text-sm focus:border-gray-500 focus:text-gray-600"
                  >
                    {category.name}
                  </button>
                );
              }
            )}
          </div>
        </div>
        <div
          className="ml-2 w-16 h-full w-3/6 min-h-full flex"
          style={{ minHeight: "200px" }}
        >
          {isLoading === false && error === null ? (
            _get(photos[props.venue.id], "response.photos.items", []).length >
            0 ? (
              photos[props.venue.id].response.photos.items.map(
                (photo: IItem, index: number) => {
                  return (
                    <div
                      key={`${props.venue.id},${index}`}
                      className="flex-1 min-h-full bg-cover bg-gray-100 rounded-sm bg-center"
                      style={{
                        backgroundImage: `url(${photo.prefix}${photo.width}x${photo.height}${photo.suffix})`
                      }}
                    />
                  );
                }
              )
            ) : (
              <PlaceHolder loader={false}>No Image</PlaceHolder>
            )
          ) : error != null ? (
            <PlaceHolder>
              <div>{errorMessage}</div>
            </PlaceHolder>
          ) : (
            <PlaceHolder loader={true} />
          )}
        </div>
      </div>
    );
  })
);

export { Venue };
export default Venue;
