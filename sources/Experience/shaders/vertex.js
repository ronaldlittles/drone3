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

     

      uniform sampler2D splinePoints; 
     

      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform sampler2D texture1;
      attribute vec3 aRandom;
      attribute float aSize;

      attribute vec3 attributes;
      
      float PI = 3.141592653589793238;


      vec3 generateTrefoilKnotPoints(float t){

        float x = sin(t) + 2. * sin(2. * t);
        float y = cos(t) - 2. * cos(2. * t);
        float z = -sin(3. * t);
        return vec3(x,y,z);
      }


      vec3 getPos(float progress){
        float angle = progress * PI * 2.;
      
        
        float x = sin(angle) + 2. * sin(2. * angle);
        float y = cos(angle) - 2. * cos(2. * angle);
        float z = -sin(3. * angle);
        return vec3(x,y,z);
      }
      
      vec3 getTangent(float progress){
        float angle = progress * PI * 2.;
      
        float x = cos(angle) + 4. * cos(2. * angle);
        float y = -sin(angle) + 4. * sin(2. * angle);
        float z = 3.*-cos(3. * angle);
        return normalize(vec3(x,y,z));
      }
      
      vec3 getNormal(float progress){
        float angle = progress * PI * 2.;
        float x = -sin(angle) - 8. * sin(2. * angle);
        float y = -cos(angle) + 8. * cos(2. * angle);
        float z = 9.*sin(3. * angle);
        return normalize(vec3(x,y,z));
      }
      
      
      void main() {

        
        vec3 pos =  position + attributes;
        float progress = fract(time*0.01 + aRandom.x);
         pos.y += fract(time + aRandom.x + attributes.y);

        
        vec3 normal = getNormal(progress);
        vec3 tangent = getTangent(progress);
        vec3 binormal = normalize(cross(normal, tangent));
      
        float radius = 0.2 + aRandom.z * 0.3;
        float cx = radius*cos(aRandom.y * PI * 2. *time*0.05 + aRandom.z *7.);
        float cy = radius*sin(aRandom.y * PI * 2. *time*0.05 + aRandom.z *7.);
       //pos.y += (normal * attributes.x + binormal * attributes.y + tangent * attributes.z) * 0.1;

        //pos += attributes;
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( pos, 1. );
        gl_PointSize = 2.*(10. + 50.*aSize) * ( 1. / - mvPosition.z );
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