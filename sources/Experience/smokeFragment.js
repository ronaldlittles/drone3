const smokeFragment = {
  fragmentShader: `

varying vec2 vUv;
uniform float time;
uniform vec2 resolution;
uniform vec2 uvScale;
uniform sampler2D texture1;




void main() {
  

  vec2 center = vec2(0.5, 0.5);

  vec2 st =  gl_FragCoord.xy/1.0-resolution.xy ;

  float distance =  length( st - center );

  float scaledDistance = 1.0 - distance / 0.05;

  vec2 T2 = fract(vUv*.5) + vec2( - 0.5, 2.0 ) * time * 0.00001;

  vec4 color =  texture2D( texture1,vUv);
  vec4 color1 = mix(  color, vec4(1.0,1.0,.0,1.), 1.5);
 
 
  gl_FragColor = color1;
}

  
`,
};

export {smokeFragment}