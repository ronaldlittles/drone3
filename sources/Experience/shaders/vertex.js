import * as THREE from 'three';
const vertexShader = {

  

  vertexShader: `

  
    varying vec2 vUv;
    
    varying vec3 newPosition;

    //varying vec3 vNormal;

    
    uniform float uNoise;
  
    uniform vec2 uvScale;
  
    uniform float time; 
    
    

  void main() {

    //vNormal = normal;

    vUv =  uv * uvScale; 

    newPosition = position;
     
   
  
    vec4 mvPosition = modelViewMatrix * vec4(newPosition  , 1.0 );
  
  

    gl_Position = projectionMatrix * mvPosition;

  }

   
			`,

      vertexShader2: `

  

      varying vec2 vUv;
      
      varying vec3 newPosition;

      varying vec3 vNormal;
      varying vec3 vTangent;
      varying vec3 vBinormal;

      varying vec3 vPosition;

      uniform vec3 uTangent;
      uniform vec3  uNormal;

      uniform sampler2D texture1;
      uniform sampler2D texture2;
  
      float PI = 3.141592653589793238;
      
      uniform float uNoise;
    
      uniform vec2 uvScale;

      uniform float time;

      attribute vec3 aRandom;
      attribute float aSize;

      
   

  vec3 getPos( float progress ) {

    vec3 pos = vec3(0.0);
    float angle = progress * PI * 2.0;
    float x = cos( angle ) * 10.0 ;
    float y = sin( angle ) * 10.0;
    float z =  -cos(10.0 * angle);
    return vec3(x,y,z);

  }

vec3 getNormal( float progress ) {

    float angle = progress * PI * 2.0;
    float x = -cos( angle );
    float y = -sin( angle );
    float z = 9.0 * cos(3.0 * angle);
    return vec3(x,y,z);

  }

  vec3 getTangent( float progress ) {

    float angle = progress * PI * 2.0;
    float x = -sin( angle );
    float y = cos( angle );
    float z = .5 * sin(.1 * angle);
    return vec3(x,y,z);

  }

  


  
    void main() {
  
      vUv =  uv * uvScale;

      float heightColor = texture2D(texture2, vUv).r;

      float progress = position.x / 2.0;

      vec3 pos = getPos( progress );
      vec3 normal = getNormal( progress );
      vec3 tangent = getTangent( progress );
      vec3 binormal = normalize( cross(normal, tangent) );
     
      float radius = .2 * aRandom.x * .4;

      float cx = radius * cos( aRandom.y * PI * 2.0 * time * .1* aRandom.z *.7  );
      float cy = radius * sin( aRandom.x * PI * 2.0 * time * .1 *aRandom.z *.7 );
      //float cz = sin( time * 0.5 ) * 10.0;

      pos += (normal * cx + binormal * cy);
      
       
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0 );

        gl_PointSize = 300.0 * ( 1.5 / -mvPosition.z );
      
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