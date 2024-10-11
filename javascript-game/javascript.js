// Adjust elements onLoad to prevent undesired flashing
// or if you need to copy element's size to another 

var htmlElm = document.getElementsByTagName("html")[0];
var gameCanvas = document.getElementById("gameCanvas");
var frontCanvas = document.getElementById("frontCanvas");
var ufoCanvas = document.getElementById("ufoCanvas"); // Add ufoCanvas here

// Hide all elements initially
htmlElm.style.display = "none";
gameCanvas.style.display = "none";
frontCanvas.style.display = "none";
ufoCanvas.style.display = "none"; // Hide ufoCanvas initially

document.addEventListener("DOMContentLoaded", function(event) {
    // Display all elements once the DOM is fully loaded
    htmlElm.style.display = "block";
    gameCanvas.style.display = "block";
    frontCanvas.style.display = "block";
    ufoCanvas.style.display = "block"; // Display ufoCanvas
});

// Adjust element size to background size

window.addEventListener('load', function() {

    var wrapperdiv = this.document.getElementById('wrapperDiv');
    var gamecanvas = this.document.getElementById('gameCanvas');
    var ufocanvas = this.document.getElementById('ufoCanvas');
    var frontcanvas = this.document.getElementById('frontCanvas');

    var bgImage = new Image();
    bgImage.src ='/images/background-images/forest.jpeg'; 

    bgImage.onload = function() {
        wrapperdiv.style.height = bgImage.height + 'px'; // Change width to height

        gamecanvas.style.width = bgImage.width + 'px';
        gamecanvas.style.height = bgImage.height + 'px';
        ufocanvas.style.width = bgImage.width + 'px';
        ufocanvas.style.height = bgImage.height + 'px'; // Adjust height for ufocanvas
        frontcanvas.style.width = bgImage.width + 'px';
        frontcanvas.style.height = bgImage.height + 'px';
    };
});

