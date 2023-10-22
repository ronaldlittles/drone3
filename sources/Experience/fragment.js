const fragmentShader = {
  fragmentShader: `

  
  


 
  
  

 
      
      varying vec2 vUv;
     uniform float azimuth;
      uniform sampler2D uTexture;
      uniform float time;

      void main() {
       
        

       

       float angle = azimuth;

       

        vec4 tt = texture2D(uTexture, fract(vUv*angle));
 
       
        
       

       vec3 color = vec3(0.0);
        
        gl_FragColor = mix( vec4(tt.xyz,1.0) , vec4(color,1.0),.5);
      
       
      } 

`,
};

export { fragmentShader };
