/**
 * Check or uncheck list item
 *
 * @export
 * @param {object[]} list - Source of data
 * @param {string} list[].label - Item label
 * @param {boolean} list[].isChecked - Check flag
 * @param {number} itemID - ID of item
 */
export function checkListItem(list, itemID) {
  return list.map(item => {
    if (itemID === item.id) {
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
 * @param {number} itemID - ID of item
 */
export function setListItemLabel(list, label, itemID) {
  return list.map(item => {
    if (itemID === item.id) {
      return {
        ...item,
        label
      };
    }

    return item;
  });
}
