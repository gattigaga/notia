import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

import CheckboxInput from "components/CheckboxInput";

let component,
  wrapper,
  onFocus,
  onChangeLabel,
  onClickDelete,
  onChangeCheck,
  onPressEnter;

beforeEach(() => {
  onFocus = jest.fn();
  onChangeLabel = jest.fn();
  onClickDelete = jest.fn();
  onChangeCheck = jest.fn();
  onPressEnter = jest.fn();

  component = (
    <CheckboxInput
      label="Learning React"
      onFocus={onFocus}
      onChangeLabel={onChangeLabel}
      onClickDelete={onClickDelete}
      onChangeCheck={onChangeCheck}
      onPressEnter={onPressEnter}
    />
  );

  wrapper = shallow(component);
});

afterEach(() => {
  onFocus.mockReset();
  onChangeLabel.mockReset();
  onClickDelete.mockReset();
  onChangeCheck.mockReset();
  onPressEnter.mockReset();
});

describe("CheckboxInput", () => {
  it("renders correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders as blank new item", () => {
    wrapper.setProps({ isNew: true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders as checked", () => {
    wrapper.setProps({ isChecked: true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders as focused", () => {
    const mountWrapper = mount(component);
    mountWrapper.setProps({ isFocus: true });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders with custom label", () => {
    wrapper.setProps({ label: "Learning Redux" });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("calls 'onChangeLabel'", () => {
    const event = {
      target: {
        value: "Learn SVG"
      }
    };

    expect(onChangeLabel.mock.calls.length).toEqual(0);
    wrapper.find("Label").simulate("change", event);
    expect(onChangeLabel.mock.calls.length).toEqual(1);
    expect(onChangeLabel).toBeCalledWith(event);
  });

  it("calls 'onClickDelete'", () => {
    const mountWrapper = mount(component);
    mountWrapper.setProps({
      isNew: false,
      isFocus: true
    });

    expect(onClickDelete.mock.calls.length).toEqual(0);
    mountWrapper.find("IconDelete").simulate("click");
    expect(onClickDelete.mock.calls.length).toEqual(1);
  });

  it("calls 'onPressEnter'", () => {
    const mountWrapper = mount(component);
    const event = {
      preventDefault() {},
      key: "Enter"
    };

    mountWrapper.setProps({
      isNew: false,
      isFocus: true
    });

    expect(onPressEnter.mock.calls.length).toEqual(0);
    wrapper.find("Label").simulate("keyPress", event);
    expect(onPressEnter.mock.calls.length).toEqual(1);
  });

  it("calls 'onChangeCheck'", () => {
    const mountWrapper = mount(component);
    mountWrapper.setProps({
      isNew: false,
      isFocus: true
    });

    expect(onChangeCheck.mock.calls.length).toEqual(0);
    wrapper.find("Check").simulate("change");
    expect(onChangeCheck.mock.calls.length).toEqual(1);
  });

  it("calls 'onFocus'", () => {
    expect(onFocus.mock.calls.length).toEqual(0);
    wrapper.find("Label").simulate("focus");
    expect(onFocus.mock.calls.length).toEqual(1);
  });
});
