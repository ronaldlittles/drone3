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
      varying vec3 vPosition;

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

      float height = heightColor*.7 ;

      //float height2 = heightColor.g * .5;
      vec3 vNormal = normalize(mat3(normalMatrix)* tangent);
      vec3 vTangent = normalize(mat3(normalMatrix) * normal);
      vec3 vPosition = position;
  
      //newPosition = position + normal * height;  
      
      float maxHeight = 1.0; // Adjust as needed

      float roundingFactor = 5.5; // Adjust to control the extent of rounding
      
      
      float adjustedHeight = pow(heightColor / maxHeight, roundingFactor) * maxHeight;
      
      
      vec3 newPosition = vec3(vPosition.x, adjustedHeight, vPosition.z);
       
      vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0 );
    
      
        gl_Position = projectionMatrix * mvPosition;
  
    }
  
     
        `,

        vertexShader3: `


  varying vec2 vUv;
  varying vec3 newPosition;
  varying vec3 vNormal;
  uniform sampler2D texture2;
  uniform float uNoise;
  //uniform float uvScale;
  uniform float time;

  void main() {
    vUv = uv * .000000001;
vec3 vPosition = position;
    // Generate terrain height using noise function
    //float height = noise(vec3(position.x, position.y, time)) * 10.0;

    vec3 heightColor = texture2D(texture2, vUv).rgb;

   

    
    vNormal = normalMatrix * normal;

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }

`,






     
      
};

export { vertexShader };