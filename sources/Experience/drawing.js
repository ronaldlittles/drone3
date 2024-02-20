import * as THREE from "three";
import Experience from "./Experience.js";
import { vertexShader } from "./shaders/vertex.js";
import { fragmentShader } from "./fragment.js";
import EventEmitter from "./Utils/EventEmitter.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import GSAP from "gsap";



//import '@tensorflow/tfjs-backend-webgl';
//import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';


export default class Drawing extends EventEmitter {
  constructor() {

    super();

    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.controls = this.experience.controls;
    this.scene = this.experience.scene;
   
    this.world = this.experience.world;
    this.scene2 = this.experience.scene2;

    this.resource1 = this.resources.items.meTexture;
    this.resource2 = this.resources.items.fireTexture;

  

    this.setDraw()
    
    
     
  } 
  


setDraw(){

 
  

  if(this.debug){

    this.debugFolder = this.debug.addFolder('Scale')
      

    const rotationData = {
      scaleX: 0,
      rotateX: 0 
    };
  
    this.debugFolder
      .add(
        rotationData,
        'scaleX',
        0, 5000,.5
      )
      .name('Scale X')
      .onChange(() => {
        
       this.scale = rotationData.scaleX  

      });

  }

this.currentPath = [];
this.allPaths = []

let isDrawing = false;

 document.addEventListener('dblclick', () => {

  isDrawing = false;

  this.camera.orbitControls.autoRotate = true;

}); 

document.addEventListener('pointerdown', () => {

  

    this.camera.orbitControls.enabled = false
    this.camera.orbitControls.autoRotate = false
  
  isDrawing = true;

});


document.addEventListener('pointermove', (event) => {

    this.camera.orbitControls.enabled = false
    this.camera.orbitControls.autoRotate = false 

  if (isDrawing) {

    this.pointer = {

        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
  
      };
    
    const point = this.pointer

    this.currentPath.push(point);
     
  }


});


document.addEventListener('pointerup', () => {

  this.camera.orbitControls.enabled = true 
  this.camera.orbitControls.autoRotate = false
    
  isDrawing = false;

  if (this.currentPath.length > 0) {

    this.currentPath.push(this.currentPath); 

    this.createLine()
    

  }
 

});


}



createLine() {

    const material = new THREE.LineBasicMaterial({ 
    
        color: 0xf0f0f0 * Math.random(),
    
    });

    const geometry = new THREE.BufferGeometry().setFromPoints(this.currentPath);

    this.line = new THREE.Line(geometry, material);

    this.scene2.add(this.line);

    this.line.scale.setScalar(2000)
 
    //this.line.position.set(0,0,750)


}

update() {

  


  if (this.line) {

  
    
   
    const rotation = this.calculateRotation(this.time.delta);

   
    this.line.rotation.y += 5;

    

    if (this.currentPath.length > 0) {

      const index = Math.floor(this.time.elapsed * (this.currentPath.length - 1)) % this.currentPath.length;
      
      
      

      const point = this.currentPath[index];

      

      const x = point.x * this.scale;
      const y = point.y * this.scale;

      

      this.newPath = this.currentPath.map((index)=>{

        return index * 2


      

      })

      //console.log(this.newPath)

     
      }

    }
  
}
calculateRotation(elapsedTime) {

  
  this.rotationSpeed += 0.01;
  const rotation = elapsedTime + this.rotationSpeed;
  return rotation;
}







}