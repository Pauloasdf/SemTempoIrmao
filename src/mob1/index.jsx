import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import useInterval from 'lib/useInterval';
import useEventListener from 'lib/useEventListerner';
import useSprite from 'useSprite';
import mobSrc from './mob1_animations.png';

const animations = {
  idle: 0,
  run: 1,
  taunt: 2,
  atk1: 3,
  atk2: 4,
  atk3: 5,
  atk4: 6,
  damage1: 7,
  damage2: 8,
  death: 9,
};

const spriteSheetConfig = {
  src: mobSrc,
  frameWidth: 96,
  frameHeight: 80,
  animations: {
    [animations.idle]: 4,
    [animations.run]: 7,
    [animations.taunt]: 4,
    [animations.atk1]: 8,
    [animations.atk2]: 4,
    [animations.atk3]: 5,
    [animations.atk4]: 8,
    [animations.damage1]: 2,
    [animations.damage2]: 2,
    [animations.death]: 5,
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

let isGoingRight = false;

function Mob1() {
  const [animation, setAnimation] = useState(animations.run);
  const [Sprite, nextAnimationStep] = useSprite(spriteSheetConfig, animation);
  const [movedDistance, setMoveDistance] = useState(600);
  const [direction, setDirection] = useState();

  const move = useCallback(
    useInterval(() => {
      setMoveDistance(movedDistance + (isGoingRight ? -10 : 10));
      setDirection(isGoingRight);
      nextAnimationStep();
    }, 140),
    //   }
    //   },
    [isGoingRight]
  );
  useInterval(() => {
    isGoingRight = !isGoingRight;
  }, 5000);

  //   const [isBlockingAction, setBlockingAction] = useState(false);
  //   const initBlockingAnimation = useCallback(anim => {
  //     setAnimation(anim);
  //     setBlockingAction(true);
  //   }, []);

  //   const idle = useCallback(() => {
  //     setAnimation(animations.idle);
  //     nextAnimationStep();
  //   }, [nextAnimationStep]);

  //   useInterval(() => {
  //     if (isBlockingAction) return setBlockingAction(nextAnimationStep());

  //     if (pressedKeys[39]) move(false);
  //     if (pressedKeys[37]) move(true);
  //     if (pressedKeys[81]) return initBlockingAnimation(animations.atk1);
  //     if (pressedKeys[87]) return initBlockingAnimation(animations.atk2);
  //     if (pressedKeys[69]) return initBlockingAnimation(animations.atk3);
  //   }, 55);

  //   useInterval(() => {
  //     // if (isBlockingAction) return;
  //     // if (Object.keys(pressedKeys).length === 0)
  //     idle();
  //   }, 160);

  return (
    <Controller x={movedDistance} y={160}>
      <CollisionBox />
      <Sprite scale={2} flipX={direction} />
    </Controller>
  );
}

export default Mob1;
