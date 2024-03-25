uniform sampler2D texture2;
varying vec2 vUv;

void main(){

  vec4 height = texture2D(texture2, vUv);

  

  vec3 color1 = vec3(height);

  

  gl_FragColor = vec4(color1.rg,.5,1.0);
  
}