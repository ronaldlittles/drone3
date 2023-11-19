const fragmentShader = {
  fragmentShader: `

      
      varying vec2 vUv;
      


      void main() {
        float squareSize = 5.0; 
    
        vec2 position = floor(vUv / squareSize);
    
        if (mod(position.x + position.y, 2.0) < 1.0) {

          gl_FragColor = vec4(1.0, 1.0, .90, 1.0); 
        } else {
          gl_FragColor = vec4(1.0,1.0, 0.0, 1.0); 

        }
      }

`,
    }

  




export { fragmentShader };
