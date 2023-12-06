const vertexShader = {

  

  vertexShader: `

    varying vec2 vUv;
    
   varying vec3 newPosition;

    

    float PI = 3.141592653589793238;
    
    uniform float uNoise;
  
    uniform vec2 uScale;
  
 

  void main() {

    vUv =  uv;

    newPosition = position;
     
   
  
     
  
    vec4 mvPosition = modelViewMatrix * vec4(newPosition  , 1.0 );
  
  

    gl_Position = projectionMatrix * mvPosition;

  }

   
			`,





     
      
};

export { vertexShader };