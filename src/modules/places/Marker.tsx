import React from "react";
import _ from "lodash";
export type Ref = any;

const Marker = React.forwardRef((props: any, ref: Ref) => {
  const _onMouseEnterContent = () => {
    props.aref.classList.add("bg-gray-300");
  };

  const _onMouseLeaveContent = () => {
    props.aref.classList.contains("bg-gray-300") &&
      props.aref.classList.remove("bg-gray-300");
  };

  let photoItem = _.get(props, "data.photo.response.photos.items", [])[0];
  return (
    <>
      <div
        ref={ref}
        className={`${props.$hover ? "hover-marker" : "hide-all"}`}
      >
        <div
          className={`map-pin-wrapper text-xxs bg-white p-2 shadow-inner shadow-2xl rounded-lg `}
          style={{ minHeight: "50px" }}
        >
          {photoItem && (
            <div
              className="pins-image bg-cover rounded-lg "
              style={{
                backgroundImage: `url(${photoItem.prefix}${photoItem.width}x${photoItem.height}${photoItem.suffix})`
              }}
            ></div>
          )}
          <div className="mt-3 text-sm">
            {_.get(props, "data.item.venue.location.formattedAddress", []).map(
              (item, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      index === 0 ? "font-bold text-base mb-1" : ""
                    }`}
                  >
                    {item}
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div
          onMouseEnter={_onMouseEnterContent}
          onMouseLeave={_onMouseLeaveContent}
          className="red-pin h-8 w-8 bg-cover pt-1 absolute bottom-0 pin"
          style={{
            backgroundImage: `url(../../src/images/red-pin.png)`,
            zIndex: 1000,
            paddingLeft: "4.5px"
          }}
        ></div>

        <div
          className="blue-pin h-8 w-8 bg-cover pt-1 absolute bottom-0 pin"
          onMouseEnter={_onMouseEnterContent}
          onMouseLeave={_onMouseLeaveContent}
          style={{
            backgroundImage: `url(../../src/images/map-pin.png)`,
            paddingLeft: "4.5px"
          }}
        ></div>
      </div>
    </>
  );
});
export { Marker };
export default Marker;
