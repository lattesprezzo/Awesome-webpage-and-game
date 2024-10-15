document.addEventListener("DOMContentLoaded", function() {
    // Initialize elements after the DOM is fully loaded
    var htmlElm = document.getElementsByTagName("html")[0];
    var wrapperdiv = document.getElementById('wrapperDiv');
    var gamecanvas = document.getElementById('gameCanvas');
    var ufocanvas = document.getElementById('ufoCanvas');
    var frontcanvas = document.getElementById('frontCanvas');
    var bgImage = new Image();
    var isMobile = window.matchMedia("(max-width: 768px)").matches;

    // Hide all elements initially
    htmlElm.style.display = "none";
    gamecanvas.style.display = "none";
    frontcanvas.style.display = "none";
    ufocanvas.style.display = "none";

    // Display all elements once the DOM is fully loaded
    htmlElm.style.display = "block";
    gamecanvas.style.display = "block";
    frontcanvas.style.display = "block";
    ufocanvas.style.display = "block";

    window.addEventListener('load', function() {
        bgImage.src = isMobile ? './images/background-images/forest-mobile.jpg' : './images/background-images/forest.jpeg';
        
        bgImage.onload = function() {
            if (isMobile) {
                wrapperdiv.style.height = window.innerHeight + 'px';
                gamecanvas.style.width = window.innerWidth + 'px';
                gamecanvas.style.height = window.innerHeight + 'px';
                ufocanvas.style.width = window.innerWidth + 'px';
                ufocanvas.style.height = window.innerHeight + 'px';
                frontcanvas.style.width = window.innerWidth + 'px';
                frontcanvas.style.height = window.innerHeight + 'px';
            } else {
                wrapperdiv.style.height = bgImage.height + 'px';
                gamecanvas.style.width = bgImage.width + 'px';
                gamecanvas.style.height = bgImage.height + 'px';
                ufocanvas.style.width = bgImage.width + 'px';
                ufocanvas.style.height = bgImage.height + 'px';
                frontcanvas.style.width = bgImage.width + 'px';
                frontcanvas.style.height = bgImage.height + 'px';
            }

           // let windowFullHeight = (gamecanvas.height/window.innerHeight)*100; // Normalize canvas height to 100%
        };
    });
});


//   // Resize the canvas based on window size
//   function resizeCanvas() {
//     var gamecanvas = document.getElementById('gameCanvas');
//     gamecanvas.width = window.innerWidth;
//     gamecanvas.height = window.innerHeight;
// }

// // Call resizeCanvas on window resize and on page load
// window.addEventListener('resize', resizeCanvas);
// //window.addEventListener('load', resizeCanvas);


// resizeCanvas(); // Initial resize

// // Jos Windowin kokoa muutetaan, päivitetään Height + Width ja logataan ulos tietoa:
// window.addEventListener('resize', function() {
//     //canvas.height = window.innerHeight * 0.6;
//    // canvas.width = window.innerWidth * 0.6;
//    var gamecanvas = document.getElementById('gameCanvas');

//     console.log("Windows resized. New dimensions: " + "H: " + gamecanvas.height + " X: " + gamecanvas.width);


//   });
  
