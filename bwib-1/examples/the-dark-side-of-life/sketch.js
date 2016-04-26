
var cells = [];
var cols = 30;
var rows = 20;

var colorOn = "#0f0";
var colorOff = "#000";

function setup() {

  createCanvas(windowWidth, windowHeight);
  // create 100 cells

  var n = rows * cols;
  var d = width / cols;

  // create cells
  for (var i = 0; i < n; i++) {
    cells[i] = new Cell(i % cols, floor(i / cols));
  }

  // connect cells
  for (i = 0; i < n; i++) {
    cells[i].connect();
  }

  // init cell positions and states
  resetCells();
  resetCellStates();
  

}


function draw() {

  // black background
  background(0);

  // draw connections between cells
  for (var i = 0; i < cells.length; i++) {
    cells[i].drawConnections();
  }

  // draw 100 cells
  for (i = 0; i < cells.length; i++) {
    cells[i].draw();
  }
  
  if(frameCount % 12 == 0) {
    step();
  }

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

  // reset
  if(key == ' ') {
    resetCellStates();
  }

}


function windowResized() {

  // adjust the canvas size
  resizeCanvas(windowWidth, windowHeight);
  resetCells();

}


// random init
function resetCellStates() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].setState(random() > 0.5);
  }
}


// resize and reposition cells to fit the new canvas
function resetCells() {

  // calculate new diameter
  var d = width / cols;

  // reset all cells to the new diameter
  for (var i = 0; i < cells.length; i++) {
    cells[i].reset(d);
  }

}


function Cell(xgrid, ygrid) {
  this.xgrid = xgrid;
  this.ygrid = ygrid;
  this.state = false;
}

Cell.prototype.setState = function(state) {
  this.state = state;
};

Cell.prototype.connect = function() {
  this.neighbors = this.getNeighbors();
};

Cell.prototype.drawConnections = function() {

  if(this.state === true) {
    var d1 = this.d * 0.5;
    var t = d1;
  
    push();
    translate(t, t);
  
    // draw connections
    
    var d = dist(this.x, this.y, mouseX, mouseY);
    var dmax = width / 6;
    var opacity = map(d, 0, dmax, 255, 0);
  
    var n = this.neighbors.length;
  
    for (var i = 0; i < n; i++) {
      var neighbor = this.neighbors[i];
      
      if(neighbor.state === true) {
        stroke(255, opacity);
        strokeWeight(2.5);
        line(this.x, this.y, neighbor.x, neighbor.y);
      }
    }
    pop();
  }

};

Cell.prototype.draw = function() {

  var d1 = this.d * 0.5;
  var d2 = this.d * 0.35;
  var t = d1;
  var c = color(colorOff);

  // set color based on state
  if (this.state === true) {
    c = color(colorOn);
  }

  push();
  translate(t, t);

  var d = dist(this.x, this.y, mouseX, mouseY);
  var dmax = width/8;
  var opacity = map(d, 0, dmax, 255, 0);

  // draw cell itself
  noStroke();
  fill(red(c), green(c), blue(c), opacity);
  ellipse(this.x, this.y, d1, d1);

  var darker = lerpColor(color(c), color(0), 0.5);
  fill(red(darker), green(darker), blue(darker), opacity);
  ellipse(this.x, this.y, d2, d2);
  

  pop();

};


Cell.prototype.reset = function(d) {

  // reset diameter
  this.d = d;

  // reset screen position
  this.x = this.xgrid * d;
  this.y = this.ygrid * d;

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

