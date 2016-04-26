
var colorOff = [
  '#f66',
  '#6f6',
  '#66f'
];

var colorOn = [
  'red',
  'green',
  'blue'
];

var drawFn = [
  function() {
    rect(100, 100, 100, 100);
  },
  function() {

    ellipse(250, 100, 100, 100);
  },
  function() {
    triangle(350, 150, 400, 50, 450, 150);
  }
]

function setup() {
  createCanvas(500, 200);
  strokeWeight(10);
  ellipseMode(CENTER);
  rectMode(CENTER);
}

function draw() {
  
  background(255);

  for (var i = 0; i < colorOff.length; i++) {

    if (mouseIsPressed) {
      fill(colorOff[i]);
    } else {
      fill(colorOn[i]);
    }
    var myfn = drawFn[i];
    myfn();
    
  }
}