const checkerFragment= {

    fragmentShader: `

    float hash( float n ) { return fract(sin(n)*43758.5453123); }

    float hash12( vec2 p ) { return fract(sin(dot(p,vec2(237.1,311.7)))*43758.5453123); }


  
   uniform vec2 resolution;
   uniform float time;
   uniform vec2 uvScale;
   uniform sampler2D texture1;

   varying vec3 vPosition;
   varying vec2 vUv;
  
  void main() {

    float random = hash(vUv.x);
    
    
    float scale = 5.; // Control the number of squares in the grid
    vec2 uv = vUv / scale;
    
    vec2 coord = floor(uv);

    float pattern = mod(fract( random) + fract(random), 1.0);
    
    

    if(pattern < 1.0) {
        gl_FragColor = vec4(random, .0, 1.0, 1.0); // White square
    } else {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Black square
    }
gl_FragColor = vec4(vec3(scale*time),1.0);

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

vec2 vUv = uv * uvScale;

vPosition.y *= sin(2.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );


}




    `,
  
          
} 
  
  export { checkerFragment }
  export { checkerVertex }