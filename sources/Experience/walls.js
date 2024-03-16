import * as THREE from "three";
import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";
import GSAP from "gsap";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import {smokeFragment} from "./smokeFragment.js";
import {smokeVertex} from './smokeVertex.js';
import { vertexShader } from "./shaders/vertex.js";
import { fragmentShader } from "./fragment.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import { Water } from 'three/examples/jsm/objects/Water.js';
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"
import { checkerFragment, checkerVertex } from "./shaders/checkerShader.js";
import TrackGeometry from "./trackgeometry.js";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";

import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";
import { sign, softmax } from "@tensorflow/tfjs";
import Box from "./box.js";

//import  default from "./vertex.glsl"

export default class Walls extends EventEmitter {
  constructor() {

    super();

   

    this.experience = new Experience();
    this.config = this.experience.config;
    this.debug = this.experience.debug;
    this.world = this.experience.world;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera;
    this.renderer = this.experience.renderer;
    this.time = this.experience.time;
    this.controls = this.experience.controls;
    this.scene = this.experience.scene;
    this.scene2 = this.experience.scene2;
    this.mouse = this.experience.mouse;

    this.resource1 = this.resources.items.tacoBell;
    this.resource2 = this.resources.items.dominos;
    this.resource3 = this.resources.items.droneModel;
    this.resource4 = this.resources.items.baloonsModel;
    this.resource5 = this.resources.items.wallTexture;
    this.resource6 = this.resources.items.hdr;
    this.resource7 = this.resources.items.snowm;
    this.resource8 = this.resources.items.trees2;

    this.resource1.colorSpace = THREE.SRGBColorSpace

    

    //console.log(this.world)

    //this.geo = new TrackGeometry()
  

  
   
 // this.box = new Box()
   
  //console.log(this.box)

    this.setBoxes();

    this.setModel();

    this.createWall();
    
    this.setRaycaster();

    this.setSound();




    this.on('gsap', this.setGsap)

    this.depth = 50;
    this.rotationSpeed = .005;
    this.movementSpeed = .1;
   
  
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  
    document.addEventListener("keydown", this.handleKeyDown)
    document.addEventListener("keyup", this.handleKeyUp)
  
  
  
      this.arrowUpPressed = false;
      this.arrowLeftPressed = false;
      this.arrowRightPressed = false;
      
      this.isPointerDown = false;

      this.isRunning = false;
      
  }

  //END OF CONSTRUCTOR

  setModelPosition(){

  

    this.isRunning = true


  }

  setPlane(){

    let direction = new THREE.Vector3().subVectors(this.model.position, this.plane.position).normalize()
  
  
  //this.plane.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1), direction )
  

}

  
     handleKeyDown(event) {

      if (event.key === 'ArrowUp') {
        this.arrowUpPressed = true;
      } else if (event.key === 'ArrowLeft') {
        this.arrowLeftPressed = true;
      } else if (event.key === 'ArrowRight') {
        this.arrowRightPressed = true;
      } else if (event.key === 'pointerdown') {
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
      }else if (event.key === 'pointerup') {
        this.arrowUpPressed = false;
      }

      
     
    }

      test(){

    console.log('test from walls.js')
     }
  
      setSound(){

    //this.drawing = new Drawing()
  
  
  
   

    this.audioListener = new THREE.AudioListener()
    this.camera.instance.add( this.audioListener)

    this.audio = new THREE.PositionalAudio(this.audioListener)

    this.audioLoader = new THREE.AudioLoader()

    this.audioLoader.load('/assets/bush.mp3',
    
    

    function(buffer){
    this.audio.setBuffer(buffer)
    //this.audio.setLoop(true)
    this.audio.setRefDistance(50)  
    //this.audio.setDirectionalCone(0,360,0)
    //this.audio.play()
    //this.audio.setVolume(1)
    
    
  }.bind(this)
  )

  
  this.audio2 = new THREE.PositionalAudio(this.audioListener)

  this.audioLoader.load('/assets/engine.wav',
    
    

    function(buffer){
    this.audio2.setBuffer(buffer)
    this.audio2.setLoop(true)
    this.audio2.setRefDistance(50)  
    //this.audio.setDirectionalCone(0,360,0)
    this.audio2.play()
    //this.audio.setVolume(1)
    
    
  }.bind(this)
  )

  
  this.audioHelper = new PositionalAudioHelper(this.audio, 100, 100, 100, 'green')
  //this.scene2.add(this.audioHelper )

if(this.tube4){

//this.tube4.add(this.audio)
  
  
}

     }

      setBoxes(){

    //this.scene2.fog = new THREE.FogExp2('0xefd1b5', 0.0025);
    
/* 

    const text = new FontLoader()
    text.load( '/assets/gentilis.json', function ( json ) {  

      const font = new Font(json)
      let textGeometry = new TextGeometry( 'LAX', {
        font: font,
        size: 180,
        height: 7,
  
        curveSegments: 10,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 1,
        bevelOffset: 0,
        bevelSegments: 1,


      })

      this.textMaterial = new THREE.MeshStandardMaterial({ color: 'grey' })
      this.textGeometry = new THREE.Mesh( textGeometry, this.textMaterial )
      this.scene2.add( this.textGeometry )
      //this.textGeometry.position.set(-500, 300, 0)
      this.textGeometry.scale.setScalar(2)
      this.model.add(this.textGeometry)
      this.textGeometry.translateY(100)
      this.textGeometry.translateX(100)
      this.textGeometry.translateZ(50)
      this.textGeometry.rotateY(Math.PI)
      this.textGeometry.castShadow = true
      this.textGeometry.receiveShadow = true

      }.bind(this) ); */

      

    
    const waterGeometry = new THREE.PlaneGeometry( 150000, 150000 );

                            this.water = new Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load( '/assets/waternormals.jpg', function ( texture ) {

          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

        } ),
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,

        fog: this.scene2.fog !== undefined
      }
    );

    this.water.rotation.x = - Math.PI / 2;
    this.water.position.y= -550;
    

   //this.scene2.add( this.water );

    this.sky = new Sky();
    this.sky.scale.setScalar( 1000 );
    this.scene2.add( this.sky );

   const skyUniforms = this.sky.material.uniforms;

				skyUniforms[ 'turbidity' ].value = 10;
				skyUniforms[ 'rayleigh' ].value = 2;
				skyUniforms[ 'mieCoefficient' ].value = 0.005;
				skyUniforms[ 'mieDirectionalG' ].value = 0.8;

				const parameters = {
					elevation: 2,
					azimuth: 180
				};

    this.light1 = new THREE.PointLight( 0xffffff, .5, 0, 0  );
    this.light1.position.set(50,100,50)
     this.scene2.add(this.light1 );
     this.light1.lookAt(this.scene2.position)
     //this.light1.translateZ(-100)
     //this.light1.translateX(50)
     //this.light1.translateY(125)
     
    this.light1.castShadow = true;
    this.light1.shadow.mapSize.width = 512
    this.light1.shadow.mapSize.height = 512
    this.light1.shadow.camera.near = 10;
    this.light1.shadow.camera.far = 5000;
    this.light1.shadow.radius = .05;
    this.light1.angle = Math.PI / 5;
		this.light1.penumbra = 0.03;
    this.light1.shadow.bias = -.002;
    this.light1.shadow.camera.updateProjectionMatrix()

     const light1Helper = new THREE.PointLightHelper( this.light1, 100 );
     this.scene2.add( light1Helper );

     

     this.directionalLight = new THREE.DirectionalLight( 0xffffff, 3.5 );
     this.scene2.add(this.directionalLight);
     //this.directionalLight.position.set(200,500,0)
     this.camera.instance.add( this.directionalLight ); 
     this.directionalLight.castShadow = true;
     this.directionalLight.shadow.mapSize.width = 512
     this.directionalLight.shadow.mapSize.height = 512

     this.directionalLight.shadow.camera.left = -500; // Adjust as needed
     this.directionalLight.shadow.camera.right = 500; // Adjust as needed
     this.directionalLight.shadow.camera.top = 500; // Adjust as needed
     this.directionalLight.shadow.camera.bottom = -500; // Adjust as needed
     this.directionalLight.shadow.camera.near = 0.5; // Adjust as needed
     this.directionalLight.shadow.camera.far = 5000; // Adjust as needed
     this.directionalLight.shadow.camera.updateProjectionMatrix(); // Update the shadow camera projection
     this.directionalLight.translateY(-500)
      this.directionalLight.translateZ(500)

     const directionalLightHelper = new THREE.DirectionalLightHelper(this.directionalLight, 500, 0xffffff)



     if(this.debug){

    this.debugFolder = this.debug.addFolder()
  
    this.debugFolder
    .add( this.directionalLight.position,'y')
    .min(-500)
    .max(4500)
    .step(50.0)
    .onChange((value) => {
  
      this.directionalLight.position.y = value 
    
    })




    
      }



    let length = 250;
    this.boxes = [];
    
    this.boxGeometry = new THREE.CylinderGeometry(1, 1, 5, 32, 1);

    
    
    this.purpleMaterial = new THREE.MeshStandardMaterial({

      color: 'yellow',
      opacity: 1,
      transparent: true,
     
    });
    
    this.yellowMaterial = new THREE.MeshBasicMaterial({ 

        color: 'purple',
        //map: this.resource1,
        opacity: 1,
        transparent: true,
        side: THREE.DoubleSide,

    });


   

      
    
      for (let i = 0; i < length; i++) {

      const material = i % 2 === 0 ? this.purpleMaterial : this.yellowMaterial;
      this.box1 = this.resource4.scene
    
      //this.box1 = new THREE.Mesh( this.boxGeometry, material);
      this.box1.castShadow = true
      this.box1.receiveShadow = true
    

      this.box = this.resource4.scene.clone()//this.box1.clone();
    
    
     // this.box.scale.set(5, 1, 5)
      this.box.scale.setScalar(100)
    
      
      this.scene2.add(this.box);

    
      this.boxes.push(this.box)

      
      this.box.position.set(0,0,0)


       
    }
   
   
    

  
    
     window.addEventListener('pointerdown', () => {
    
      
      for (let i = 0; i < this.boxes.length; i++) {
        this.box1 = this.boxes[i];
        const distance = 2000;
        
       
        GSAP.to(this.box1.position, 2, {

          x: this.box1.position.x + Math.random() * distance - distance / 2,
          y: this.box1.position.y + Math.random() * distance - distance / 2,
          z: this.box1.rotation.z + Math.random() * distance - distance / 2,
          ease: 'power2.easeOut',
          yoyo: true,
          repeat: -1,
       
        });
    
    
      }
 
     

    
      })
      
       
      }

      setModel() {



    this.model = this.resource3.scene;
    this.model.name = "droneModel";
    this.model.upVector = new THREE.Vector3(0, 1, 0);
    this.model.castShadow = true;
    this.model.receiveShadow = true;
    this.model.visible = true;
    this.model.scale.set(1.2,.5,1.1)
    //this.model.scale.setScalar(30)
    this.scene2.add(this.model);
    //this.model.add(this.audio2)
    

    this.cars = this.model.clone()
    this.scene2.add(this.cars)
    this.cars.scale.set(.6,.25,.55)
    this.cars.rotation.set(0,Math.PI,0)

    
  
this.clones = [];
let amount = 100;

for (let i = 0; i < amount; i++) {
    this.clone = this.model.clone();
    this.clone.scale.setScalar(.5)
    //this.clone.position.set(Math.random() * .1 - .05, 0, Math.random() * .1 - .05);
    this.scene2.add(this.clone);
    this.clones.push(this.clone);
}
    
   
    this.model.children[0].children[0].castShadow= true
   // this.directionalLight.lookAt(this.model.position)

    this.model2 = this.resource8.scene;
    this.model2.name = "trees2model";
    this.model2.upVector = new THREE.Vector3(0, 1, 0);
    this.model2.castShadow = true;
    //this.model2.receiveShadow = true;
    this.model2.visible = true;
    //this.model2.scale.setScalar(10)

    console.log(this.model2)
   
   
    ///////this.scene2.add(this.model2);


   this.modelTube = new THREE.Mesh(

    new THREE.TorusGeometry( 6, .3, 10, 100 ), 
    new THREE.MeshStandardMaterial({ map: this.renderer.renderTarget2.texture, opacity: 1, transparent: true, side: THREE.DoubleSide }) 

    );

   // this.scene2.add(this.modelTube)
    this.model.add(this.modelTube)
    this.modelTube.scale.setScalar(9.)
   
      //USE THE FOLLOWING TO TRAVERSE ANY OF THE MODELS PROPERTIES

                 this.meshes = [];
                      this.model2.traverse((object) => {

                        if ( object.isMesh  ) {
                          this.meshes.push(object)
                          this.leavesClone = this.meshes[2]
                          this.leavesClone2 = this.meshes[3]
                        } 

                        
                       });  

        
                       this.leaves = this.leavesClone.clone()
                       this.leaves2 = this.leavesClone2.clone()
        //this.meshes[3].scale.setScalar(5)
        //this.meshes[1].receiveShadow = tru
        //this.meshes[2].receiveShadow = true 

        this.leaves.rotation.y += Math.random() *5

        

        //this.meshes[0].material.transparent = true
       // this.meshes[0].material.opacity = 1.0
       


        this.rotateLeftButton = document.getElementById('left');
        this.rotateRightButton = document.getElementById('right');
        this.menuButton = document.getElementById('menu');

        let popUp =  document.getElementById('andrea')


       
        this.menuButton.addEventListener('pointerdown', ()=>{
          //this.centerElement(popUp)
          this.arrowUpPressed = true;
        })       

          this.rotateLeftButton.addEventListener('pointerdown', () => {
  
          this.arrowLeftPressed = true;

          this.arrowRightPressed = false;

          console.log(this.model.position.distanceTo(this.tube7.position))
         
        });

  
        this.rotateRightButton.addEventListener('pointerdown', () => {
  
          this.arrowRightPressed = true;

          this.arrowLeftPressed = false;

          console.log(this.model.position.distanceTo(this.tube7.position))
          
        });
  
       
      
      }
     
      centerElement(element){

      //this.video = document.querySelector(".top-right");

      let elementWidth = element.offsetWidth;
      let elementHeight = element.offsetHeight;

      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      let leftPosition = '50px' //(windowWidth - elementWidth) /2;
      let topPosition = '50px'  //(windowHeight - elementHeight) /2;

      element.style.position = 'absolute';
      element.style.left = leftPosition //- elementWidth /2 + 'px';
      element.style.top = topPosition //- elementHeight /2 + 'px';
      element.style.display = 'block'
      //element.play()


      }
  
      setRaycaster() {

          this.label = document.createElement("div");
          this.label.style.position = "absolute";
          this.label.style.top = "65px";
          this.label.style.right = '50%';
          this.label.style.backgroundColor = 'transparent';
          this.label.style.color = "#0000ff";
          this.label.style.fontFamily = "sans-serif";
          this.label.style.fontSize = "34px";
          this.label.style.textShadow = "1px 2px #000000";
          //this.label.style.justifyContent = "center";
          this.label.style.display = "block";
          //this.label.style.pointerEvents = "none"; 
          document.body.appendChild(this.label);
           

          this.label3 = document.createElement("div");
          this.label3.style.position = "absolute"; // Change to absolute positioning
          this.label3.style.bottom = "0"; // Align to the bottom
          this.label3.style.left = "5%"; // Align to the left
          this.label3.style.fontSize = "24px";
          this.label3.style.backgroundColor = 'transparent';
          this.label3.style.color = "white";
          this.label3.style.fontFamily = "sans-serif";
          this.label3.style.textShadow = "2px 2px #000000";
          document.body.appendChild(this.label3);
         
          
          this.label4 = document.createElement("div");
          this.label4.style.position = "absolute"; // Change to absolute positioning
          this.label4.style.bottom = "0"; // Align to the bottom
          this.label4.style.right = "5%"; // Align to the right
          this.label4.style.fontSize = "24px";
          this.label4.style.backgroundColor = 'transparent';
          this.label4.style.color = "white";;
          this.label4.style.fontFamily = "sans-serif";
          this.label4.style.textShadow = "2px 2px #000000";
          document.body.appendChild(this.label4);



        /*   this.popup = document.getElementById("popup");

          this.popup.visible = false


          this.menu = document.getElementById("menu");

          this.menu.addEventListener('pointerdown', ()=>{

          this.popup.visible = true 

          })*/
          
       
         

          

      }
          
      createWall() {

        this.noise = new ImprovedNoise()

       
        //SHADERS

        this.shaderMaterial = new THREE.ShaderMaterial({
     
          side: THREE.DoubleSide,
        
          uniforms: {
    
            time: { value: 1.0 },
           
            uNoise: { value: this.iNoise},
            uvScale:  { value: new THREE.Vector2( .00003, .0001 ) },
            tangent:{ value: this.tangent},
    
            fogDensity: { value: 0.45 },
            fogColor: { value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
              
            texture1: { value: this.resource1 },
            texture2: { value: this.resource2 }
    
          },
       
          vertexShader: vertexShader.vertexShader,
          fragmentShader: fragmentShader.fragmentShader,
       
        }); 

         

   
    this.shaderMaterial3 = new THREE.ShaderMaterial({
       
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
           
      uniforms: {

        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
        uvScale: { value: new THREE.Vector2(.001,64) },
        texture1: { value: this.resource1 },
        uNoise: { value: this.iNoise },
        time: { value: 1.0 },
        uTimeFrequency: { value: 1.4 },
        uUvFrequency: { value: new THREE.Vector2(14, 15) },
        uColor: { value: new THREE.Color(0x000000) },

      },

      vertexShader: smokeVertex.vertexShader,
      fragmentShader: smokeFragment.fragmentShader,

    }); 

    

   
    this.shaderMaterial4 = new THREE.ShaderMaterial({
     
      side: THREE.DoubleSide,
     
    
      uniforms: {

        time: { value: 0.0 },
        uvScale: { value: .00000001 },
        uResolution: { value: new THREE.Vector2( this.config.width,this.config.height)},

      },
   
      vertexShader: vertexShader.vertexShader3,
      fragmentShader: fragmentShader.fragmentShader3,
   
    })    









      this.shaderMaterial5 = new THREE.ShaderMaterial({
     
      side: THREE.DoubleSide,
     
    
      uniforms: {

        time: { value: 0.0 },
        texture1: { value: this.resource1 },
        uNoise: { value: this.iNoise },
        uvScale: { value: new THREE.Vector2(1,1) },
        iResolution: { value: new THREE.Vector2( this.config.width,this.config.height)},
        iMouse: { value: new THREE.Vector2(this.mouse.x,this.mouse.y) },

      },
   
      vertexShader: vertexShader.vertexShader2,
      fragmentShader: fragmentShader.fragmentShader4,
   
    });

   
    this.shaderMaterial6 = new THREE.ShaderMaterial({

      side: THREE.DoubleSide,
      transparent: true,
    
      uniforms: {

        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2(0,0) },
        uvScale: { value: new THREE.Vector2(1.0,1.0) },
        uScale: { value: 1.0 },
        texture1: { value: this.resource1 },
    
      },

      vertexShader: checkerVertex.vertexShader,
      fragmentShader: checkerFragment.fragmentShader,

    });



    this.displacementMaterial = new THREE.MeshStandardMaterial({
      
      //wireframe: true,
      //color: 'white',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: .8,
      map: this.resource1,
     

    });

    var redValue = 100; // Value above 1
    var greenValue = 0;
    var blueValue = 0;
    
    // Create the color without normalizing the values
    var color = new THREE.Color(redValue, greenValue, blueValue);

    this.redMaterial = new THREE.MeshStandardMaterial({ 

            side: THREE.DoubleSide,
            color: color,
            opacity: 1,
           transparent: true,

            map: this.renderer.renderTarget.texture,
            
        });

//this.redMaterial.emissive = color
//this.redMaterial.emissiveIntensity = 1
        //this.meshes[0].material = this.displacementMaterial //body
        //this.meshes[1].material = this.displacementMaterial  //treetrunk
        //this.meshes[2].material = this.displacementMaterial //leaves
         // this.meshes[3].material = this.displacementMaterial


         
        // this.numPoints = 5000;
        this.points = [];
        this.derivatives = [];
    
        
        
 
    this.numPoints = 5000;
 
    this.spline = new THREE.CatmullRomCurve3(this.world.trackGeometry.points);

  


    this.splinePoints = [];

    

     let dataTexture = new THREE.DataTexture(
      new Float32Array(this.splinePoints),
      this.splinePoints.length / 3, // assuming each point has x, y, z
      1,
      THREE.RGBAFormat,
      THREE.FloatType
    );
     
    //dataTexture.needsUpdate = true; 
   

   // const attributes =  new THREE.BufferAttribute(new Float32Array(this.splinePoints), 3);  


   
   this.shaderMaterial2 = new THREE.ShaderMaterial({
   
  side: THREE.DoubleSide,
  transparent: true,
 
  
  uniforms: {
     
      time: { value: 0.0},
      uNoise: { value: this.iNoise },
      uvScale: { value: new THREE.Vector2(.5,.5)},
      uTangent:{ value: this.tangent2},
      uNormal: { value: this.normal},
      texture1: { value: this.resource5 },
      //texture2:  { value: this.resource1 },
     // splinePoints: { value: dataTexture },
    
      

  },

  vertexShader: vertexShader.vertexShader2,
  fragmentShader: fragmentShader.fragmentShader2,

});
 

    //this.distance= this.splinePoints.distanceTo(this.model.position)

    
  
    


    //this.spline.curveType = 'catmullrom';
    //this.spline.closed = true;
    //this.spline.tension = 0.5;
    



   

    window.addEventListener("pointerdown", (event) => {

      const raycaster = new THREE.Raycaster();

      //this.raycaster = new THREE.Raycaster(this.model.position.clone(), new THREE.Vector3(0,0,-1), 0, -1000);

      raycaster.setFromCamera(this.mouse, this.camera.instance);
      //raycaster.set(this.model.position.z, new THREE.Vector3(0,0,-1))
      
      
      
   
        const intersects = raycaster.intersectObjects( this.objectsArray1, true);

            

        if (intersects.length > 0) {

          const intersectsPoint = intersects[0].object
          //this.intersectsPoint2 = intersects[0].point
          

          intersectsPoint.scale.setScalar(.5)
          intersectsPoint.material = this.shaderMaterial
          //intersectsPoint.position.z += -100
          intersectsPoint.rotation.x += Math.PI/2


        /*  this.pointY = intersects[0].point.y;
         this.pointZ = intersects[0].point.z;
         
         this.label1 = this.pointY.toFixed(4)
         this.label2 = this.pointZ.toFixed(4)
      
        this.label.textContent = `Index: ${this.label1} ${this.label2 }`; */
        
      } 
    
     

    })
    

    this.spacedPoints = this.spline.getSpacedPoints(1000).slice(700,1000)

    this.spacedPoints2 = this.spline.getSpacedPoints(6000).slice(300,600)

    this.spacedPoints3 = this.spline.getSpacedPoints(1000).slice(125,875)

   
   

    this.spline2 = new THREE.CatmullRomCurve3(this.spacedPoints);
    

    this.spline3 = new THREE.CatmullRomCurve3(this.spacedPoints2);


    this.spline5 = new THREE.CatmullRomCurve3(this.spacedPoints3);


    this.splineReverse = this.world.trackGeometry.points
    this.rev = this.splineReverse.toReversed()
    this.spline4 = new THREE.CatmullRomCurve3(this.rev); 
   
  
const racetrackShape = new THREE.Shape();

racetrackShape.moveTo(0, -120);

racetrackShape.lineTo(2 ,-120); 
racetrackShape.lineTo(0, 120);
racetrackShape.lineTo(-2, -120);


const racetrackShape2 = new THREE.Shape();

racetrackShape2.moveTo(0, -130);
racetrackShape2.lineTo(10, -130);  
racetrackShape2.lineTo(10, -110);   
racetrackShape2.lineTo(-5, -110); 
racetrackShape2.lineTo(-5, -130); 


const racetrackShape3 = new THREE.Shape();

racetrackShape3.moveTo(0, 130);
racetrackShape3.lineTo(10, 130);  
racetrackShape3.lineTo(10, 110);  
racetrackShape3.lineTo(-5, 110);  
racetrackShape3.lineTo(-5, 130); 

const racetrackShape4 = new THREE.Shape();

const outerRadius = 250;
const innerRadius = .4;

//racetrackShape4.absarc(0, 0, outerRadius , Math.PI , 0, true)

const holePath = new THREE.Path();

//holePath.absarc(-25,  -100, innerRadius, 0, Math.PI, true);

//racetrackShape3.holes.push(holePath);


const racetrackShape6 = new THREE.Shape();

racetrackShape6.moveTo(-.2, -1);

racetrackShape6.lineTo(.2 ,-1); 
racetrackShape6.lineTo(-.2, 1);
racetrackShape6.lineTo(-.2, -1);



 

    this.extrudeSettings = {

      steps: 1000,
      depth: 150,
      
      extrudePath: this.spline,

    }

     this.extrudeSettings2 = {

      steps: 1200,
      depth: 150,
      
      extrudePath: this.spline,

    }

    this.extrudeSettings3 = {

      steps: 1000,
      depth: 100,
      
      extrudePath: this.spline3,

    } 

    
 
    this.tubeGeo = new THREE.ExtrudeGeometry(racetrackShape, this.extrudeSettings);
    this.tubeGeo2 = new THREE.ExtrudeGeometry(racetrackShape2, this.extrudeSettings);
    this.tubeGeo3 = new THREE.ExtrudeGeometry(racetrackShape3, this.extrudeSettings);

    this.tubeGeo4 = new THREE.TubeGeometry(this.spline2, 100, 200, 100, false);
    this.tubeGeo5 = new THREE.TubeGeometry(this.spline3, 100, 200, 100, false);

    this.tubeGeo6 = new THREE.ExtrudeGeometry(racetrackShape6, this.extrudeSettings2);
    this.tubeGeo.computeVertexNormals()



    //CUSTOM GEOMETRY
this.s = new THREE.SphereGeometry( 1, 32, 32 );

let radius = 100;
    
    //this.geometry2 = new THREE.BufferGeometry().setFromPoints( );

    this.geometry = new THREE.BufferGeometry();

    
    const spherical = new THREE.Spherical(

      radius,
      Math.random() * Math.PI,
      Math.random() * Math.PI *2
      
    )

    //this.geometry.setFromSpherical(spherical)
    
    this.positions = new Float32Array( this.numPoints * 3 );
    this.randoms = new Float32Array( this.numPoints * 3 );
    this.sizes = new Float32Array( this.numPoints );

    

    for ( let i = 0; i < this.numPoints; i ++ ) {


      this.positions[ i + 0 ] = ( Math.random()  - .5);
      this.positions[ i + 1 ] = ( Math.random()  - .5);
      this.positions[ i + 2 ] = ( Math.random()  - .5);

      
      this.randoms[ i + 0 ] = Math.random();
      this.randoms[ i + 1 ] = Math.random();
      this.randoms[ i + 2 ] = Math.random();

      this.sizes[ i ] = Math.random() * .5 + .5;

    }

    
    this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );

    this.geometry.setAttribute( 'aRandom', new THREE.BufferAttribute( this.randoms, 3 ) );

    this.geometry.setAttribute( 'aSize', new THREE.BufferAttribute( this.sizes, 1 ) );

    this.plane2 = new THREE.Points( this.geometry, this.shaderMaterial5)
    this.scene2.add(this.plane2)
    this.plane2.scale.setScalar(3000)


    this.tube = new THREE.Mesh(this.tubeGeo, this.redMaterial) 
    
    
    this.scene2.add(this.tube);

    
   



    //this.tube.rotation.x = Math.PI/2;
    
    this.tube.position.y =-10 

    this.tube.visible =true;

    this.tube.receiveShadow = true;
    //this.tube.castShadow = true;
   
 
    this.tube2 = new THREE.Mesh(this.tubeGeo2, this.shaderMaterial)   


    this.scene2.add(this.tube2);

    //this.tube2.position.y =-12

    //this.tube2.rotation.x = Math.PI/2;
    
  
    this.tube3 = new THREE.Mesh( this.tubeGeo3, this.shaderMaterial)  

    this.scene2.add(this.tube3);
        
    //this.tube3.position.y =-12


    //this.tube3.rotation.x = Math.PI/2;

      this.tube4 = new THREE.Mesh(this.tubeGeo4, this.displacementMaterial) 

      this.scene2.add(this.tube4);

      this.tube4.position.y = 10;
       
    //this.tube4.rotation.x = Math.PI/2;
      ///////////////////this.tube4.receiveShadow = true;
      //this.tube4.castShadow = true;

      
      
      this.tube5 = new THREE.Mesh(this.tubeGeo5, this.redMaterial) 

      this.scene2.add(this.tube5);

      this.tube5.position.y = 10;

      //this.tube5.rotation.x = Math.PI/2;
      //this.tube5.receiveShadow = true;
      //this.tube5.castShadow = true;



      this.tube6 = new THREE.Mesh(this.tubeGeo6, this.shaderMaterial)

      //this.scene2.add(this.tube6);


      //this.tube6.rotation.x = Math.PI/2;

      this.tubeGeo7 = new THREE.TubeGeometry(this.spline, 400, 1, 300, false); 

      this.tube7 = new THREE.Mesh(this.tubeGeo7, this.shaderMaterial)
      
      this.tube7.position.y = -8;

      this.scene2.add(this.tube7);
     
      //this.tube7.rotation.x = Math.PI/2;

        this.resource1.wrapS = THREE.RepeatWrapping;

        this.resource1.wrapT = THREE.RepeatWrapping;
    
        this.resource1.repeat.set(8,8)


        this.resource2.wrapS = THREE.RepeatWrapping;

        this.resource2.wrapT = THREE.RepeatWrapping;
    
        this.resource2.repeat.set(8,8)


        this.resource6.wrapS = THREE.RepeatWrapping;

        this.resource6.wrapT = THREE.RepeatWrapping;
    
        //this.resource6.repeat.set(4, 4) 
       //SKYBOX

          

          this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 2,2,2 ),

          new THREE.MeshStandardMaterial({
            side: THREE.DoubleSide,
            transparent:true,
            opacity: 1,
            map:this.renderer.renderTarget2.texture,
          })

         
          )

        this.plane.scale.setScalar(1000)

        //this.plane.translateZ(100)

        this.scene.add(this.plane)

         
          //this.plane.rotation.z += Math.PI/2;

          //this.plane.rotation.x += Math.PI/2;

          this.plane3 = new THREE.Mesh( new THREE.SphereGeometry( 1,36,36 ),

          new THREE.MeshStandardMaterial({

          map: this.renderer.renderTarget.texture,
          side: THREE.DoubleSide,


          })
         
          )

        this.plane3.scale.setScalar(5000)
        this.plane3.name = "skybox"

        //this.scene2.add(this.plane3)
        this.plane3.position.set(0,-200,0)


          this.sphere = new THREE.Mesh(

          this.torusGeometry = new RoundedBoxGeometry( 2, 2, 2, 24, 0.09 ),
            

          //this.redMaterial

           new THREE.MeshStandardMaterial({

             //color: Math.random() * 0xffff,
             map: this.renderer.renderTarget.texture, 
             side: THREE.DoubleSide,
             transparent: true,
             opacity: 1,
           

          }) 

          )

         

        this.sphere.scale.setScalar(9)
        this.scene2.add(this.sphere)

        this.sphere.castShadow = true

        this.roundedBox = new RoundedBoxGeometry( 2, 2, 2, 24, 0.09 );
       
        this.sphere2 = new THREE.Mesh(
            
            new THREE.CylinderGeometry( 2, 2, 20, 32 ),
          
 
            this.shaderMaterial6,
            
          )

          this.sphere2.scale.setScalar(10)
          this.sphere2.castShadow = true;
          //this.scene2.add(this.sphere2)
  
    
   
    const numObjects = 500; 
    this.spacing = 40; 
    this.scaleFactor = 10;
    const offset = new THREE.Vector3( (Math.random()*200-100)*75,-530,-100);

   

    this.objectsArray1 = [];
    this.objectsArray2 = [];

    this.treesArray = [];

    for (let i = 0; i < numObjects; i++) {

    const t = (i / this.numPoints) * Math.PI * 2;


    

    const tvalue  = .5
    const step=.001;
    const pointBefore = this.spline5.getPointAt(tvalue - step);
    const pointAfter = this.spline5.getPointAt(tvalue + step);

    const derivative = pointAfter.clone().sub(pointBefore).normalize();

    
   
    const positionOnCurve = this.spline.getPointAt(t);
    const tangent = this.spline.getTangentAt(t);

    const positionOnCurve2 = this.spline5.getPointAt(t);
    const tangent2= this.spline5.getTangentAt(t);
   

    const referenceVector = new THREE.Vector3(0,1, 0);

    const normal = new THREE.Vector3();
    normal.crossVectors(tangent2, referenceVector).normalize();

    const binormal = new THREE.Vector3();
    binormal.crossVectors(tangent2, normal).normalize(); 

   
    this.offset = normal.multiplyScalar(this.spacing * (i % 2 === 0 ? 1.5 : -1.5))
    //this.offsetCones = normal.multiplyScalar(this.spacing * (i % 2 === 0 ? 1.5 : -1.5))


    this.offset3 = i%2===0?1.5:-1.5

    const angle = Math.atan2(tangent.x , tangent.z );

    this.offset1 = new THREE.Vector3(50,0,0)

    

    


    this.randomOffset = new THREE.Vector3(

      (Math.random(i* 100) * 200 - 100 )* -10,
     250,//(Math.random() * 2 - 1 ) * 50,
     -100,//(Math.random() * 2 - 1 ) 
      
      )

      this.sphereClone = this.sphere2.clone()
      this.sphereClone.position.copy(positionOnCurve.clone()).add(this.offset).add(this.randomOffset)

      this.scene2.add(this.sphereClone)
      this.objectsArray1.push(this.sphereClone) 

      
      
      this.sphere2Clone = this.sphere.clone()
      this.sphere2Clone.position.copy(positionOnCurve.clone())//.add(this.randomOffset)//.add(this.test)
      
      this.scene2.add(this.sphere2Clone) 
      this.objectsArray2.push(this.sphere2Clone) 

    
    this.modelClone= this.model.clone()
    this.modelClone.position.copy(positionOnCurve2.add(tangent2).add(normal).add(binormal))
    this.modelClone.scale.setScalar(1.0)
    //this.scene2.add(this.modelClone)

    this.model2.castShadow = true
    this.model2Clone= this.model2.clone()
    this.model2Clone.position.copy(positionOnCurve2.add(tangent2).add(normal).add(binormal))
    this.model2Clone.scale.setScalar(80)
    this.scene2.add(this.model2Clone)
    this.model2Clone.rotation.y += Math.random()

    this.treesArray.push(this.model2Clone)

    }
    
       } 

      setGsap() {


    for (let i = 0; i < this.boxes.length; i++) {
      this.box1 = this.boxes[i];
      const distance = 1000;
      
      this.box1.position.copy(this.model.position)
     
      GSAP.to(this.box1.position, 2, {
    
        x: this.box1.position.x + Math.random() * distance - distance / 2,
        y: this.box1.position.y + Math.random() * distance - distance / 2,
        z: this.box1.rotation.z + Math.random() * distance - distance / 2,
        ease: 'power2.easeOut',
        stagger:{ amount: 10, grid: [25,25], from: 'center'},  
        //repeat: -1,
     
      });
    
    
      }
    
    
       }

      update() {

        

   this.audioHelper.update()

    this.model2Clone.lookAt(this.model.position)

    //this.plane3.rotation.y +=  5;
    //this.plane.rotation.y +=  5;

    //this.modelTube.rotation.x +=  .2;
    this.modelTube.rotation.y +=  .2;
    //this.modelTube.rotation.z +=  2;

   // this.plane2.position.copy(this.model.position)

    this.shaderMaterial.uniforms.needsUpdate = true;
    //this.shaderMaterial2.uniforms.needsUpdate = true;
   
 
      this.iNoise += .5;

      this.iNoise = this.noise.noise(Math.random()*5,Math.random()*5.1,Math.random()*4.9)

      this.water.material.uniforms.time.value +=  this.time.delta * 1.5

      this.shaderMaterial.uniforms.time.value +=  this.time.delta * 2.5
      this.shaderMaterial5.uniforms.time.value +=  this.time.delta * 1.5
      this.shaderMaterial6.uniforms.time.value +=  this.time.delta * .5
      this.shaderMaterial4.uniforms.time.value +=  this.time.elapsed * .0005

      
      let currentPosition = 0; 
      let speed = .9; 
      let loopTime = 60;

      let speed2 = .9;

    
      
        let  t =  (speed * this.time.elapsed)/loopTime % 1;
        let  t2 =  (speed * this.time.elapsed+ .7)/loopTime % 1;
        let  t3 =  (speed  * this.time.elapsed+ 2)/loopTime % 1;//reverse

        let  t4 =  (speed * this.time.elapsed + 1.0)/loopTime % 1;

        let  t5 =  (speed2 * this.time.elapsed)/loopTime % 1;
        let  t6 =  (speed2 * this.time.elapsed+ .7)/loopTime % 1;
        let  t7 =  (speed2 * this.time.elapsed + 1.5)/loopTime % 1;//reverse

        let  t8 =  (speed2 * this.time.elapsed + 1.0)/loopTime % 1;

  
    
        let  pos = this.spline.getPointAt(t)
        let  pos2 = this.spline.getPointAt(t2)
        let  pos3 =  this.spline4.getPointAt(t3);//reverse

        let  pos4 = this.spline.getPointAt(t4)

        let  pos5 = this.spline.getPointAt(t5);
        let  pos6 = this.spline.getPointAt(t6);
        let  pos7 = this.spline4.getPointAt(t7);//reverse

        let  pos8 = this.spline.getPointAt(t8)

        
    


        let  velocity = 2.5;



    
  
    const tangent = this.spline.getTangentAt(t)
    this.tangent2 = this.spline.getTangentAt(t3)
    this.tangent3 = this.spline.getTangentAt(t5)
    this.tangent4 = this.spline.getTangentAt(t7)

    

    tangent.multiplyScalar(velocity)

    this.derivativeTangent = this.spline.getTangentAt(t4).sub(tangent).normalize();
    this.derivativeTangent2 = this.spline.getTangentAt(t5).sub(this.tangent4).normalize();
 
    this.angle = Math.atan2(tangent.x , tangent.y );


    this.normal = new THREE.Vector3();
    this.normal.crossVectors( tangent, this.derivativeTangent).normalize();

    this.binormal = new THREE.Vector3();
    this.binormal.crossVectors(tangent, this.normal).normalize(); 

    

    this.binormal2 = new THREE.Vector3();
    this.binormal2.crossVectors(this.tangent4, this.derivativeTangent2).normalize(); 

    this.normal2 = new THREE.Vector3();
    this.normal2.crossVectors( this.tangent4, this.binormal2 ).normalize();


    const offset = new THREE.Vector3(0,125, 0)
    const offset2 = new THREE.Vector3(Math.random(),25, Math.random())
    const lookAt =  new THREE.Vector3(0, 0, 0)

        
  
    let tangentHelper = new THREE.ArrowHelper(tangent, pos, 50, 0xff0000); // Red for tangent
    let normalHelper = new THREE.ArrowHelper(this.normal, pos, 100, 0x00ff00); // Green for normal
    let binormalHelper = new THREE.ArrowHelper(this.binormal, pos, 100, 0x0000ff); // Blue for binormal


let thOffset = new THREE.Vector3(0,20,0)
  
tangentHelper.position.copy(pos);
tangentHelper.setDirection(tangent);
normalHelper.position.copy(pos);
normalHelper.setDirection(this.normal);
binormalHelper.position.copy(pos);
binormalHelper.setDirection(this.binormal);

    
   // this.scene2.add(tangentHelper);
    //this.scene2.add(normalHelper);
   // this.scene2.add(binormalHelper);


    

    ///CAMERA MOVEMENT
    
    //this.camera.instance.add(this.light1)

    //this.plane2.position.copy(this.model.position)
    
    let originalValue = this.normal.y

    let normalizedValue = (originalValue + 1) / 2;

    
    //this.label.textContent = `${this.model.position.x.toString()} ${this.model.position.y.toString()}  ${this.model.position.z.toString()}`
    //this.label3.textContent = (normalizedValue).toFixed(5);
    //this.label4.textContent = (this.distance).toFixed(10);



      this.cars.position.copy( pos7.add(this.tangent2).add(this.normal2).add(this.binormal2).add(offset2))
   
//this.orthographicCamera.position.copy( pos7.add(this.tangent2).add(this.normal2).add(this.binormal2).add(offset2))  
  
     
    

    const originOffSet = new THREE.Vector3(0, -500, 0)

    const origin =  pos2.clone().add(originOffSet)
    const origin2 = pos3.clone().add(tangent).add(this.normal).add(this.binormal)

    const raycaster = new THREE.Raycaster( origin, new THREE.Vector3(0,1,0) );
    const raycaster2 = new THREE.Raycaster( origin2, new THREE.Vector3(0,1,0) );

    const intersects = raycaster.intersectObjects(this.objectsArray1, true);
    const intersects2 = raycaster2.intersectObjects(this.objectsArray2, true);

  if (intersects.length > 0) {
  
        const intersectsPoint = intersects[0].object

        intersectsPoint.scale.setScalar(15)
        intersectsPoint.material = this.shaderMaterial
        intersectsPoint.rotation.x +=  this.time.delta
        intersectsPoint.position.x +=  15 *        Math.random()* Math.PI /2
        intersectsPoint.position.y +=  150 * this.time.delta  *    Math.random()
        intersectsPoint.position.z += -50 *        Math.random()


      
}

if (intersects2.length > 0) {

  const intersectsPoint = intersects2[0].object

  intersectsPoint.scale.setScalar(10)
  intersectsPoint.material = this.shaderMaterial
  intersectsPoint.rotation.z += this.time.delta
  intersectsPoint.position.x += -15 * Math.random() * Math.PI /2
  intersectsPoint.position.y +=  150 * Math.random() * Math.PI /2
  intersectsPoint.position.z += -50 * Math.random()

}


 for (let i = 0; i < this.clones.length; i++) {
  setInterval(() => {
    this.clonedCars = this.clones[i];
    this.clones[i].lookAt(this.model.position)

    let offset = new THREE.Vector3(Math.random()*.0001 - .00005, 0, Math.random() * .5 - .025 ).normalize();  

    this.clonedCars.position.copy(pos3.add(this.tangent4).add(this.normal2).add(this.binormal2));
}, i * 1000); // Delay each car's release by 1 second
} 
    
   //this.clonedCars.position.copy(pos7.add(this.tangent4).add(this.normal2).add(this.binormal2));
    
    /* this.camera.azimuth = Math.max(minAngle, Math.min(maxAngle, this.camera.azimuth));
  
    this.q1 = new THREE.Quaternion()
    this.q2 = new THREE.Quaternion()

    this.q1.setFromAxisAngle(new THREE.Vector3(.02, 0, 0), pos.x )
    this.q2.setFromAxisAngle(new THREE.Vector3(.04, 0, 0), pos.x)

    this.q3 = new THREE.Quaternion()
    this.q3.multiplyQuaternions(this.q1,this.q2)
 */


    //this.model.quaternion.copy(this.q3)
    
   /*  let matrix = new THREE.Matrix4();
    matrix.set(
        tangent.x, this.normal.x, this.binormal.x, 0,
        tangent.y, this.normal.y, this.binormal.y, 0,
        tangent.z, this.normal.z, this.binormal.z, 0,
        0, 0, 0, 1
    );
 */

    const angleToRotate = THREE.MathUtils.degToRad(-45)
 
    const desiredRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angleToRotate);
   
    const maxRotation = new THREE.Quaternion().slerp(desiredRotation, 0.5); 
 
   
    this.forwardVector2 = new THREE.Vector3(1, 0, 0);
    this.forwardDirection2 = this.forwardVector2.clone();
    this.forwardDirection2.applyQuaternion(this.model.quaternion).add(maxRotation).normalize();
    

    this.forwardVector3 = new THREE.Vector3(-1,0, 0);
    this.forwardDirection3 = this.forwardVector3.clone();
    this.forwardDirection3.applyQuaternion(this.model.quaternion).add(maxRotation).normalize(); 


    //plane to follow as clouds
    //this.setPlane();
    

   
   const speedFactor = 0.0001;

    if (this.arrowLeftPressed) {

      this.arrowRightPressed = false;
                  
      this.model.rotation.y += Math.PI/4;
   
      this.model.position.x -=  25
                                    
    
    }
                                      
   this.setModelPosition()


    if (this.arrowRightPressed) {

      this.arrowLeftPressed = false; 

      //this.model.rotation.y += Math.PI/4;
    
      //this.model.position.x +=  25

      
      const referenceVector = new THREE.Vector3(0,0,1)
    
      const quaternion = new THREE.Quaternion().setFromUnitVectors(referenceVector, tangent)
  
  
     this.model.setRotationFromQuaternion(quaternion)

    } 

    if(this.renderer.currentScene == this.scene){

      this.arrowUpPressed = false

     // this.camera.instance.position.copy( new THREE.Vector3(0, 500, 500))
    }


    if (this.arrowUpPressed ) {

       this.model.position.copy( pos2.add(tangent).add(this.normal).add(this.binormal).add(offset2))
  
      this.camera.instance.position.copy( pos.add(tangent).add(this.normal.add( offset )).add(this.binormal) )

      this.camera.instance.lookAt(this.model.position)

      this.model.lookAt(   pos4   )

  
 

    
      this.treesArray.forEach((model2Clone, index) => {
        //this.mesh = this.meshes[2]
        this.mesh = model2Clone.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0]
        //console.log(this.meshes)

        model2Clone.userData = { 

          originalRotation: this.leaves.rotation.clone(),
          currentRotation:  this.leaves.rotation.clone(),
          
          audioTriggered: false,
          sound: this.audio,
        
        }
        model2Clone.userData.currentRotation.copy(this.leaves.rotation)

       //console.log(model2Clone.userData.originalRotation)
        //console.log(model2Clone.userData.currentRotation)
        
        this.distance = this.model.position.distanceTo(model2Clone.position)

        if(this.distance < 175) {
      
      //model2Clone.rotation.x += -10 * this.time.delta
        
     
  this.leaves.rotation.x += 50 * this.time.elapsed * Math.random()
  this.leaves.rotation.y += 50 * this.time.elapsed * Math.random()
  this.leaves.rotation.z += 50 * this.time.elapsed * Math.random()
  
  this.leaves2.rotation.z = Math.PI/2
     
      //model2Clone.rotation.z += -10 * this.time.delta

      //needs to be regulated to play once
        
      

      if(!model2Clone.userData.audioTriggered ){


        model2Clone.userData.sound.play()


        model2Clone.userData.audioTriggered = true


      }
            
      

        } else {

          //model2Clone.rotation.x = model2Clone.userData.originalRotation.x
        
          //this.leaves.rotation.y = this.model2Clone.userData.originalRotation.y

          //model2Clone.rotation.z = model2Clone.userData.originalRotation.z
        }

      

  })

  //this.leaves.scale.setScalar(55)

}
      }

      resize() {
        
        this.camera.instance.setSize(this.config.width, this.config.height);
        this.camera.instance.setPixelRatio(this.config.pixelRatio);
    
      }

      destroy(){
      window.removeEventListener("pointerdown", this.onPointerDown);
      }

    }

   