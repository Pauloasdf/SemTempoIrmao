import React, { useState } from 'react';
import styled from 'styled-components';

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

export default Spritesheet;
