var colorOn = "#6f6";
var colorOff = "#f66";

var d = 35;
var timer = 0;

var rows, cols, n;
var cells = [];
var tx, ty;

var paused = false;

function setup() {

  createCanvas(windowWidth, windowHeight);
  createCells();
  resetStates();

}


function draw() {


  // black background
  background(0);

  // draw connections between cells
  for (var i = 0; i < cells.length; i++) {
    cells[i].drawConnections();
  }

  // draw cells
  for (i = 0; i < cells.length; i++) {
    cells[i].draw();
  }
  // user interaction
  if (mouseIsPressed) {
    for (var i = 0; i < cells.length; i++) {
      if (cells[i].inside(mouseX, mouseY)) {
        cells[i].setState(true);
      }
    }
  }

  // update every 500 milliseconds
  if (!paused && millis() - timer > 500) {
    step();
    timer = millis();
  };



}


function step() {

  // update future state
  for (var i = 0; i < cells.length; i++) {
    cells[i].updateFutureState();
  }

  // update cells
  for (i = 0; i < cells.length; i++) {
    cells[i].update();
  }
}


function keyTyped() {

  switch (key) {
    case 'r':
      resetStates();
      break;
    case 'c':
      clearStates();
      break;
    case ' ':
      paused = !paused;
      break;
  }
  
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createCells();
  resetStates();
}


// random init
function resetStates() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].setState(random() > 0.5);
  }
}


// random init
function clearStates() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].setState(false);
  }
}


function resetPositions() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].resetPositon();
  }
}


function createCells() {

  cells = [];

  // border size  
  tx = (width % d) / 2;
  ty = (height % d) / 2;

  // get number of cells based on cell size
  rows = int(height / d);
  cols = int(width / d);
  n = rows * cols;

  // create cells
  for (var i = 0; i < n; i++) {
    cells[i] = new Cell(d, i % cols, int(i / cols));
  }

  // connect cells
  for (i = 0; i < n; i++) {
    cells[i].connect();
  }

}


function Cell(d, xgrid, ygrid) {

  this.d = d;

  this.xgrid = xgrid;
  this.ygrid = ygrid;

  this.state = false;

  this.resetPosition();

}


Cell.prototype.setState = function(state) {
  this.state = this.futureState = state;
};


Cell.prototype.connect = function() {
  this.neighbors = this.getNeighbors();
};


Cell.prototype.drawConnections = function() {

  var d1 = this.d * 0.5;
  var t = d1;

  // draw connections

  var n = this.neighbors.length;

  for (var i = 0; i < n; i++) {
    var neighbor = this.neighbors[i];
    stroke(100);
    strokeWeight(0.5);
    line(this.x, this.y, neighbor.x, neighbor.y);
  }

};


Cell.prototype.draw = function() {

  var d1 = this.d * 0.9;
  var d2 = this.d * 0.8;
  var t = this.d * 0.5;

  // set color based on state
  var c1 = colorOff;
  if (this.state === true) {
    c1 = colorOn;
  }

  // a slightly darker color
  var c2 = lerpColor(color(c1), color(0), 0.5);

  // draw the cell itself
  noStroke();

  fill(c1);
  ellipse(this.x, this.y, d1, d1);

  fill(c2);
  ellipse(this.x, this.y, d2, d2);

};


Cell.prototype.resetPosition = function() {

  // reset screen position
  this.x = tx + (this.xgrid + 0.5) * this.d;
  this.y = ty + (this.ygrid + 0.5) * this.d;

};


Cell.prototype.getNeighbors = function() {

  // get coordinates of the neighborhood
  var xleft = max(this.xgrid - 1, 0);
  var xright = min(this.xgrid + 1, cols - 1);
  var ytop = max(this.ygrid - 1, 0);
  var ybottom = min(this.ygrid + 1, rows - 1);

  // array of neighbors
  var neighbors = [];

  // add all neighbors to the array
  for (var y = ytop; y <= ybottom; y++) {
    for (var x = xleft; x <= xright; x++) {
      var idx = y * cols + x;
      if (!(x == this.xgrid && y == this.ygrid)) {
        neighbors.push(cells[y * cols + x]);
      }
    }
  }

  // return them
  return neighbors;

};


Cell.prototype.updateFutureState = function() {

  var n = this.neighbors.length;
  var alife = 0;

  // count neighbors that are alife
  for (var i = 0; i < n; i++) {
    if (this.neighbors[i].state === true) {
      alife += 1;
    }
  }

  // game of life rule
  if (this.state === true) {
    // die of lonleyness or over population
    if (alife < 2 || alife > 3) {
      this.futureState = false;
    }
  } else {
    // birth
    if (alife == 3) {
      this.futureState = true;
    }
  }

};


Cell.prototype.update = function() {
  this.state = this.futureState;
};


Cell.prototype.inside = function(x, y) {
  return dist(this.x, this.y, mouseX, mouseY) < d / 2;
}