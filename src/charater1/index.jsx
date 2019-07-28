import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import useInterval from 'lib/useInterval';
import useEventListener from 'lib/useEventListerner';
import useSprite from 'useSprite';
import charaterScr from './character1_animations.png';

const animations = {
  idle: 6,
  run: 0,
  atk1: 1,
  atk2: 2,
  atk3: 3,
};

const spriteSheetConfig = {
  src: charaterScr,
  frameWidth: 128,
  frameHeight: 128,
  animations: {
    [animations.idle]: 4,
    [animations.run]: 7,
    [animations.atk1]: 8,
    [animations.atk2]: 21,
    [animations.atk3]: 15,
  },
};

const Controller = styled.div`
  position: absolute;
  left: ${({ x }) => x}px;
  top: ${({ y }) => y}px;
`;

const CollisionBox = styled.div`
  /* border: solid 1px aliceblue; */
  height: 45%;
  width: 21%;
  position: absolute;
  top: 98%;
  right: 36.4%;
`;

function Character() {
  const [animation, setAnimation] = useState(animations.run);
  const [Sprite, nextAnimationStep] = useSprite(spriteSheetConfig, animation);

  const [pressedKeys, setPressedKeys] = useState({});
  useEventListener('keydown', e => {
    setPressedKeys({ ...pressedKeys, [e.keyCode]: true });
  });
  useEventListener('keyup', e => {
    delete pressedKeys[e.keyCode];
    setPressedKeys(pressedKeys);
  });

  const [movedDistance, setMoveDistance] = useState(0);
  const [direction, setDirection] = useState();
  const move = useCallback(
    isGoingRight => {
      setAnimation(animations.run);
      setMoveDistance(movedDistance + (isGoingRight ? -10 : 10));
      setDirection(isGoingRight);
      nextAnimationStep();
    },
    [movedDistance, nextAnimationStep]
  );

  const [isBlockingAction, setBlockingAction] = useState(false);
  const initBlockingAnimation = useCallback(anim => {
    setAnimation(anim);
    setBlockingAction(true);
  }, []);

  const idle = useCallback(() => {
    setAnimation(animations.idle);
    nextAnimationStep();
  }, [nextAnimationStep]);

  useInterval(() => {
    if (isBlockingAction) return setBlockingAction(nextAnimationStep());

    if (pressedKeys[39]) move(false);
    if (pressedKeys[37]) move(true);
    if (pressedKeys[81]) return initBlockingAnimation(animations.atk1);
    if (pressedKeys[87]) return initBlockingAnimation(animations.atk2);
    if (pressedKeys[69]) return initBlockingAnimation(animations.atk3);
  }, 55);

  useInterval(() => {
    if (isBlockingAction) return;
    if (Object.keys(pressedKeys).length === 0) idle();
  }, 160);

  return (
    <Controller x={movedDistance} y={100}>
      <CollisionBox />
      <Sprite scale={2.5} flipX={direction} />
    </Controller>
  );
}

export default Character;
