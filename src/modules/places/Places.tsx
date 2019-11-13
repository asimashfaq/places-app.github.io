import GoogleMapReact from "google-map-react";
import _get from "lodash/get";
import React, { useCallback, useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as config from "../../config";
import { useSearchContext } from "../../context/SearchContext";
import Loader from "../loader/loader";
import ErrorMessage from "../message/errorMessage";
import Warning from "../message/warnings";
import Venue from "../venue/Venue";
import { search } from "./action";
import Marker from "./marker/Marker";
import { MapReducer } from "./reducer";
import { IItem, IPlacesListState } from "./types";

let boxRefs: any = [];
let refMarkers = [];
interface IProps {
  fake: string;
  lat: number;
  lng: number;
}
const Places: React.FC<IProps> = ({
  fake,
  lat,
  lng
}: {
  fake: string;
  lat: number;
  lng: number;
}) => {
  let markers = [];

  config.UseFakeData(fake === "true" || false);
  const gprops = {
    center: {
      lat: lat || config.LAT,
      lng: lng || config.LNG
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

  const onMouseEnterContent = useCallback(
    (e: any) => {
      const id = e.currentTarget.id as string;
      refMarkers[id].classList.remove("hide-all");
    },
    [refMarkers]
  );

  const onMouseLeaveContent = useCallback(
    (e: any) => {
      const id = e.currentTarget.id;
      refMarkers[id].classList.add("hide-all");
    },
    [refMarkers]
  );
  // Search for venue's
  useEffect(() => {
    if (query.length < 1) {
      return;
    }
    markers = [];
    refMarkers = [];
    boxRefs = [];
    storedispatch(search(query, state.lat, state.lng));
  }, [query, state.lat, state.lng, storedispatch]);

  if (error) {
    const parseMessage: any = JSON.parse(_get(error, "message", "{}"));
    if (_get(parseMessage, "meta", "").code === 429) {
      errorMessage = parseMessage.meta.errorDetail;
    }
  } else if (_get(data, "meta.code", "undefinded") === 200) {
    data.response.groups[0].items.map((item: IItem, index: any) => {
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
          { errorMessage !== undefined ? (
            <ErrorMessage code={429} message={errorMessage} />
          ) : (
            <div>
              { _get(data, "response.groups", []).length > 0 ? (
                <div>
                  {data.response.groups[0].items.length >= 1 ? (
                    <div>
                      <div>
                        {data.response.groups[0].items.length === 1 && (
                          <Warning message={data.response.warning.text} />
                        )}
                      </div>
                      <div>
                        {data.response.groups[0].items.map(
                          (item: IItem, index: any) => {
                            return (
                              <Venue
                                onMouseEnter={onMouseEnterContent}
                                onMouseLeave={onMouseLeaveContent}
                                venue={item.venue}
                                ref={input =>
                                  (boxRefs[`box-${item.venue.id}`] = input)
                                }
                                key={item.venue.id}
                              />
                            );
                          }
                        )}
                      </div>
                    </div>
                  ) : (
                    <div>
                        { !isLoading && <Warning code={200} message={"No Venues Found"} />}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  { !isLoading && <Warning code={200} message={"No Venues Found"} />}
                </div>
              )}
            </div>
          )}
        </div>
        <Loader loader={isLoading} />
      </div>
    </div>
  );
};

export { Places };

export default Places;
