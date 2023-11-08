const vertexShader = {

  

  vertexShader: `

  

  uniform float time;
  varying vec2 vUv;
  
  uniform vec2 pixels;
  uniform sampler2D uTexture;
  uniform float uLength[300];
  varying vec3 Vnormal;
  //attribute vec3 positions;
  
  varying vec3 newPosition;

  float PI = 3.141592653589793238;

  
  
 

  void main() {

    vUv =  uv;
    Vnormal = normal;
    float radius = 3.0;
   

    float t =  position.x /(2.0 * PI * radius );
     
    float aLength = 0.0;

     for(int i = 0; i < 300; i++){
     
     

        aLength = uLength[i];

     

     };
   
    float ttt = texture2D(uTexture, uv).r;


    vec4 mvPosition = modelViewMatrix * vec4(position  , 1.0 );


    mvPosition.y += sin(t*3.0+ Vnormal.y ) * radius;

    
  
//calculations are off, could be vec3, or something else

    if( aLength >= 50.0 || aLength <= 100.0  ){
      
      mvPosition.y += 3.5 * radius * sin((t - PI / 4.0) / PI);

    } else {

      mvPosition.y += sin(t*3.0 ) * radius ;

    }  

    gl_Position = projectionMatrix * mvPosition;

  

  }
			`,
      
};

export { vertexShader };