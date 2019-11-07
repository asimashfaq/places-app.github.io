import React, { Component } from 'react'
import GoogleMapReact, { ChangeEventValue } from 'google-map-react';
export default class GoogleMap extends Component{
    constructor(props:any) {
        super(props)
    }

    _onBoundsChange = (value:ChangeEventValue) => {
        console.log(value)
      }
    render() {
        const gprops:any = {
            center: {
              lat: 28.250416286894367,
              lng: -649.1443955287315
            },
            zoom: 10,
            visibleRowFirst: -1,
            visibleRowLast: -1,
            hoveredRowIndex: -1
          };
        return(
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCGfO7rXQBR5j7EKJBafS3soCPpLhqW-J0" }}
                defaultCenter={gprops.center}
                defaultZoom={gprops.zoom}
                onChange={this._onBoundsChange}
            >
            </GoogleMapReact>
        )
    }
}