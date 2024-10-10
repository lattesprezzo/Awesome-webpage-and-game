
// Adjust elements onLoad to prevent undesired flashing
// or if you need to copy element's size to another 


var htmlElm = document.getElementsByTagName("html")[0];
var gameCanvas = document.getElementById("gameCanvas");
var frontCanvas = document.getElementById("frontCanvas");

// Hide both elements initially
htmlElm.style.display = "none";
gameCanvas.style.display = "none";
frontCanvas.style.display = "none";

document.addEventListener("DOMContentLoaded", function(event) {
    // Display both elements once the DOM is fully loaded
    htmlElm.style.display = "block";
    gameCanvas.style.display = "block";
    frontCanvas.style.display = "block";
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
        wrapperdiv.style.height = bgImage.width + 'px';

        gamecanvas.style.width = bgImage.width + 'px';
        gamecanvas.style.height = bgImage.height + 'px';
        ufocanvas.style.width = bgImage.width + 'px';
        frontcanvas.style.width = bgImage.width + 'px';
        frontcanvas.style.height = bgImage.height + 'px';
    };
});
