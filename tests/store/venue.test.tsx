import React from "react";
import {  mount } from "../../src/enzyme";
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
describe("venue store", () => {
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

  it("should load the photos ", async () => {
    const actions = store.getActions();

    await waitForExpect(() => {
      wrapper.update();
      expect(actions[0].type).toEqual(VENUE_PHOTOS);
      expect(actions[1].type).toEqual(VENUE_PHOTOS_SUCCESS);
    });

    wrapper.unmount();
  });
});
