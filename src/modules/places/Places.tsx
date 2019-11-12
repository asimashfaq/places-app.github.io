import React, { useState, useCallback } from "react";

import _ from "lodash";
import GoogleMapReact, { ChangeEventValue } from "google-map-react";
import { parse } from "query-string";
import { IPlacesListState, Item } from "./types";
import { useDispatch, useSelector } from "react-redux";
import Venue from "../venue/Venue";
import { search } from "./action";
import { useSearchContext } from "../../context/SearchContext";
import * as config from "../../config";
import Marker from "./marker/Marker";

let boxRefs: any = [];
let refMarkers = [];

const Places: React.FC<{ location: any }> = ({ location }) => {
  let markers = [];
  //config.UseFakeData(true);
  const params = parse(location.search);
  const gprops = {
    center: {
      lat: parseFloat(params.lat as string) || config.LAT,
      lng: parseFloat(params.lng as string) || config.LNG
    },
    zoom: 10
  };

  let errorMessage: any;

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

  const _onMouseEnterContent = useCallback(
    (e: any) => {
      const id = e.currentTarget.id as string;
      refMarkers[id].classList.remove("hide-all");
    },
    [refMarkers]
  );

  const _onMouseLeaveContent = useCallback(
    (e: any) => {
      const id = e.currentTarget.id;
      refMarkers[id].classList.add("hide-all");
    },
    [refMarkers]
  );

  const handleRef = useCallback(
    (input: any, item) => {
      boxRefs[`box-${item.venue.id}`] = input;
    },
    [boxRefs]
  );
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
  if (error) {
    const parseMessage: any = JSON.parse(_.get(error, "message", "{}"));
    if (_.get(parseMessage, "meta", "").code == 429) {
      errorMessage = parseMessage.meta.errorDetail;
    }
  } else if (_.get(data, "meta.code", "undefinded") === 200) {
    data.response.groups[0].items.map((item: Item, index: any) => {
      markers[item.venue.id] = {
        data: {
          item,
          photo: photo.photos[item.venue.id]
        },
        Lat: item.venue.location.lat,
        Lng: item.venue.location.lng,
        visible: false
      };
    });
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
        <div className="w-full move-right bg-white">
          {_.get(data, "response.warning.text", "") && (
            <div
              className="lg:w-11/12 margin-auto bg-yellow-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="warning"
            >
              <strong className="font-bold">Warning!</strong>
              <span className="block sm:inline">
                {data.response.warning.text}
              </span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          {_.get(data, "response.groups", []).length > 0 ? (
            data.response.groups[0].items.map((item: Item, index: any) => {
              return (
                <Venue
                  onMouseEnter={_onMouseEnterContent}
                  onMouseLeave={_onMouseLeaveContent}
                  venue={item.venue}
                  ref={input => handleRef(input, item)}
                  key={item.venue.id}
                />
              );
            })
          ) : (
            <div></div>
          )}
          {errorMessage && (
            <div
              className="lg:w-3/4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Code: 429!</strong>
              <span className="block sm:inline">{errorMessage}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
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

export { Places };

export default Places;
