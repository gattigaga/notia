import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon from "components/Icon";
import Tooltip from "components/Tooltip";
import CheckboxList from "components/CheckboxList";

const Container = styled.div`
  position: relative;
  background: white;
  padding: 16px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
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

const Note = ({ className, title, type, content, onChangeCheck }) => (
  <Container className={className}>
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
  onChangeCheck: PropTypes.func
};

export default Note;
