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

  vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.00001;

  vec4 color =  texture2D( texture1,st * scaledDistance * .0001)  ;
  //vec4 color = vec4(.5);
 
 
  
  //Output the distance as the color
  gl_FragColor = color;
}

  
`,
};

export {smokeFragment}