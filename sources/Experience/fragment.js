const fragmentShader = {
  fragmentShader: `

  
  


 
  
  

 
      
      varying vec2 vUv;
     uniform float azimuth;
      uniform sampler2D uTexture;
      uniform float time;
      uniform vec2 tangent;

      void main() {
       
        

       

        vec2 newTangent = vec2(tangent.x, tangent.y);

       float angle = azimuth;

       vec2 newUV = vec2( fract(vUv.y *.03  ), 1.0 - vUv.x *.0006 );

        vec4 tt = texture2D(uTexture,newUV+newTangent);
 
       
        
       

       vec3 color = vec3(0.0);
        
        gl_FragColor = mix( vec4(tt.xyz,1.0) , vec4(color,.5),.8);
      
       
      } 

`,
};

export { fragmentShader };
