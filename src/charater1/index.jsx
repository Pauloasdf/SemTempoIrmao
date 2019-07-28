import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react';
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
  transform: ${({ x, y }) => `translate(-${x}px, -${y}px)`};
`;

function Spritesheet({ src, frameWidth, frameHeight, column, row, scale = 1 }) {
  return (
    <Container width={frameWidth} height={frameHeight} scale={scale}>
      <Image src={src} x={frameWidth * column} y={frameHeight * row} />
    </Container>
  );
}

const animations = {
  run: 0,
  atk1: 1,
  atk2: 2,
  atk3: 3,
};

const spriteSheetConfig1 = {
  src: charaterScr,
  frameWidth: 128,
  frameHeight: 128,
  animations: {
    [animations.run]: 8,
    [animations.atk3]: 16,
  },
};

function useSprite(spriteSheetConfig, animation) {
  const [step, setStep] = useState(0);
  const animationSteps = useMemo(
    () => spriteSheetConfig.animations[animation],
    [animation, spriteSheetConfig.animations]
  );
  const nextStep = () => {
    console.log(step, animationSteps);
    setStep(step < animationSteps ? step + 1 : 0);
  };
  const { src, frameHeight, frameWidth } = spriteSheetConfig;
  return [
    props => (
      <Spritesheet
        src={src}
        frameWidth={frameWidth}
        frameHeight={frameHeight}
        column={step}
        row={animation}
        {...props}
      />
    ),
    nextStep,
  ];
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function Character() {
  const [Sprite, nextStep] = useSprite(spriteSheetConfig1, animations.atk3);
  useInterval(() => {
    nextStep();
  }, 100);
  return <Sprite scale={2.5} />;
}

export default Character;
