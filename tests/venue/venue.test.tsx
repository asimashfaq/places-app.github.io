import React from "react";
import {  mount } from "../../src/enzyme";
import configureMockStore from "redux-mock-store";
import { Venue } from "../../src/modules/venue/Venue";
import { locations as venues } from "../../src/services/data";
import waitForExpect from "wait-for-expect";
import venuePicReducer from "../../src/modules/venue/reducer";
import { Provider } from "react-redux";
import { venuePhotoEpic } from "../../src/modules/venue/epics";
import { createEpicMiddleware } from "redux-observable";
import * as SearchContext from "../../src/context/SearchContext";

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
    const contextValues = { query: "coffe", updateQuery: q => {} };
    jest
      .spyOn(SearchContext, "useSearchContext")
      .mockImplementation(() => contextValues);

    wrapper = mount(
      <Provider store={store}>
        <Venue venue={venues.response.groups[0].items[1].venue}  onMouseLeave={()=>{}} onMouseEnter={()=>{}}/>
      </Provider>
    );
  });
  afterEach(() => {
    store = undefined;
  });

  it("should show no image box", async () => {
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
      expect(wrapper.find(".noImage")).toHaveLength(1);
    });

    wrapper.unmount();
  });
});
