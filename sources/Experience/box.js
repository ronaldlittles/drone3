import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import { Text } from "troika-three-text";
import { smokeVertex } from "./smokeVertex.js";
import { smokeFragment } from "./smokeFragment.js";
//import Video from './video.js';
import Floor from "./floor.js";
//import GUI from 'lil-gui';
import GSAP from "gsap";

import { vertexShader } from "./shaders/vertex.js";
import { fragmentShader } from "./fragment.js";
//import {test}  from "./video.js";

//import Walls from "./walls.js"; 

export default class Box extends EventEmitter {

  

  constructor(_options = {}) {

    super()

    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.world = this.experience.world;

    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
   
    this.renderer = this.experience.renderer;
    this.targetElement = this.experience.targetElement;
    this.world = this.experience.world;
    
   
    this.setCubeTexture()
    this.resource1 = this.resources.items.me;
    this.resource2 = this.resources.items.fluffy;
    this.resource3 = this.resources.items.sceneModel
    this.resource6 =  this.resources.items.hdr
    //this.setLights()
    this.setCity() 
    //this.setBox()
   
    //this.setLights()
   
    this.clamp = THREE.MathUtils.clamp;
   
   
  
    
  }

 

  setCubeTexture() {

    this.cubeTexture = new THREE.CubeTextureLoader().load([

      "/assets/nx.png",

      "/assets/ny.png",

      "/assets/nz.png",

      "/assets/px.png",

      "/assets/py.png",

      "/assets/pz.png"
      

      
    ]);

   
    //lightthis.scene2.background =  this.cubeTexture
    //this.scene2.backgroundBluriness = 1
    
    this.cubeTexture.needsUpdate = true
    this.cubeTexture.mapping = THREE.CubeRefractionMapping;
    this.scene2.environment = this.cubeTexture

                                                                
                                                               
   
  }

  
  //setCity() {

    

     this.shaderMaterial = new THREE.ShaderMaterial({

      side: THREE.DoubleSide,
            
    
      uniforms: {

          resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
					time: { value: 1.0 },
					uvScale: { value: new THREE.Vector2( 3.0, 1.0 ) },
					texture1: { value: this.resource1 },
					texture2: { value: this.resource2 },
          azimuth: { value: null },

          fogDensity: { value: 0.45 },
				  fogColor: { value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
          
      
      },

      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader,

    }); 

   
  //this.resource1.wrapS =  THREE.RepeatWrapping;
  //this.resource1.wrapT =  THREE.RepeatWrapping;
  //this.resource1.repeat.set(10,10)

  //this.resource2.wrapS = THREE.RepeatWrapping;
  //this.resource2.wrapT =THREE.RepeatWrapping; 
  //this.resource2.repeat.set(10,10)

  this.resource1.colorSpace = THREE.SRGBColorSpace;

  /* this.resource6.wrapS = THREE.RepeatWrapping;
  this.resource6.wrapT =THREE.RepeatWrapping; 
  this.resource6.repeat.set(.05,.05) */
    

      this.geometry = new THREE.PlaneGeometry(2,1.5,10,10);

      this.mesh1 = new THREE.Mesh(this.geometry,
         new THREE.MeshStandardMaterial({

          map: this.resource6,
          //color: 0x0000ff,
          side: THREE.DoubleSide

        }));
      
      
      this.mesh1.scale.set(0,0,0)

      this.mesh1.scale.setScalar(50)

      this.mesh1.position.set(1000, 150 , -500)
      
      this.scene2.add(this.mesh1);

      this.mesh1.receiveShadow = true;
      this.mesh1.castShadow = true;
        this.mesh1.name = 'debbugerClassMesh1'
      //this.mesh1.lookAt(new THREE.Vector3(0, 0, 1200))
    

    
     /* if(this.debug){

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



    }  */
      
   

}

 


  setBox() {

   
    this.myText = new Text();

   
    this.scene.add(this.myText);

    this.myText.text =
      "the brain is the strongest muscle of the body.";

    this.myText.fontSize = 100.0;
    //this.myText.textAlign = 'center';
    
    this.myText.color = 'yellow';
    
    
    this.myText.maxWidth = 1050;
    this.myText.sync();

    this.myText.lookAt(this.camera.instance.position)
    
     
    const myText2 = new Text();
    this.scene.add(myText2);

    myText2.text = "Ronald C. Littles";

    myText2.fontSize = 350.0;
    myText2.color = "yellow";
    myText2.position.set(1907, 230 , 1174) 
    
    myText2.sync();
    myText2.lookAt(this.camera.instance.position)

   
    const myText3 = new Text();
    this.scene2.add(myText3);

    myText3.text =
      "EVERYTHING is PATTERN"
    myText3.curveRadius = -170.0;
    myText3.fontSize = 72.0;
    myText3.color = "yellow";
    myText3.maxWidth = 500;
    myText3.position.set(0,50, 310);
    myText3.sync();
    myText3.lookAt(this.camera.instance.position)
    myText3.name = 'everything is pattern'


    this.myText4 = new Text();
    //this.scene2.add(this.myText4);

    this.myText4.text =
      "wherever you go there you are";
    this.myText4.fontSize = 182.0;
    this.myText4.color = "blue";
    this.myText4.maxWidth = 550;
    this.myText4.textAlign = 'center';
   
    this.myText4.position.set(0, 25, -1000);
    this.myText4.sync();
    this.myText4.lookAt(new THREE.Vector3(0, 0, 1))

    this.myText4.name = 'wherever you go there you are'


/* let keyPressStartTime = 0;
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

   const textElement = document.getElementById("smalltext"); 

  textElement.textContent = texts[currentIndex]; 

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
 

} */
    


  
   

 

  
  }


  setLights() {


    this.lights = new THREE.HemisphereLight(0xff0000,0xffffff, 1.0);
    this.lights.position.set(0, 100, 0);
    this.scene2.add(this.lights);
    //this.camera.instance.add(lights)
   

    const light1 = new THREE.AmbientLight( 0xff0000, 1.0 );
    light1.position.set( 0, 5, 0 );
    this.scene2.add( light1 );
    //this.camera.instance.add( light1 );
    

    var pointLight = new THREE.PointLight( 0xffffff, 1.0, 1 );
    //pointLight.position.set( 0, 0, 50 );
    this.camera.instance.add( pointLight ); 
    pointLight.castShadow = true;
    pointLight.lookAt(0, 10, -50)

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
    this.scene2.add(directionalLight);
     //this.camera.instance.add( directionalLight ); 
     directionalLight.castShadow = true;
     //directionalLight.lookAt(0, 10, -50)
   
  }


  update(){
    
    this.shaderMaterial.uniforms.time.value += this.time.delta * 0.2;
    this.mesh1.rotation.y += 0.01;

   
  } 

  resize() {

    // Instance
    this.camera.instance.setSize(this.config.width, this.config.height);
    this.camera.instance.setPixelRatio(this.config.pixelRatio);

   
  }

  destroy(){

}

}

