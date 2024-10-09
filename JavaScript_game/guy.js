
export { playerWidth, playerHeight, playerPosition, drawAnimatedPlayerImage };
import {
  dx, dy
} from "./input.js";

const playerStartFramesXRight = [0, 100, 200, 310, 400, 500, 600, 700, 800, 900];
const playerStartFramesXLeft = [900, 800, 700, 600, 500, 400, 300, 200, 100, 0];
const playerStartFramesY = [0];
const frameAmount = 10;
let isMoving = false;
let lookingLeft = true;

const guyAnimationList = {
  walkLeft: "/images/animations/guy-walk-left.png",
  walkRight: "/images/animations/guy-walk-right.png",
  idleLeft: "/images/animations/guy-idle-left.png"
};

let canvas = document.getElementById("gameCanvas"); // Set initial value
let ctx = canvas.getContext("2d");

const player = new Image();
player.src = guyAnimationList.idleLeft;

let playerWidth = 100;
let playerHeight = 192;
let startFrameIndex = 0;
let timer = 0;

// Player startposition
const playerPosition = {
  x: canvas.width,
  y: 0
};

function frameControl(lookingLeft) {
  return lookingLeft ? playerStartFramesXLeft : playerStartFramesXRight;
}

function controlPlayerX(positionX) {
  if (!isMoving) {
    if (lookingLeft) {
      return positionX;
    } else {
      return -positionX - player.width / 1.8; // Otherwise it translates the player too far from the current x-position
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
    case dx < -0.01: // It might be never exactly zero
      console.log("left" + "dx: " + dx);
      lookingLeft = true;
      isMoving = true;
      yIndex = 0; // Left animation
      if (player.src !== guyAnimationList.walkLeft) {
        player.src = guyAnimationList.walkLeft;
        console.log("Left animation list: " + player.src);
      }
      break;
    case dx > 0.01:
      console.log("right" + "dx: " + dx);
      lookingLeft = false;
      isMoving = true;
      yIndex = 0; // Right animation
      if (player.src !== guyAnimationList.walkRight) {
        player.src = guyAnimationList.walkRight;
        console.log("Right animation list: " + player.src);
      }
      break;
    default:
      console.log("idle!" + "dx: " + dx + " lookingLeft = " + lookingLeft);
      isMoving = false;
      
      yIndex = 0; // Default animation (no movement)
      startFrameIndex = 0;
      if (player.src !== guyAnimationList.idleLeft) {
        player.src = guyAnimationList.idleLeft;
      }
      break;
  }

  ctx.save();
  if (!isMoving) {
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
    frameControl()[startFrameIndex],
    //playerStartFramesXRight[startFrameIndex],
    playerStartFramesY[yIndex],
    95,
    192,
    controlPlayerX(x),
    276,
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