import React, { useState } from "react";
import { Spinner } from "reactstrap";
import { IPlacesListState, Item } from "./types";
import { useDispatch, useSelector } from "../../hooks/react-redux";
import Venue from "../venue/Venue";
import { search } from "./action";
import { useSearchContext } from "../../context/SearchContext";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import "./Places.scss";
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

const Marker = (props: any) => {
  let photoItem =
    props &&
    props.data.photo &&
    props.data.photo.response.photos &&
    props.data.photo.response.photos.items[0];
    return (
      <>
          <div className="map-pin-wrapper text-xxs bg-white p-2 shadow-inner shadow-2xl rounded-lg hidden" style={{minHeight: '50px'}}>
              {photoItem &&
              <div className="pins-image bg-cover rounded-lg "
                   style={{backgroundImage: `url(${photoItem.prefix}${photoItem.width}x${photoItem.height}${photoItem.suffix})`}}>
              </div>
              }
              <p className="mt-3 text-sm">
                  {props.data.item.venue.location.formattedAddress.map((item,index) => {
                      return (
                          <p className={`${index === 0 ? "font-bold text-base mb-1" : ""}`}>{item}</p>
                      )
                  })}
              </p>
              
          </div>
          <div className="h-8 w-8 bg-cover pt-1 absolute bottom-0 pin"
                   style={{backgroundImage: `url(../../src/images/map-pin.png)`, paddingLeft: '4.5px'}}>
              </div>
      </>
  )
};

const PlacesList: React.FC = () => {
  interface MapLocation {
    data: any;
    Lat: number;
    Lng: number;
  }
  config.UpdateFakeData(false)
  const { query } = useSearchContext();
  const [lat, setLat] = useState(gprops.center.lat);
  const [lng, setLng] = useState(gprops.center.lng);
  const [loader, setLoader] = useState(false);

  const [markers] = useState([] as MapLocation[]);
  const dispatch = useDispatch();

  const { data, photo, isLoading, error } = useSelector(
    ({ dataList, venuePic }: { dataList: IPlacesListState; venuePic: any }) => {
      return {
        isLoading: dataList.isLoading,
        data: dataList.data,
        photo: venuePic,
        error: dataList.error
      };
    }
  ) as IPlacesListState;

  const onBoundsChange = (value: ChangeEventValue) => {
    setLat(value.center.lat);
    setLng(value.center.lng);
    // dispatch(search(query,lat,lng));
  };
  React.useEffect(() => {
    if (query.length < 1) return;
    dispatch(search(query, lat, lng));
    setLoader(true);
  }, [query, lat, lng, dispatch]);

  React.useEffect(() => {
    if (!isLoading) setLoader(false);
  }, [data.response, isLoading]);
  let result = null;
  if (isLoading) {
    result = <Spinner />;
  } else if (error) {
    result = <div>{error.message}</div>;
  } else if (data && data.meta.code === 200) {
    if (data.response.groups[0].items.length > 0) {
      result = data.response.groups[0].items.map((item: Item) => {
        markers.push({
          data: { item, photo: photo.photos[item.venue.id] },
          Lat: item.venue.location.lat,
          Lng: item.venue.location.lng
        });
        return <Venue venue={item.venue} key={item.venue.id} />;
      });
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:flex-row bg-secondary map-wrapper">
      <div className="w-full lg:w-2/3 h-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGfO7rXQBR5j7EKJBafS3soCPpLhqW-J0" }}
          onChange={onBoundsChange}
          defaultCenter={gprops.center}
          defaultZoom={gprops.zoom}
        >
          {markers.map((m: MapLocation, index: number) => {
            return <Marker key={index} data={m.data} lat={m.Lat} lng={m.Lng} />;
          })}
        </GoogleMapReact>
      </div>
      <div className="overflow-auto w-full lg:w-1/3 bg-white relative">
        <div className="w-full move-right bg-white">{result}</div>
        <div
          className={`absolute top-0 left-0 absolutely-center hide-loader ${
            loader ? "block" : "hidden"
          }`}
        >
          <div className="lds-default">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PlacesList };

export default PlacesList;
