import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import moment from "moment";

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

const Date = styled.p`
  color: #aaa;
  font-size: 12px;
  font-family: Roboto;
  font-style: italic;
  margin: 0px;
  margin-top: 16px;
  text-align: right;
`;

Button.displayName = "Button";
InputTitle.displayName = "InputTitle";

const InsertForm = ({
  className,
  title,
  mode,
  timestamp,
  children,
  onClickDone,
  onChangeTitle,
  onFocusTitle
}) => {
  const date = moment(timestamp).format("LLLL");

  return (
    <Container className={className}>
      <InputTitle
        rows={1}
        placeholder="Title"
        value={title}
        onChange={onChangeTitle}
        onFocus={onFocusTitle}
      />
      {children}
      {mode === "edit" && <Date>Edited at {date}</Date>}
      <Toolbar>
        <Button onClick={onClickDone}>DONE</Button>
      </Toolbar>
    </Container>
  );
};

InsertForm.propTypes = {
  className: PropTypes.string,
  onClickDone: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onFocusTitle: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  mode: PropTypes.oneOf(["create", "edit"]),
  timestamp: PropTypes.number
};

InsertForm.defaultProps = {
  mode: "create",
  timestamp: 0
};

export default InsertForm;
