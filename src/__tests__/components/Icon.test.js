import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Icon from "components/Icon";

let wrapper;

beforeEach(() => {
  wrapper = shallow(<Icon name="list" />);
});

describe("Icon", () => {
  it("renders correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders with additional class", () => {
    wrapper.setProps({ className: "my-class" });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
