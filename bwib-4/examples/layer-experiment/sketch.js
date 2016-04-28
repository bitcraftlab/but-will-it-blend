
var images = [];
var layers = 7;
var zoom = 1.0 / layers;

function setup() {
 
  imageMode(CENTER);
  createCanvas(windowWidth, windowHeight);
  
  // load layers into an array
  for(var i = 0; i < layers; i++) {
    images[i] = loadImage("assets/layer-" + i + ".png");
  }
  
}


function draw() {

  // white background
  background(255);

  // display all layers ontop of each other
  for (var i = 0; i < images.length; i++) {
   
    // save state
    push();
    
    // vanishing point
    var centerX = width / 2;
    var centerY = height / 2;
        
    // horizontal distance of the mouse from the center
    var deltax = (mouseX - centerX);
    
    // vertical distance of the mouse from the center
    var deltay = (mouseY - centerY); 
    
    // motion of the layer depends on position in the array and distance from the center
    var dx = deltax * (layers / 2 - i) * zoom ;
    var dy = deltay * (layers / 2 - i) * zoom;
    
    // show the image
    image(images[i], centerX + dx, centerY + dy, images[i].width, images[i].height);
    
    // restore state
    pop();
    
  }

}
