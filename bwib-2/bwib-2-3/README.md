# ... but will it blend ??? #
## shaders ##
### Playing with ShaderToy ##

*In this part you will get to know shader toy, and will learn how to create simpe shader's using input from the webcam*

##### Snippets #####

###### Simple Gradient ######

    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
        vec2 uv = fragCoord.xy / iResolution.xy;
        float d = uv.x;
        fragColor = vec4(d,d,d,1);
    }

###### Display Channel 1 ######

    void mainImage(out vec4 fragColor, in vec2 fragCoord ) {
	    vec2 uv = fragCoord.xy / iResolution.xy;
	    fragColor = texture2D(iChannel0, vec2(uv.x, uv.y));
    }

#### Basic 2D Shapes ####

* [Kirby](https://www.shadertoy.com/view/ltX3WH)
* [Boat Drawing](https://www.shadertoy.com/view/MsdXzM)
* [Time Coordinates](https://www.shadertoy.com/view/Xd2XWR)
* [Harry Potter](https://www.shadertoy.com/view/lssXWS)

#### Sound Input ####

* [Microphone Input](https://www.shadertoy.com/view/llSGDh)
* [SoundCloud Input](https://www.shadertoy.com/view/4dc3zH)

#### Webcam Input ####

* [Kaleidoscope](https://www.shadertoy.com/view/ldSXWV)
* [3D Elevation](https://www.shadertoy.com/view/XtXSWs)

#### Feedback ####

* [Game of Life](https://www.shadertoy.com/view/Xd33WS)

#### Games ####

* [Super Mario](https://www.shadertoy.com/view/XtlSD7)
* [Bricks Game](https://www.shadertoy.com/view/MddGzf)
* [Pac Man](https://www.shadertoy.com/view/Ms3XWN)


## links ##


###### Getting Started ######

* [GLSL 1.2 Tutorial](http://www.lighthouse3d.com/tutorials/glsl-12-tutorial/)
* [Live Coding Recordings](http://iquilezles.org/live/) by IQ
* [Shadertoy Features](https://www.youtube.com/watch?v=jjU3rO36zCs)

###### Getting Crazy ######

* [Modelling with distance functions](http://iquilezles.org/www/articles/distfunctions/distfunctions.htm)
* [Menger Sponge]([http://www.iquilezles.org/www/articles/menger/menger.htm])
