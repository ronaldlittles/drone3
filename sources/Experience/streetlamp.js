import * as THREE from "three";
import Experience from "./Experience.js";
import { vertexShader } from "./vertex.js";
import { fragmentShader } from "./fragment.js";
import GSAP from "gsap";

export default class Streetlamp {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.renderer = this.experience.renderer
    this.camera = this.experience.camera

   

   
    //this.resource = this.resources.items.terrainModel;
    this.resource2 = this.resources.items.droneModel;
   
    
    this.setModel();
    //this.setLights();
    //this.displayText();
    //this.updateRotors();

   


  this.rotationSpeed = .5;
  this.movementSpeed = 50.0;

  this.handleKeyDown = this.handleKeyDown.bind(this);
  this.handleKeyUp = this.handleKeyUp.bind(this);

  document.addEventListener("keydown", this.handleKeyDown)
document.addEventListener("keyup", this.handleKeyUp)
 


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
    
  
   

    const distance = 25;

    this.model2 = this.resource2.scene;
    this.model2.name = "rotor";
    this.scene2.add(this.model2);
    this.model2.position.set(0, 75, 0);
    this.model2.rotation.set(-150, 0, 700);
    this.model2.scale.setScalar(200);
    this.model2.castShadow = true;
    this.model2.receiveShadow = true;


    this.meshes = [];
          this.model2.traverse((object) => {
            if (object.isMesh) {
              this.meshes.push(object);
            }
          });

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
    //this.camera.instance.lookAt(new THREE.Vector3(0,0,0))

     if (this.model2) {
      GSAP.to(this.model2.position, 10, {
        //x: this.model2.position.x + Math.random() * distance - distance / 2,
        y: this.model2.position.y + Math.random() * distance - distance / 2,
        z: this.model2.rotation.z + Math.random() * distance - distance / 2,
        ease: "power2.easeOut",
        repeat: -1,
        yoyo: true,
      });

      
    } 

 
    
     

    






// Function to display text
function displayText() {
  const textElement = document.getElementById("smalltext"); 
  textElement.textContent = texts[currentIndex];
  
  // Set the content of the element to the current text
}

// Function to show next text
function nextText() {
  currentIndex = (currentIndex + 1) % texts.length; // Move to the next text in the array
  displayText(); // Display the next text
  isTextLingering = false; // Reset text lingering flag
 

}
 




  
  }


  setLights() {

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



updateRotors(object) {

  if (object.name.includes("rotor")) {
    object.rotation.z += 0.2;
  }
  object.children.forEach(child => {
    this.updateRotors(child);
  });

}

update() {

  /* this.camera.instance.position.copy(this.model2.position)
  this.camera.instance.position.y += 35
  this.camera.instance.position.z += 150
  this.camera.instance.lookAt(this.model2.position)    */



if (this.arrowLeftPressed) {
 this.model2.rotation.y += this.rotationSpeed;
}
if (this.arrowRightPressed) {
 this.model2.rotation.y -= this.rotationSpeed;
}


if (this.arrowUpPressed) {
  const forwardVector = new THREE.Vector3(0, 0, -1);
  const forwardDirection = forwardVector.clone();
  forwardDirection.applyQuaternion(this.model2.quaternion);
 this.model2.position.add(forwardDirection.multiplyScalar(this.movementSpeed));
}




  this.model2.rotation.z = this.camera.azimuth 
  this.model2.rotation.x = this.camera.azimuth * -.5

  //updateRotors(this.model2)

  

 


}


}