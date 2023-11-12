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
    float radius = 3.0;

    float currentLength;

    vec4 mvPosition = modelViewMatrix * vec4(position  , 1.0 );

    float t =  position.x /(2.0 * PI * radius );
     
  /*  for (int i = 0; i < ARRAY_LENGTH; i++) {


      currentLength = uLength[i];

     

    }  */
      gl_Position = projectionMatrix * mvPosition;

     /*  if(currentLength > 50.0 && currentLength <150.0) {
  
  mvPosition.y += 20.0 * sin(t*3.0 ) * radius ;

  }else {


    mvPosition.y += sin(t*3.0 ) * radius ;

  } */
   
 

  
  }

   
			`,
      
};

export { vertexShader };