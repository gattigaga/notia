import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";

import Icon from "components/Icon";

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0px;
  border-top: ${props => (props.isFocus ? "1px" : "0px")} solid #ddd;
  border-bottom: ${props => (props.isFocus ? "1px" : "0px")} solid #ddd;
`;

const Check = styled.input`
  outline: 0px;
  margin-right: 8px;
  cursor: pointer;
`;

const IconPlus = styled(Icon)`
  margin-right: 8px;
  user-select: none;
  color: #888;
  font-size: 18px;
`;

const IconDelete = styled(Icon)`
  background: #888;
  color: white;
  border-radius: 100%;
  font-size: 16px;
  padding: 2px;
  user-select: none;
  margin-left: 16px;
  cursor: pointer;

  &:hover {
    background: #555;
  }
`;

const Label = styled(TextareaAutosize)`
  width: 100%;
  font-family: Roboto Slab;
  font-size: 14px;
  color: black;
  border: 0px;
  outline: 0px;
  resize: none;

  &::placeholder {
    color: #888;
    user-select: none;
  }
`;

Check.displayName = "Check";
Label.displayName = "Label";
IconDelete.displayName = "IconDelete";

class CheckboxInput extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isFocus) {
      this.label.textarea.focus();
    }
  }

  render() {
    const {
      label,
      isChecked,
      isNew,
      isFocus,
      onFocus,
      onChangeCheck,
      onChangeLabel,
      onClickDelete,
      onPressEnter
    } = this.props;

    return (
      <Container isFocus={isFocus}>
        {isNew ? (
          <IconPlus name="add" />
        ) : (
          <Check type="checkbox" onChange={onChangeCheck} checked={isChecked} />
        )}
        <Label
          value={label}
          placeholder="List Item"
          rows={1}
          innerRef={ref => {
            this.label = ref;
          }}
          autoFocus={isFocus}
          onChange={onChangeLabel}
          onFocus={onFocus}
          onKeyPress={e => {
            if (e.key === "Enter") {
              e.preventDefault();
              onPressEnter();
            }
          }}
        />
        {!isNew &&
          isFocus && <IconDelete name="close" onClick={onClickDelete} />}
      </Container>
    );
  }
}

CheckboxInput.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool,
  isNew: PropTypes.bool,
  isFocus: PropTypes.bool,
  onFocus: PropTypes.func,
  onChangeCheck: PropTypes.func,
  onChangeLabel: PropTypes.func,
  onClickDelete: PropTypes.func,
  onPressEnter: PropTypes.func
};

export default CheckboxInput;
