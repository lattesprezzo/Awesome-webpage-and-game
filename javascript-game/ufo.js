// Create and initialize the canvas
let ufocanvas = document.getElementById("ufoCanvas");
let gamecanvas = document.getElementById("gameCanvas");
ufocanvas.width = 500; // Set canvas width
ufocanvas.height = 200; // Set canvas height
let ctx = ufocanvas.getContext("2d");

// Create the U.F.O. image
const ufo = new Image();
ufo.src = "/images/objects/ufo.png";

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

    if(!isShootingBeam) {
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

  // Restore the context state
  ctx.restore();

  // Continue the animation
  requestAnimationFrame(drawUfo);
}

function getRandomInterval(min, max) {
  isShootingBeam = true;
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Abduction beam
let beamWidth = 40;
let beamInterval;
let isShootingBeam = false;
function drawAbductionBeam(ctx, startX, startY, width, canvasHeight) {
  ctx.fillStyle = "rgba(255, 255, 0, 0.5)"; // Yellow with 50% opacity

  // Initialize the starting height of the beam
  let currentHeight = 0;
  const beamSpeed = 3;
  let isRetreating = false;  

  function drawFrame() {
    ctx.clearRect(startX, startY, width, canvasHeight);
    ctx.fillRect(startX, startY, width, currentHeight);

    if (isRetreating) {
      currentHeight -= beamSpeed;
      if (currentHeight <= 0) {
        currentHeight = 0;
        isRetreating = false; // Stop retreating when beam reaches the top
        isShootingBeam = false;

        // setTimeout(() => requestAnimationFrame(drawFrame), beamInterval); // Wait 1.5 seconds before firing again
        return;
      }
    } else {
      currentHeight += beamSpeed;
      if (currentHeight >= canvasHeight) {
        currentHeight = canvasHeight;
        isRetreating = true; // Start retreating when beam reaches the bottom
      }
    }
    requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

// Start the animation once the U.F.O. image is loaded
ufo.onload = function () {
  
  drawUfo();
 
  function shootBeam() {
    drawAbductionBeam(ctx, ufoPosition.x + ufoWidth / 2 - 25, ufoPosition.y + ufoHeight, 50, gamecanvas.height - 280);
    beamInterval = getRandomInterval(1000, 6000); // Random value between 2 and 6 seconds
    setTimeout(shootBeam, beamInterval);
   
  }

  // Initial call to start the beam
  shootBeam();

// Start the animation loop
requestAnimationFrame(drawUfo);
}
