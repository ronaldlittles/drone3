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

  uniform vec3 noise;
  
 

  void main() {

    vUv =  uv;
    Vnormal = normal;
    float radius = 1.5;

    float currentLength;

   

    float t =  position.x /(2.0 * PI * radius );
     
  
  vec4 mvPosition = modelViewMatrix * vec4(position  , 1.0 );
 
  mvPosition.y += sin(t*2.0 ) * radius ;
  gl_Position = projectionMatrix * mvPosition;
  }

   
			`,
      
};

export { vertexShader };