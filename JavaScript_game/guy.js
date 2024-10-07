
export {playerWidth, playerHeight, playerPosition, drawAnimatedPlayerImage };
import {
    dx, dy
     } from "./input.js";

    
const playerStartFramesX = [0, 123, 246, 369, 492, 615, 738, 861, 984, 1107];
const playerStartFramesY = [0, 231, 462, 693, 924];
const frameAmount = 10;

let canvas = document.getElementById("gameCanvas"); // Set initial value
let ctx = canvas.getContext("2d");

const player = new Image();
player.src = "/images/guy-walk-right.png";

// ............... PLAYER ............... //
let playerWidth = 123;
let playerHeight = 231;
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
      yIndex = 0; // Left animation
      player.src = "/images/guy-walk-left.png";
      break;
    case dx > 0:
      yIndex = 0; // Right animation
      player.src = "/images/guy-walk-right.png";
      break;
    default:
      yIndex = 0; // Default animation (no movement)
      break;
  }
  ctx.drawImage(
    player,
    playerStartFramesX[startFrameIndex],
    playerStartFramesY[yIndex],
    123,
    231,
    x,
    y,
    playerWidth,
    playerHeight
  );

  // Create animation on the lower Player:
  timer++;
  if (timer >= 10) {
    timer = 0;
    startFrameIndex++;
  }

  if (startFrameIndex == 10) {
    startFrameIndex = 0;
  }
}