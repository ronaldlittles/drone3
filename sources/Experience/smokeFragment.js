const smokeFragment = {
  fragmentShader: `

varying vec2 vUv;
uniform float time;
uniform vec2 resolution;
uniform vec2 uvScale;
uniform sampler2D texture1;
varying vec3 vNormal;



void main() {
  

  float reflectionStrength = 0.008; // Adjust reflection strength
  vec3 normal = normalize(vNormal);

  // Calculate reflection
  vec3 reflected = reflect(normalize(-vNormal), normal);
  vec3 viewDir = normalize(-vNormal);

  // Mix between reflection and transparency
  vec3 color = mix(reflected, vec3(0.0, 0.0, 0.0), reflectionStrength);

  gl_FragColor = vec4(color, 0.2); // Adjust alpha for transparency
}

  
`,
};

export {smokeFragment}