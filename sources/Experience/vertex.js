const vertexShader = {

  

  vertexShader: `

  vec3 sphere(vec3 p, float r) {
    return normalize(p) * r;
  }

  uniform float time;
  varying vec2 vUv;
  //varying vec3 positions;
  uniform vec2 pixels;
  varying vec3 vWorldPosition;
  varying vec3 vNormal;
  attribute vec3 positions;
  attribute vec3 aRandom;
  attribute float size;

  float PI = 3.141592653589793238;

  vec3 figure8(float progress){

    float angle = PI * 2.;

    vec3 pos = vec3(0.);

    pos.x = sin(angle * progress) * cos(angle * progress);

    //pos.y = sin(angle * progress) * cos(angle * progress);

    pos.z = sin(angle * progress);

    return pos;

  }

  vec3 getPos(float progress){

    float angle = PI * 2.;
  
    vec3 pos = vec3(0.);
    pos.x = sin(angle * progress);
    //pos.y = cos(angle * progress);
    pos.z = 1.0 - cos(angle *progress);
   return pos;
  }
  
 

  void main() {
    
    vUv = uv;
    vNormal = normal;

    float progress = fract(time*0.01 + aRandom.x );

    vec3 pos = figure8(progress);

    progress += 1.5;

   
  

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1. );
    gl_PointSize = .5*(10. + 50.*size) ;
    gl_Position = projectionMatrix * mvPosition;

  

  }
			`,
      
};

export { vertexShader };