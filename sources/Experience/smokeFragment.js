const smokeFragment = {
  fragmentShader: `

varying vec2 vUv;
uniform float time;
uniform vec2 resolution;
uniform vec2 uvScale;
uniform sampler2D texture1;
varying vec3 vNormal;



void main() {
  

  float reflectionStrength = .5; 

  vec3 normal = normalize(vNormal);

 
  vec3 reflected = reflect(normalize( -normal), normal);

  vec3 viewDir = normalize(-vNormal);

  
  vec3 color = mix(reflected, vec3(0.0, 0.0, 0.0), reflectionStrength);

  gl_FragColor = vec4(color, .08); 


}

  
`,
};

export {smokeFragment}