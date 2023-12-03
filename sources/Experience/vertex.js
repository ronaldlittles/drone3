const vertexShader = {

  

  vertexShader: `

  varying vec2 vUv;
  
  varying vec3 newPosition;

  uniform sampler2D texture1;

  float PI = 3.141592653589793238;

 
  uniform vec2 uScale;
  
 

  void main() {

    vUv =  uv;

    newPosition = position;
     
    float tex = texture2D( texture1, vUv).r;
   
    //newPosition.y = tex* .05;
  
     
  
    vec4 mvPosition = modelViewMatrix * vec4(newPosition  , 1.0 );
  
  

    gl_Position = projectionMatrix * mvPosition;

  }

   
			`,



vertexShader3: `

varying vec2 vUv;





float PI = 3.141592653589793238;

uniform float noise;

uniform float radius;

uniform float yPosition;

uniform float t;

uniform vec3 customPositions;

//attribute float uPosition;




void main() {

  vUv =  uv;
 
  

 

 float t = position.x / (2.0 * PI * radius ) + noise;

 
//float t = customPositions.x / (2.0 * PI * radius ) + noise;

 //position.x / t;

  vec4 mvPosition = modelViewMatrix * vec4(position , 1.0 );

  //mvPosition.y += sin( t * .5 + noise  ) * radius;

  //mvPosition.y += yPosition;

  gl_Position = projectionMatrix * mvPosition;

}

 
    `,

     
      
};

export { vertexShader };