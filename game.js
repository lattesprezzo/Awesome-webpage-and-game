let canvas = document.getElementById("gameCanvas"); // Set initial value to canvasMobile
let ctx = canvas.getContext("2d");

const player = new Image();
player.src = "player.png";

let playerX = 0;
let rainX = 0;
let rainY = 0;

function drawPlayer() {

    ctx.drawImage(player, playerX, 0, 70, 60);

    if(playerX <= 200) {
        playerX++;
    }
    else {
        playerX = 0;
    }

   
}

function drawRain() {
ctx.beginPath();
ctx.rect(rainX,rainY,10,10);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();

if(rainY == canvas.height) {
    rainY = 0;
}
rainY++;
rainX += 0.1;
// sama kuin rainX = rainX + 0.1
}


function updateGame() {
  ctx.clearRect(0, 0, canvas.width, 60); // Puhdista koko canvas
  drawPlayer();
  drawRain();
  requestAnimationFrame(updateGame);
}
requestAnimationFrame(updateGame);




    

