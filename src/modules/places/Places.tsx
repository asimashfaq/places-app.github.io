import React, { useState, useCallback, useEffect, useReducer } from "react";
import _ from "lodash";
import GoogleMapReact from "google-map-react";
import { parse } from "query-string";
import { IPlacesListState, Item } from "./types";
import { useDispatch, useSelector } from "react-redux";
import Venue from "../venue/Venue";
import { useSearchContext } from "../../context/SearchContext";
import * as config from "../../config";
import Marker from "./marker/Marker";
import Warning from "../message/warnings";
import ErrorMessage from "../message/errorMessage";
import Loader from "../loader/loader";
import { MapReducer } from "./reducer";
import { search } from "./action";

let boxRefs: any = [];
let refMarkers = [];

const Places: React.FC<{ location: any }> = ({ location }) => {
  let markers = [];

  const params = parse(location.search);
  config.UseFakeData((params.fake as string) === "true" || false);
  const gprops = {
    center: {
      lat: parseFloat(params.lat as string) || config.LAT,
      lng: parseFloat(params.lng as string) || config.LNG
    },
    zoom: 10
  };

  let errorMessage: any;

  const { query } = useSearchContext();
  const [state, disptach] = useReducer(MapReducer, {
    lat: gprops.center.lat,
    lng: gprops.center.lng,
    loader: true
  });

  const storedispatch = useDispatch();

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

  const onBoundsChange = (value: any) => {
    disptach({
      type: "change",
      payload: { lat: value.getCenter().lat(), lng: value.getCenter().lng() }
    });
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
  // Search for venue's
  useEffect(() => {
    if (query.length < 1) return;
    markers = [];
    refMarkers = [];
    boxRefs = [];
    storedispatch(search(query, state.lat, state.lng));
  }, [query, state.lat, state.lng, storedispatch]);

  // Stop the Loading Spinner
  React.useEffect(() => {
    if (!isLoading) disptach({ type: "stoploader" });
    console.log(data);
  }, [isLoading]);

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
          onDragEnd={onBoundsChange}
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
          {errorMessage !== undefined ? (
            <ErrorMessage code={429} message={errorMessage} />
          ) : (
            <div>
              {_.get(data, "response.warning.text", "") && (
                <Warning message={data.response.warning.text} />
              )}
              {_.get(data, "response.groups", []).length > 0 ? (
                <div>
                  {data.response.groups[0].items.length > 0 ? (
                    data.response.groups[0].items.map(
                      (item: Item, index: any) => {
                        return (
                          <Venue
                            onMouseEnter={_onMouseEnterContent}
                            onMouseLeave={_onMouseLeaveContent}
                            venue={item.venue}
                            ref={input =>
                              (boxRefs[`box-${item.venue.id}`] = input)
                            }
                            key={item.venue.id}
                          />
                        );
                      }
                    )
                  ) : (
                    <div>
                      <Warning code={200} message={"No Venues Found"} />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <Warning code={200} message={"No Venues Found"} />
                </div>
              )}
            </div>
          )}
        </div>
        <Loader loader={state.loader} />
      </div>
    </div>
  );
};

export { Places };

export default Places;
