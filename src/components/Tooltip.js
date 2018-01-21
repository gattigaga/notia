import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: auto;
  padding: 4px 8px;
  border-radius: 2px;
  background: #444;
  white-space: nowrap;
  position: absolute;
  top: 70%;
  opacity: 0;
  transition: all 0.3s;
`;

const Text = styled.span`
  color: white;
  font-family: Roboto;
  font-size: 10px;
`;

const Tooltip = ({ text, className }) => (
  <Container className={className}>
    <Text>{text}</Text>
  </Container>
);

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Tooltip;
