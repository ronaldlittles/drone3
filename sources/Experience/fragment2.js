const fragmentShader2 = {
  fragmentShader2: `
  
        varying vec3 Vnormal;
        varying vec3 newPosition;
        varying vec2 vUv;
        uniform float azimuth;
        uniform sampler2D uTexture;
        uniform float time;
        uniform float tangent;
        uniform float noise;
  
  
        void main() {
         
          
        float PI = 3.1415926535897932384626433832795;
         
  
         
  
         float angle = azimuth;
  
         vec2 newUV = vec2( fract( vUv.y*.08 + tangent*noise ) , 1.0 - vUv.x*noise );
  
         //newUV.x +=  angle;
         
         vec2 center = vec2(0.5, 0.5);
  
         vec4 tt = texture2D(uTexture, newUV); 
   
         float ttt = texture2D(uTexture, newUV).r;
          
         
  
          vec3 color = vec3(0.9, 0.3,0.7) ;
          
          //gl_FragColor = mix( vec4(tt.rgb,1.0) , vec4(color,.8),1.3);
  
          //gl_FragColor.y += 0.2 * sin( 2.0 *  (ttt + time) );

          gl_FragColor = vec4(color,.8);
        } 
  
  `,
};

export { fragmentShader2 };
