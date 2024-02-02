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

import Drawing from "./drawing.js"
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";



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

    this.resource1 = this.resources.items.me;
    this.resource2 = this.resources.items.fluffy;
    this.resource3 = this.resources.items.droneModel;
    this.resource4 = this.resources.items.smokeModel;
    this.resource5 = this.resources.items.wallTexture;
    this.resource6 = this.resources.items.hdr;
    this.resource7 = this.resources.items.snowm;
    this.resource8 = this.resources.items.trees2;

    this.resource1.colorSpace = THREE.SRGBColorSpace

    this.setBoxes();

    this.setModel();
   
    this.createWall();
    
    this.setRaycaster();

    this.setSound();

 this.addToDebugger(this.model2Clone)



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

    this.audioLoader.load('/assets/mixkitfunky.mp3',

    function(buffer){
    this.audio.setBuffer(buffer)
    this.audio.setLoop(true)
    this.audio.setRefDistance(20)
    this.audio.setDirectionalCone(100,230,0)
    this.audio.play()
    
    
  }.bind(this)
  )

  
  this.audioHelper = new PositionalAudioHelper(this.audio, 100, 100, 100, 'green')
  this.scene2.add(this.audioHelper )

if(this.tube4){

this.tube4.add(this.audio)
  
  
}

  }

  setBoxes(){

    //this.scene2.fog = new THREE.FogExp2('0xefd1b5', 0.0025);

    
    const waterGeometry = new THREE.PlaneGeometry( 100000, 100000 );

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
    this.water.position.y-= 100;

   //this.scene2.add( this.water );

    this.sky = new Sky();
    this.sky.scale.setScalar( 100000 );
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
    this.light1.position.set(50,520,50)
     this.scene2.add(this.light1 );
     this.light1.lookAt(this.scene2.position)
     //this.light1.translateZ(-100)
     //this.light1.translateX(50)
     //this.light1.translateY(125)
     
    this.light1.castShadow = true;
    this.light1.shadow.mapSize.width = 2048
    this.light1.shadow.mapSize.height = 2048
    this.light1.shadow.camera.near = 10;
    this.light1.shadow.camera.far = 5000;
    this.light1.shadow.radius = .5;
    this.light1.angle = Math.PI / 5;
		this.light1.penumbra = 0.3;
    this.light1.shadow.bias = -.002;
    this.light1.shadow.camera.updateProjectionMatrix();

     const light1Helper = new THREE.PointLightHelper( this.light1, 100 );
     this.scene2.add( light1Helper );

     

     this.directionalLight = new THREE.DirectionalLight( 0xffffff, 3.5 );
     this.scene2.add(this.directionalLight);
     //this.directionalLight.position.set(200,500,0)
     this.camera.instance.add( this.directionalLight ); 
     this.directionalLight.castShadow = true;
     this.directionalLight.shadow.mapSize.width = 2048
     this.directionalLight.shadow.mapSize.height = 2048
     this.directionalLight.shadow.camera.left = -500; // Adjust as needed
     this.directionalLight.shadow.camera.right = 500; // Adjust as needed
     this.directionalLight.shadow.camera.top = 500; // Adjust as needed
     this.directionalLight.shadow.camera.bottom = -500; // Adjust as needed
     this.directionalLight.shadow.camera.near = 0.5; // Adjust as needed
     this.directionalLight.shadow.camera.far = 5000; // Adjust as needed
     this.directionalLight.shadow.camera.updateProjectionMatrix(); // Update the shadow camera projection


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
    
      this.box1 = new THREE.Mesh( this.boxGeometry, material);
      this.box1.castShadow = true
      this.box1.receiveShadow = true
    

      this.box = this.box1.clone();
    
    
      this.box.scale.set(5, 1, 5);
    
      
      this.scene2.add(this.box);

    
      this.boxes.push(this.box)

      
      this.box.position.set(-0,0,0)


       
    }
   
   
    

  
    
   /*  window.addEventListener('pointerdown', () => {
    
      
      for (let i = 0; i < this.boxes.length; i++) {
        this.box1 = this.boxes[i];
        const distance = 1000;
        
       
        GSAP.to(this.box1.position, 2, {

          x: this.box1.position.x + Math.random() * distance - distance / 2,
          y: this.box1.position.y + Math.random() * distance - distance / 2,
          z: this.box1.rotation.z + Math.random() * distance - distance / 2,
          ease: 'power2.easeOut',
          //repeat: -1,
       
        });
    
    
      }
 
     

    
      })*/
      
       
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
    //this.model.add(this.audioListener)
   
    this.model.children[0].children[0].castShadow= true
    this.directionalLight.lookAt(this.model.position)

    this.model2 = this.resource8.scene;
    this.model2.name = "trees2model";
    this.model2.upVector = new THREE.Vector3(0, 1, 0);
    this.model2.castShadow = true;
    //this.model2.receiveShadow = true;
    this.model2.visible = true;
    //this.model2.scale.setScalar(10)
   
   
    ///////this.scene2.add(this.model2);


   if(this.debug){

   

  this.debugFolder
  .add(this.model.position,'z')
  .min(-500)
  .max(500)
  .step(50.0)
  .onChange((value) => {

    this.model2.position.x = value 
  
  })
 
   

  }
   
      //USE THE FOLLOWING TO TRAVERSE ANY OF THE MODELS PROPERTIES

                 this.meshes = [];
                      this.model.traverse((object) => {
                        if (object.isMesh) {
                          this.meshes.push(object);
                        } 
                      });  


        

        this.meshes[0].receiveShadow = true
        //this.meshes[1].receiveShadow = true
        //this.meshes[2].receiveShadow = true 

        

        this.meshes[0].material.transparent = true
        this.meshes[0].material.opacity = 1.0
       


        this.rotateLeftButton = document.getElementById('left');
        this.rotateRightButton = document.getElementById('right');
        this.menuButton = document.getElementById('menu');

        let popUp =  document.getElementById('andrea')


       
        this.menuButton.addEventListener('pointerdown', ()=>{
          this.centerElement(popUp)
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
            uvScale:  { value: new THREE.Vector2( 3, 1 ) },
            tangent:{ value: this.tangent},
    
            fogDensity: { value: 0.45 },
            fogColor: { value: new THREE.Vector3( 0.0, 0.0, 0.0 ) },
              
            texture1: { value: this.resource1 },
            texture2: { value: this.resource2 }
    
          },
       
          vertexShader: vertexShader.vertexShader,
          fragmentShader: fragmentShader.fragmentShader,
       
        }); 


       
      this.shaderMaterial2 = new THREE.ShaderMaterial({
       
      side: THREE.DoubleSide,
      
     
      
      uniforms: {
         
          time: { value: 0.0},
          uNoise: { value: this.iNoise },
          uvScale: { value: new THREE.Vector2(.5,.5)},
          uTangent:{ value: this.tangent2},
          uNormal: { value: this.normal},
          texture1: { value: this.resource5 },
          texture2:  { value: this.resource1 },
          

      },

      vertexShader: vertexShader.vertexShader2,
      fragmentShader: fragmentShader.fragmentShader2,

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

        time: { value: this.time.elapsed },
        texture1: { value: this.resource1 },
        uNoise: { value: this.iNoise },
        uvScale: { value: new THREE.Vector2(1,1) },
        iResolution: { value: new THREE.Vector2( this.config.width,this.config.height)},
        iMouse: { value: new THREE.Vector2(this.mouse.x,this.mouse.y) },

      },
   
      vertexShader: vertexShader.vertexShader,
      fragmentShader: fragmentShader.fragmentShader4,
   
    });

   
    


    this.displacementMaterial = new THREE.MeshStandardMaterial({
      
      //wireframe: true,
      color: 'white',
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
      //map: this.resource1,
     

    });


    this.redMaterial = new THREE.MeshStandardMaterial({ 

            side: THREE.DoubleSide,
            color: 'white',
            opacity: .8,
           transparent: true,

            //map: this.resource6,
            
        });


        this.meshes[0].material = this.displacementMaterial //body
        //this.meshes[1].material = this.shaderMaterial4  //toplight
        //this.meshes[2].material = this.shaderMaterial4  //backlight
    


         
        this.numPoints = 2000;
        this.points = [];
        this.derivatives = []; 
        
        let radius = 1500;
        
        function figureEightCurve(t) {

            let x = Math.sin(t * 2) * radius;
            let z = Math.cos(t) * radius;
            let y;
        
            if ( t < Math.PI / 1.5 && t > Math.PI / 2.5 ) {

                const targetY = Math.sin(Math.cos(t * 1.5) * -Math.PI) * 100;

                y = Math.sin(Math.cos(t * 6 * Math.PI)) * 5;

                const smoothY = y + (targetY + y) * (Math.abs(t - Math.PI / 2.5)) * 10;

                y = smoothY;

            } else if (-(t < Math.PI/.5) && t > Math.PI/1.5) {

              y = Math.cos( Math.sin(t * 2.7* Math.PI)) * 100;

              } else{

                y = Math.sin(Math.cos(t * 3) * Math.PI) * 5;

            }
        
            return new THREE.Vector3(x, y, z).multiplyScalar(2);

        }
        
        function derivativeCurve(t) {
            const h = 0.0001;
            const dx = (figureEightCurve(t + h).x - figureEightCurve(t).x) / h;
            const dy = (figureEightCurve(t + h).y - figureEightCurve(t).y) / h;
            const dz = (figureEightCurve(t + h).z - figureEightCurve(t).z) / h;
        
            return new THREE.Vector3(dx, dy, dz);
        }
        
        
        for (let i = 0; i <= this.numPoints; i++) {
            const t = (i / this.numPoints) * Math.PI * 2;
            const point = figureEightCurve(t);
            this.points.push(point);
        
            const derivative = derivativeCurve(t);
            this.derivatives.push(derivative);
        }
        
        
        function calculateSurfaceArea(numPoints, derivativesArray) {
            let surfaceArea = 0;
        
            for (let i = 0; i < numPoints; i++) {
                const firstDerivative = derivativesArray[i];
        
                // For the last point, wrap around to the first derivative to close the loop
                const secondDerivative = (i === numPoints - 1) ? derivativesArray[0] : derivativesArray[i + 1];
        
                const crossProduct = new THREE.Vector3();
                crossProduct.crossVectors(firstDerivative, secondDerivative);
        
                const magnitude = crossProduct.length();
                surfaceArea += magnitude;
            }
        
            surfaceArea *= (Math.PI * 2) / numPoints;
        
            return surfaceArea;
        }
        
        const totalSurfaceArea = calculateSurfaceArea(this.numPoints, this.derivatives);
        console.log("Total Surface Area of the figure-eight curve:", totalSurfaceArea);
        


    function getPointAboveCurve(t, distanceAbove) {

        const pointOnCurve = figureEightCurve(t);  
        const normalVector = derivativeCurve(t).normalize(); 

        const pointAboveCurve = new THREE.Vector3().copy(pointOnCurve).add(normalVector.multiplyScalar(distanceAbove));

        return pointAboveCurve;

      }
 

        /////////this.test = getPointAboveCurve(2000, .1)
        
        
  



    this.spline = new THREE.CatmullRomCurve3(this.points);


    for (let i = 0; i < this.spline.points.length; i++) {

      this.splinePoints = this.spline.points[i]

      this.distance= this.splinePoints.distanceTo(this.model.position)

     
  
  }


    this.spline.curveType = 'catmullrom';
    this.spline.closed = true;
    this.spline.tension = .5;

   console.log(this.spline)

    window.addEventListener("pointerdown", (event) => {

      const raycaster = new THREE.Raycaster();

      //this.raycaster = new THREE.Raycaster(this.model.position.clone(), new THREE.Vector3(0,0,-1), 0, -1000);

      raycaster.setFromCamera(this.mouse, this.camera.instance);
      //raycaster.set(this.model.position.z, new THREE.Vector3(0,0,-1))
      
      
      
   
        const intersects = raycaster.intersectObjects(this.objectsArray2, true);

            

        if (intersects.length > 0) {

          const intersectsPoint = intersects[0].object
          this.intersectsPoint2 = intersects[0].point
          

          intersectsPoint.scale.setScalar(.5)
          intersectsPoint.material = this.shaderMaterial2
          //intersectsPoint.position.z += -100
          intersectsPoint.rotation.x += Math.PI/2


        /*  this.pointY = intersects[0].point.y;
         this.pointZ = intersects[0].point.z;
         
         this.label1 = this.pointY.toFixed(4)
         this.label2 = this.pointZ.toFixed(4)
      
        this.label.textContent = `Index: ${this.label1} ${this.label2 }`; */
        
      } 
    
     

    })
    

    this.spacedPoints = this.spline.getSpacedPoints(1000).slice(800,1000)

    this.spacedPoints2 = this.spline.getSpacedPoints(1000).slice(400,600)

    this.spacedPoints3 = this.spline.getSpacedPoints(1000).slice(125,575)

   
    /* const sectionSize = 10;
    const skipSize = 50;

    for(let i = 0; i <sectionSize; i++)  { 
    
     this.slicedPoints = this.spacedPoints3.slice(i, i + sectionSize);

    

    }
 */

    this.spline2 = new THREE.CatmullRomCurve3(this.spacedPoints);
    

    this.spline3 = new THREE.CatmullRomCurve3(this.spacedPoints2);


    this.spline5 = new THREE.CatmullRomCurve3(this.spacedPoints3);


    this.splineReverse = this.spline.points
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


    //CUSTOM GEOMETRY

    this.geometry = new THREE.BufferGeometry();
    
    this.positions = new Float32Array( this.numPoints * 3 );
    this.randoms = new Float32Array( this.numPoints * 3 );
    this.sizes = new Float32Array( this.numPoints );

    for ( let i = 0; i < this.numPoints; i ++ ) {

      this.positions[ i + 0 ] = ( Math.random() - 0.3 );
      this.positions[ i + 1 ] = ( Math.random() - 0.3 );
      this.positions[ i + 2 ] = ( Math.random() - 0.003 );

      
      this.randoms[ i + 0 ] = Math.random();
      this.randoms[ i + 1 ] = Math.random();
      this.randoms[ i + 2 ] = Math.random();

      this.sizes[ i ] = Math.random() * 5.5 + 5.5;

    }

    
    this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ) );

    this.geometry.setAttribute( 'aRandom', new THREE.BufferAttribute( this.randoms, 3 ) );

    this.geometry.setAttribute( 'aSize', new THREE.BufferAttribute( this.sizes, 1 ) );

    this.plane2 = new THREE.Points( this.geometry, this.shaderMaterial2)
    this.scene2.add(this.plane2)
    this.plane2.scale.setScalar(5)


    this.tube = new THREE.Mesh(this.tubeGeo, this.redMaterial) 

    
    this.scene2.add(this.tube);

    
   




    
    this.tube.position.y =-10 

    //this.tube.visible = false;

    this.tube.receiveShadow = true;
    //this.tube.castShadow = true;
   
 
    this.tube2 = new THREE.Mesh(this.tubeGeo2, this.shaderMaterial)   


    this.scene2.add(this.tube2);

    //this.tube2.position.y =-12

    
  
    this.tube3 = new THREE.Mesh( this.tubeGeo3, this.shaderMaterial)  

    this.scene2.add(this.tube3);
        
    //this.tube3.position.y =-12


      this.tube4 = new THREE.Mesh(this.tubeGeo4, this.redMaterial) 

      this.scene2.add(this.tube4);

      this.tube4.position.y = 10;
       
      ///////////////////this.tube4.receiveShadow = true;
      //this.tube4.castShadow = true;

      
      
      this.tube5 = new THREE.Mesh(this.tubeGeo5,this.shaderMaterial) 

      this.scene2.add(this.tube5);

      this.tube5.position.y = 10;

      //this.tube5.receiveShadow = true;
      //this.tube5.castShadow = true;



      this.tube6 = new THREE.Mesh(this.tubeGeo6, this.shaderMaterial5)

      //this.scene2.add(this.tube6);



      this.tubeGeo7 = new THREE.TubeGeometry(this.spline, 400, 1, 300, false); 

      this.tube7 = new THREE.Mesh(this.tubeGeo7, this.shaderMaterial5)
      
      this.tube7.position.y = -8;

      this.scene2.add(this.tube7);
     


        this.resource1.wrapS = THREE.RepeatWrapping;

        this.resource1.wrapT = THREE.RepeatWrapping;
    
        //this.resource1.repeat.set(1,1)


        this.resource2.wrapS = THREE.RepeatWrapping;

        this.resource2.wrapT = THREE.RepeatWrapping;
    
        //this.resource2.repeat.set(.05,.05)


        this.resource6.wrapS = THREE.RepeatWrapping;

        this.resource6.wrapT = THREE.RepeatWrapping;
    
        //this.resource6.repeat.set(4, 4) 
       //SKYBOX

          

          /*this.plane = new THREE.Mesh( new THREE.PlaneGeometry( 2,2,200,200 ),

          this.shaderMaterial2,

         
          )

          this.plane.scale.setScalar(1000)*/

        ///////////////////this.scene2.add(this.plane)

         
          ////////this.plane.rotation.z += Math.PI/2;

          //this.plane.rotation.x += Math.PI/2;


          this.sphere = new THREE.Mesh(

          this.torusGeometry = new RoundedBoxGeometry( 2, 2, 2, 24, 0.09 ),
            

          this.redMaterial

         /*  new THREE.MeshStandardMaterial({

             //color: Math.random() * 0xffffff,
             map: this.renderer.renderTarget.texture, 
             side: THREE.DoubleSide,
             transparent: true,
             opacity: 1,
           

          }) */

          )

         

        this.sphere.scale.setScalar(5)
        this.scene2.add(this.sphere)

        this.sphere.castShadow = true


        this.roundedBox = new RoundedBoxGeometry( 2, 2, 2, 24, 0.09 );
       
        this.sphere2 = new THREE.Mesh(
            
            new THREE.CylinderGeometry( .2, .2, 10, 32 ),
          
 
            this.shaderMaterial3,
            
          )

          this.sphere2.scale.setScalar(20)
          this.sphere2.castShadow = true;
          this.scene2.add(this.sphere2)
  
    
   
    const numObjects = 150; 
    this.spacing = 35; 
    this.scaleFactor = 5;
    const offset = new THREE.Vector3( (Math.random()*200-100)*75,-530,-100);

   

    this.objectsArray1 = [];
    this.objectsArray2 = [];

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

   
    this.offset = normal.multiplyScalar(this.spacing * (i % 2 === 0 ? 2.0 : -2.0)-30)

    this.offset3 = i%2===0?1.5:-1.5

    const angle = Math.atan2(tangent.x , tangent.z );

    this.offset1 = new THREE.Vector3(50,0,0)

    

    


    this.randomOffset = new THREE.Vector3(

      (Math.random(i* 100) * 200 - 100 )* -10,
     -150,//(Math.random() * 2 - 1 ) * 50,
     -1800,//(Math.random() * 2 - 1 ) 
      
      )

      this.sphereClone = this.sphere2.clone()
      this.sphereClone.position.copy(positionOnCurve.clone()).add(this.randomOffset)

      this.scene2.add(this.sphereClone)
 

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
    this.model2Clone.scale.setScalar(20)
    this.scene2.add(this.model2Clone)

    


    }
      
     

    }  

    

   addToDebugger(object) {
    // Check if 'this.debug' exists and 'object' is actually an object
    if (this.debug) {h
        // Further check if 'object' has the necessary properties like 'name', 'position', etc.
        const folderName = object.name || 'Object';
        const folder = this.debug.addFolder(folderName);

        // Assuming 'object' has position, rotation, and scale properties
        if (object.position && object.rotation && object.scale) {
            // Add position controls
            folder.add(object.position, 'x', -100, 100).name('Position X');
            folder.add(object.position, 'y', -1000, 100).name('Position Y');
            folder.add(object.position, 'z', -100, 100).name('Position Z');

            // Add rotation co
            folder.add(object.rotation, 'x', -Math.PI, Math.PI).name('Rotation X');
            folder.add(object.rotation, 'y', -Math.PI, Math.PI).name('Rotation Y');
            folder.add(object.rotation, 'z', -Math.PI, Math.PI).name('Rotation Z');

            // Add scale controls
            folder.add(object.scale, 'x', 0, 500).name('Scale X');
            folder.add(object.scale, 'y', 0, 500).name('Scale Y');
            folder.add(object.scale, 'z', 0, 500).name('Scale Z');
        
    }
}


//this.addToDebugger(this.model2)



  }
        
 
  
  setGsap() {


    for (let i = 0; i < this.boxes.length; i++) {
      this.box1 = this.boxes[i];
      const distance = 1000;
      
     
      GSAP.to(this.box1.position, 2, {
    
        x: this.box1.position.x + Math.random() * distance - distance / 2,
        y: this.box1.position.y + Math.random() * distance - distance / 2,
        z: this.box1.rotation.z + Math.random() * distance - distance / 2,
        ease: 'power2.easeOut',
        //repeat: -1,
     
      });
    
    
      }
    

  }




  update() {

    this.audioHelper.update()

    this.model2Clone.lookAt(this.model.position)

    this.plane2.position.copy(this.model.position)

    this.shaderMaterial.uniforms.needsUpdate = true;
    this.shaderMaterial2.uniforms.needsUpdate = true;
   
 
      this.iNoise += .5;

      this.iNoise = this.noise.noise(Math.random()*5,Math.random()*5.1,Math.random()*4.9)

      this.water.material.uniforms.time.value +=  this.time.elapsed * .05

      this.shaderMaterial.uniforms.time.value +=  this.time.elapsed * .01
      this.shaderMaterial2.uniforms.time.value +=  this.time.delta * 25.0
      this.shaderMaterial5.uniforms.time.value +=  this.time.delta * .5
      this.shaderMaterial4.uniforms.time.value +=  this.time.elapsed * .0005

      let currentPosition = 0; 
      let speed = .8; 
      let loopTime = 60;
    
      
        const t =  (speed *this.time.elapsed )/loopTime % 1;
        const t2 =  (speed * this.time.elapsed + .7)/loopTime % 1;
        const t3 =  (speed * this.time.elapsed + 2)/loopTime % 1;//reverse

        const t4 =  (speed * this.time.elapsed + 1.0)/loopTime % 1;


     
    
        const pos = this.spline.getPointAt(t);
        const pos2 = this.spline.getPointAt(t2);
        const pos3 =  this.spline4.getPointAt(t3);//reverse

        const pos4 = this.spline.getPointAt(t4)

        const velocity = 2.5;
        
  
    const tangent = this.spline.getTangentAt(t).normalize();
    this.tangent2 = this.spline.getTangentAt(t3).normalize();

    tangent.multiplyScalar(velocity)

    this.derivativeTangent = this.spline.getTangentAt(t4).sub(tangent).normalize();

    this.angle = Math.atan2(tangent.x , tangent.y );



    this.binormal = new THREE.Vector3();
    this.binormal.crossVectors(tangent, this.derivativeTangent).normalize(); 

    this.normal = new THREE.Vector3();
    this.normal.crossVectors( tangent, this.binormal ).normalize();

    

    const offset = new THREE.Vector3(0,125, 0)
    const offset2 = new THREE.Vector3(0,15, 0)
    const lookAt =  new THREE.Vector3(0, 0, 0)
  
   

    ///CAMERA MOVEMENT
    
    //this.camera.instance.add(this.light1)

    //this.plane2.position.copy(this.model.position)
    
    let originalValue = this.normal.y

    let normalizedValue = (originalValue + 1) / 2;

    const distance = this.model.position.distanceTo(this.model2Clone.position)

    this.label.textContent = `${this.model.position.x.toString()} ${this.model.position.y.toString()}  ${this.model.position.z.toString()}`
    this.label3.textContent = (normalizedValue).toFixed(8);
    this.label4.textContent = (distance).toFixed(10);

     //this.model.position.copy( pos2.add(tangent).add(this.normal).add(this.binormal).add(offset2))
   
    this.objectsArray2.forEach((object) => {

      object.rotation.z += .5


    })


    const originOffSet = new THREE.Vector3(0, -500, 0)

    const origin =  pos2.clone().add(originOffSet)
    const origin2 = pos3.clone().add(tangent).add(this.normal).add(this.binormal)

    const raycaster = new THREE.Raycaster( origin, new THREE.Vector3(0,1,0) );
    const raycaster2 = new THREE.Raycaster( origin2, new THREE.Vector3(0,1,0) );

    const intersects = raycaster.intersectObjects(this.objectsArray2, true);
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
  intersectsPoint.material = this.shaderMaterial2
  intersectsPoint.rotation.z += this.time.delta
  intersectsPoint.position.x += -15 * Math.random() * Math.PI /2
  intersectsPoint.position.y +=  150 * Math.random() * Math.PI /2
  intersectsPoint.position.z += -50 * Math.random()

}
    
        
    
    /* this.camera.azimuth = Math.max(minAngle, Math.min(maxAngle, this.camera.azimuth));
  
    this.q1 = new THREE.Quaternion()
    this.q2 = new THREE.Quaternion()

    this.q1.setFromAxisAngle(new THREE.Vector3(.02, 0, 0), pos.x )
    this.q2.setFromAxisAngle(new THREE.Vector3(.04, 0, 0), pos.x)

    this.q3 = new THREE.Quaternion()
    this.q3.multiplyQuaternions(this.q1,this.q2)
 */


    //this.model.quaternion.copy(this.q3)
 


    const angleToRotate = THREE.MathUtils.degToRad(-45)
 
    const desiredRotation = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angleToRotate);
   
    const maxRotation = new THREE.Quaternion().slerp(desiredRotation, 0.5); 
 
   
    this.forwardVector2 = new THREE.Vector3(1, 0, 0);
    this.forwardDirection2 = this.forwardVector2.clone();
    this.forwardDirection2.applyQuaternion(this.model.quaternion).add(maxRotation).normalize();
    

    this.forwardVector3 = new THREE.Vector3(-1,0, 0);
    this.forwardDirection3 = this.forwardVector3.clone();
    this.forwardDirection3.applyQuaternion(this.model.quaternion).add(maxRotation).normalize(); 

   
   const speedFactor = 0.0001;

    if (this.arrowLeftPressed) {

         
      


    //this.camera.instance.rotation.z -= Math.PI/2;                                                                                                 
    //this.model.rotation.z += Math.PI/4;
   //this.model.rotation.y += Math.PI/4;
   
    this.model.position.x -=  5

                                                                                                               
    
    
    }
                                      
   


    if (this.arrowRightPressed) {

     

    //this.camera.instance.rotation.z += Math.PI/2; 

    ///////this.model.rotation.z -= Math.PI/4;
    ///////this.model.rotation.y += Math.PI/4;
    
    this.model.position.x +=  5

  
   
    

    } 

    if (this.arrowUpPressed) {

      
      this.model.position.copy( pos2.add(tangent).add(this.normal).add(this.binormal).add(offset2))
  

      this.camera.instance.position.copy( pos.add(tangent).add(this.normal.add( offset )).add(this.binormal) )

      this.camera.instance.lookAt(this.model.position)

      this.model.lookAt(   pos4   )

 

  
       

    
  }else if(this.arrowUp = false){

    let stopped = this.model.position

    this.model.position.copy(stopped)

      }


   
    }

      resize() {
        
        this.camera.instance.setSize(this.config.width, this.config.height);
        this.camera.instance.setPixelRatio(this.config.pixelRatio);
    
       
      }

    }

   