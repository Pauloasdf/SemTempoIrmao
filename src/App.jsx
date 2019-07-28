import React from 'react';
import styled from 'styled-components';
import Character1 from 'charater1';
import Mob1 from 'mob1';
import img from './img/bg.jpg';

const DivBody = styled.div`
  background-color: yellow;
`;

// background-image: url(${img});
function App() {
  return (
    <DivBody>
      <Character1 />
      <Mob1/>
    </DivBody>
  );
}

export default App;
