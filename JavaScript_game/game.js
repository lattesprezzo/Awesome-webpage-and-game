import {
    dx,
    dy,
  } from "./input.js";

let canvas = document.getElementById("gameCanvas"); // Set initial value
let ctx = canvas.getContext("2d");

// Default H and W are 150px x 300px so set custom size here:
// Max out:
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

canvas.width = 300;
canvas.height = window.innerHeight;


const background = new Image();
background.src = "background.jpg";

const player = new Image();
player.src = "player.png";

const player2 = new Image(); // Create fully animated element
player2.src = "animations-full.png";


// ..................BULLETS................. //

// Bullet variables
let bulletY = 0;
let alpha = 1;
let bulletSpeed = 0.1;
let playerXsnapshot = dx;// Start once here. Game update will take care of the following loops
// and updates the Snapshot to the playerX current value.

function drawBullets(startX, color) {
ctx.beginPath();
ctx.rect(startX,bulletY,10,10);
ctx.fillStyle = color;
ctx.fill();
ctx.closePath();

// Start from the top again
if(bulletY >= canvas.height) {
    bulletY = playerY;
    playerXsnapshot = playerX;
}
startX = playerXsnapshot;
bulletY+=bulletSpeed;
}

// .............. RAIN .............. //


//const rainStartY = canvas.height;
// Rain variables
const rainStartY = 0; // Start from the top
let rainY = rainStartY;
let rainSpeed = 0; // Initial speed
const gravity = 0.4; // Acceleration due to gravity
let rainalpha = 1; // Initial alpha value

// INFO
// let alpha; <-- a global variable that will also affect drawBullets

function drawRain(startX, color) {
  rainalpha = 1 - (rainY / canvas.height); // Calculate alpha based on position
    ctx.beginPath();
    ctx.rect(startX, rainY, 2, 30);
    ctx.fillStyle = `rgba(135, 206, 235, ${rainalpha})`; // Use local alpha
    ctx.fill();
    ctx.closePath();
    
    // Update speed with acceleration
    rainSpeed += gravity;
    
    // Update position with speed
    rainY += rainSpeed;

    // Update alpha based on position
    rainalpha = 1 - (rainY / canvas.height);
    
    // Reset position and speed when raindrop reaches the bottom
    if (rainY >= canvas.height) {
        rainY = rainStartY;
        rainSpeed = 0; // Reset speed
    }
}



// INFO
// Ei käytetä jos on jo määritelty CSS:ssä:
// function drawBackground()
//  {
//     ctx.drawImage(background,0,0,200,200);
//  }
 
// ............... PLAYER ............... //
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

// Jos Windowin kokoa muutetaan, päivitetään Height ja logataan ulos tietoa:
window.addEventListener('resize', function() {
  canvas.height = window.innerHeight;
  console.log(canvas.height + " " + canvas.width);
});

let windowFullHeight = (canvas.height/window.innerHeight)*100; // Normalize canvas height to 100%


// Peli pyörii tässä looppina:

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Puhdista koko canvas

  playerX += dx; // Liikuttavat pelaajaa antamalla sille uusia arvoja input:in kautta
  playerY += dy;

  //drawBackground(); // voi myös asettaa .css-filessä #gameCanvas
  // Tämä taustapiirto-funktio pitää olla tällöin piilotettu, 
  //ei voi antaa kahta käskyä
 console.log(windowFullHeight);

// windowFullHeight = alpha;
//   do {
//     alpha -= 0.004;
//   }  while (alpha == 100)
//     if(alpha <= 0) {
//       alpha = 100;
//     }
    
//  drawRain(10, 0.8, `rgba(${playerX},100,50,${alpha})`);
  drawBullets(10, 0.8, "blue");  
   drawBullets(playerXsnapshot, 0.8, "red");
   drawBullets(24, 0.8, "green");

   drawRain(50, `rgba(135, 206, 235`)

  drawAnimatedPlayerImage(playerX, playerY); // Tämä piirtää täyden anim spritesheetin kohta kohdalta

  requestAnimationFrame(updateGame);
}
requestAnimationFrame(updateGame);






