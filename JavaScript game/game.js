import {
    dx,
    dy,
  } from "./input.js";

let canvas = document.getElementById("gameCanvas"); // Set initial value to canvasMobile
let ctx = canvas.getContext("2d");

const background = new Image();
background.src = "background.jpg";

const player = new Image();
player.src = "player.png";

const player2 = new Image(); // Create fully animated element
player2.src = "animations-full.png";

// Dropping object variables
//let rainX = 0;
let rainY = 0;
let alpha = 1;
let rainSpeed = 0.1;
let playerXsnapshot = dx;// Start once here. Game update will take care of the following loops
// and updates the Snapshot to the playerX current value.

function drawPlayer() {

    ctx.drawImage(player,100,0,400,600,playerX, playerY, 120, 100);
}

function drawBullets(startX, extraX, color) {
ctx.beginPath();
ctx.rect(startX,rainY,10,10);
ctx.fillStyle = color;
ctx.fill();
ctx.closePath();

// Start from the top again
if(rainY >= canvas.height) {
    rainY = playerY;
    playerXsnapshot = playerX;
}

startX = playerXsnapshot; 

rainY+=rainSpeed;
//rainX += 0.5;

}

function drawBullets(startX, extraX, color) {
  ctx.beginPath();
  ctx.rect(startX,rainY,10,10);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
  
  // Start from the top again
  if(rainY >= canvas.height) {
      rainY = playerY;
      playerXsnapshot = playerX;
  }
  
  startX = playerXsnapshot; 
  
  rainY+=rainSpeed;
  
  }

function drawBackground()
 {
    ctx.drawImage(background,0,0,200,200);
 }
let playerX = 0;
let playerY = 0;
let playerWidth = 0;
let playerHeight = 0;
let startFrameIndex = 0;
let timer = 0;

// Player animation spritesheet control:

const playerStartFrames = [0, 90, 180];
// INFO: The variables if you want to scale the player width in a loop. The idle animation code is commented out below.
// let playerExtraWidth = 0;
// let canIncrease = true;
//----------------------
const coordinatesInfo = document.querySelector(".coordinatesinfo p");

// Create game object images
function drawStaticPlayerImage() {
  // INFO: Clear the drawn image in one frame using the area defined with parameters:
  ctx.clearRect(playerX, playerY, playerWidth, playerHeight);
  //playerWidth = 120 + playerExtraWidth; INFO: For the idle animation
  playerWidth = 270;
  playerHeight = 90;

  //INFO: Show the player coordinates in the element below the game canvas
  coordinatesInfo.textContent = ` Player location: x: ${Math.round(
    playerX
  )} y: ${Math.round(playerY)}`;

  // WARNING: Objects stack up on each other, thus the BG-image must be drawn first.
  // Otherwise the first image will cover everything.
  // Correct hierarchy:
  // ctx.drawImage(background-image);
  // ctx.drawImage(player);
  // ctx.drawImage(smoke-in-front);
  ctx.drawImage(player, playerX, playerY, playerWidth, playerHeight); //INFO: Parameters: Image to draw, x- and y-coordinates, width and height

  // Create animation on the lower Player:
  timer++;
  if (timer >= 30) {
    timer = 0;
    startFrameIndex++;
  }

  if (startFrameIndex == 3) {
    startFrameIndex = 0;
  }
  ctx.drawImage(
    player,
    playerStartFrames[startFrameIndex],
    0,
    90,
    90,
    playerX,
    playerY + 100,
    90,
    playerHeight
  );

}
const player2StartFramesX = [0, 90, 180];
const player2StartFramesY = [0, 90, 180, 270, 360];
function drawAnimatedPlayerImage(x, y) {
  // INFO: Clear the drawn image in one frame using the area defined with parameters:
  ctx.clearRect(x, y, playerWidth, playerHeight);

  playerWidth = 30;
  playerHeight = 30;
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
    player2,
    player2StartFramesX[startFrameIndex],
    player2StartFramesY[yIndex],
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

// Peli pyörii tässä looppina:

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Puhdista koko canvas

  playerX += dx; // Liikuttavat pelaajaa antamalla sille uusia arvoja input:in kautta
  playerY += dy;

  //drawBackground(); // voi myös asettaa .css-filessä #gameCanvas
  // Tämä taustapiirto-funktio pitää olla tällöin piilotettu, 
  //ei voi antaa kahta käskyä
 
  do {
    alpha -= 0.005;
  }  while (alpha == 1)

//  drawRain(10, 0.8, `rgba(${playerX},100,50,${alpha})`);
  drawBullets(10, 0.8, "blue");  
   drawBullets(playerXsnapshot, 0.8, "red");
   drawBullets(24, 0.8, "green");

  drawAnimatedPlayerImage(playerX, playerY); // Tämä piirtää täyden anim spritesheetin kohta kohdalta

  requestAnimationFrame(updateGame);
}
requestAnimationFrame(updateGame);






