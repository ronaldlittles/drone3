const fragmentShader = {
  fragmentShader: `

      varying vec3 Vnormal;
      varying vec3 newPosition;
      varying vec2 vUv;
      uniform float azimuth;
      uniform sampler2D uTexture;
      uniform float time;
      uniform float tangent;
      uniform float noise;


      void main() {
        float squareSize = 3.0; // Change this value to adjust the size of the squares
    
        vec2 position = floor(vUv / squareSize);
    
        if (mod(position.x + position.y, 2.0) < 1.0) {
          gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); // Color 1 (e.g., white)
        } else {
          gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // Color 2 (e.g., black)
        }
      }

`,
};

export { fragmentShader };
