
export let dx = 0; //WARNING: exportatut variaabelit ovat read-only
export let dy = 0;
export { handleKeyUp, handleKeyDown, applyFriction };

// Set the acceleration and maximum speed of the player
export const acceleration = 0.9;
export const maxSpeed = 1.2;
export let friction = 0.8; // Friction factor for gradual deceleration
export let direction = "right";

function handleKeyDown(event) {
  if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
    dx = 0;
    dy = -1;
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
    dx = 0;
    dy = 1;
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
    dx = -1;
    dy = 0;
  } else if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
    dx = 1;
    dy = 0;
  }
}
// Function to handle keydown events
// function handleKeyDown(event) {

//   friction = 1; // Reset friction when a key is pressed

//   if (event.key === "ArrowUp") {
//     dy = Math.max(dy - acceleration, -maxSpeed);
//     dx = 0; // Reset horizontal velocity to prevent mixed directions
//   } else if (event.key === "ArrowDown") {
//     dy = Math.min(dy + acceleration, maxSpeed);
//     dx = 0; // Reset horizontal velocity
//   } else if (event.key === "ArrowLeft") {
//     dx = Math.max(dx - acceleration, -maxSpeed);
//     dy = 0; // Reset vertical velocity
//   } else if (event.key === "ArrowRight") {
//     dx = Math.min(dx + acceleration, maxSpeed);
//     dy = 0; // Reset vertical velocity
//   }
// }
// Function to handle keyup events
function handleKeyUp(event) {
  if (
    event.key === "ArrowUp" ||
    event.key === "ArrowDown" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowRight"
  ) {

    friction = 0; // Apply friction when a key is released (zero out)
    }
  }

// Function to apply friction
function applyFriction() {
  dx *= friction;
  dy *= friction;
}

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);


