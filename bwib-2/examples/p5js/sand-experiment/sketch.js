var a = [];
var palette = [
  [0, 0, 0],
  [63, 63, 63],
  [127, 127, 127],
  [255, 255, 255]
];

var img;
var cols, rows, n;

var d = 4;
var steps = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  reset();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  reset();
}

function draw() {

  for(var i = 0; i < steps; i++) {
    step();
  }
  
  drawPixels();
  
  noSmooth();
  image(img, 0, 0, width, height);
  
}

function drawPixels() {

  img.loadPixels();
  for (var i = 0; i < n; i++) {
    var idx = 4 * i;
    var c = palette[a[i] % 4];
    img.pixels[idx] = c[0];
    img.pixels[idx + 1] = c[1];
    img.pixels[idx + 2] = c[2];
    img.pixels[idx + 3] = 255;
  }
  img.updatePixels();

}

function step() {

  var collect = [];
  for (var i = 0; i < n; i++) {
    if (a[i] >= 4) {
      collect.push(i);
    }
  }
  
  for(i = 0; i < collect.length; i++) {
    sandRule(collect[i]);
  }
  
}


function sandRule(i) {
  
    var x = i % cols;
    var y = (i - x) / cols;
    
    if(x > 0) a[i - 1]+=1;
    if(x < cols-1) a[i + 1]+=1;
    if(y > 0) a[i - cols]+=1;
    if(y < rows-1) a[i + cols]+=1;
    
    a[i] -= 4;
  
}


function reset() {
  
  var density = pixelDensity();
  cols = int(width * density  / d);
  rows = int(height * density / d);
  
  img = createImage(cols, rows);

  n = rows * cols;
  
  // create an empty grid
  for (var i = 0; i < n; i++) {
    a[i] = 2;
  }

  // add 1000 grains to the center
  var cx = int(cols / 2);
  var cy = int(rows / 2);
  a[cy * cols + cx] = pow(4, 8);

}