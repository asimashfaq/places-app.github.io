import React from "react";
import { mount } from "../../src/enzyme";
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
import * as SearchContext from "../../src/context/SearchContext";
let epicMiddleware = createEpicMiddleware();
const createMockStore = configureMockStore([epicMiddleware]);
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
  let wrapper;
  let store;

  beforeEach(() => {
    // config.UpdateFakeData(true)
    store = createMockStore(initialState);
    epicMiddleware.run(venuePhotoEpic);
    const contextValues = { query: "coffe", updateQuery: q => {} };

    jest
      .spyOn(SearchContext, "useSearchContext")
      .mockImplementation(() => contextValues);

    wrapper = mount(
      <Provider store={store}>
        <Venue venue={venues.response.groups[0].items[1].venue} />
      </Provider>
    );
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
