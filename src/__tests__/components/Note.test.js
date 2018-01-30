import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import Note from "components/Note";

let wrapper;

beforeEach(() => {
  const onChangeCheck = jest.fn();
  const onClickClose = jest.fn();

  wrapper = shallow(
    <Note
      title="Learning"
      onChangeCheck={onChangeCheck}
      onClickClose={onClickClose}
    />
  );
});

describe("Note", () => {
  it("renders with type 'text'", () => {
    wrapper.setProps({
      type: "text",
      content: "I want to learn React"
    });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders with type 'list'", () => {
    wrapper.setProps({
      type: "list",
      content: [
        {
          label: "Learn React",
          isChecked: true,
          isNew: false
        },
        {
          label: "Learn Redux",
          isChecked: true,
          isNew: false
        },
        {
          label: "Learn Redux Saga",
          isChecked: false,
          isNew: false
        }
      ]
    });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it("renders with custom class", () => {
    wrapper.setProps({
      className: "my-class"
    });

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
