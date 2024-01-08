const smokeFragment = {
  fragmentShader: `

varying vec2 vUv;
uniform float time;
uniform vec2 resolution;
uniform vec2 uvScale;
uniform sampler2D texture1;
varying vec3 vNormal;



void main() {
  vec3 baseColor = vec3(1.0, 0.2, 0.2);

    
    float sparkle = sin(time * 2.0 + fract(vUv.x) * cos(time * 1.0 + vNormal.y * 0.1));
    
   
    vec3 finalColor = baseColor + sparkle + time; 

    gl_FragColor = vec4(finalColor,1.0);


}

  
`,
};

export {smokeFragment}