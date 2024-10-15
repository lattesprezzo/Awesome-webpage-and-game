import {
 dx, dy,
    applyFriction
  } from "./input.js";

  import { playerWidth, playerHeight, playerPosition, drawAnimatedPlayerImage, drawMoonwalker, isMoonwalkerDancing } from './guy.js';


  
  let canvas = document.getElementById("gameCanvas"); // Set initial value
  let ctx = canvas.getContext("2d");
  
  // // Resize the canvas based on window size
  // function resizeCanvas() {
  //     canvas.width = window.innerWidth;
  //     canvas.height = window.innerHeight;
  // }
  
  // // Call resizeCanvas on window resize and on page load
  // window.addEventListener('resize', resizeCanvas);
  // window.addEventListener('load', resizeCanvas);
  

  // resizeCanvas(); // Initial resize
  

// Default H and W are 150px x 300px so set custom size here:
//canvas.width = 500;
//canvas.height = 400;
// Max out:
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;


// Object definitions
//const background = new Image();
//background.src = "background.jpg";

// const player = new Image();
// player.src = "player.png";

// const player = new Image(); // Create fully animated element
// player.src = "animations-full.png";

// ..................BULLETS................. //

// Bullet variables
let bulletY = 0;
let alpha = 1;
let bulletSpeed = 2;
let playerXsnapshot = playerPosition.x;// Start once here. Game update will take care of the following loops
// and updates the Snapshot to the playerPosition.x current value.

function drawBullets(startX, color) {
ctx.beginPath();
ctx.rect(startX,bulletY,10,10);
ctx.fillStyle = color;
ctx.fill();
ctx.closePath();

// Start from the top again
if(bulletY >= canvas.height) {
    bulletY = playerPosition.y;
    playerXsnapshot = playerPosition.x;
    
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
  let rainalpha = 1 - (rainY / canvas.height); // Calculate alpha based on position
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
  ctx.clearRect(playerPosition.x, playerPosition.y, playerWidth, playerHeight);
  //playerWidth = 120 + playerExtraWidth; INFO: For the idle animation
  playerWidth = 270;
  playerHeight = 90;

  //INFO: Show the player coordinates in the element below the game canvas
  coordinatesInfo.textContent = ` Player location: x: ${Math.round(
    playerX
  )} y: ${Math.round(playerPosition.y)}`;

  // WARNING: Objects stack up on each other, thus the BG-image must be drawn first.
  // Otherwise the first image will cover everything.
  // Correct hierarchy:
  // ctx.drawImage(background-image);
  // ctx.drawImage(player);
  // ctx.drawImage(smoke-in-front);
  ctx.drawImage(player, playerPosition.x, playerPosition.y, playerWidth, playerHeight); //INFO: Parameters: Image to draw, x- and y-coordinates, width and height

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
    playerPosition.x,
    playerPosition.y + 100,
    90,
    playerHeight
  );

}



// ......... Game loop .......... //

function updateGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Puhdista koko canvas

// Apply friction for gradual deceleration
//console.log("dx: " + dx + " " + "dy: " + dy);
// Apply friction for gradual deceleration
applyFriction();

playerPosition.x += dx; // Liikuttavat pelaajaa antamalla sille uusia arvoja input:in kautta
playerPosition.y += dy;
//
  //drawBackground(); // voi myös asettaa .css-filessä #gameCanvas
  // Tämä taustapiirto-funktio pitää olla tällöin piilotettu, 
  //ei voi antaa kahta käskyä

 //console.log(windowFullHeight);

 // Boundary checks
 if (playerPosition.x < 0) playerPosition.x = 0;
 if (playerPosition.x + playerWidth > canvas.width) playerPosition.x = canvas.width - playerWidth;
 if (playerPosition.y < 0) playerPosition.y = 0;
 if (playerPosition.y + playerHeight > canvas.height) playerPosition.y = canvas.height - playerHeight;


//drawRain(10, 0.8, `rgba(${playerPosition.x},100,50,${alpha})`);

//drawBullets(10, "rgba(0, 0, 255, 0.8)"); // Blue bullets with fixed alpha

//drawBullets(playerXsnapshot, "rgba(255, 0, 0, 0.8)"); // Red bullets with fixed alpha
//drawBullets(playerXsnapshot, "rgba(0, 255, 0, 0.8)"); // Green bullets with fixed alpha

//drawRain(50, `rgba(135, 206, 235)`); // Rain with dynamic alpha


if(isMoonwalkerDancing) {
drawMoonwalker(playerPosition.x, playerPosition.y);}
else {
// INFO: drawAnimatedPlayerImage(playerPosition.x, playerPosition.y); // Tämä piirtää täyden anim spritesheetin kohta kohdalta
}

  requestAnimationFrame(updateGame);
}
requestAnimationFrame(updateGame);






