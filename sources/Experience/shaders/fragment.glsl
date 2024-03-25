

#include ./includes/hash12polar.glsl

uniform sampler2D texture2;
uniform float time;
uniform vec3 vTangent;


varying vec2 vUv;
varying vec3 vNormal;





void main(){
float len = length(vUv -.5);
  
  vec2 hash = Hash12_Polar(time);

  vec4 height = texture2D(texture2, vUv);

  vec3 color1 = vec3(height);


float threshold = 1.0;
float tl = length(vTangent);




  gl_FragColor = vec4(color1.rgb,1.0);


  


}