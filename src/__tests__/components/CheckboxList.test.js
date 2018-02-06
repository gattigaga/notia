import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";

import CheckboxList from "components/CheckboxList";

let wrapper, items;

beforeEach(() => {
  items = [
    {
      _id: "1",
      label: "Learn React",
      isChecked: true,
      isNew: false
    },
    {
      _id: "2",
      label: "Learn Redux",
      isChecked: true,
      isNew: false
    },
    {
      _id: "3",
      label: "",
      isChecked: false,
      isNew: true
    }
  ];

  wrapper = shallow(<CheckboxList items={items} focusIndex={0} isStatic />);
});

describe("CheckboxList", () => {
  it("renders correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
