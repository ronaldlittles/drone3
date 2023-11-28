const vertexShader = {

  

    vertexShader: `
  
    
  
    uniform float time;
    varying vec2 vUv;
    
    uniform vec2 pixels;
    
    varying vec3 vNormal;
    //attribute vec3 positions;
    
    varying vec3 newPosition;
  
    float PI = 3.141592653589793238;
  
    
    
   
  
    void main() {
  
      vUv = uv;
  
      float radius = 2.0;
      float y;
  
      float t =  position.x /(2.0 * PI * radius );
       
       if( t >= 3.0 * PI / 2.0 ){
        
      y = radius * sin((t - PI / 2.0) / PI);
  
      } else {
  
        y = 0.0;
  
      } 
     
  
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
  
      mvPosition.y += sin(t*2.0) * radius;
      
      
      
  
      gl_Position = projectionMatrix * mvPosition;
  
    
  
    }
              `,
        
  };
  
  export { vertexShader };