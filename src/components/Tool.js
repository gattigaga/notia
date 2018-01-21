import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Icon from "components/Icon";
import Tooltip from "components/Tooltip";

const StyledIcon = styled(Icon)`
  color: #aaa;
  font-size: 24px;
  user-select: none;
`;

const StyledTooltip = styled(Tooltip)``;

const Container = styled.div`
  position: relative;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover ${StyledIcon} {
    color: #555;
  }

  &:hover ${StyledTooltip} {
    top: 100%;
    opacity: 1;
  }
`;

const Tool = ({ icon, tooltip, onClick }) => (
  <Container onClick={onClick}>
    <StyledIcon name={icon} />
    <StyledTooltip text={tooltip} />
  </Container>
);

Tool.propTypes = {
  icon: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Tool;
