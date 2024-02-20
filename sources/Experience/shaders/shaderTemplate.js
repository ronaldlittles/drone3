const fragmentShader = {
    fragmentShader: `
  
   
  
  void main() {
    
  
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  
  }
    
  
        
  
  `,
  
}

const vertexShader = {

    vertexShader: `

void main() {



    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );


}




    `,
  
          
} 
  
  export { fragmentShader }
  export { vertexShader }