
export { beamCenter, ufoPosition, isShootingBeam, canAbduct };

import { isMoonwalkerDancing } from "./guy.js"
// Create and initialize the canvas
let ufocanvas = document.getElementById("ufoCanvas");
let gamecanvas = document.getElementById("gameCanvas");
let ctx = ufocanvas.getContext("2d");

// Resize the canvas based on window size
function resizeUfoCanvas() {
    ufocanvas.width = window.innerWidth;
    ufocanvas.height = window.innerHeight;
}

// Call resizeUfoCanvas on window resize and on page load
window.addEventListener('resize', resizeUfoCanvas);
window.addEventListener('load',  resizeUfoCanvas);

// Create the U.F.O. image
const ufo = new Image();
ufo.src = "./images/objects/ufo.png";

// Set initial U.F.O. properties
let ufoWidth = 120;
let ufoHeight = 30;
let ufoPosition = {
  x: 20,
  y: 20
};

let ufoSpeed = 0.5; // Speed of movement
let movingRight = true;

// Function to draw the U.F.O. on the canvas
function drawUfo() {

  ctx.clearRect(0, 0, ufocanvas.width, ufocanvas.height); // Clear the entire frame

  // Save the context state
  ctx.save();

  if (!isShootingBeam) {
    // Update U.F.O. position
    if (movingRight) {
      ufoPosition.x += ufoSpeed;
      if (ufoPosition.x + ufoWidth >= ufocanvas.width) {
        movingRight = false; // Change direction when hitting the right border
      }
    } else {
      ufoPosition.x -= ufoSpeed;
      if (ufoPosition.x <= 0) {
        movingRight = true; // Change direction when hitting the left border
      }
    }
  }
  
  // Flip the image if moving left
  if (!movingRight) {
    ctx.translate(ufocanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(ufo, ufocanvas.width - ufoPosition.x - ufoWidth, ufoPosition.y, ufoWidth, ufoHeight);
  } else {
    ctx.drawImage(ufo, ufoPosition.x, ufoPosition.y, ufoWidth, ufoHeight);
  }
  ufoBeamStartX = ufoPosition.x;
  beamCenter = ufoBeamStartX + beamWidth * 0.5;
  // Restore the context state
  ctx.restore();

  // Continue the animation
  requestAnimationFrame(drawUfo);
}

function getRandomInterval(min, max) {
 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Abduction beam
let beamWidth = 28;
let ufoBeamStartX;
let beamCenter;
let beamInterval;
let isShootingBeam = false;
let canAbduct; // When the beam is touching ground
let beamAbductionTime = 30; // The time the abduction is possible
let timer = 0;
function drawAbductionBeam(ctx, startX, startY, width, canvasHeight) {

  
  ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; // Yellow with 50% opacity

  // Initialize the starting height of the beam
  let currentHeight = 0;
  const beamSpeed = 3;
  let isRetreating = false;

  function drawFrame() {
    ctx.clearRect(startX, startY, width, canvasHeight);
    ctx.fillRect(startX, startY, width, currentHeight);
    isShootingBeam = true;
    if (isRetreating) {
      currentHeight -= beamSpeed;
      if (currentHeight <= 0) {
        currentHeight = 0;
        isRetreating = false; // Stop retreating when beam reaches the top
        isShootingBeam = false;
        canAbduct = false;

        // setTimeout(() => requestAnimationFrame(drawFrame), beamInterval); // Wait 1.5 seconds before firing again
        return;
      }
    } else {
      currentHeight += beamSpeed;

      if (currentHeight >= canvasHeight) {
        currentHeight = canvasHeight;
        canAbduct = true;
        timer++;
        if(timer >= beamAbductionTime) {
          isRetreating = true; // Start retreating when beam reaches the bottom
          timer = 0;
          canAbduct = false;
        }
      }
    }
    requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

// Start the animation once the U.F.O. image is loaded
ufo.onload = function () {

  drawUfo();
  resizeUfoCanvas();
  function shootBeam() {
    if (!isMoonwalkerDancing) { // Check if Moonwalker is dancing
      drawAbductionBeam(ctx, ufoPosition.x + (ufoWidth / 2)-15, ufoPosition.y + ufoHeight, beamWidth, gamecanvas.height - 280);
      beamInterval = getRandomInterval(2000, 6000); // Random interval between 2-6 seconds
      setTimeout(shootBeam, beamInterval);
    } else {
      console.log("Moonwalker is dancing, beam will not shoot.");
    }
  }

  // Initial call to start the beam

  shootBeam();

  // Start the animation loop
  requestAnimationFrame(drawUfo);
}
