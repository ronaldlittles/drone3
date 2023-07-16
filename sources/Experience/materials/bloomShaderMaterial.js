import * as THREE from "three";

import vertexShader from '../shaders/bloomShader/vertex.glsl'
import  fragmentShader from '../shaders/bloomShader/fragment.glsl'

function bloomShader(){

    const textureLoader = new THREE.TextureLoader()
    const material = new THREE.ShaderMaterial({

   
      uniforms:
      {
          uTime: {value: 0},
          //baseTexture: { value: null},
          //bloomTexture: { value:null }
          baseTexture: { value: textureLoader.load('/assets/forrest.jpg')},
          bloomTexture: { value: textureLoader.load('/assets/fire.jpg') }
         
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
  
    })

    return material



}

export default bloomShader