import React from "react";
import { render } from "../../enzyme";
import Footer from "./Footer";

describe("<Footer />", () => {
  it("renders three <Footer /> components", () => {
    const wrapper = render(<Footer />);
    expect(wrapper.find(".copyright").text()).toContain("made with love");
  });
});
