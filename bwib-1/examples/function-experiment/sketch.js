
var cells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // create 100 cells
  for(var i = 0; i<1000; i++) {
    cells[i] = new Cell();
  }
}

function draw() {
  
  // black background
  background(0);
  
  // draw 100 cells
  for(var i = 0; i < cells.length; i++) {
    cells[i].draw();
  }
  print(int(frameRate()));
}

function Cell() {

  this.c = color(random(255), random(255), random(255), 127);
  this.x = random(0, width);
  this.y = random(0, height);
  this.d = random(10, 30);
}

Cell.prototype.draw = function() {
  noStroke();
  fill(this.c);
  ellipse(this.x, this.y, this.d, this.d);
}