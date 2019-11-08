import React from "react";
import { Venue as IVenue } from "../places/types";
import { useSearchContext } from "../../context/SearchContext";
import { useDispatch, useSelector } from "../../hooks/react-redux";
import { venuePhotosLoad } from "./action";
import { IVenueState, Item } from "./types";

const Venue = ({venue} : {venue: IVenue}) => {

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
    if (query.length < 1) return;
    dispatch(venuePhotosLoad(venue.id));
  }, [venue.id, dispatch]);

  return (
    <div className="recipe-item px-4 py-3 d-flex align-items-start justify-content-start flex-column flex-lg-row flex justify-between
    border-b border-dark-700 cursor-pointer bg-white hover:bg-gray-100 h-auto items-center md:h-24 ">
          <div className="flex-1">
            <h1 className="text-ms text-blue-800">{venue.name}</h1>
            <p className="text-sm mt-1 text-blue-900 italic">{venue.location.formattedAddress} min</p>
          </div>
          <div className="ml-2 w-16 h-12">
            {
              photos && 
              photos[venue.id] &&
              photos[venue.id].response.photos.items.map((photo:Item, index:number)=>{ return ( 
                <img key={`${venue.id},${index}`} src={`${photo.prefix}${photo.width}x${photo.height}${photo.suffix}`}></img>
                )
              }
              )
            }
          </div>
      </div>
  );
};

export { Venue };
export default Venue;

