import { dx, dy, direction, applyFriction } from "./input.js";
import { createGameOverButton } from "./buttons.js";
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const snake = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  collision: 5,
  color: "white",
  speed: 0.6, // Initial speed
  body: [{ x: canvas.width / 2, y: canvas.height / 2 }]
};
// Function to spawn food at a random position
function spawnFood() {
  return {
    x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
    y: Math.floor(Math.random() * (canvas.height / 10)) * 10,
    size: 10,
    color: "green"
  };
}

let food = spawnFood();

function drawBox() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = snake.color;
  ctx.fillRect(snake.x, snake.y, snake.size, snake.size); // Use size for both width and height

   // Draw the food
   ctx.fillStyle = food.color;
   ctx.fillRect(food.x, food.y, food.size, food.size);
}

function moveBox() {
  // Move the snake's head
  let head = { x: snake.body[0].x, y: snake.body[0].y };

  switch (direction) {
    case "left":
      snake.x -= snake.speed;
      break;
    case "right":
      snake.x += snake.speed;
      break;
    case "up":
      snake.y -= snake.speed;
      break;
    case "down":
      snake.y += snake.speed;
      break;
  }
  // Add the new head to the snake's body
  snake.body.unshift(head);
    console.log(head.x + " " + head.y);
    console.log("Food location: " + food.x + " " + food.y);
    console.log("Snake.x: " + snake.x + " Snake.y: " + snake.y);
  // Check for collision with the food
  if (checkCollision(snake, food )) {

    console.log("Got food");
    // Respawn the food
    food.x = Math.floor(Math.random() * (canvas.width / 10)) * 10;
    food.y = Math.floor(Math.random() * (canvas.height / 10)) * 10;
  } else {
    // Remove the last segment of the snake's body
   snake.body.pop();
  }

  // Check boundaries to stop the snake at the borders
  if (head.x < 0) {
    head.x = 0;
  } else if (head.x + snake.size > canvas.width) {
    head.x = canvas.width - snake.size;
  }
  if (head.y < 0) {
    head.y = 0;
  } else if (head.y + snake.size > canvas.height) {
    head.y = canvas.height - snake.size
  }
}

function checkCollision(snakeHead, food) {
  return (
    snakeHead.x < food.x + food.size &&
    snakeHead.x + snake.size > food.x &&
    snakeHead.y < food.y + food.size &&
    snakeHead.y + snake.size > food.y
  );
}

function update() {

  createGameOverButton();
  // Apply friction to dx and dy
  applyFriction();
  drawBox();
  moveBox();

  // Update box position
  snake.x += dx;
  snake.y += dy;

  // Check boundaries to stop the box at the borders
  if (snake.x <= 0) {
    snake.x = 0;
  } else if (snake.x + snake.size >= canvas.width) {
    snake.x = canvas.width - snake.size;
  }
  if (snake.y <= 0) {
    snake.y = 0;
  } else if (snake.y + snake.size >= canvas.height) {
    snake.y = canvas.height - snake.size;
  }

  requestAnimationFrame(update); // Continue the game loop
}

window.onload = function () {
  // Start the game loop
  update();
};
