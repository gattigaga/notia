import React from "react";
import PropTypes from "prop-types";

import CheckboxInput from "components/CheckboxInput";

const CheckboxList = ({
  items,
  focusIndex,
  onFocus,
  onClickDelete,
  onChangeLabel,
  onChangeCheck,
  onPressEnter
}) => (
  <div>
    {items.map((item, index) => (
      <CheckboxInput
        key={index}
        label={item.label}
        isChecked={item.isChecked}
        isFocus={focusIndex === index}
        isNew={item.isNew}
        onFocus={() => onFocus(index)}
        onChangeLabel={e => onChangeLabel(e.target.value, index)}
        onClickDelete={() => onClickDelete(index)}
        onChangeCheck={() => onChangeCheck(index)}
        onPressEnter={() => onPressEnter(index)}
      />
    ))}
  </div>
);

CheckboxList.propTypes = {
  items: PropTypes.array,
  focusIndex: PropTypes.number,
  onFocus: PropTypes.func,
  onClickDelete: PropTypes.func,
  onChangeLabel: PropTypes.func,
  onChangeCheck: PropTypes.func,
  onPressEnter: PropTypes.func
};

export default CheckboxList;
