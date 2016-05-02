
var cells = [];
var cols = 16;
var rows = 9;

var dx, dy;

function setup() {
  
  createCanvas(windowWidth, windowHeight);

  // distances between cells
  dx = width / cols;
  dy = height / rows;
  
  // create cells
  var n = rows * cols;
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
  
  // calculate new distances
  dx = width / cols;
  dy = height / rows;
  
  // reset all cells to their new positions
  for(var i = 0; i < cells.length; i++) {
    cells[i].reset(dx, dy);
  }
  
}

function draw() {
  
  // black background
  background(0, 0, 50);
  
  // draw 100 cells
  for(var i = 0; i < cells.length; i++) {
    cells[i].draw();
  }

}


function Cell(xgrid, ygrid) {
  this.xgrid = xgrid;
  this.ygrid = ygrid;
  this.c = color(random(255), random(255), 255);
}


Cell.prototype.draw = function() {
  
  var d = min(dx, dy);
  var d1 = d * 0.9;
  var d2 = d * 0.75;

  noStroke();
  fill(this.c);
  ellipse(this.x + dx/2, this.y + dy/2, d1, d1);
  
  fill(0, 100);
  ellipse(this.x + dx/2, this.y + dy/2, d2, d2);

}


Cell.prototype.reset = function(dx, dy) {
  
  // reset distances
  this.dx = dx;
  this.dy = dy;
  
  // reset screen position
  this.x = this.xgrid * dx;
  this.y = this.ygrid * dy;

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

