/**
 * Check or uncheck list item
 *
 * @export
 * @param {object[]} list - Source of data
 * @param {string} list[].label - Item label
 * @param {boolean} list[].isChecked - Check flag
 * @param {number} index - Index of item
 */
export function checkListItem(list, index) {
  return list.map((item, itemIndex) => {
    if (itemIndex === index) {
      return {
        ...item,
        isChecked: !item.isChecked
      };
    }

    return item;
  });
}

/**
 * Check or uncheck list item
 *
 * @export
 * @param {object[]} list - Source of data
 * @param {string} list[].label - Item label
 * @param {boolean} list[].isChecked - Check flag
 * @param {string} label - New label
 * @param {number} index - Index of item
 */
export function setListItemLabel(list, label, index) {
  return list.map((item, itemIndex) => {
    if (itemIndex === index) {
      return {
        ...item,
        label
      };
    }

    return item;
  });
}
