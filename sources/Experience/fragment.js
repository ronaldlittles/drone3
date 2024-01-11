const fragmentShader = {
  fragmentShader: `

  uniform float time;
  uniform vec2 uvScale;
  uniform sampler2D texture1;
  
  varying vec2 vUv;
  
  float rand(vec2 n) {
    return fract(sin(cos(dot(n, vec2(12.9898,12.1414)))) * 83758.5453);
}

float noise(vec2 n) {
     vec2 d = vec2(0.0, 1.0);
    vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
    return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
    float total = 0.0, amplitude = 1.0;
    for (int i = 0; i <5; i++) {
        total += noise(n) * amplitude;
        n += n*1.7;
        amplitude *= 0.47;
    }
    return total;
}

void main() {

     vec3 c1 = vec3(0.5, 0.0, 0.1);
     vec3 c2 = vec3(0.9, 0.1, 0.0);
     vec3 c3 = vec3(0.2, 0.1, 0.7);
     vec3 c4 = vec3(1.0, 0.9, 0.1);
     vec3 c5 = vec3(0.1);
     vec3 c6 = vec3(0.9);

    vec2 speed = vec2(0.1, 0.9);
    float shift = 1.327+sin(time*2.0)/2.4;
    float alpha = 1.0;
    
	  float dist = 3.5-sin(time*0.4)/1.89;
    
    vec2 uv = vUv.xy / uvScale;
    vec2 p = vUv.xy * dist / vUv.xx;
    p += sin(p.yx*4.0+vec2(.2,-.3)*time)*0.04;
    p += sin(p.yx*8.0+vec2(.6,+.1)*time)*0.01;
    
    p.x -= time/1.1;
    float q = fbm(p - time * 0.3+1.0*sin(time+0.5)/2.0);
    float qb = fbm(p - time * 0.4+0.1*cos(time)/2.0);
    float q2 = fbm(p - time * 0.44 - 5.0*cos(time)/2.0) - 6.0;
    float q3 = fbm(p - time * 0.9 - 10.0*cos(time)/15.0)-4.0;
    float q4 = fbm(p - time * 1.4 - 20.0*sin(time)/14.0)+2.0;
    q = (q + qb - .4 * q2 -2.0*q3  + .6*q4)/3.8;
    vec2 r = vec2(fbm(p + q /2.0 + time * speed.x - p.x - p.y), fbm(p + q - time * speed.y));
    vec3 c = mix(c1, c2, fbm(p + r)) + mix(c3, c4, r.x) - mix(c5, c6, r.y);
    vec3 color = vec3(1.0/(pow(c+1.61,vec3(4.0))) * cos(shift * vUv.y / vUv.y));
    
    color=vec3(1.0,.2,.05)/(pow((r.y+r.y)* max(.0,p.y)+0.1, 4.0));;
    color += (texture2D(texture1,uv*0.6+vec2(.5,.1)).xyz*0.01*pow((r.y+r.y)*.65,5.0)+0.055)*mix( vec3(.9,.4,.3),vec3(.7,.5,.2), uv.y);
    color = color/(1.0+max(vec3(0),color));
    gl_FragColor = vec4(color.x, color.y, color.z, alpha);
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
        
        vec4 whiteColor = vec4(1.0, 1.0, 1.0, 1.0);

        float dot = smoothstep(sin(0.05), .05, sin(mod(uv.x, 1.0))) * smoothstep(0.05, .05, mod(uv.y, 1.0)) ; 

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

          vec4 mixed = mix(color,vec4(vec3( ( sin(t - distance( vUv, center ) * 215.0 ) ) )  * .5, 1.0), 0.5  );

          gl_FragColor = vec4(mixed);

        }


    `,

   } 

  


export { fragmentShader };
