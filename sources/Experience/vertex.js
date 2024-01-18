const vertexShader = {

  

  vertexShader: `

    varying vec2 vUv;
    
    varying vec3 newPosition;

    //varying vec3 vNormal;

    float PI = 3.141592653589793238;
    
    uniform float uNoise;
  
    uniform vec2 uvScale;
  
    uniform float time; 
    
    

  void main() {

    //vNormal = normal;

    vUv =  uv * uvScale; 

    newPosition = position;
     
   
  
    vec4 mvPosition = modelViewMatrix * vec4(position  , 1.0 );
  
  

    gl_Position = projectionMatrix * mvPosition;

  }

   
			`,

      vertexShader2: `

      varying vec2 vUv;
      
      varying vec3 newPosition;

      varying vec3 vNormal;
      varying vec3 vTangent;

      uniform vec3 tangent;
      
  
      float PI = 3.141592653589793238;
      
      uniform float uNoise;
    
      uniform vec2 uvScale;

      uniform float time;
  
    void main() {
  
      vUv =  uv * uvScale;

      
  
      newPosition = position;  
      
      vec3 vNormal = normalMatrix * tangent;
      vec3 vTangent = normalMatrix * normal;
       
      


      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0 );
    
      

        gl_Position = projectionMatrix * mvPosition;
  
    }
  
     
        `,





     
      
};

export { vertexShader };