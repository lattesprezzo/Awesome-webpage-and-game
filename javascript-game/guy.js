
export { playerWidth, playerHeight, playerPosition, drawAnimatedPlayerImage, drawMoonwalker, isMoonwalkerDancing };
import {
  dx, dy
} from "./input.js";

import {
  beamCenter, ufoPosition, isShootingBeam, canAbduct
} from "./ufo.js";

const playerStartFramesXRight = [0, 100, 200, 310, 400, 500, 600, 700, 800, 900];
const playerStartFramesXLeft = [900, 800, 700, 600, 500, 400, 300, 200, 100, 0];

const moonwalkerStartFrameX = [
  0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500,
  5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500
];

const playerStartFramesY = [0];
const frameAmount = 10;
const animationSpeed = 6;
let isMoving = false;
let lookingLeft = true;
let hasBeenAbducted = false;

const guyAnimationList = {
  walkLeft: "/images/animations/guy-walk-left.png",
  walkRight: "/images/animations/guy-walk-right.png",
  idleLeft: "/images/animations/guy-idle-left.png"
};

let canvas = document.getElementById("gameCanvas"); // Set initial value
let ctx = canvas.getContext("2d");

const player = new Image();
player.src = guyAnimationList.idleLeft;

// Moonwalker
const moonWalker = new Image();
moonWalker.src = "/images/animations/moonwalker-spritesheet.png";
let isMoonwalkerDancing = false;
let playerWidth = 100;
let playerHeight = 192;
const playerColliderWidth = 20;
let startFrameIndex = 0;
let timer = 0;
let playerBrightness;

// Player startposition
const playerPosition = {
  x: canvas.width,
  y: 271
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



function controlPlayerY() {
  let uforeach = ufoPosition.y;
  if (hasBeenAbducted) {

    if (playerPosition.y > uforeach) {
      playerPosition.y -= 2.5; // Decrease y-position to make the player move up
      return playerPosition.y;
    }

    if (playerPosition.y <= uforeach) {

      isMoonwalkerDancing = true;
      console.log("Should be a Moonwalker now!");

      playerPosition.y -= 0.1;
      return playerPosition.y;
    }
  }
  else {
    return 271;
  }
}

function drawWithShadow(x) {
  const screenWidth = canvas.width;
  const leftMargin = 40; // Margin for the left side
  const rightMargin = 160; // Margin for the right side

  // Calculate distance to the nearest edge
  let distanceToEdge;

  if (x < leftMargin) {
    distanceToEdge = x / (leftMargin);

  } else if (x > screenWidth - rightMargin) {
    distanceToEdge = (screenWidth - x) / (rightMargin * 1.4);

  } else {
    distanceToEdge = 1;
  }
  // Calculate brightness
  if (hasBeenAbducted) {
    playerBrightness = 0.5;
  }
  else {
    playerBrightness = 0.2 + 0.8 * distanceToEdge; // Values range from 0.2 (full shadow) to 1 (no shadow)

  }
  ctx.filter = `brightness(${playerBrightness})`;
}
let moonwalkerFrameIndex = 0; 
const moonwalkerFrameCount = 10; // Assuming the GIF has 6 frames, adjust if needed
const moonwalkerAnimationSpeed = 6; // Adjust based on how fast you want the animation

const moonwalkerWidth = 500;
const moonwalkerHeight = 500;

function drawMoonwalker(x, y) {
  ctx.clearRect(x, y, 110, 90);

  ctx.drawImage(
   moonWalker,
   moonwalkerStartFrameX[moonwalkerFrameIndex],
   0,
   moonwalkerWidth,
   moonwalkerHeight,
   playerPosition.x,
   0,
   110,
   90

  );
  timer++;
  if(timer >= moonwalkerAnimationSpeed) {
    timer = 0;
      moonwalkerFrameIndex++;
  }
  if(moonwalkerFrameIndex == moonwalkerFrameCount) {
    moonwalkerFrameIndex = 0;
  }
}

function drawAnimatedPlayerImage(x, y) {
  // INFO: Clear the drawn image in one frame using the area defined with parameters:
  ctx.clearRect(x, y, playerWidth, playerHeight);

  playerWidth = 55;
  playerHeight = 65;
  let yIndex;

  // Checking if U.F.O-beam hits the player:
  // console.log("Beamcenter: " + beamCenter + " " + "Ufoposition: " + ufoPosition.x + " " + "x: " + x);

  if (isShootingBeam && canAbduct) {
    if (beamCenter > x - playerColliderWidth && beamCenter < x + playerColliderWidth) {
      hasBeenAbducted = true;
      //  ctx.clearRect(x, y, playerWidth, playerHeight);
      console.log("ABDUCTED");
    }
  }
  // Draw the abduction GIF if the player is being abducted
  //  if (isMoonwalkerDancing) {
  //   ctx.drawImage(moonWalker, controlPlayerX(x), controlPlayerY(), playerWidth, playerHeight);
  //   return;
  // }

  switch (true) {
    case dx < -0.01: // It might be never exactly zero

      lookingLeft = true;
      isMoving = true;
      yIndex = 0; // Left animation
      if (player.src !== guyAnimationList.walkLeft) {
        player.src = guyAnimationList.walkLeft;
      }
      break;
    case dx > 0.01:
      lookingLeft = false;
      isMoving = true;
      yIndex = 0; // Right animation
      if (player.src !== guyAnimationList.walkRight) {
        player.src = guyAnimationList.walkRight;
      }
      break;
    default:
      isMoving = false;
      yIndex = 0; // Default animation (no movement)
      startFrameIndex = 0;
      if (player.src !== guyAnimationList.idleLeft) {
        player.src = guyAnimationList.idleLeft;
      }
      break;
  }

  ctx.save();
  drawWithShadow(x);

  if (!isMoving) {
    if (lookingLeft) {
      ctx.scale(1, 1);
    }
    else {
      ctx.scale(-1, 1);// Flip horizontally
    }
  }

  //ctx.translate(-canvas.width, 0); // Adjust for flipped image
//   if (isMoonwalkerDancing) {
// drawMoonwalker(x, y);
//   }
//   else {
    ctx.drawImage(
      player,
      frameControl()[startFrameIndex],
      //playerStartFramesXRight[startFrameIndex],
      playerStartFramesY[yIndex],
      95,
      192,
      controlPlayerX(x),
      controlPlayerY(),
      playerWidth,
      playerHeight
    );
 // }  

  ctx.restore(); // Restore the state
  // Loop animation frames
  // We avoid the moonwalk by reversing the frame calculation on walking left 
  // (since it's a mirror image of walking right)
  if (isMoving) {
    timer++;
    if (timer >= animationSpeed) {
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
}