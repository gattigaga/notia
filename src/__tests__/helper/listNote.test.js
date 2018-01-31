import { checkListItem, setListItemLabel } from "helper/listNote";

let checklist;

beforeEach(() => {
  checklist = [
    {
      id: 1,
      label: "Learn React",
      isChecked: false
    },
    {
      id: 2,
      label: "Learn Redux",
      isChecked: false
    },
    {
      id: 3,
      label: "Learn Redux Saga",
      isChecked: false
    }
  ];
});

test("checkListItem()", () => {
  let result = checkListItem(checklist, 1);
  expect(result[0].isChecked).toEqual(true);
  result = checkListItem(result, 1);
  expect(result[0].isChecked).toEqual(false);
});

test("setListItemLabel()", () => {
  const result = setListItemLabel(checklist, "Learn SVG", 1);
  expect(result[0].label).toEqual("Learn SVG");
});
