import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 480px;
  height: 48px;
  background: white;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  margin: 32px auto;
  display: flex;
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  cursor: pointer;
  align-items: center;
`;

const Text = styled.span`
  font-style: italic;
  font-size: 14px;
  font-family: Roboto;
  color: #bbb;
  margin-left: 18px;
  user-select: none;
`;

const InsertBox = ({ children, onClick }) => (
  <Container onClick={onClick}>
    <TextContainer>
      <Text>What do you think ?</Text>
    </TextContainer>
    {children}
  </Container>
);

InsertBox.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

export default InsertBox;
