import React from "react";
import { Venue } from "../places/types";
import { useSearchContext } from "../../context/SearchContext";
import { useDispatch, useSelector } from "../../hooks/react-redux";
import { venuePic } from "./action";
import { IVenueState } from "./types";

const VenuePhoto = ({venue} : {venue: Venue}) => {

  const { query } = useSearchContext();
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    ({ dataList }: { dataList: IVenueState }) => {
      return {
        isLoading: dataList.isLoading,
        data: dataList.data, 
        error: dataList.error
      };
    }
  ) as IVenueState;

  React.useEffect(() => {
    if (query.length < 1) return;
    dispatch(venuePic('412d2800f964a520df0c1fe3'));
  }, [query, dispatch]);

  return (
    <div className="recipe-item px-4 py-3 d-flex align-items-start justify-content-start flex-column flex-lg-row flex justify-between
    border-b border-dark-700 cursor-pointer bg-white hover:bg-gray-100 h-auto items-center md:h-24 ">
          <div className="flex-1">
            <h1 className="text-ms text-blue-800">{venue.name}</h1>
            <p className="text-sm mt-1 text-blue-900 italic">{venue.location.formattedAddress} min</p>
          </div>
          <div className="ml-2 w-16 h-12">
            <img src="data"></img>
          </div>
      </div>
  );
};

export { VenuePhoto };
export default VenuePhoto;

