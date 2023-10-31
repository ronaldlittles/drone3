const fragmentShader = {
  fragmentShader: `


      
      varying vec2 vUv;
      uniform float azimuth;
      uniform sampler2D uTexture;
      uniform float time;
      uniform float tangent;

      void main() {
       
        

       

       //vec2 newTangent = vec2(tangent.y+time, tangent.x+time);

       float angle = azimuth;

       vec2 newUV = vec2( fract(vUv.y *.03+tangent+angle) , 1.0 - fract(vUv.x*.0006+tangent ) );

       newUV.x +=  angle;
       //newUV.y +=  newTangent.y*2.0 ;
       vec2 center = vec2(0.5, 0.5);

       vec4 tt = texture2D(uTexture, newUV); 
 
       
        
       

        vec3 color = vec3(0.5,0.0,0.5);
        
        gl_FragColor = mix( vec4(tt.xyz,angle) , vec4(color,1.0),.8);
      
       
      } 

`,
};

export { fragmentShader };
