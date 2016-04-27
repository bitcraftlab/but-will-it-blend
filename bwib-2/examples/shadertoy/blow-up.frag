 /***********************************************************
 *                                                          *
 *  B L O W   U P                                           *
 *                                                          *
 ***********************************************************/

 // a shader for the glsl / shadertoy intro
  /***********************************************************
 *                                                          *
 *  B L O W    U P                                          *
 *                                                          *
 ***********************************************************/

 // a shader for the glsl / shadertoy intro
 

float linearCone( float x, float r ) {
    return x / r;
}


void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
    
    // pixel position in relative coordinates
    vec2 pos = fragCoord.xy / iResolution.xy;
    
    // mouse positions in relative coordinates
    vec4 mpos = iMouse.xyzw / iResolution.xxxx;
    
    // position of the mouse when dragging
    vec2 mdrag = mpos.xy;
    
    // aspect ratio of the canvas
    float aspect = iResolution.y  / iResolution.x;
    
    // aspect correction vector
    vec2 vaspect = vec2(1.0, aspect);
    
    // center of the magnifying glass
    // float center = vec2(0.5, 0.5 * aspect)
    vec2 center = mdrag;
    
    // distance to the center of the magnifying glass
    float d = distance(pos * vaspect, center);
    
    // radius of the maginfying glass
    float r = 0.3 * aspect;
    
    // zoom factor
    float zoom = 2.0;
    
     
    // maginification vector
    vec2 vmagnify = center + (pos - center) * linearCone(d, r);

    
    if(d < r) {
            // show zoomed texture inside the magnifying glass
            fragColor = texture2D(iChannel0, vmagnify);
    } else {
            // show regular texture on the inside
            fragColor = texture2D(iChannel0, pos);
    }

}
