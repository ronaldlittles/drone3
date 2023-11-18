const vertexShader = {

  

  vertexShader: `

  varying vec2 vUv;
  
  

  

  float PI = 3.141592653589793238;

  uniform float noise;
  
  uniform float radius;
 
  
 

  void main() {

    vUv =  uv;
   
    

   

   float t = position.x / (2.0 * PI * radius ) + noise;
     
  
    vec4 mvPosition = modelViewMatrix * vec4(position  , 1.0 );
  
    mvPosition.y += sin( t * .5 + noise  ) * radius;

    gl_Position = projectionMatrix * mvPosition;

  }

   
			`,

     
      
};

export { vertexShader };