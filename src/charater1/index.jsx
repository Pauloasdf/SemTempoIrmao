import React, { useState } from 'react';
import styled from 'styled-components';

import charaterScr from './charater1_animations.png';

/**
 * run
 * atk1
 * atk2
 * atk3
 * change state
 * die
 * idle
 * menu
 */

const Container = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
  transform: scale(${({ scale }) => `${scale}, ${scale}`});
  transform-origin: top left;
`;

const Image = styled.img`
  transform: translate(${x => x}px, ${y => y}px);
`;

function Spritesheet({ src, scale, tileWidth, tileHeight, animation, frame }) {
  return (
    <Container width={tileWidth} height={tileWidth} scale={scale}>
      <Image src={src} x={tileWidth * frame} y={tileHeight * animation} />
    </Container>
  );
}

function Character1() {
  return (
    <Spritesheet
      src={charaterScr}
      scale={1}
      tileWidth={128}
      tileHeight={128}
      animation={1}
      frame={1}
    />
  );
}

export default Character1;
