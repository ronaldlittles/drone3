import * as THREE from "three";
import Experience from "./Experience.js";
import { vertexShader } from "./vertex.js";
import { fragmentShader } from "./fragment.js";
import GSAP from "gsap";
import Video from './video.js'
import Walls from './walls.js'
import { Flow } from 'three/examples/jsm/modifiers/CurveModifier.js';
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";

export default class Drone {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.renderer = this.experience.renderer
    this.camera = this.experience.camera

    this.video = new Video();
    //this.sound = this.video.sound
    //this.analyser = new THREE.AudioAnalyser(this.sound, 32 );

    //this.walls = new Walls();
    

    this.curveParameter = 0; // Parameter to control the position along the curve (0 to 1)

   
    this.resource1 = this.resources.items.tacobell;
    this.resource2 = this.resources.items.droneModel;
   
    
    //this.setModel();
    this.setFlow();
    //this.setLights();
    //this.displayText();
 

  this.rotationSpeed = .05;
  this.movementSpeed = 25.0;

  this.handleKeyDown = this.handleKeyDown.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);

  document.addEventListener("keydown", this.handleKeyDown)
  document.addEventListener("keyup", this.handleKeyUp)


  document.addEventListener("pointerdown", this.handleKeyDown)
  document.addEventListener("pointerup", this.handleKeyUp)
 


this.arrowUpPressed = false;
this.arrowLeftPressed = false;
this.arrowRightPressed = false;

 


  
  }


  handleKeyDown(event) {
    if (event.key === 'ArrowUp') {
      this.arrowUpPressed = true;
    } else if (event.key === 'ArrowLeft') {
      this.arrowLeftPressed = true;
    } else if (event.key === 'ArrowRight') {
      this.arrowRightPressed = true;
    }
    }
    
     handleKeyUp(event) {
    if (event.key === 'ArrowUp') {
      this.arrowUpPressed = false;
    } else if (event.key === 'ArrowLeft') {
      this.arrowLeftPressed = false;
    } else if (event.key === 'ArrowRight') {
      this.arrowRightPressed = false;
    }
    
  } 

 
  


  setModel() {


     this.model2 = this.resource2.scene;
    this.model2.name = "rotor";
    //this.scene2.add(this.model2);
    this.model2.position.set(0,0,-80);
    this.model2.rotation.set(0, 0, 0);
    this.model2.scale.setScalar(15);
    this.model2.castShadow = true;
    this.model2.receiveShadow = true;
    //this.model2ClonedMesh = this.model2[0].clone()


     //this.dronebbBox = new THREE.Box3().setFromObject(this.model2)

     //this.dronebbBoxClone = this.dronebbBox.clone()
    

    this.meshes = [];
          this.model2.traverse((object) => {
            if (object.isMesh) {
              this.meshes.push(object);
            }
          });

console.log(this.meshes)

    /*   this.wallBoundingBoxes = [];
      this.walls.objectsArray.forEach((mesh)=>{

      this.wallClone = mesh.clone()

    
      //this.scene2.add(this.wallClone)
      
      
      //this.bbBox = new THREE.Box3().setFromObject(this.wallClone)


      //this.wallBoundingBoxes.push(this.bbBox);

      //const helper2 = new THREE.Box3Helper( this.bbBox, 0xffff00 );
      //this.scene2.add( helper2 ); 

    

    })  */
   
    
    

         /*  for (let i = 0; i < this.meshes.length; i++) {
            const mesh = this.meshes[i];
      
          GSAP.to(mesh.position, 10), {
            x: Math.random() * 2 - 1,
            y: Math.random() * 2 - 1, 
            Z:  Math.random() * 2 - 1,
            easing: "power2.easeOut",
            yoyo: true,
            repeat: -1
           
          }  
          
        } */

    //this.model2.add(this.camera.instance)
  

    /*  if (this.model2) {
      GSAP.to(this.model2.position, 10, {
        //x: this.model2.position.x + Math.random() * distance - distance / 2,
        y: this.model2.position.y + Math.random() * distance - distance / 2,
        z: this.model2.rotation.z + Math.random() * distance - distance / 2,
        ease: "power2.easeOut",
        repeat: -1,
        yoyo: true,
      }); 

      
    } */

 
   

function displayText() {

  const textElement = document.getElementById("smalltext"); 
  textElement.textContent = texts[currentIndex];
  
}


function nextText() {

  currentIndex = (currentIndex + 1) % texts.length; // Move to the next text in the array
  displayText(); // Display the next text
  isTextLingering = false; // Reset text lingering flag
 
}
 




  
  }


  setLights() {light

    const light3 = new THREE.DirectionalLight( 0xffffff, 2.5 );
    light3.position.set( 0, 0, 0 );
    //light3.target = this.model2;
    this.scene2.add( light3 );

    const light4 = new THREE.SpotLight( 0xffffff, 3.5 );
    light4.position.set( this.model.position.x, this.model.position.y + 50, this.model.position.z );
    this.scene2.add( light4 );

    light4.target = this.model;
    light4.penumbra = 1;
    light4.decay = 2;
    light4.distance = 100;
    light4.map =  this.resources.items.meTexture;

    light4.castShadow = true;
    light4.shadow.mapSize.width = 1024;
    light4.shadow.mapSize.height = 1024;
    light4.shadow.camera.near = 10;
    light4.shadow.camera.far = 200;
    light4.shadow.focus = 1;

    const spotLightHelper = new THREE.SpotLightHelper( light4 );
    //this.scene2.add( spotLightHelper );

    var pointLight = new THREE.PointLight( 0xffffff, 1.0, 100 );
    pointLight.position.set( 0, 0, 0 );
    pointLight.target = this.model;
    this.scene2.add( pointLight );

    const lights = new THREE.HemisphereLight('yellow', 'purple', 0);
    lights.position.set(0,900,0);
    this.scene2.add(lights);

}




update() {

  //this.flow.moveAlongCurve( .9 );
 
    //this.camera.instance.position.copy(this.model2.position)
  /* this.camera.instance.position.y += 10
  this.camera.instance.position.z += 50
  this.camera.instance.lookAt(this.model2.position)     
    */

    if (this.arrowLeftPressed) {
    this.model2.rotation.y += Math.PI/2 //this.rotationSpeed;
    }
    if (this.arrowRightPressed) {
    this.model2.rotation.y -= Math.PI/2 //this.rotationSpeed;
    }


    if (this.arrowUpPressed) {
      this.forwardVector = new THREE.Vector3(0, 0, 1);
      this.forwardDirection = this.forwardVector.clone();
      this.forwardDirection.applyQuaternion(this.model2.quaternion);
    this.model2.position.add(this.forwardDirection.multiplyScalar(this.movementSpeed));
    } 

    if(this.model2.position.z > 100 || this.model2.position.z < -100) {
      this.model2.position.z = 100
      this.model2.rotation.y += Math.PI
    }

    if(this.model2.position.x > 100 || this.model2.position.x < -100) {
      this.model2.position.x = 100
      this.model2.rotation.y += Math.PI
    }




//this.dronebbBox = this.model2.children[0].children[0].children[0].children[0].geometry.boundingBox

/* this.dronebbBox = new THREE.Box3().setFromObject(this.model2)

 this.dronebbBox.applyMatrix4(this.model2.matrixWorld)

 const helper = new THREE.Box3Helper( this.dronebbBox, 0xff0000 );
this.scene2.add( helper ); */

//console.log(this.model2.position)

//for (this.wallBoundingBox of this.wallBoundingBoxes) {

  

 //if (this.dronebbBox.intersectsBox(this.bbBox)) {

        //console.log('intersecting')

        //this.wallBoundingBox.applyMatrix4(this.wallClone.matrixWorld)
        //this.dronebbBox.applyMatrix4(this.model2.matrixWorld)
       
       
        /* const collisionNormal = new THREE.Vector3(0,0,-1);

        const wallBoundingBoxCenter = new THREE.Vector3(0,0,0);
        this.wallBoundingBox.getCenter(wallBoundingBoxCenter); */
    
        //collisionNormal.subVectors(this.wallBoundingbox, this.model2.position).normalize();

           
        //const penetrationDepth = this.dronebbBox.distanceToPoint(this.wallBoundingBox);

      
        //const separationVector = collisionNormal.clone().multiplyScalar(penetrationDepth);

          
        //this.model2.position.z -= 5
        //this.model2.rotation.y += .05
       
        //this.model2.position.add(collisionNormal.multiplyScalar(penetrationDepth )); 
        //this.model2.position.add(  collisionNormal);

        //console.log(this.wallBoundingBox, this.dronebbBox)

    
//}

 

 
//}  

  //this.model2.rotation.z = this.camera.azimuth >= 0 ? this.camera.azimuth : 0;
 
  //this.model2.rotation.x = this.camera.azimuth >= 0 ? this.camera.azimuth * -.5 : 0;
  

   /* this.meshes.forEach((mesh) => {



    if (mesh.name.startsWith('Plane') && mesh.name != 'Plane054')  {

     this.circles = mesh
     this.circles.rotation.y += Math.PI/2;

    
    }

    if(mesh.name.includes('Drone_Camera')){

      this.droneCamera = mesh

      this.droneCamera.scale.x = this.data

      //console.log(this.data)

     }

  });
  */
 


}



  
    



}