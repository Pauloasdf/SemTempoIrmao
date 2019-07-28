import React, { useState, useReducer, useCallback } from 'react';
import styled from 'styled-components';

import useInterval from 'lib/useInterval';
import useEventListener from 'lib/useEventListerner';
import useSprite from 'useSprite';
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

const animations = {
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

function Character() {
  const [animation, setAnimation] = useState(animations.run);
  const [Sprite, nextAnimationStep] = useSprite(spriteSheetConfig, animation);

  const [pressedKeys, setPressedKeys] = useState({});
  useEventListener('keydown', e => {
    setPressedKeys({ ...pressedKeys, [e.keyCode]: true });
  });
  useEventListener('keyup', e => {
    setPressedKeys({ ...pressedKeys, [e.keyCode]: false });
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

  useInterval(() => {
    if (isBlockingAction) return setBlockingAction(nextAnimationStep());

    if (pressedKeys[81]) return initBlockingAnimation(animations.atk1);
    if (pressedKeys[87]) return initBlockingAnimation(animations.atk2);
    if (pressedKeys[69]) return initBlockingAnimation(animations.atk3);
    if (pressedKeys[39]) move(false);
    if (pressedKeys[37]) move(true);
    return setAnimation(animations.run);
  }, 55);

  return (
    <Controller x={movedDistance} y={100}>
      <Sprite scale={2.5} flipX={direction} />
    </Controller>
  );
}

export default Character;
