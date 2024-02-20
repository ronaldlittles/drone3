const checkerFragment= {

    fragmentShader: `

    

    

    float hash12( vec2 p ) { return fract(sin(dot(p,vec2(237.1,311.7)))*43758.5453123); }


  
   uniform vec2 resolution;
   uniform float time;
   uniform vec2 uvScale;
   uniform float uScale;
   uniform sampler2D texture1;

   varying vec3 vPosition;
   varying vec2 vUv;
  
void main() {
    
    
    
    vec2 gridPos = floor(vUv * 5.0); // Change this value to adjust the size of the squares

    // Create a list of colors to cycle through
    vec4[] colors = vec4[](vec4(1.0, 0.0, 0.0,.5), // Red
                           vec4(1.0, .0, 1.0,1.0), // Green
                           vec4(0.0, 0.0, 1.0,1.0)); // Blue

    // Calculate the index of the current color pair based on time
    int index = int(mod(time, 3.0));

    // Select the current color pair
    vec4 color1 = colors[index];
    vec4 color2 = colors[(index + 1) % 3];

    // Create a checker pattern
    float checker = mod(gridPos.x + gridPos.y, 2.0);

    float factor = (sin(time) + 1.0) / 2.0;

    vec4 color = mix(color1, color2, checker * factor); // Apply the checker pattern to the color

    gl_FragColor = vec4(color);
}
    
  
        
  

  `,
  
}



const checkerVertex = {

    vertexShader: `

uniform vec2 uvScale;
varying vec2 vUv;
    
varying vec3 vPosition;

void main() {

vec3 vPosition = position;

vUv = uv;



    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );


}




    `,
  
          
} 
  
  export { checkerFragment }
  export { checkerVertex }