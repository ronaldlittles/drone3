

//#include ./includes/hash12polar.glsl
#include ./includes/hash.glsl
//#include ./includes/curl.glsl
//#include ./includes/gradient.glsl

uniform sampler2D texture1;
uniform float time;
uniform vec3 vTangent;


varying vec2 vUv;
varying vec3 vNormal;





void main(){
float len = length(vUv -.5);
  
  //vec2 hash = Hash12_Polar(time);
  float hashy = hash(vUv);

  vec4 height = texture2D(texture1, vUv);

  vec3 color1 = vec3(height);


float threshold =  1.0;
float tl = length(vTangent);




  gl_FragColor = vec4(height.rgb, sin(hashy));


  


}