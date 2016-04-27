 /***********************************************************
 *                                                          *
 *  L O O K I N G   G L A S S                               *
 *                                                          *
 ***********************************************************/

 // a shader for the glsl / shadertoy intro
 
void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    
    // pixel position in relative coordinates
	vec2 pos = fragCoord.xy / iResolution.xx;
    
    // mouse positions in relative coordinates
    vec4 mpos = iMouse.xyzw / iResolution.xxxx;
    
    // position of the mouse when dragging
    vec2 mdrag = mpos.xy;

    // aspect ratio of the canvas
    float aspect = iResolution.y  / iResolution.x;
    
    // center of the magnifying glass
    // float center = vec2(0.5, 0.5 * aspect)
    vec2 center = mdrag;
    
    // distance to the center of the magnifying glass
    float d = distance(pos, center);
    
    // radius of the maginfying glass
    float r = 0.3 * aspect;
    
    // zoom factor
    float zoom = 2.0;
    
    // vector from the center to the position
    vec2 vzoom = center + (pos - center) / zoom;

    
    if(d < r) {
        	// show zoomed texture inside the magnifying glass
            fragColor = texture2D(iChannel0, vzoom);
    } else {
        	// show regular texture on the inside
            fragColor = texture2D(iChannel0, pos);
    }

}