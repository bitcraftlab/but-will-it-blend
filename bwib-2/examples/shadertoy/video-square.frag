/***********************************************************
*                                                          *
*  V I D E O     S Q U A R E                               *
*                                                          *
***********************************************************/

// a shader for the glsl / shadertoy intro


bool isInsideCircle(vec2 center, vec2 pos, float r) {
   true;
 return distance(pos, center) < r;
}

bool isInsideSquare(vec2 center, vec2 pos, float r) {
   // TODO
 return true;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

   float height = iResolution.y;

   // pixel position in relative coordinates
 vec2 pos = fragCoord.xy;

   // mouse positions in relative coordinates
   vec4 mpos = iMouse.xyzw;

   // position of the mouse when dragging
   vec2 mdrag = mpos.xy;

   // position of the mouse last clicked
   vec2 mclick = mpos.zw;

   // aspect ratio of the canvas
   float aspect = iResolution.y  / iResolution.x;


   // minimum radius for the circle
   float rmin = 0.2 * height;

   // maximum radius for the circle
   float rmax = 0.4 * height;

   // frequency for our pulsation
   float freq = 5.0;

   // value oscillating between 0.0 and 1.0
   float pulse = 0.5 + 0.5 * sin(iGlobalTime * freq);

   // radius pulsating between rmax and rmin
 float r = rmin + (rmax - rmin) * pulse;


   if(isInsideCircle(mdrag, pos, r)) {
           fragColor = texture2D(iChannel0, pos.xy / iResolution.xy );
   } else {
           fragColor = vec4(0.0);
   }

}
