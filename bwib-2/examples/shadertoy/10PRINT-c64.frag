
///////////////////////////
//                       //
//   GLSL 10 PRINT Cam   //
//                       //
///////////////////////////

// @bitcraftlab 2012

// C64 colors - 7 stroke levels


const float epsilon = 1.0 / 511.0;

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{

    vec2 resolution = iResolution.xy;
    vec2 position = fragCoord.xy /  iResolution.xy;

    // labyrinth randomness [0.0 ... 1.0]
    float randomness = 1.0;

    // diameter of a sampling cell
    float cellsize = 8.0;

    // maximum stroke weight
    float maxweight = floor(cellsize / 2.0);

    // get absolute position
    vec2 pos = position * resolution;

    // get block position
    vec2 delta = mod(pos, cellsize);

    // sample texture brightness
    vec2 sampleres = (resolution / cellsize);
    vec3 sample = texture2D(iChannel0, floor(position * sampleres) / sampleres).rgb;
    float val = dot(sample, vec3(0.299, 0.587, 0.114));

    // test screen
    // val = (floor(position * sampleres) / sampleres).x;

    // 10 PRINT dithering
    float m = (1.0 - randomness) + epsilon;
    float z = (delta.x +.25 + (mod(val, m) < m / 2.0 ? delta.y : cellsize - delta.y ));
    float dither = 1.0 - step(.25 + val * (maxweight - .5), abs(z - cellsize));

    // use C64 colors
    vec3 bgcolor = vec3(64.0, 64.0, 224.0);
    vec3 fgcolor = vec3(160.0, 160.0, 255.0);
    fragColor = vec4(vec3(mix(bgcolor, fgcolor, dither) / 255.0), 1.0);

}
