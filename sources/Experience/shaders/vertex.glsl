

    //#include ./includes/hash12polar.glsl
    #include ./includes/hash.glsl
  
    varying vec2 vUv;
    
    varying vec3 newPosition;

    varying vec3 vNormal;

    
    uniform float uNoise;
  
    uniform vec2 uvScale;
  
    uniform float time; 
    
    uniform sampler2D texture1;

    
    uniform vec3 vTangent;

 
 


  void main() {

    vNormal = normal;

    //vec2 hash = Hash12_Polar(time);

    float hash1 = hash(uv);
  

    float tl = length(vTangent);

    vUv = uv; 


    

    float height = texture2D(texture1, vUv).r;

    newPosition = position;

//newPosition.z += sin(hash1);
    
  
    vec4 mvPosition = modelViewMatrix * vec4( newPosition, 1.0 );
  

    gl_Position = projectionMatrix * mvPosition;

  }