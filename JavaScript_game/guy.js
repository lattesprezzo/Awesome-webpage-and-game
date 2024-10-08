
export { playerWidth, playerHeight, playerPosition, drawAnimatedPlayerImage };
import {
  dx, dy
} from "./input.js";


const playerStartFramesX = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const playerStartFramesY = [0];
const frameAmount = 10;
let isMoving = false;
let lookingLeft = true;
const guyAnimationList = {
  walkLeft: "/images/guy-walk-left.png",
  walkRight: "/images/guy-walk-right.png",
  idleLeft: "/images/guy-idle-left.png"
};

let canvas = document.getElementById("gameCanvas"); // Set initial value
let ctx = canvas.getContext("2d");

const player = new Image();
player.src = guyAnimationList.idleLeft;

// ............... PLAYER ............... //
let playerWidth = 100;
let playerHeight = 191;
let startFrameIndex = 0;
let timer = 0;

const playerPosition = {
  x: 0,
  y: 0
};

function controlPlayerX(positionX) {
  if(!isMoving) {
  if (lookingLeft) {
    return positionX;
  } else {
    return -positionX-player.width/2; // Otherwise it translates the player too far from the current x-position
  }
}
else {
  return positionX;
}

}
function drawAnimatedPlayerImage(x, y) {
  // INFO: Clear the drawn image in one frame using the area defined with parameters:
  ctx.clearRect(x, y, playerWidth, playerHeight);

  playerWidth = 60;
  playerHeight = 60;

  let yIndex;

  switch (true) {
    case dx < -0.01:
      console.log("left" + "dx: " + dx);
      lookingLeft = true;
      isMoving = true;
      yIndex = 0; // Left animation
      if (player.src !== guyAnimationList.walkLeft) {
        player.src = guyAnimationList.walkLeft;
      }
      break;
    case dx > 0.01:
      console.log("right" + "dx: " + dx);
      lookingLeft = false;
      isMoving = true;
      yIndex = 0; // Right animation
      if (player.src !== guyAnimationList.walkRight) {
        player.src = guyAnimationList.walkRight;
      }
      break;
    default:
      console.log("idle!" + "dx: " + dx + " lookingLeft = " + lookingLeft);
      isMoving = false;
      x
      yIndex = 0; // Default animation (no movement)
      startFrameIndex = 0;
      if (player.src !== guyAnimationList.idleLeft) {
        player.src = guyAnimationList.idleLeft;
      }

      break;
  }

  ctx.save();
  if(!isMoving) {
  if (lookingLeft) {
    ctx.scale(1, 1);
  }
  else {
    ctx.scale(-1, 1);// Flip horizontally
  }
}

  //ctx.translate(-canvas.width, 0); // Adjust for flipped image
  ctx.drawImage(
    player,
    playerStartFramesX[startFrameIndex],
    playerStartFramesY[yIndex],
    100,
    191,
    controlPlayerX(x),
    300,
    playerWidth,
    playerHeight
  );

  ctx.restore(); // Restore the state
  // Loop animation frames
  // We avoid the moonwalk by reversing the frame calculation on walking left 
  // (since it's a mirror image of walking right)
  if (isMoving) {
    timer++;
    if (timer >= 10) {
      timer = 0;
      if (lookingLeft) {
        startFrameIndex--;
        if (startFrameIndex < 0) {
          startFrameIndex = frameAmount - 1;
        }
      } else {
        startFrameIndex++;
        if (startFrameIndex >= frameAmount) {
          startFrameIndex = 0;
        }
      }
    }
  }

  // if (isMoving) {
  //   timer++;
  //   if (timer >= 10) {
  //     timer = 0;
  //     startFrameIndex++;
  //   }
  //   if (startFrameIndex === frameAmount) {
  //     startFrameIndex = 0;
  //   }
  // }
}