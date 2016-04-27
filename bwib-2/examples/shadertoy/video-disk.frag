/***********************************************************
*                                                          *
*  V I D E O    D I S K                                    *
*                                                          *
***********************************************************/

// a shader for the glsl / shadertoy intro

void mainImage( out vec4 fragColor, in vec2 fragCoord ) {

   float width = iResolution.x;
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

   // distance to the center of the screen
   float d0 = distance(pos, iResolution.xy / 2.0);

   // distance to the mouse when dragged
   float d1 = distance(pos, mdrag);

   // distance to the position last clicked
   float d2 = distance(pos, mclick);

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



   if(d1 < r) {
           fragColor = texture2D(iChannel0, pos / iResolution.xy);
   } else {
           vec4(0.0);
   }

}
