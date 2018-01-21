import React, { Component } from "react";
import styled from "styled-components";

import InsertBox from "components/InsertBox";
import Tool from "components/Tool";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
  background: #dee2e2;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <InsertBox>
          <Tool icon="list" tooltip="New List" />
        </InsertBox>
      </Container>
    );
  }
}

export default App;
