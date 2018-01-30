import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import CheckboxList from "components/CheckboxList";
import CloseButton from "components/CloseButton";

const StyledCloseButton = styled(CloseButton)`
  opacity: 0;
  transition: all 0.3s;
`;

const Container = styled.div`
  position: relative;
  background: white;
  padding: 16px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
  }

  &:hover ${StyledCloseButton} {
    opacity: 1;
  }
`;

const Title = styled.h1`
  color: black;
  font-weight: bold;
  font-family: Roboto;
  font-size: 16px;
  margin-top: 0px;
  margin-bottom: 18px;
  cursor: default;
`;

const Text = styled.p`
  font-family: Roboto Slab;
  font-size: 14px;
  color: black;
  margin: 0px;
  line-height: 1.5em;
  cursor: default;
`;

const Note = ({
  className,
  title,
  type,
  content,
  onClickClose,
  onChangeCheck
}) => (
  <Container className={className}>
    <StyledCloseButton onClick={onClickClose} />
    <Title>{title}</Title>
    {type === "text" && <Text>{content}</Text>}
    {type === "list" && (
      <CheckboxList items={content} onChangeCheck={onChangeCheck} isStatic />
    )}
  </Container>
);

Note.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.oneOf(["text", "list"]),
  content: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        isChecked: PropTypes.bool
      })
    )
  ]),
  onClickClose: PropTypes.func,
  onChangeCheck: PropTypes.func
};

export default Note;
