const vertexShader = {

  

  vertexShader: `

  /* #define ARRAY_LENGTH 300

  uniform float uLength[ARRAY_LENGTH]; */

  uniform float time;
  varying vec2 vUv;
  
  uniform vec2 pixels;
  uniform sampler2D uTexture;

  varying vec3 Vnormal;
  //attribute vec3 positions;
  
  varying vec3 newPosition;

  float PI = 3.141592653589793238;

  uniform float noise;
  uniform float yPosition;
  uniform float radius;
  uniform float t;
  
 

  void main() {

    vUv =  floor(uv);
    Vnormal = normal;
    

   

   float t = position.x / (2.0 * PI * radius ) + noise;
     
  
    vec4 mvPosition = modelViewMatrix * vec4(position  , 1.0 );
  
    mvPosition.y += sin( t * .5 + noise  ) * radius;

    gl_Position = projectionMatrix * mvPosition;

  }

   
			`,
      
};

export { vertexShader };