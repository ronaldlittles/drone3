const fragmentShader = {
  fragmentShader: `

      uniform sampler2D texture1;

      uniform vec2 uvScale;
      
      uniform float uNoise;

      uniform float time;

      varying vec2 vUv;
      


      void main() {

        vec2 center = vec2(0.5, 0.5);

        vec2 newUv = vUv * uvScale + center;

        vec4 tex = texture2D( texture1, newUv );
       
        float squareSize = 10.0 ; 
    
        vec2 position = floor(vUv  / squareSize );

    
        if (mod(position.y , 2.0) < 1.0) { 

          gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );

        } else {

          gl_FragColor = vec4(tex);  


        

      }
      }

` ,  
    
    
    


  
      fragmentShader2: `


      uniform float uNoise;
      uniform float time;
      uniform vec2 uvScale;

      varying vec2 vUv;


      void main() {

        vec2 uv = sin((vUv/sin(time ))* uvScale); 

        vec4 redColor = vec4(0.0, 0.0, 0.0, 1.0);
        
        vec4 whiteColor = vec4(1.0, 1.0, 1.0, .5);

        float dot = smoothstep(sin(0.5), .05, sin(mod(uv.x, 5.0))) * smoothstep(0.5, 1.0, mod(uv.y, 1.0)) ; 

        vec4 finalColor = mix(redColor, whiteColor, dot); 

        gl_FragColor = vec4(finalColor);

    }
      
  


  `,


    
    
    }


  /*  const fragmentShader3 = {

    fragmentShader3: `
        varying vec2 vUv;
        uniform float time;
        
        void main() {
            vec2 p = -1.0 + 2.0 * vUv;
            float a = atan(p.y, p.x);
            float r = length(p);
            float f = sin(r * 10.0 + time * 2.0) * 0.2 + 1.0;
            float c = mod(a, 3.1416 / 8.0) > 3.1416 / 16.0 ? 0.0 : 1.0;
            gl_FragColor = vec4(c * f, c * f * 0.5, c * f * 0.5, 1.0);
        }
    `
   } */

  


export { fragmentShader  };
