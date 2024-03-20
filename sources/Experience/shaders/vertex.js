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
    
    #define NUM_POINTS 101

     // #include "./hash12polar.glsl"

     // uniform sampler2D splinePoints; 
      uniform vec3 uPoints[NUM_POINTS];
     

      uniform float time;
      varying vec2 vUv;
      varying vec3 vPosition;
      uniform sampler2D texture1;
      uniform float uNoise; 
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


      vec3 generateFigureEightPoints(float t){

        float radius = 10.0;

        float x = sin(t) * radius;
        float y = cos(t) * radius;
        float z = 0.0;

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



        //vec2 hash = Hash12_Polar(time);

        vec3 figureEight = generateFigureEightPoints(100.0);

        
        vec3 pos =  position + attributes;
        float progress = fract(time*0.01 + aRandom.x);
         //pos.y += fract(time + aRandom.x + attributes.y);
         pos.y *= uNoise;
         //pos.z *= uNoise;

        
        vec3 normal = getNormal(progress);
        vec3 tangent = getTangent(progress);
        vec3 binormal = normalize(cross(normal, tangent));
      
        float radius = 0.2 + aRandom.z * 0.3;
        float cx = radius*cos(aRandom.y * PI * 2. *time*0.05 + aRandom.z *7.);
        float cy = radius*sin(aRandom.y * PI * 2. *time*0.05 + aRandom.z *7.);
       //pos.y += (normal * attributes.x + binormal * attributes.y + tangent * attributes.z) * 0.1;

        //pos += attributes;

        //pos.x += sin(cx * time) * 0.1;
        //pos.z *= cos(cy * time) * 0.1;

        vUv = uv; //+ hash;

        
        vec3 color = texture2D(texture1, vUv).rgb;

        vec4 mvPosition = modelViewMatrix * vec4( figureEight, 1. );
        
        float speed = .005;
        float offset = pos.y * .5;
        float scale = 2.;

        mvPosition.y -= mod((time + offset) * speed * scale, 2.0);

        gl_PointSize = 80.;//*(5. + 50. * aSize) * ( 1. / - mvPosition.z );
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

vertexShader4: `


varying vec2 vUv;
uniform float time;
uniform sampler2D texture1;


void main(){

  float max = .05;
  vUv = uv;

  vec3 newPosition = position;

  vec4 color = texture2D(texture1, vUv);

  float height = color.r;
  

  float base = 0.0;

newPosition.z += height*max;
//newPosition.y += 100.0 ;


  
 

  
  
vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
gl_Position = projectionMatrix * mvPosition;

}

`,






     
      
};

export { vertexShader };