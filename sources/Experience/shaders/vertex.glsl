      
      #include "./hash12polar.glsl"

      uniform float time;
      
      
      
      void main() {



        vec2 hash = Hash12_Polar(time);

        
        vec3 pos =  position;



        vUv = uv + hash;

        
        vec3 color = texture2D(texture1, vUv).rgb;

        vec4 mvPosition = modelViewMatrix * vec4( pos, 1. );
        
        float speed = .005;
        float offset = pos.y * .5;
        float scale = 2.;

        mvPosition.y -= mod((time + offset) * speed * scale, 2.0);

        gl_PointSize = 80.;//*(5. + 50. * aSize) * ( 1. / - mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;

      }

      export *
