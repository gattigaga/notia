import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(222, 226, 226, 0.8);
  display: ${props => (props.isOpen ? "static" : "none")};
`;

const Backdrop = ({ isOpen, children, onClick }) => (
  <Container isOpen={isOpen} onClick={onClick}>
    {children}
  </Container>
);

Backdrop.propTypes = {
  isOpen: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default Backdrop;
