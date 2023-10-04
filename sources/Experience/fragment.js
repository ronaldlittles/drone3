const fragmentShader = {
  fragmentShader: `

  
  


  vec3 sphere(vec3 p, float r) {
    return normalize(p) * r;
  }

  
  

 
      //varying vec3 positions;
      varying vec2 vUv;
      varying vec3 vWorldPosition;
      uniform sampler2D uTexture;
      uniform float time;

      void main() {
        vec2 newUV = vUv;
        //vec4 tt = texture2D(uTexture, vUv);

        vec2 st = gl_PointCoord.xy;

        float disc = length(st - vec2(.5));

        float alpha = smoothstep(.5,.48,disc);

        vec4 tt = texture2D(uTexture, st);
/* 
        vec2 godray = vWorldPosition.xy - vec2(0.,6.);
        float uvDirection = atan(godray.y,godray.x);
          vec3 cir = sphere(vWorldPosition, 0.5);
        float c = texture2D(uTexture, vec2(uvDirection, 0.) + 0.02*time).x;
        float c1 = texture2D(uTexture, vec2(0.1, uvDirection) + 0.02*time*1.5).x; */

        //float alpha = min(c,c1);
        //gl_FragColor = vec4(vUv,0.,1.);
        //float fade = smoothstep(0.15,0.86,abs(vUv.y));
        //gl_FragColor = vec4(vWorldPosition,c);
        gl_FragColor = vec4(1.0);
        //gl_FragColor = mix(vec4(cir+tt.xyz,alpha) , vec4(cir,alpha),.9);

       
      } 

`,
};

export { fragmentShader };
