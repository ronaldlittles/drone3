const fragmentShader = {
  fragmentShader: `

  mat2 rotate(float angle){
    
      float c = cos(angle);
      float s = sin(angle);

      return mat2(c, -s, s, c);

    
  }

  uniform float time;
  uniform vec2 uvScale;

  uniform float fogDensity;
	uniform vec3 fogColor;

	uniform sampler2D texture1;
	uniform sampler2D texture2;
  
  varying vec2 vUv;
  


void main() {

  float angle = 1.5708;

  mat2 rotationMatrix = rotate(angle);

  vec2 position = - 1.0 + 2.0 * vUv;

  //vec2 rotatedPosition = rotationMatrix * position.xy;

  //position = rotatedPosition;

  vec4 noise = texture2D( texture1, vUv );
  vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
  vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;

  T1.x += noise.x * 2.0;
  T1.y += noise.y * 2.0;
  T2.x -= noise.y * 0.2;
  T2.y += noise.z * 0.2;

  float p = texture2D( texture1, T1 * 2.0 ).a;

  vec4 color = texture2D( texture2, T2 * 2.0 );
  vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

  if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
  if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
  if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; };

  gl_FragColor = temp;

				float depth = gl_FragCoord.z / gl_FragCoord.w;
				const float LOG2 = 1.442695;
				float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
				//fogFactor =  clamp( fogFactor, 0.0, 1.0 );//1.0 -

				gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

}
  

      

`,

  fragmentShader2: `


      uniform float uNoise;
      uniform float time;
      uniform vec2 uvScale;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vTangent;


      void main() {

        float lighting = dot(normalize(vNormal), normalize(vTangent));

        vec2 uv = sin((vUv*sin(time ))* uvScale); 

        vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);
        
        vec4 whiteColor = vec4(1.0, 1.0, 1.0, .1);

        float dot = smoothstep(sin(0.005), .005, sin(mod(uv.x, 1.0))) * smoothstep(0.05, .05, mod(uv.y, 1.0)) ; 

        vec4 finalColor = mix(redColor, whiteColor, dot); 

        gl_FragColor = vec4(finalColor);

    }
      
  


  `,

  fragmentShader3: `

        varying vec2 vUv;
        uniform float time;
        
        void main() {

          vec4 color = vec4(1.0,0.0,0.0,1.0);
            
          vec2 center = vec2(0.5,0.5);

          float t = time* 10.0;

          vec4 mixed = mix(vec4(vec3( ( sin(t - distance( vUv, center ) * 100.0 ) ) )  * .5, .5),color, .9  );

          gl_FragColor = vec4(mixed);

        }


    `,

  fragmentShader4: `


  uniform float time;
  uniform sampler2D texture1;
  uniform vec2 iResolution;
  uniform vec2 iMouse;
 


    mat2 rot(float a) { return mat2(cos(a), sin(a), -sin(a), cos(a)); }

// iq's noise function
float noise(vec3 x) {
    vec3 p = floor(x);
    vec3 f = fract(x);
	f = f*f*(3.0-2.0*f);
	vec2 uv = (p.xy+vec2(37.0,17.0)*p.z) + f.xy;
    vec2 rg = texture2D( texture1, (uv+ 0.5)/256.0, 0. ).yx;
	return -1.0+2.0*mix( rg.x, rg.y, f.z );
}

float smoke(vec3 p) {
    //return clamp(1. - length(p), 0., 1.);
    vec3 q = 1.2 * p;
    float f = 0., a = .5;
    for(int i = 0; i < 5; ++i, a *= .4, q *= 2.1) { // fbm
        q += time * vec3(.17, -.5, 0);
        f += a * noise(q);
    }
    float noiseShape = .5 + .7 * max(p.y, 0.) - .15 * length(p.xz);
    return clamp(1. +  noiseShape * f - length(p), 0., 1.);
    
}

vec3 shading(vec3 ro, vec3 rd) {
    vec3 ld = normalize(vec3(.5, 1, -.7));
    
    const float nbStep = 30., diam = 3., rayLength = diam / nbStep;
    float start = length(ro) - diam / 2., end = start + diam;
    float sumDen = 0., sumDif = 0.;
    
    for(float d = end; d > start; d -= rayLength) { // raymarching
        vec3 p = ro + d * rd;
    	if(dot(p,p) > diam * diam) break;
        float den = smoke(p);
        sumDen += den;
        if(den > .02) sumDif += max(0., den - smoke(p + ld * .17));
    }

    const vec3 lightCol = vec3(.95, .75, .3);
    float light = 10. * pow(max(0., dot(rd, ld)), 10.);
    vec3 col = .01 * light * lightCol;
    col +=  .4 * sumDen * rayLength * vec3(.8, .9, 1.); // ambient
    col += 1.3 * sumDif * rayLength * lightCol;         // diffuse
	return col;
}






void main() {

   
    vec2 uv = (gl_FragCoord.xy - iResolution.xy / 2.) / iResolution.yy;
    vec3 rd = normalize(vec3(uv, -1.07));

    vec2 ang = iMouse.xy/iResolution.xy;
    float yaw = 7. * ang.x;
    float pitch = +(ang.y);

    vec3 camPos = vec3(0., .3, 3.5);
    camPos.yz *= rot(pitch); camPos.zx *= rot(yaw);
    rd.yz     *= rot(pitch);     rd.zx *= rot(yaw);

	  gl_FragColor = vec4(pow(shading(camPos, rd), vec3(1. / 2.2)), 1.);

    
}


`,
}; 

  


export { fragmentShader };
