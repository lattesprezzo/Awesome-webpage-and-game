const buttonsCanvas = document.getElementById("buttonsCanvas");
const ctx = buttonsCanvas.getContext("2d");

export function createGameOverButton() {
  const buttonWidth = 200;
  const buttonHeight = 50;
  const buttonX = buttonsCanvas.width / 2 - buttonWidth / 2; // Center horizontally
  const buttonY = buttonsCanvas.height / 2 - buttonHeight / 2; // Center vertically

  function drawButton() {
    ctx.clearRect(0, 0, buttonsCanvas.width, buttonsCanvas.height); // Clear canvas before drawing
    ctx.fillStyle = "black";
    ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Game Over", buttonX + 20, buttonY + 30);
  }

  function checkClick(event) {
    const rect = buttonsCanvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (x > buttonX && x < buttonX + buttonWidth && y > buttonY && y < buttonY + buttonHeight) {
      drawGameOverScreen();
      console.log("Button clicked!");
    }
  }

  buttonsCanvas.addEventListener("click", checkClick);
  drawButton();
}

function drawGameOverScreen() {
  const gameOverCanvas = document.getElementById("gameOverCanvas");
  const ctx = gameOverCanvas.getContext("2d");
  ctx.clearRect(0, 0, gameOverCanvas.width, gameOverCanvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, gameOverCanvas.width, gameOverCanvas.height);
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", gameOverCanvas.width / 2, gameOverCanvas.height / 2);
}
