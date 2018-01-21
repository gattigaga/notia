import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Tool from "components/Tool";

let wrapper, onClick;

beforeEach(() => {
  onClick = jest.fn();
  wrapper = shallow(<Tool icon="list" tooltip="New List" onClick={onClick} />);
});

afterEach(() => {
  onClick.mockReset();
});

describe("Tool", () => {
  it("renders correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("calls 'onClick'", () => {
    expect(onClick.mock.calls.length).toEqual(0);
    wrapper.simulate("click");
    expect(onClick.mock.calls.length).toEqual(1);
  });
});
