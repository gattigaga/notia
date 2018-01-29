import React from "react";
import PropTypes from "prop-types";

import CheckboxInput from "components/CheckboxInput";

const CheckboxList = ({
  items,
  focusIndex,
  isStatic,
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
        isStatic={isStatic}
        onFocus={() => onFocus && onFocus(index)}
        onChangeLabel={e =>
          onChangeLabel && onChangeLabel(e.target.value, index)
        }
        onClickDelete={() => onClickDelete && onClickDelete(index)}
        onChangeCheck={() => onChangeCheck && onChangeCheck(index)}
        onPressEnter={() => onPressEnter && onPressEnter(index)}
      />
    ))}
  </div>
);

CheckboxList.propTypes = {
  items: PropTypes.array.isRequired,
  focusIndex: PropTypes.number,
  isStatic: PropTypes.bool,
  onFocus: PropTypes.func,
  onClickDelete: PropTypes.func,
  onChangeLabel: PropTypes.func,
  onChangeCheck: PropTypes.func,
  onPressEnter: PropTypes.func
};

CheckboxList.defaultProps = {
  focusIndex: -1
};

export default CheckboxList;
