// Create and initialize the canvas
let ufocanvas = document.getElementById("ufoCanvas");
ufocanvas.width = 500; // Set canvas width
ufocanvas.height = 200; // Set canvas height
let ctx = ufocanvas.getContext("2d");

// Create the U.F.O. image
const ufo = new Image();
ufo.src = "/images/objects/ufo.png";

// Set initial U.F.O. properties
let ufoWidth = 100;
let ufoHeight = 100;
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

// Start the animation once the U.F.O. image is loaded
ufo.onload = function() {
  drawUfo();
};

// Start the animation loop
requestAnimationFrame(drawUfo);
