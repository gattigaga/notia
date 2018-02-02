import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import InsertForm from "components/InsertForm";

let wrapper, onClickDone, onChangeTitle, onFocusTitle;

beforeEach(() => {
  onClickDone = jest.fn();
  onChangeTitle = jest.fn();
  onFocusTitle = jest.fn();

  wrapper = shallow(
    <InsertForm
      title="Learn React"
      onClickDone={onClickDone}
      onChangeTitle={onChangeTitle}
      onFocusTitle={onFocusTitle}
    />
  );
});

afterEach(() => {
  onClickDone.mockReset();
  onChangeTitle.mockReset();
  onFocusTitle.mockReset();
});

describe("InsertBox", () => {
  it("renders correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders with additional class", () => {
    wrapper.setProps({ className: "my-class" });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("calls 'onClickDone'", () => {
    expect(onClickDone.mock.calls.length).toEqual(0);
    wrapper.find("Button").simulate("click");
    expect(onClickDone.mock.calls.length).toEqual(1);
  });

  it("calls 'onFocusTitle'", () => {
    expect(onFocusTitle.mock.calls.length).toEqual(0);
    wrapper.find("InputTitle").simulate("focus");
    expect(onFocusTitle.mock.calls.length).toEqual(1);
  });

  it("calls 'onChangeTitle'", () => {
    const event = {
      target: {
        value: "Learn React"
      }
    };

    expect(onChangeTitle.mock.calls.length).toEqual(0);
    wrapper.find("InputTitle").simulate("change", event);
    expect(onChangeTitle.mock.calls.length).toEqual(1);
    expect(onChangeTitle).toBeCalledWith(event);
  });
});
