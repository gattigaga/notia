import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Backdrop from "components/Backdrop";

let wrapper, onClick;

beforeEach(() => {
  onClick = jest.fn();
  wrapper = shallow(
    <Backdrop onClick={onClick} isOpen>
      <h1>Hello World</h1>
    </Backdrop>
  );
});

describe("Backdrop", () => {
  it("renders correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("calls onClick", () => {
    expect(onClick.mock.calls.length).toEqual(0);
    wrapper.simulate("click");
    expect(onClick.mock.calls.length).toEqual(1);
  });
});
