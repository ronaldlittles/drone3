const fragmentShader = {
  fragmentShader: `

      uniform sampler2D texture1;

      varying vec2 vUv;
      
      uniform vec2 uvScale;
      
      uniform float uNoise;


      void main() {


       vec4 tex = texture2D( texture1, vUv);
   
       
        float glow = 5.0; 
        float squareSize = 10.0 ; 
    
        vec2 position = floor(vUv  / squareSize );
    
        if (mod(position.y , 2.0) < 1.0) { 

          gl_FragColor = vec4( glow*1.0, glow*0.01, glow* 0.01,1.0 );

        } else {

          gl_FragColor = vec4(1.0,1.0,0.5, 1.0); 

        }

      }

`   
    
    
  }


   /*  const fragmentShader2 = {
      fragmentShader2: `


      varying vec2 vUv;
      varying vec3 newPosition;

      uniform vec2 uvScale;
      uniform sampler2D texture1; 


      void main() { 
        

      
      vec2 newUV = vUv;
      vec4 tex = texture2D( texture1, fract(newUV+uvScale)*6.0);

      

          gl_FragColor = vec4(tex); 
        

      }

`
    }; */



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
