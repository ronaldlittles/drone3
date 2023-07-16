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
    
  }

  

  setModel() {
    
  
   

    const distance = 25;

    this.model2 = this.resource2.scene;
    this.model2.name = "rotor";
    this.scene2.add(this.model2);
    this.model2.position.set(0, 250, 800);
    this.model2.rotation.set(-.1, 0, 0);
    this.model2.scale.setScalar(450);
    this.model2.castShadow = true;
    this.model2.receiveShadow = true;

    console.log(this.model2);

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

 // Add event listeners for the left and right arrow keys
 document.addEventListener('keydown', this.handleKeyDown.bind(this));
 document.addEventListener('keyup', this.handleKeyUp.bind(this));
}

handleKeyDown(event) {
 if (event.key === 'ArrowLeft') {
  this.model2.position.x -= 10;
 } else if (event.key === 'ArrowRight') {
  this.model2.position.x += 10;
 }
}

handleKeyUp(event) {
 if (event.key === 'ArrowLeft') {
  this.model2.position.x += 10;
 } else if (event.key === 'ArrowRight') {
  this.model2.position.x -= 10;
 }






/* let keyPressStartTime = 0;
let keyPressDuration = 0;
const textDisplayInterval = 3000; 
const textLingerDuration = 2000; 
const texts = ["Text 1", "Text 2", "Text 3"]; 
let currentIndex = 0;
let isTextLingering = false;


document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    keyPressStartTime = performance.now(); 
    isTextLingering = false; 
    
  }
});

document.addEventListener("keydown", function(event) {
  if (event.key === "ArrowUp") {
    keyPressDuration = performance.now() - keyPressStartTime; 

    if (keyPressDuration >= textDisplayInterval && !isTextLingering) {
      displayText(); 
      isTextLingering = true; 
      setTimeout(nextText, textLingerDuration); 
      
    }
  }
});

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
 */

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

  //updateRotors(this.model2)

  //this.camera.instance.copy(this.model2.position)
  //this.camera.instance.lookAt(this.model.position)

  this.speed = .5
  this.maxHeight = 5000
  this.offsetZ = this.speed * this.time.elapsed

  /* this.texture0.offset.set(  this.offsetZ, 0 )
  this.texture1.offset.set( 0, this.offsetZ )
  this.texture2.offset.set( 0, this.offsetZ )
  this.texture3.offset.set( 0, this.offsetZ )  */

  /*  this.model.position.z += this.speed

  this.range = 1000

  if(this.model.position.z > this.range){
    this.model.position.z -= this.range 
  }
  if(this.model.position.z < -this.range){
    this.model.position += this.range 
  }  */

  /* this.plane1.position.z += this.speed * this.time.elapsed

  this.plane2.position.z += this.speed * this.time.elapsed

  if(this.plane1.position.z > this.maxHeight){
    this.plane1.position.z -= 2 * this.maxHeight
  }

  if(this.plane2.position.z > this.maxHeight){
    this.plane2.position.z -= 2* this.maxHeight
  } */


}


}