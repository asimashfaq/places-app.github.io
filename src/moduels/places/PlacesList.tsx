import React, { useState } from "react";
import { Spinner } from "reactstrap";
import { IPlacesListState, Item } from "./types";
import { useDispatch, useSelector } from "../../hooks/react-redux";
import Venue from "../venue/Venue";
import { search } from "./action";
import { useSearchContext } from "../../context/SearchContext";
import GoogleMapReact, { ChangeEventValue } from 'google-map-react';
import './PlacesList.scss';
import * as config from "../../config";
const gprops = {
  center: {
    lat: config.LAT,
    lng: config.LNG
  },
  zoom: 10,
  visibleRowFirst: -1,
  visibleRowLast: -1,
  hoveredRowIndex: -1
};

const Marker = (props:any) => {
  return <div className="SuperAwesomePin">asdasda</div>
}
const PlacesList: React.FC = () => {
  interface MapLocation {
    Lat :number
    Lng: number
  }
 const { query } = useSearchContext();
 const [lat , setLat] = useState(gprops.center.lat)
 const [lng , setLng] = useState(gprops.center.lng)
 const [markers] = useState([] as MapLocation[])
  const dispatch = useDispatch();

  const { data, isLoading, error } = useSelector(
    ({ dataList }: { dataList: IPlacesListState }) => {
      return {
        isLoading: dataList.isLoading,
        data: dataList.data, 
        error: dataList.error
      };
    }
  ) as IPlacesListState;

  const onBoundsChange = (value:ChangeEventValue) => {
    console.log(value.center)
    setLat(value.center.lat)
    setLng(value.center.lng)
   
    //dispatch(search(query,lat,lng, 0));
  }
  React.useEffect(() => {
    
    if (query.length < 1) return;
    dispatch(search(query,lat,lng));
  }, [query,lat,lng, dispatch]);

  let result = null;

  if (isLoading) {
    result = <Spinner />;
  } else if (error) {
    result = <div>{error.message}</div>;
  } else if (data && data.meta.code === 200) {
   
    if(data.response.groups[0].items.length>0 ){
      result = data.response.groups[0].items.map((item:Item) => {
        markers.push({Lat:item.venue.location.lat,Lng:item.venue.location.lng})
        // console.log(markers)
        return <Venue  venue={item.venue} key={item.venue.id} />
      });
     
    }
   
    
  }

  return (
    <div className="flex flex-1"> 
      <div className="gMap w-2/3 h-full">
      <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCGfO7rXQBR5j7EKJBafS3soCPpLhqW-J0" }}
            onChange = {onBoundsChange}
            defaultCenter={gprops.center}
            defaultZoom={gprops.zoom}
          >
            {
              markers.map((m:MapLocation, index:number) =>{
                return <Marker key={index} lat={m.Lat} lng={m.Lng}/>
              })
            }
          </GoogleMapReact>
          
      </div>
      <div className="w-1/3">{result}</div>
    </div>
  );
};

export { PlacesList };

export default PlacesList;