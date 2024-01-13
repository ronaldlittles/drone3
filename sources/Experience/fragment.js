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
				//fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

				gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

}
  

      

` ,  
    
    
    


  
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

        float dot = smoothstep(sin(0.05), .05, sin(mod(uv.x, 1.0))) * smoothstep(0.05, .05, mod(uv.y, 1.0)) ; 

        vec4 finalColor = mix(redColor, whiteColor, dot); 

        gl_FragColor = vec4(finalColor);

    }
      
  


  `,


    
    
    


   

    fragmentShader3: `

        varying vec2 vUv;
        uniform float time;
        
        void main() {

          vec4 color = vec4(1.0,0.0,0.0,0.5);
            
          vec2 center = vec2(0.5,0.5);

          float t = time* 10.0;

          vec4 mixed = mix(color,vec4(vec3( ( sin(t - distance( vUv, center ) * 215.0 ) ) )  * .5, 1.0), 0.5  );

          gl_FragColor = vec4(mixed);

        }


    `,

   } 

  


export { fragmentShader };
