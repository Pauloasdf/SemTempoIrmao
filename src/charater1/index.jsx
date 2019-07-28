import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import charaterScr from './character1_animations.png';

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
  console.log(frame);
  return (
    <Container width={tileWidth} height={tileWidth} scale={scale}>
      <Image src={src} x={tileWidth * frame} y={tileHeight * animation} />
    </Container>
  );
}

function Character1() {
  const [frame, setFrame] = useState(1);
  useEffect(() => {
    let f = 1;
    document.addEventListener('keydown', e => {
      f += 1;
      setFrame(f);
    });
  }, []);
  return (
    <Spritesheet
      src={charaterScr}
      scale={1.5}
      tileWidth={128}
      tileHeight={128}
      animation={1}
      frame={frame}
    />
  );
}

export default Character1;
