import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon from "components/Icon";
import Tooltip from "components/Tooltip";

const StyledIcon = styled(Icon)`
  color: #aaa;
  font-size: 18px;
  user-select: none;
`;

const StyledTooltip = styled(Tooltip)``;

const Container = styled.div`
  position: absolute;
  top: -16px;
  left: -16px;
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  background: white;
  border-radius: 100%;

  &:hover ${StyledIcon} {
    color: black;
  }

  &:hover ${StyledTooltip} {
    top: 100%;
    opacity: 1;
  }
`;

const CloseButton = ({ className, onClick }) => (
  <Container onClick={onClick} className={className}>
    <StyledIcon name="close" />
    <StyledTooltip text="Delete" />
  </Container>
);

CloseButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default CloseButton;
