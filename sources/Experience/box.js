import * as THREE from "three";
import Experience from "./Experience.js";
import { Text } from "troika-three-text";
import { smokeVertex } from "./smokeVertex.js";
import { smokeFragment } from "./smokeFragment.js";
//import Video from './video.js';
import Floor from "./floor.js";
//import GUI from 'lil-gui';
import GSAP from "gsap";

import { vertexShader } from "./vertex.js";
import { fragmentShader } from "./fragment.js";
//import {test}  from "./video.js";
import { VertexTangentsHelper } from "three/examples/jsm/helpers/VertexTangentsHelper.js";
export default class Box {

  constructor(_options = {}) {

    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;

    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
   
    this.renderer = this.experience.renderer;
    this.targetElement = this.experience.targetElement;
    this.world = this.experience.world;
    
   
    this.setCubeTexture()
    this.resource1 = this.resources.items.smoke;
    this.resource2 = this.resources.items.smoke;
    this.resource3 = this.resources.items.sceneModel
    this.setLights()
    this.setCity() 
    this.setBox()
    //this.setFlower()
   
    
   
    this.clamp = THREE.MathUtils.clamp;
   
   
    //test.test('test from box.js')
    
  }

 

  setCubeTexture() {

    this.cubeTexture = new THREE.CubeTextureLoader().load([
      "/assets/DarkSeaxneg.jpg",
      "/assets/DarkSeaxpos.jpg",
      "/assets/DarkSeayneg.jpg",
      "/assets/DarkSeaypos.jpg",
      "/assets/DarkSeazneg.jpg",
      "/assets/DarkSeazpos.jpg",
    ]);

    //this.scene2.background = this.cubeTexture
    //this.scene2.backgroundBluriness = 1
    
    this.cubeTexture.needsUpdate = true
    this.cubeTexture.mapping = THREE.CubeRefractionMapping;
    this.scene2.environment = this.cubeTexture
   
  }

  
  setCity() {

    this.shaderMaterial = new THREE.ShaderMaterial({

      side: THREE.DoubleSide,
      //transparent: true,
      //opacity: 1.0,
     
    
      uniforms: {

          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
          fogDensity: { value: 0.45 },
					fogColor: { value: new THREE.Vector3( 0, 0, 0 ) },
					time: { value: 1.0 },
					uvScale: { value: new THREE.Vector2( 3.0, 1.0 ) },
					texture1: { value: this.resource2 },
					texture2: { value: this.resource1 },
          azimuth: { value: null },
      
      },

      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader,

    });

   
  this.resource1.wrapS =  THREE.RepeatWrapping;
  this.resource1.wrapT =  THREE.RepeatWrapping;
  this.resource1.repeat.set(1,1)

  this.resource2.wrapS = THREE.RepeatWrapping;
  this.resource2.wrapT =THREE.RepeatWrapping; 

  this.resource1.colorSpace = THREE.SRGBColorSpace;


    

      this.geometry = new THREE.PlaneGeometry(2,2,100,100);

      this.mesh1 = new THREE.Mesh(this.geometry, this.shaderMaterial);
      
      this.mesh1.name ='road'
     
      this.mesh1.scale.set(600,0,0)

      this.mesh1.scale.setScalar(1500)
      
      //this.scene2.add(this.mesh1);

      this.mesh1.position.z = 600;
      this.mesh1.rotation.x += Math.PI/2;
      this.mesh1.position.y = -10; 
    

    
     if(this.debug){

      this.debugFolder = this.debug.addFolder()

        const rotationData = {
         scaleX: 0,
         rotateX: 0,
       }; 
 
       this.debugFolder
         .add( this.mesh1.rotation,'x',0)
         .min(0)
         .max(10)
         .step(0.001)

        

      this.debugFolder
         .add( this.mesh1.scale,'x',0)
         .min(0)
         .max(100)
         .step(0.001)


      this.debugFolder
         .add( this.shaderMaterial.uniforms.uvScale.value,'y',5)
         .min(0)
         .max(10)
         .step(0.001)

         this.debugFolder
         .add( this.shaderMaterial.uniforms.uvScale.value,'x',5)
         .min(0)
         .max(10)
         .step(0.001)



    } 
      
    

     
     

    this.meshes2 = []

    //for (let i = 0; i < 20; i++) {

     

      this.mesh2 = new THREE.Mesh(this.geometry, this.shaderMaterial);

      this.mesh2.scale.setScalar(50)

     /*  this.mesh2.position.copy(this.meshes[i].position);
  this.mesh2.position.y += (this.meshes[i].scale.y / 2) + (this.mesh2.scale.y / 2); */

      
     // this.mesh = this.mesh2.clone()
     /*  this.mesh.position.x = Math.random() * 6000 - 3000;
      this.mesh.position.y = 100
      this.mesh.position.z = Math.random() * 6000 - 3000;
      this.mesh.scale.x = 10;
      this.mesh.scale.y =   Math.random() * 160 + 20;
      this.mesh.scale.z = 1; */

      this.mesh2.name ='pillars2'
     

      
      //this.scene2.add(this.mesh2);
      //this.meshes2.push(this.mesh2)
    
  //}

}

  setFlower(){



  }


  setBox() {

    

 

   
    const myText = new Text();

    console.log(myText)
    this.myText = myText;
    this.scene2.add(this.myText);

    this.myText.text =
      "the brain is the strongest muscle of the body.";

    this.myText.fontSize = 145;
    this.myText.textAlign = 'center';
    
    this.myText.color = 'yellow';
    this.myText.position.set(-500, 200 , -2000);
    
    this.myText.maxWidth = 3500;
   
   
    this.myText.sync();

    
     
    const myText2 = new Text();
    //this.scene.add(myText2);
    myText2.text = "readability";

    myText2.fontSize = 75.0;
    myText2.color = "yellow";
   
    myText2.position.set(-50, -75 , 310) 
    myText2.rotation.y += Math.PI
    myText2.sync();

   
    const myText3 = new Text();
    //this.scene.add(myText3);
    myText3.text =
      "EVERYTHING HAS A PATTERN EVERYTHING HAS A PATTERN EVERYTHING HAS A PATTERN"
    myText3.curveRadius = -170.0;
    myText3.fontSize = 85.0;
    myText3.color = "yellow";
    myText3.maxWidth = 200;
    myText3.position.set(0,-75, 310);
    myText3.sync();


    this.myText4 = new Text();
    this.scene2.add(this.myText4);

    this.myText4.text =
      "wherever you go there you are";
    this.myText4.fontSize = 250;
    this.myText4.color = "blue";
    this.myText4.maxWidth = 3500;
    this.myText4.textAlign = 'center';
   
    this.myText4.position.set(-400, 200, -1000);
    this.myText4.sync();


let keyPressStartTime = 0;
let keyPressDuration = 0;
const textDisplayInterval = 500; 
const textLingerDuration = 1000; 
const texts = [this.myText, this.myText4]; 
let currentIndex = 0;
let isTextLingering = false;
const distance = 1500;


document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowUp") {

    keyPressStartTime = performance.now();

    isTextLingering = false; 
    
  }

});

document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowDown") {

    keyPressDuration = performance.now() - keyPressStartTime; 

    if (keyPressDuration >= textDisplayInterval && !isTextLingering) {

      displayText(); 

      isTextLingering = true;

      setTimeout(nextText, textLingerDuration); 
      
    }

  }

});




function displayText() {

 /*  const textElement = document.getElementById("smalltext"); 

  textElement.textContent = texts[currentIndex]; */

  const textElement =  texts[currentIndex];

  //console.log(textElement)
  
  GSAP.to(textElement.position, 1, {

    //x: this.model2.position.x + Math.random() * distance - distance / 2,
    //y: textElement.position.y + Math.random() * distance - distance / 2,
    z: textElement.position.z +  distance,
    ease: "power2.easeIn",
    //repeat: 5,  //-1 indefinite
    //yoyo: true,
    


});

  
}

function nextText() {

  currentIndex = (currentIndex + 1) % texts.length; 

  displayText(); 

  isTextLingering = false; 
 

}
    


    //CLOUDBOXES//
    /*  this.shaderMaterial = new THREE.ShaderMaterial({

      uniforms: {

        mouse: { value: this.mouse },
        time: { value: this.time },
        fogDensity: { value: 0.45 },
        color: { value: new THREE.Vector3( 0.0, 0.0, 1.0 ) },
        texture1: { value: this.resources.items.fireTexture },
        texture2: { value: null },

      },

      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader,

      

    });  */

      //this.shaderMaterial.uniforms.texture1.value.wrapS =
      //this.shaderMaterial.uniforms.texture1.value.wrapT = THREE.RepeatWrapping;

    /*   this.shaderMaterial.uniforms.texture2.value.wrapS =
      this.shaderMaterial.uniforms.texture2.value.wrapT = THREE.MirroredRepeatWrapping; */

     /*  this.video = new Video()
  
      this.videoTexture = this.video.setVideoTexture() */


let length =20;
this.boxes = [];

this.boxGeometry = new THREE.CylinderGeometry(1, 1, 10.1, 32, 1);

this.purpleMaterial = new THREE.MeshStandardMaterial({
  color: 'purple',
  opacity: 1,
  transparent: true,
  //roughness: 0.1,
  //metalness: .5,
  //clearcoat: 1,
  //transmission: 0.9,
});

this.yellowMaterial = new THREE.MeshPhongMaterial({ 
  color: 'yellow', 
  //map: this.resources.items.meTexture,
   refractionRatio: 0.98,
    reflectivity: 0.9,
    opacity: 1,
    transparent: true,
    
});

for (let i = 0; i < length; i++) {
  const material = i % 2 === 0 ? this.purpleMaterial : this.yellowMaterial;

  this.box1 = new THREE.Mesh(this.boxGeometry, this.shaderMaterial);

  this.box = this.box1.clone();

  this.box.position.set(
    Math.random() * 1200 - 600,
    0,
    Math.random() * 1200 - 600
  );

  this.box.scale.set(100, 1, 100);

  this.box.castShadow = true

  //this.scene2.add(this.box);

  this.boxes.push(this.box);
}




this.boxes.name = 'cloudboxes';

    


  // Add event listener to window object
window.addEventListener('pointerdown', () => {

  //test.testing('testing from box.js 232', this.scene2, this.myText)
  

  for (let i = 0; i < this.boxes.length; i++) {
    const box = this.boxes[i];
    const distance = 660;
    
    
    GSAP.to(box.position, 10, {
      x: box.position.x + Math.random() * distance - distance / 2,
      y: box.position.y + Math.random() * distance - distance / 2,
      z: box.rotation.z + Math.random() * distance - distance / 2,
      ease: 'power2.easeOut',
   
    });


  }
})

    return this.boxes
   
  }

  



  setLights() {


    const lights = new THREE.HemisphereLight(0xffffff,0x0000ff, 1.0);
    lights.position.set(0, 25, 0);
    this.scene2.add(lights);
    //this.camera.instance.add(lights)

    const light1 = new THREE.AmbientLight( 0xffffff, 2.5 );
    light1.position.set( 0, 50, 0 );
    this.scene2.add( light1 );
    //this.camera.instance.add( light1 );
/* 
    const light2 = new THREE.HemisphereLight( 0xffffff,0xffffff, 1.5 );
    light2.position.set( 0, 15, 0 );
    this.scene2.add( light2 );
    this.camera.instance.add( light2 );
  
    const light3 = new THREE.DirectionalLight( 0x0000ff, 2.5 );
    light3.position.set( 0, 800, 300 );
    this.camera.instance.add( light3 );
    this.scene2.add( light3 );

    const light4 = new THREE.SpotLight( 0x0000ff, 2.5 );
    light4.position.set( 0, 100, 0 );
    this.camera.instance.add( light4 );
    this.scene2.add( light4 );

    var pointLight = new THREE.PointLight( 0xffffff, 1.0, 100 );
    pointLight.position.set( 0, 500, 50 );
    this.scene2.add( pointLight ); */
  }


  update(){
    this.shaderMaterial.uniforms.time.value += this.time.delta * 10;
    
    this.shaderMaterial.uniforms.azimuth.value = this.camera.azimuth * 2.5 + Math.PI;
    //this.myText.curveRadius -= 10.0;

  /*   const time = this.time.elapsed * 0.001;
    this.theta = (Math.PI /this.period) * time;
    const amplitude = Math.sin(this.theta) * this.amplitude;
  
    
    this.pivot.rotation.z = amplitude;
 */
    
   
   
  } 

  destroy(){

}

}

