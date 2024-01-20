import * as THREE from 'three';
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

      uniform sampler2D texture1;
      uniform sampler2D texture2;
  
      float PI = 3.141592653589793238;
      
      uniform float uNoise;
    
      uniform vec2 uvScale;

      uniform float time;

  
    void main() {
  
      vUv =  uv * uvScale;

   float heightColor = texture2D(texture2, vUv).r;

      float height = heightColor * .1;

      //float height2 = heightColor.g * .5;
      vec3 vNormal = normalize(mat3(normalMatrix)* tangent);
      vec3 vTangent = normalize(mat3(normalMatrix) * normal);
      
  
      newPosition = position + normal * height;  
      
    
       
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0 );
    
      
        gl_Position = projectionMatrix * mvPosition;
  
    }
  
     
        `,

        vertexShader3: `


  varying vec2 vUv;
  varying vec3 newPosition;
  varying vec3 vNormal;

  uniform float uNoise;
  uniform vec2 uvScale;
  uniform float time;

  void main() {
    vUv = uv * uvScale;

    // Generate terrain height using noise function
    //float height = noise(vec3(position.x, position.y, time)) * 10.0;

    newPosition = position;
    vNormal = normalMatrix * normal;

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }

`,






     
      
};

export { vertexShader };