const fragmentShader = {
  fragmentShader: `

  varying vec3 Vnormal;
      varying vec3 newPosition;
      varying vec2 vUv;
      uniform float azimuth;
      uniform sampler2D uTexture;
      uniform float time;
      uniform float tangent;
      uniform vec3 noise;
      void main() {
       
        
        float PI = 3.1415926535897932384626433832795;
       

       

       float angle = azimuth;

       vec2 newUV = vec2( fract(vUv.y*.08 + tangent  ) , 1.0 - vUv.x  );

      //newUV.x +=  angle;
       
       vec2 center = vec2(0.5, 0.5);

       vec4 tt = texture2D(uTexture, newUV); 
 
       float ttt = texture2D(uTexture, newUV).r;
        
       

        vec3 color = vec3(0.3, 0.0,0.7) ;
        
        gl_FragColor = mix( vec4(tt.rgb,1.0) , vec4(color,1.0),.5);
        //gl_FragColor.y += 0.2 * sin( 2.0 *  (ttt + time) );
       
      } 

`,
};

export { fragmentShader };
