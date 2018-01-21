import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Tooltip from "components/Tooltip";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Tooltip text="New List" />);
});

describe("Tooltip", () => {
  it("renders correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
