
var cells = [];
var cols = 16;
var rows = 9;

function setup() {
  
  createCanvas(windowWidth, windowHeight);
  // create 100 cells

  var n = rows * cols;
  var d = width / cols;
  
  // create cells
  for(var i = 0; i < n; i++) {
    cells[i] = new Cell(i % cols, floor(i / cols));
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
  
  // calculate new diameter
  var d = width / cols;
  
  // reset all cells to the new diameter
  for(var i = 0; i < cells.length; i++) {
    cells[i].reset(d);
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


function Cell(xgrid, ygrid) {
  this.xgrid = xgrid;
  this.ygrid = ygrid;
  this.c = color(random(255), random(255), random(255), 127);
}


Cell.prototype.draw = function() {
  
  var d1 = this.d * 0.5;
  var d2 = this.d * 0.35;
  var t = d1;

  noStroke();
  fill(this.c);
  ellipse(this.x + t, this.y + t, d1, d1);
  
  fill(0, 100);
  ellipse(this.x + t, this.y + t, d2, d2);

}


Cell.prototype.reset = function(d) {
  
  // reset diameter
  this.d = d;
  
  // reset screen position
  this.x = this.xgrid * d;
  this.y = this.ygrid * d;

}


Cell.prototype.getNeighbors = function() {
  
  // get coordinates of the neighborhood
  var xleft = max(this.xgrid - 1, 0);
  var xright = min(this.xgrid + 1, cols - 1);
  var ytop = max(this.ygrid - 1, 0);
  var ybottom = min(this.ygrid + 1, rows - 1);
  
  // array of neighbors
  var neighbors = [];
  
  // add all neighbors to the array
  for(var y = ytop; y <= ybottom; y++) {
    for(var x = xleft; x <= xright; x++) {
       var idx = y * cols + x;
       neighbors.push(cells[y * cols + x]);
    }
  }
  
  // return them
  return neighbors;
  
}


function mousePressed() {
  // show neighbors of top left cell
  print(cells[1].getNeighbors().length);
}
