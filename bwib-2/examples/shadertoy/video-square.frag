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

    float xmin = center.x - r;
    float xmax = center.x + r;
    float ymin = center.y - r;
    float ymax = center.y + r;

    return (pos.x > xmin && pos.x < xmax && pos.y > ymin && pos.y < ymax);
}

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

    vec2 topLeftCorner = vec2(10,10);
    vec2 bottomRightCorner = vec2(width - 10.0, height - 10.0);

    if(isInsideSquare(mdrag, pos, r)) {
        	vec2 vzoom = pos - mdrag;
        	vec2 pixel = mdrag + vzoom / 2.0;
            fragColor = texture2D(iChannel0, pixel / iResolution.xy);

    } else {
            vec4 pixel = texture2D(iChannel0, pos.xy / iResolution.xy);
        	fragColor = pixel;


    }

}
