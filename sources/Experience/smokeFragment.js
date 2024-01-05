const smokeFragment = {
  fragmentShader: `

varying vec2 vUv;
uniform float time;
uniform vec2 resolution;
uniform vec2 uvScale;
uniform sampler2D texture1;
varying vec3 vNormal;



void main() {
  vec3 baseColor = vec3(0.2, 0.2, 0.2);

    
    float sparkle = abs(sin(time * 2.0 + fract(vUv.x) * 0.1) * cos(time * 1.0 + vUv.y * 0.1));
    
   
    vec3 finalColor = baseColor + sparkle * 0.7; 

    gl_FragColor = vec4(finalColor, .1);


}

  
`,
};

export {smokeFragment}