
var cells = [];
var cols = 10;
var rows = 10;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  // create 100 cells

  var n = rows * cols;
  var d = width / cols;
  
  // create cells
  for(var i = 0; i < n; i++) {
    cells[i] = new Cell();
  }
  
  // init cell positions
  resetCells();
  
}


function windowResized() {
  
  // adjust the canvas size
  resizeCanvas(windowWidth, windowHeight);
  resetCells();

}

// resize and reposition cells to fit the new canvas
function resetCells() {
  
  var d = width / cols;
  for(var i = 0; i < cells.length; i++) {
    cells[i].reset(i % cols * d, floor(i / cols) * d, d);
  }
}

function draw() {
  
  // black background
  background(0);
  
  // draw 100 cells
  for(var i = 0; i < cells.length; i++) {
    cells[i].draw();
  }

}


function Cell() {
  this.c = color(random(255), random(255), random(255), 127);
}


Cell.prototype.draw = function() {
  
  var d1 = this.d * 0.9;
  var d2 = this.d * 0.7;
  var t = d1/2;

  noStroke();
  fill(this.c);
  ellipse(this.x + t, this.y + t, d1, d1);
  
  fill(0, 100);
  ellipse(this.x + t, this.y + t, d2, d2);

}

Cell.prototype.reset = function(x, y, d) {
  this.x = x;
  this.y = y;
  this.d = d;
}
