const vertexShader = {

  

  vertexShader: `

    varying vec2 vUv;
    
    varying vec3 newPosition;

    //varying vec3 vNormal;

    float PI = 3.141592653589793238;
    
    uniform float uNoise;
  
    uniform vec2 uScale;
  
 

  void main() {

    //vNormal = normal;

    vUv =  uv; 

    newPosition = position;
     
   
  
     
  
    vec4 mvPosition = modelViewMatrix * vec4(position  , 1.0 );
  
  

    gl_Position = projectionMatrix * mvPosition;

  }

   
			`,

      vertexShader2: `

      varying vec2 vUv;
      
      varying vec3 newPosition;
  
      
  
      float PI = 3.141592653589793238;
      
      uniform float uNoise;
    
      uniform vec2 uScale;
    
   
  
    void main() {
  
      vUv =  uv ;;
  
      newPosition = position;
       
     
      newPosition.y *= sin(PI * position.x * uScale.x + uNoise);
       
    
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0 );
    
  
      gl_Position = projectionMatrix * mvPosition;
  
    }
  
     
        `,





     
      
};

export { vertexShader };