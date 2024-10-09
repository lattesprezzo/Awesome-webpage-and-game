
export {playerWidth, playerHeight, playerPosition, drawAnimatedPlayerImage };
import {
    dx, dy
     } from "./input.js";
const playerStartFramesX = [0, 90, 180];
const playerStartFramesY = [0, 90, 180, 270, 360];

let canvas = document.getElementById("gameCanvas"); // Set initial value
let ctx = canvas.getContext("2d");

const player = new Image();
player.src = "animations-full.png";

// ............... PLAYER ............... //

let playerWidth = 0;
let playerHeight = 0;
let startFrameIndex = 0;
let timer = 0;

const playerPosition = {
    x: 0,
    y: 0
  };

function drawAnimatedPlayerImage(x, y) {
  // INFO: Clear the drawn image in one frame using the area defined with parameters:
  ctx.clearRect(x, y, playerWidth, playerHeight);

  playerWidth = 60;
  playerHeight = 60;
  let yIndex;
  switch (true) {
    case dy < 0:
      yIndex = 1;
      break;
    case dy > 0:
      yIndex = 2;
      break;
    case dx < 0:
      yIndex = 3; // Left animation
      break;
    case dx > 0:
      yIndex = 4; // Right animation
      break;
    default:
      yIndex = 0; // Default animation (no movement)
      break;
  }
  ctx.drawImage(
    player,
    playerStartFramesX[startFrameIndex],
    playerStartFramesY[yIndex],
    90,
    90,
    x,
    y,
    playerWidth,
    playerHeight
  );

  // Create animation on the lower Player:
  timer++;
  if (timer >= 30) {
    timer = 0;
    startFrameIndex++;
  }

  if (startFrameIndex == 3) {
    startFrameIndex = 0;
  }
}