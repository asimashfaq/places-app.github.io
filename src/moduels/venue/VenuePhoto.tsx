import React from "react";
import { Venue } from "../placeslist/types";
import { useSearchContext } from "../../context/SearchContext";
import { useDispatch, useSelector } from "../../hooks/react-redux";
import { venuePic } from "./action";
import { IVenueState, Item } from "./types";

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
    <div className="recipe-item p-2 d-flex align-items-start justify-content-start flex-column flex-lg-row flex">
          <div className="w-3/5">
            <h1 className="font-bold text-sm">{venue.name}</h1>
            <p className="text-xs">{venue.location.formattedAddress} min</p>
          </div>
          <div className="ml-2 w-2/5">
            <img src="data" ></img>
          </div>
      </div>
  );
};

export { VenuePhoto };
export default VenuePhoto;