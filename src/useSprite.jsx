import React, { useState, useMemo, useCallback } from 'react';
import { string, number, bool } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  overflow: hidden;
  transform: scale(
    ${({ scale, flipX }) => `${flipX ? -scale : scale}, ${scale}`}
  );
`;

const Image = styled.img`
  transform: ${({ x, y }) => `translate(-${x + 2}px, -${y}px)`};
`;

function Spritesheet({
  src,
  frameWidth,
  frameHeight,
  column,
  row,
  scale = 1,
  flipX = false,
}) {
  return (
    <Container
      width={frameWidth}
      height={frameHeight}
      scale={scale}
      flipX={flipX}
    >
      <Image src={src} x={frameWidth * column} y={frameHeight * row} />
    </Container>
  );
}

Spritesheet.propTypes = {
  src: string.isRequired,
  frameWidth: number.isRequired,
  frameHeight: number.isRequired,
  column: number.isRequired,
  row: number.isRequired,
  scale: number,
  flipX: bool,
};

Spritesheet.defaultProps = {
  scale: 1,
  flipX: false,
};

function useSprite(spriteSheetConfig, animation) {
  const [step, setStep] = useState(0);
  const animationSteps = useMemo(
    () => spriteSheetConfig.animations[animation],
    [animation, spriteSheetConfig.animations]
  );
  const nextStep = useCallback(() => {
    setStep(step < animationSteps ? step + 1 : 0);
    return step === animationSteps ? false : step;
  }, [animationSteps, step]);
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

export default useSprite;
