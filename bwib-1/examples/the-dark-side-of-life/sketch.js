
var d = 20;
var timer = 0;

var colorOn, colorOff;
var colorConnect;
var rows, cols, n;
var cells = [];
var tx, ty;

var paused = false;
var lights = false;

function setup() {
  
  // define colors
  colorOn = color("#0f0");
  colorOff = color("#000");
  colorConnect = color("#fff");
  
  // setup the game
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
    case 'l':
      lights = !lights;
      break;
  }
}

// restart the game at a different size
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


// reset to zero
function clearStates() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].setState(false);
  }
}

// reset cell positions
function resetPositions() {
  for (var i = 0; i < cells.length; i++) {
    cells[i].resetPositon();
  }
}

// create all cells
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

  if(this.state === true) {
    
    var d1 = this.d * 0.5;
    var t = d1;
    
    // mix colors
    var mix = 255;
    if(lights === false) {
      
      // cell tint based on distance from the mouse
      var dmouse = dist(this.x, this.y, mouseX, mouseY);
      var dmax = width/10;
      mix = map(dmouse, 0, dmax, 255, 0);
      
    }
      
    // draw connections
    var n = this.neighbors.length;
    for (var i = 0; i < n; i++) {
      var neighbor = this.neighbors[i];
      
      if(neighbor.state === true) {
        stroke(255, mix);
        strokeWeight(0.5);
        line(this.x, this.y, neighbor.x, neighbor.y);
      }
    }
    
    
  };

};


Cell.prototype.draw = function() {

  var d1 = this.d * 0.5;
  var d2 = this.d * 0.35;
  var t = this.d * 0.5;
  
  if (this.state === true) {

    // mix the color
    var mix1 = 0.5;
    if (lights === false) {
        
      // cell tint based on distance from the mouse
      var dmouse = dist(this.x, this.y, mouseX, mouseY);
      var dmax = width/12;
      mix1 = map(dmouse, 0, dmax, 0.5, 1);
    }
    
    // color for the outer circle
    var c1 = lerpColor(colorOn, colorOff, mix1);
    
    // a slightly darker color for the inner circle
    var mix2 = mix1 - 0.2;
    var c2 = lerpColor(colorOn, colorOff, mix2);
    
    // draw the cell itself
    noStroke();
    
    // draw the outer circle
    fill(c1);
    ellipse(this.x, this.y, d1, d1);

    // draw the inner circle
    fill(c2);
    ellipse(this.x, this.y, d2, d2);
  
  }

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