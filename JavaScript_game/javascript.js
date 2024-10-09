
var htmlElm = document.getElementsByTagName("html")[0];
var gameCanvas = document.getElementById("gameCanvas");

// Hide both elements initially
htmlElm.style.display = "none";
gameCanvas.style.display = "none";

document.addEventListener("DOMContentLoaded", function(event) {
    // Display both elements once the DOM is fully loaded
    htmlElm.style.display = "block";
    gameCanvas.style.display = "block";
});

window.addEventListener('load', function() {
    var gameCanvas = document.getElementById('gameCanvas');
    var bgImage = new Image();
    bgImage.src ='/images/background-images/forest.jpeg'; 

    bgImage.onload = function() {
        gameCanvas.style.width = bgImage.width + 'px';
        gameCanvas.style.height = bgImage.height + 'px';
    };
});
