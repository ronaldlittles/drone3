const fragmentShader = {
  fragmentShader: `

  uniform float time;
  varying vec2 vUv;
  
 
  
  void main() {

      float innerRadius = .2;
      float outerRadius = .5;
      float numCycles = 3.0;

      float cycleCounter = 0.0;
 
      vec2 center = vec2(0.5);

      float distance = length(vUv - center);
  
      float direction = sign(sin(time)); 
  
      float phase = mod(cycleCounter, numCycles);
      float pulse = smoothstep(innerRadius, innerRadius + 0.1, distance) - smoothstep(outerRadius - 0.1, outerRadius, distance);
      
      vec3 color = vec3(0.5);

      color += pulse * vec3(1.0, 1.0, 0.0); 
  
       if (phase >= numCycles - 1.0) {
         
          color += pulse * vec3(0.0, 0.0, 1.0);
      } 
     

      
      gl_FragColor = vec4(color, 1.0);

  }
  

      

` ,  
    
    
    


  
      fragmentShader2: `


      uniform float uNoise;
      uniform float time;
      uniform vec2 uvScale;

      varying vec2 vUv;


      void main() {

        vec2 uv = sin((vUv/sin(time ))* uvScale); 

        vec4 redColor = vec4(1.0, 0.0, 0.0, 1.0);
        
        vec4 whiteColor = vec4(1.0, 1.0, 1.0, .5);

        float dot = smoothstep(sin(0.5), .05, sin(mod(uv.x, 5.0))) * smoothstep(0.5, 1.0, mod(uv.y, 1.0)) ; 

        vec4 finalColor = mix(redColor, whiteColor, dot); 

        gl_FragColor = vec4(finalColor);

    }
      
  


  `,


    
    
    


   

    fragmentShader3: `

        varying vec2 vUv;
        uniform float time;
        
        void main() {
            
          vec2 center = vec2(0.5, 0.5);
          float t = time* 10.0;

          gl_FragColor = vec4(vec3( ( sin(t - distance( vUv, center ) * 215.0 ) ) )  * .5, 1.0);

        }


    `,

   } 

  


export { fragmentShader };
