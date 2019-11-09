import React from "react";
import { shallow, mount } from "../../src/enzyme";
import configureMockStore from "redux-mock-store";
import { Venue } from "../../src/modules/venue/Venue";
import { locations as venues } from "../../src/services/data";
import waitForExpect from "wait-for-expect";
import venuePicReducer from "../../src/modules/venue/reducer";
import { Provider } from "react-redux";
import {
  VENUE_PHOTOS,
  VENUE_PHOTOS_SUCCESS
} from "../../src/modules/venue/constants";
import { venuePhotoEpic } from "../../src/modules/venue/epics";
import { createEpicMiddleware } from "redux-observable";

const createState = (initialState: any) => (actions: any) => {
  return {
    venuePic: actions.reduce(venuePicReducer, initialState)
  };
};
const initialState = createState({
  photos: {},
  isLoading: false,
  error: null
});
describe("venue view", () => {
  let epicMiddleware = createEpicMiddleware();
  const createMockStore = configureMockStore([epicMiddleware]);
  let wrapper;
  let store;
  beforeEach(() => {
    store = createMockStore(initialState);
    epicMiddleware.run(venuePhotoEpic);

    wrapper = mount(
      <Provider store={store}>
        <Venue venue={venues.response.groups[0].items[1].venue} />
      </Provider>
    );
  });
  afterEach(() => {
    store = undefined;
  });

  it("should show no image box", async () => {
    const actions = store.getActions();
    const venuId = venues.response.groups[0].items[1].venue.id;
    wrapper.props().store.getState = jest.fn().mockImplementation(() => {
      return {
        venuePic: {
          isLoading: false,
          photos: {
            "557c3971498ec5857dd9bdf4": {
              photos: {
                count: 0,
                items: [],
                dupesRemoved: 0
              }
            }
          },
          error: null
        }
      };
    });
    await waitForExpect(() => {
      wrapper.update();
      expect(wrapper.find('.noImage')).toHaveLength(1);
    });

    wrapper.unmount();
  });
});
