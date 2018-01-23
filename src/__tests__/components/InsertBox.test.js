import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import InsertBox from "components/InsertBox";

let wrapper, onClick;

beforeEach(() => {
  onClick = jest.fn();
  wrapper = shallow(<InsertBox onClick={onClick} />);
});

afterEach(() => {
  onClick.mockReset();
});

describe("InsertBox", () => {
  it("renders correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("calls 'onClick'", () => {
    expect(onClick.mock.calls.length).toEqual(0);
    wrapper.find("TextContainer").simulate("click");
    expect(onClick.mock.calls.length).toEqual(1);
  });
});
