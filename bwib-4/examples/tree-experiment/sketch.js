 var counter = 0.0;
 var img;
 var h;

 function setup() {
   
   createCanvas(windowWidth, windowHeight);
   background(0);
   smooth();

   img = createImage(width, height);
 }

 function draw() {
   
   counter = 0;

   push();
   
   if (frameCount % 2 == 1) {

     imageMode(CENTER);

     push();

     translate(width / 2, height / 2);

     scale(0.98);
     rotate(0.1);
     image(img, 0, 0, width, height);

     pop();

     colorMode(RGB);
     noStroke();
     fill(0, 1);
     rect(0, 0, width, height);

     strokeWeight(5);
     translate(width / 2, height / 2);
     
     var treeSize = map(mouseX, 0, width, 0.1, 0.55);
     scale(treeSize);

     // hue values going from 0 to 360
     h = frameCount % 360;
     colorMode(HSB);

     branch(0);
   }
   pop();

   img = get();

 }
 
 function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
 }


 function myRandom(rmin, rmax) {
   counter = counter + 0.1;
   var val = noise(counter, frameCount * 0.005, 0);
   return lerp(rmin, rmax, val);
 }

 function branch(depth) {

   noStroke();
   
   if (depth < 6) {

     
     if (depth < 2) {
       fill(h, 255, 40, 10);
     } else if (depth < 4) {
       fill(h, 255, 80, 10);
     } else {
       fill(h, 255, 100, 10);
     }

     rect(-8, 0, 8, -height / 3);

     push(); {
       translate(0, -height / 5);
       rotate(myRandom(-PI / 4, PI / 4));
       scale(myRandom(0.5, 0.6));
       branch(depth + int(myRandom(1, 2)));
     }
     pop();
     push(); {
       translate(0, -height / 3);
       rotate(myRandom(-PI / 4, PI / 4));
       scale(myRandom(0.6, 0.75));
       branch(depth + int(myRandom(1, 1)));
     }
     pop();
     push(); {
       translate(0, -height / 3);
       rotate(myRandom(-PI / 4, PI / 4));
       scale(myRandom(0.6, 0.7));
       branch(depth + int(myRandom(1, 1)));
     }
     pop();
     push(); {
       translate(0, -height / 3);
       rotate(myRandom(-PI / 4, PI / 4));
       scale(myRandom(0.55, 0.65));
       branch(depth + int(myRandom(1, 3)));
     }
     pop();
   }
 }