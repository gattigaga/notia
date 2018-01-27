import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";

const Container = styled.div`
  width: 480px;
  background: white;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  margin: 32px auto;
  padding: 16px;
  padding-bottom: 8px;
`;

const InputTitle = styled(TextareaAutosize)`
  width: 100%;
  font-weight: bold;
  font-family: Roboto;
  font-size: 16px;
  color: black;
  border: 0px;
  outline: 0px;
  resize: none;
  margin-bottom: 12px;

  &::placeholder {
    color: #888;
    user-select: none;
  }
`;

const Toolbar = styled.div`
  width: 100%;
  padding-top: 16px;
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 14px;
  border: 0px;
  border-radius: 2px;
  background: white;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  color: #333;
  cursor: pointer;
  outline: 0px;

  &:hover {
    background: #eee;
  }
`;

Button.displayName = "Button";
InputTitle.displayName = "InputTitle";

const InsertForm = ({
  title,
  children,
  onClickDone,
  onChangeTitle,
  onFocusTitle
}) => (
  <Container>
    <InputTitle
      rows={1}
      placeholder="Title"
      value={title}
      onChange={onChangeTitle}
      onFocus={onFocusTitle}
    />
    {children}
    <Toolbar>
      <Button onClick={onClickDone}>DONE</Button>
    </Toolbar>
  </Container>
);

InsertForm.propTypes = {
  onClickDone: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onFocusTitle: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string
};

export default InsertForm;
