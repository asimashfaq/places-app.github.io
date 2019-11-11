import React, { useState, useRef } from "react";
import { Spinner } from "reactstrap";
import _ from "lodash";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";

import { IPlacesListState, Item } from "./types";
import { useDispatch, useSelector } from "react-redux";
import Venue from "../venue/Venue";
import { search } from "./action";
import { useSearchContext } from "../../context/SearchContext";
import * as config from "../../config";
import Marker from "./Marker";

const PlacesList: React.FC = () => {
  config.UseFakeData(true);
  const gprops = {
    center: {
      lat: config.LAT,
      lng: config.LNG
    },
    zoom: 10
  };
  let boxRefs: any = [];
  let refMarkers = [];
  let itemHover = -1;
  let markers = [];

  const { query } = useSearchContext();
  const [lat, setLat] = useState(gprops.center.lat);
  const [lng, setLng] = useState(gprops.center.lng);
  const [loader, setLoader] = useState(false);
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
  
  const _onMouseEnterContent = (e: any) => {
    const id = e.currentTarget.id as string;
    refMarkers[id].classList.remove("hide-all");
  };

  const _onMouseLeaveContent = (e: any) => {
    const id = e.currentTarget.id;
    refMarkers[id].classList.add("hide-all");
  };

  React.useEffect(() => {
    if (query.length < 1) return;
    markers = [];
    refMarkers = [];
    boxRefs = [];
    dispatch(search(query, lat, lng));
    setLoader(true);
  }, [query, lat, lng, dispatch]);
  React.useEffect(() => {
    if (!isLoading) setLoader(false);
  }, [_.get(data, "response", "undefined"), isLoading]);
  let result = null;
  if (isLoading) {
    result = <Spinner />;
  } else if (error) {
    result = <div>{error.message}</div>;
  } else if (_.get(data,'meta.code','undefinded') === 200) {
    if (data.response.groups[0].items.length > 0) {
      result = data.response.groups[0].items.map((item: Item, index: any) => {
        markers[item.venue.id] = {
          data: {
            item,
            photo: photo.photos[item.venue.id]
          },
          Lat: item.venue.location.lat,
          Lng: item.venue.location.lng,
          visible: false
        };
        return (
          <Venue
            onMouseEnter={_onMouseEnterContent}
            onMouseLeave={_onMouseLeaveContent}
            venue={item.venue}
            ref={(input: any) => {
              boxRefs[`box-${item.venue.id}`] = input;
            }}
            key={item.venue.id}
          />
        );
      });
    }
  }

  return (
    <div className="flex flex-col flex-1 lg:flex-row bg-secondary map-wrapper">
      <div className="w-full lg:w-2/3 h-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCGfO7rXQBR5j7EKJBafS3soCPpLhqW-J0" }}
          onChange={onBoundsChange}
          onDrag={onBoundsChange}
          debounced={false}
          defaultCenter={gprops.center}
          defaultZoom={gprops.zoom}
        >
          {Object.keys(markers).map((key: any, index: number) => {
            const m = markers[key];
            return (
              <Marker
                ref={e => {
                  refMarkers[`box-${m.data.item.venue.id}`] = e;
                }}
                aref={boxRefs[`box-${m.data.item.venue.id}`]}
                key={m.data.item.venue.id + index}
                data={m.data}
                lat={m.Lat}
                lng={m.Lng}
              />
            );
          })}
        </GoogleMapReact>
      </div>
      <div className="overflow-auto w-full lg:w-1/3 bg-white relative">
        <div
          className="itemhover w-full move-right bg-white"
          id={"" + itemHover}
        >
          {result}
        </div>
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
