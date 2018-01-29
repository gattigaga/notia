import { checkListItem, setListItemLabel } from "helper/listNote";

let checklist;

beforeEach(() => {
  checklist = [
    {
      label: "Learn React",
      isChecked: false
    },
    {
      label: "Learn Redux",
      isChecked: false
    },
    {
      label: "Learn Redux Saga",
      isChecked: false
    }
  ];
});

test("checkListItem()", () => {
  let result = checkListItem(checklist, 0);
  expect(result[0].isChecked).toEqual(true);
  result = checkListItem(result, 0);
  expect(result[0].isChecked).toEqual(false);
});

test("setListItemLabel()", () => {
  const result = setListItemLabel(checklist, "Learn SVG", 0);
  expect(result[0].label).toEqual("Learn SVG");
});
